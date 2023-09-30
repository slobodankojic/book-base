import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retryWhen } from 'rxjs';
import { Book, BookSearchResult } from '../model/book.model';
import { Review } from '../model/review.model';

const baseURL: string = 'http://localhost:3000/api/books';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getAllBooks(params?: any): Observable<BookSearchResult> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('page', params.page)
          .set('pageSize', params.pageSize)
          .set('filter', params.filter && JSON.stringify(params.filter)),
      };
    }
    return this.httpClient.get(baseURL, options).pipe(
      map((data: any) => {
        return new BookSearchResult(data);
      })
    );
  }

  getOneBook(bookId: number): Observable<Book> {
    return this.httpClient.get(`${baseURL}/${bookId}`).pipe(
      map((data: any) => {
        return new Book(data);
      })
    );
  }

  addNewBook(book: Book): Observable<Book> {
    return this.httpClient.post(baseURL, book).pipe(
      map((data: any) => {
        return new Book(data);
      })
    );
  }

  getBookReviews(bookId: number): Observable<Review[]> {
    return this.httpClient.get(`${baseURL}/${bookId}/reviews`).pipe(
      map((data: any) => {
        return data && data.map((elem: any) => new Review(elem));
      })
    );
  }

  deleteReview(review: Review): Observable<Review> {
    return this.httpClient
      .delete(`http://localhost:3000/api/reviews/${review._id}`)
      .pipe(
        map((data: any) => {
          return new Review(data);
        })
      );
  }

  editBook(book: Book): Observable<Book> {
    return this.httpClient.put(`${baseURL}/${book._id}`, book).pipe(
      map((data: any) => {
        return new Book(data);
      })
    );
  }
}
