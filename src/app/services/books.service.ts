import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();


  constructor() { }

  // Emet le contenu de l'array books à travers le subject
  emitBooks() {
  	this.booksSubject.next(this.books);
  }

  saveBooks() {
  	// Enregistrement de l'array books dans le noeud /books
  	firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
  	firebase.database().ref('/books')
  		.on('value', (data) => {
  			this.books = data.val() ? data.val() : [];
  			this.emitBooks();
  		});
  }

  getSingleBook(id: number) {
  	return new Promise(
  		(resolve, reject) => {
  			firebase.database().ref('/books/' +id).once('value').then(
  				(data) => {
  					resolve(data.val());
  				}, (error) => {
  					reject(error);
  				}
			);
  		}
	);
  }

  createNewBook(newBook: Book) {
  	this.books.push(newBook);
  	this.saveBooks();
  	this.emitBooks();
  }

  removeBook(book: Book) {
  	const bookIndexToRemove = this.books.findIndex(
  		(bookElem) => {
  			if(bookElem === book) {
  				return true;
  			}
  		}
	);
	this.books.splice(bookIndexToRemove, 1);
	this.saveBooks();
  	this.emitBooks();
  }


}
