const navMount = document.createElement('div');
navMount.id = 'nav-placeholder';
document.body.prepend(navMount);
const THEME_KEY = 'theme';


function getSavedTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch { return null; }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

let currentTheme = getSavedTheme() === 'dark' ? 'dark' : 'light';
applyTheme(currentTheme);

document.addEventListener('click', event => {
  if (!event.target.closest('.theme-toggle')) return;
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  try { localStorage.setItem(THEME_KEY, currentTheme); } catch {}
});

fetch("nav.html")
  .then(res => res.text())
  .then(html => {
    navMount.innerHTML = html;
    applyTheme(currentTheme);

    const toggle = document.querySelector(".menu-toggle");
    const links = document.querySelector(".nav-links");

    function setMenu(open) {
      links.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "✕" : "☰";
    }

    // Open/close with the button

    toggle.addEventListener("click", () => {
      setMenu(!links.classList.contains("open"));
    });

    // Close the menu when a link is tapped
    links.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenu(false));
    });

    // Highlight the current page, once, as soon as the nav loads
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    links.querySelectorAll("a").forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  })
  .catch(err => console.error("Nav failed to load:", err));