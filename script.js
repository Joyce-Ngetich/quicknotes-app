// DOM Element Selections
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

const STORAGE_KEY = "quicknotes_app_data";

// Notes Data Array
let notes = loadNotes();

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Render Function
function render() {
  notesList.innerHTML = "";
  const query = searchInput.value.toLowerCase().trim();

  // Filter notes by search query
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query),
  );

  // Update Note Count Indicator
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

  // Display empty search results state
  if (filteredNotes.length === 0 && notes.length > 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "No notes match your search.";
    emptyLi.style.color = "#64748b";
    emptyLi.style.padding = "8px 0";
    notesList.appendChild(emptyLi);
    return;
  }

  // Render Note Items using safe textContent
  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note-item");

    // Add category class for distinct styling
    const catClass = `category-${note.category.toLowerCase()}`;
    li.classList.add(catClass);

    // Left Container: Text & Metadata
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("note-content");

    const textP = document.createElement("p");
    textP.classList.add("note-text");
    textP.textContent = note.text; // Prevents XSS

    const metaDiv = document.createElement("div");
    metaDiv.classList.add("note-meta");

    const categorySpan = document.createElement("span");
    categorySpan.classList.add("note-category-tag");
    categorySpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(categorySpan);
    metaDiv.appendChild(dateSpan);

    contentDiv.appendChild(textP);
    contentDiv.appendChild(metaDiv);

    // Right Container: Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// Add Note Function
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  saveNotes();
  render();
}

// Delete Single Note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Form Submit Handler
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear validation message if successful
  errorMessage.textContent = "";

  addNote(text, noteCategory.value);
  noteInput.value = "";
  noteInput.focus();
});

// Search Input Handler
searchInput.addEventListener("input", render);

// Bonus Feature: Clear All Notes
if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    if (notes.length === 0) return;
    if (confirm("Delete all notes?")) {
      notes = [];
      saveNotes();
      render();
    }
  });
}

// Initial Render on Page Load
render();
