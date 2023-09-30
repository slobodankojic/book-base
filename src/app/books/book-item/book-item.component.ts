import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnInit {
  @Input () book: Book = new Book();
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
