A simple and interactive to-do app built with modular JavaScript, BEM-style CSS, and reusable UI components. The app lets users create tasks, mark them complete or incomplete, and delete them, with all behavior handled through ES6 classes.

Features

- Renders an initial list of to-dos on page load
- Adds new tasks through a popup form or by pressing Enter
- Marks tasks as completed and uncompleted
- Deletes tasks cleanly
- Generates unique IDs with the uuid package
- Uses accessible labels, alt text, and hover states
- Closes the popup when clicking the overlay or pressing Escape
- Updates the task counter automatically

Tech & Structure
Technologies used:

- HTML5, CSS3, BEM
- Vanilla JavaScript (ES6 classes and modules)
- Prettier for formatting
- normalize.css for consistent styling

Project structure:

- blocks/ — BEM block CSS files
- components/ — Todo, FormValidator, Section, PopupWithForms, TodoCounter
- utils/constants.js — shared data and configuration
- vendor/ — normalize.css, Popup.js, fonts.css, fonts/
- pages/index.css
- images/
- index.html
- .prettierignore, .gitignore
- README.md

GitHub Pages
https://github.com/yubiman123
