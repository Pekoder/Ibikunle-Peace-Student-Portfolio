const navMount = document.createElement('div');
navMount.id = 'nav-placeholder';
document.body.prepend(navMount);

fetch("nav.html")
  .then(res => res.text())
  .then(html => {
    navMount.innerHTML = html;

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