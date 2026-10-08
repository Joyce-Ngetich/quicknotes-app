# QuickNotes App

QuickNotes is a lightweight, responsive web application designed for fast and seamless personal note-taking directly in your browser.

## Features

- **Categorized Notes**: Organize entries under Personal, Work, or Study tags with distinct visual coding.
- **Live Search**: Instantly filter through saved notes in real time using the search bar.
- **Client-Side Persistence**: Notes automatically save to `localStorage` and remain intact across page reloads.
- **Input Validation**: Enforces note requirements and limits entries to 200 characters with clear error alerts.
- **Responsive Design**: Styled using Flexbox with a mobile-first media query for seamless mobile viewing.
- **Clear All Option**: Optional one-click wipe feature with built-in confirmation safety.

## How to Run Locally

1. Clone this repository or download the source files.
2. Open the project root directory.
3. Double-click `index.html` or open it with any modern web browser (e.g., Chrome, Firefox, Safari, Edge).

## What I Learned

1. **DOM Manipulation & Security**: Learned to dynamically construct elements using `createElement` and use `textContent` instead of `innerHTML` to prevent cross-site scripting (XSS) risks with user input.
2. **State Management**: Built a single source of truth (`notes` array) and decoupled UI updates by routing all actions through a centralized `render()` loop.
3. **Browser Storage Serialization**: Implemented persistent client-side data storage using `localStorage` alongside `JSON.stringify` and `JSON.parse`.
