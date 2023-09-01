const addBookBtn = document.getElementById('add-book');
const addBookDialog = document.getElementById('container');
const closeModal = document.getElementById('close-modal');
const submitBtn = document.querySelector('#submit-btn');
const form = document.querySelector('#form');
const overlay = document.querySelector('.overlay');
const bookshelf = document.querySelector('.bookshelf');

const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
const pagesField = document.querySelector('#pages');
const readField = document.querySelector('#read');

let library = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };
}

Book.prototype.pushBook = function() {
  library.push(this);
}

addBookBtn.addEventListener('click', () => {
  addBookDialog.showModal();
  titleField.focus();
  overlay.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  addBookDialog.close();
  overlay.style.display = 'none';
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary(titleField.value, authorField.value, pagesField.value, readField.value);
  resetBookshelf();
  displayBooks();
  addBookDialog.close();
  overlay.style.display = 'none';
});

document.addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    deleteBook(e.target);
  };

  if(e.target.className === 'update') {
    updateReadStatus(e.target);
  };

});

function addBookToLibrary (title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  newBook.pushBook();
  form.reset();
}

function displayBooks() {
  if (library.length === 0) {
    let emptyMessage = document.createElement('h1');
    emptyMessage.classList.add('empty');
    emptyMessage.textContent = `Your library is currently empty. Click 'Add Book' to begin...`;
    bookshelf.appendChild(emptyMessage);
  }

  library.forEach(function (book, i) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.setAttribute('data-index', `${i}`);

    let titleLabel = document.createElement('h3');
    titleLabel.textContent = `${book.title}`;
    if (book.title.length > 20) {
      titleLabel.style.fontSize = '1rem';
    };
    
    let authorLabel = document.createElement('h4');
    authorLabel.textContent = `by: ${book.author}`;

    let pagesLabel = document.createElement('h4');
    pagesLabel.textContent = `Pages: ${book.pages}`;

    let readLabel = document.createElement('h4');
    readLabel.textContent = `Status: ${book.read}`;

    let updateButton = document.createElement('button');
    updateButton.classList.add('update');
    if (book.read === 'Completed') {
      updateButton.textContent = 'Not Read';
    } else {
      updateButton.textContent = 'Completed';
    };
    
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete Book';

    bookCard.appendChild(titleLabel);
    bookCard.appendChild(authorLabel);
    bookCard.appendChild(pagesLabel);
    bookCard.appendChild(readLabel);
    bookCard.appendChild(updateButton);
    bookCard.appendChild(deleteButton);
    bookshelf.appendChild(bookCard);
  });
}

function resetBookshelf () {
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.firstChild);
  };
}

function deleteBook (deleteButton) {
  let index = deleteButton.parentNode.getAttribute('data-index');
  library.splice(index, 1);
  resetBookshelf();
  displayBooks();
}

function updateReadStatus(updateButton) {
  let index = updateButton.parentNode.getAttribute('data-index');
  if (library[index].read === 'Completed') {
    library[index].read = 'Not Read';
    updateButton.textContent = 'Completed';
  } else {
    library[index].read = 'Completed';
    updateButton.textContent = 'Not Read';
  };
  resetBookshelf();
  displayBooks();
}

window.addEventListener('load', displayBooks);