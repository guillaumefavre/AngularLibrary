import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
  			  private booksService: BooksService,
  			  private router: Router) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm() {
  	this.bookForm = this.formBuilder.group({
  		titleForm: ['', Validators.required],
  		authorForm: ['', Validators.required]
  	});
  }

  onSaveBook() {
  	const title = this.bookForm.get('titleForm').value;
  	const author = this.bookForm.get('authorForm').value;
  	const newBook = new Book(title, author);
  	this.booksService.createNewBook(newBook);
  	this.router.navigate(['/books']);
  }

}
