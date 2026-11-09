# Student Portfolio & Academic Planner

A responsive, multi-page portfolio website for a university student, with a working academic planner and a contact form. Built as the practical term project for **COS 106: Introduction to Web Technologies** at MIVA Open University.

**Live site:** https://ibikunle-peace.vercel.app
**Repository:** https://github.com/Pekoder/Ibikunle-Peace-Student-Portfolio

## About the project

The site showcases my profile, skills, and projects, and lets visitors get in touch. It also includes an interactive planner for managing academic tasks.

## Pages

| Page | What it does |
|---|---|
| Home | Welcome message, photo, short bio, and highlights |
| About | Education, career aspirations, technical skills, hobbies, and an audio introduction |
| Projects | Four projects with descriptions, screenshots, and links |
| Planner | Add, complete, and delete tasks, saved in the browser |
| Contact | Form with validation that sends messages to my email |

## Features

- **Responsive design:** works on phones, tablets, and desktops
- **Mobile navigation:** menu button that opens and closes, with the current page highlighted automatically
- **Academic planner:** add tasks, mark them complete, delete them, with a live count of tasks left. Tasks are saved with `localStorage`, so they survive a refresh
- **Contact form validation:** no empty fields, a valid email format, and a phone number containing digits only
- **Email delivery:** valid messages are sent through [Formspree](https://formspree.io)
- **Audio introduction** on the About page
- **Animations and transitions** on buttons, cards, and links

## Built with

- HTML5 (semantic elements, forms, lists, images, hyperlinks, audio)
- CSS3 (external stylesheets, Flexbox, Grid, media queries, transitions)
- JavaScript (DOM manipulation, event handling, arrays, functions, form validation, `fetch`)
- Fonts: Space Grotesk and Inter (Google Fonts)
- Icons: Font Awesome

## Design

| Colour | Hex |
|---|---|
| Paper | `#F6F4F1` |
| Stone | `#E4DED2` |
| Coral | `#F95C4B` |
| Black | `#000000` |

## Project structure

```
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── nav.html
├── css/
├── js/
│   ├── include-nav.js
│   ├── planner.js
│   └── contact.js
└── assets/
```

## Running it locally

The navigation is loaded from `nav.html` with `fetch`, so the site needs a local server. Opening the HTML files by double-clicking may show an empty nav.

1. Clone the repository
2. Open the folder in VS Code
3. Install the **Live Server** extension
4. Right-click `index.html` and choose **Open with Live Server**

## Author

**Ibikunle Peace**
Brand designer and emerging software developer
GitHub: [Pekoder](https://github.com/Pekoder)

## Acknowledgements

Built for COS 106 at MIVA Open University.