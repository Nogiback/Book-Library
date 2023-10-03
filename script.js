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

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Storage {
  static getLibrary() {
    let library = [];
    localStorage.getItem('library') === null
      ? (library = [])
      : (library = JSON.parse(localStorage.getItem('library')));
    return library;
  }

  static saveLibrary(library) {
    localStorage.setItem('library', JSON.stringify(library));
  }

  static addBook(book) {
    const library = Storage.getLibrary();
    library.push(book);
    Storage.saveLibrary(library);
  }

  static deleteBook(bookTitle) {
    const library = Storage.getLibrary();
    library.forEach((book, index) => {
      book.title === bookTitle ? library.splice(index, 1) : library;
    });
    Storage.saveLibrary(library);
  }

  static updateReadStatus(bookTitle, status) {
    const library = Storage.getLibrary();
    library.forEach((book) => {
      if (book.title !== bookTitle) {
        return;
      }
      book.read = status;
    });
    Storage.saveLibrary(library);
  }
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
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  addBookToLibrary(
    titleField.value,
    authorField.value,
    pagesField.value,
    readField.value,
  );
  resetBookshelf();
  displayBooks();
  addBookDialog.close();
  overlay.style.display = 'none';
});

document.addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    deleteBook(e.target.parentNode.firstChild.textContent);
  }

  if (e.target.className === 'update') {
    updateReadStatus(e.target);
  }
});

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  Storage.addBook(newBook);
  form.reset();
}

function displayBooks() {
  const library = Storage.getLibrary();

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
    }

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
    }

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

function resetBookshelf() {
  bookshelf.textContent = '';
}

function deleteBook(bookToDelete) {
  Storage.deleteBook(bookToDelete);
  resetBookshelf();
  displayBooks();
}

function updateReadStatus(updateButton) {
  const bookTitle = updateButton.parentNode.firstChild.textContent;

  if (updateButton.textContent === 'Completed') {
    updateButton.textContent = 'Not Read';
    Storage.updateReadStatus(bookTitle, 'Completed');
  } else {
    updateButton.textContent = 'Completed';
    Storage.updateReadStatus(bookTitle, 'Not Read');
  }
  resetBookshelf();
  displayBooks();
}

window.addEventListener('load', displayBooks);
