'use strict';

const addBookBtn = document.getElementById('add-book');
const addBookDialog = document.getElementById('container');

addBookBtn.addEventListener('click', () => {
  addBookDialog.showModal();
});

let library = JSON.parse(localStorage.getItem("books")) || [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

