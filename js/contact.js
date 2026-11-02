const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const success = document.getElementById('form-success');
const FORMSPREE_URL = 'https://formspree.io/f/mgaapldz'
const submitBtn = form.querySelector('button[type="submit"]');

// window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
//   formspree('initForm', { formElement: '#my-form', formId: 'mgaapldz' });

function showError(field, message) {
  document.getElementById(field.id + '-error').textContent = message;
  field.classList.add('invalid');
  field.setAttribute('aria-invalid', 'true');
}

function clearError(field) {
  document.getElementById(field.id + '-error').textContent = '';
  field.classList.remove('invalid');
  field.removeAttribute('aria-invalid');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDigitsOnly(value) {
  return /^\d+$/.test(value);
}

function validateForm() {
  let valid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  if (name === '') {
    showError(nameInput, 'Please enter your name.');
    valid = false;
  } else {
    clearError(nameInput);
  }

  if (email === '') {
    showError(emailInput, 'Please enter your email address.');
    valid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, 'Please enter a valid email, like name@example.com.');
    valid = false;
  } else {
    clearError(emailInput);
  }

  if (phone === '') {
    showError(phoneInput, 'Please enter your phone number.');
    valid = false;
  } else if (!isDigitsOnly(phone)) {
    showError(phoneInput, 'Phone number can only contain digits (0-9).');
    valid = false;
  } else {
    clearError(phoneInput);
  }

  if (message === '') {
    showError(messageInput, 'Please write a message.');
    valid = false;
  } else {
    clearError(messageInput);
  }

  return valid;
}

// form.addEventListener('submit', event => {
//   event.preventDefault();
//   success.textContent = '';

//   if (validateForm()) {
//     success.textContent = 'Thanks, ' + nameInput.value.trim() + '! Your message has been received.';
//     form.reset();
//   }
// });

form.addEventListener('submit', async event => {
  event.preventDefault();
  success.textContent = '';

  if (!validateForm()) return;

  const name = nameInput.value.trim();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      success.textContent = 'Thanks, ' + name + '! Your message has been sent.';
      form.reset();
    } else {
      success.textContent = 'Sorry, something went wrong. Please try again.';
    }
  } catch (error) {
    success.textContent = 'Could not send. Check your connection and try again.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  }
});

[nameInput, emailInput, phoneInput, messageInput].forEach(field => {
  field.addEventListener('input', () => clearError(field));
});