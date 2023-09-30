import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    ISBN: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    yearOfPublication: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
  });

  get ISBN() {
    return this.form.get('ISBN');
  }
  get title() {
    return this.form.get('title');
  }
  get author() {
    return this.form.get('author');
  }
  get yearOfPublication() {
    return this.form.get('yearOfPublication');
  }
  get publisher() {
    return this.form.get('publisher');
  }

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  bookId: number = 0;
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.bookId = params['id'];
      this.getOneBook();
    });
  }

  onSubmit() {
    let newBook = new Book();
    newBook.ISBN = this.form.value.ISBN;
    newBook.title = this.form.value.title;
    newBook.author = this.form.value.author;
    newBook.yearOfPublication = this.form.value.yearOfPublication;
    newBook.publisher = this.form.value.publisher;

    if (this.bookId) {
      newBook._id = this.bookId;
      this.bookService.editBook(newBook).subscribe({
        next: (response: Book) => {
          this.router.navigate(['/books', newBook._id]);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.bookService.addNewBook(newBook).subscribe({
        next: (response: Book) => {
          console.log('Book successfully added');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  getOneBook() {
    this.bookService.getOneBook(this.bookId).subscribe({
      next: (response: Book) => {
        let book: Book = new Book(response);
        this.form.patchValue(book);
      },
    });
  }
}
