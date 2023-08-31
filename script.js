'use strict';

const addBookBtn = document.getElementById('add-book');
const addBookDialog = document.getElementById('container');
const closeModal = document.getElementById('close-modal');
const overlay = document.querySelector('.overlay');
const bookshelf = document.querySelector('.bookshelf');

let library = JSON.parse(localStorage.getItem("books")) || [];


addBookBtn.addEventListener('click', () => {
  addBookDialog.showModal();
  overlay.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  addBookDialog.close();
  overlay.style.display = 'none';
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const books = [
  {
    title: 'The Curious Incident of the Dog in the Night-time',
    author: 'Mark Haddon',
    pages: 274,
    read: 'Completed'
  },
  {
    title: 'Book 2',
    author: 'Book Person2',
    pages: 1242,
    read: 'Not Read'
  },
  {
    title: 'Book 3',
    author: 'Book Person3',
    pages: 999,
    read: 'Completed'
  },
  {
    title: 'Book 4',
    author: 'Book Person4',
    pages: 420,
    read: 'Not Read'
  },
  {
    title: 'Book 5',
    author: 'Book Person5',
    pages: 923,
    read: 'Completed'
  },
  {
    title: 'Book 6',
    author: 'Book Person6',
    pages: 251,
    read: 'Not Read'
  },
  {
    title: 'Book 7',
    author: 'Book Person7',
    pages: 6969,
    read: 'Completed'
  },
  {
    title: 'Book 8',
    author: 'Book Person8',
    pages: 519,
    read: 'Completed'
  }
];

function displayBooks() {
  books.forEach(function (book, i) {
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
    readLabel.textContent = `${book.read}`;

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

    updateButton.addEventListener('click', () => {
      if (readLabel.textContent === `Completed`) {
        readLabel.textContent = 'Not Read';
        updateButton.textContent = 'Completed';
        book.read = 'Not Read';
      } else {
        readLabel.textContent = 'Completed';
        updateButton.textContent = 'Not Read';
        book.read = 'Completed';
      };
    });

    deleteButton.addEventListener('click', () => {
      bookshelf.removeChild(bookCard);
      books.splice(i, 1);
      console.log(books);
    });
  });
}

window.addEventListener("load", displayBooks);
