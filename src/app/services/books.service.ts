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
  	if(book.photo) {
  		// Récupération d'une référence vers le fichier
  		const storageRef = firebase.storage().refFromURL(book.photo);
  		storageRef.delete().then(
  			() => {
  				console.log('Photo supprimée');
  			}
		).catch(
			(error) => {
				console.log('Fichier non trouvé');
			}
		);
  	}
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


  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        // On réagit à chaque changement d'état du chargement du fichier
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                console.log('Upload successful! ('+downloadUrl+')');
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
}


}
