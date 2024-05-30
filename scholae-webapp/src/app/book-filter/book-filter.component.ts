import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { BookQueryService } from '../services/book-query.service';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {

  isDisplay=false;
  filterForm : FormGroup;
  @Output() isSelected = new EventEmitter();
  @Output() filteredBook = new EventEmitter();
  @Output() filterClose = new EventEmitter();
  constructor(private bookQueryService: BookQueryService) { }

  
  ngOnInit() {
    
    this.filterForm= new FormGroup(
      {
        bookTitle: new FormControl(''),
        bookAuthor: new FormControl(''),
        // bookGenre : new FormControl(''),
        bookContent: new FormControl('')
      },
      
    );
  }
  filterUser(){
    console.log("\n\nIn filterUser() of bookFilterComponent.Going to call backend", this.filterForm.value);
    if (this.filterForm.value.bookAuthor.length != 0 || this.filterForm.value.bookAuthor.Content != 0 || this.filterForm.value.bookTitle.length != 0) {
      // this.httpClient.get('http://localhost:3000/books').subscribe(data => {
      //     console.log("json response", data);
      //     this.filteredBook.emit(data);
      //   });
      this.bookQueryService.getFilteredBooks(this.filterForm.value.bookAuthor, this.filterForm.value.bookContent, this.filterForm.value.bookTitle)
        .subscribe(data => {
          console.log("In filterUser() of bookFilterComponent : ", data);
          if (data.length > 0) {
            this.filteredBook.emit(data);
          }
        }, error => {
          console.log("In filterUser() of bookFilterComponent : ", error);
        });
    }
  }

  toggleDisplay(){
    this.isDisplay=!this.isDisplay;
    this.isSelected.emit(this.isDisplay);
  }
  closeFilter(){
    this.isDisplay=!this.isDisplay;
    this.filterForm.reset();
    this.filterClose.emit(this.isDisplay);
  }

}
