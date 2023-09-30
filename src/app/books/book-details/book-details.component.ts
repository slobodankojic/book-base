import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { Review } from 'src/app/model/review.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();
  bookId: number = 0;
  reviews: Review[] = [];

  details: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
      this.getOneBook();
      this.getBookReviews();
    });
  }

  getOneBook() {
    this.bookService.getOneBook(this.bookId).subscribe({
      next: (response: Book) => {
        this.book = response;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getBookReviews() {
    this.bookService.getBookReviews(this.bookId).subscribe({
      next: (response: Review[]) => {
        this.reviews = response;
      },
    });
  }


  deleteReview(review: Review) {
    this.bookService.deleteReview(review).subscribe({
      next: (response: Review) => {
        console.log('Review successfully deleted');
        this.getOneBook();
        this.getBookReviews();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
