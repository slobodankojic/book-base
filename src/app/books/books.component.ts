import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookSearchResult } from '../model/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  searchType: string = 'title';
  searchTerm: string = '';
  books: BookSearchResult = new BookSearchResult();
  displayedBooks: number = 10;

  constructor(private bookService: BookService) {}

  params = {
    page: 1,
    pageSize: 10,
    filter: {
      author: '',
      title: '',
    },
  };

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.params.pageSize = this.displayedBooks;
    this.bookService.getAllBooks(this.params).subscribe({
      next: (response: BookSearchResult) => {
        this.books.results = this.books.results.concat(response.results);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  searchBooks() {
    if (this.searchType === 'title') {
      this.params.filter.title = this.searchTerm;
      this.params.filter.author = '';
    } else if (this.searchType === 'author') {
      this.params.filter.author = this.searchTerm;
      this.params.filter.title = '';
    }
    this.params.page = 1;
    this.getAllBooks();
  }

  loadMoreBooks() {
    this.params.page++;
    this.getAllBooks();
  }

  loadLessBooks() {
    this.displayedBooks -= 10;

    if (this.displayedBooks < 10) {
      this.displayedBooks = 10;
    }
    this.params.page = 1;

    this.books.results = [];
    this.getAllBooks();
  }
}
