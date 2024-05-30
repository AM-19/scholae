import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { NlpService } from '../services/nlp.service';
import { RecommendationService } from '../services/recommendation.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.css']
})
export class BookContainerComponent implements OnInit {

  searchForm: FormGroup;
  isSearch = true;
  errorMessage = "";
  allBooks: any;
  readingBooks: any;
  recommendationBooks: any;
  selectedIndex: number = 0;
  mostViewedBooks: any;
  showSpinner: boolean = true;
  showRecommendationSpinner: boolean = true;
  showReadingSpinner: boolean = true;

  constructor(private httpClient: HttpClient,
    private nlpService: NlpService,
    private recommendationService: RecommendationService) { }

  ngOnInit() {
    this.getAllBooks();
    // this.httpClient.get('http://localhost:3000/books').subscribe(data => {
    //   console.log("json response", data);
    //   this.allBooks = data;
    //   this.showSpinner = false;
    // });

    this.searchForm = new FormGroup(
      {
        searchBar: new FormControl('')
      }
    );

  }

  getAllBooks() {
    this.recommendationService.getAllBooksInDatabase().subscribe(data => {
      console.log("getAllBooksinDatbase() successful : ", data);
      this.allBooks = data;
      this.showSpinner = false;
    }, error => {
      console.log("getAllBooksinDatbase() failed : ", error);
      this.showSpinner = false;
      if (error.status === 200) {
        console.log("getAllBooksinDatbase() works.Just json parse error.");
        // complete this one according to error
        // this.allBooks = data;
        this.showSpinner = false;
      }
      else {
        console.log("getAllBooksinDatbase() actually fails.");
      }
    });
  }

  onSearch() {
    console.log("\n\n\nOn Click of Search ", this.searchForm.value);

    //Handling the empty search bar case
    if (this.searchForm.value.searchBar.length > 0) {
      // this.httpClient.get('http://localhost:3000/books').subscribe(data => {
      //   console.log("json response", data);
      //   this.allBooks = data;
      //   this.selectedIndex = 0;  // displays results on home component
      // });
      this.nlpService.nlpFilter(this.searchForm.value.searchBar).subscribe(data => {
        console.log("On NlPService search() success : ", data);
        // if (data.length > 0) {
        this.allBooks = data;
        this.errorMessage = "";
        this.selectedIndex = 0;  // displays results on home component
        // }
        // else {
        //   this.errorMessage = "No books found";
        // }
      }, error => {
        console.log("On NlPService search() failure : ", error);
      });
    }
  }


  clearSearch() {
    this.searchForm.reset();
    this.getAllBooks();
  }
  closeSearch(value) {
    this.isSearch = !value;
    if (!this.isSearch) {
      this.searchForm.reset();
    }
  }

  filterBooks(event) {
    console.log("In filterBooks() of bookCardComponent (Output of filteredBooks results from filterbookcomponent) : ", event);
    this.allBooks = event;
    this.selectedIndex = 0;  // displays results on home component
  }

  closeFilter(event) {
    console.log("In closeFilter() of bookcardComponent : ", event);
    this.isSearch = !event;
    this.getAllBooks();
  }
  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    console.log("\n\nCurrent Tab : ", tab);

    if (tab === "home") {
      this.getAllBooks();
      this.showReadingSpinner = true;
      this.showRecommendationSpinner = true;
      console.log("\n\nIn Home Tab : ", event.index);
    }
    if (tab === "reading") {
      this.getBooksInProgress();
      this.showSpinner = true;
      this.showRecommendationSpinner = true;
      console.log("\n\nIn Reading Tab : ", event.index);
    }
    if (tab === "recommended") {
      this.getUserBookRecommendations();
      this.showSpinner = true;
      this.showReadingSpinner = true;
      this.getMostViewedBooks();
      console.log("\n\nIn Recommendation Tab : ", event.index);
    }
  }

  getBooksInProgress() {
    this.recommendationService.getBooksUserIsReading(sessionStorage.getItem("userName"))
      .subscribe(data => {
        console.log("getUserInProgressBooks() successful (calling from dashboard tab2) : ", data);
        this.readingBooks = data;
        this.showReadingSpinner = false;
      }, error => {
        this.showReadingSpinner = false;
        console.log("getUserInProgressBooks() failed (calling from dashboard tab2) : ", error);
        if (error.status === 200) {
          console.log("getUserInProgressBooks() works.Just json parse error(calling from dashboard tab2).");
          // complete this one according to error
          // this.readingBooks = data;
        }
        else {
          console.log("getUserInProgressBooks() actually fails.(calling from dashboard tab2)");
        }
      });

    //Getting completed books
    this.recommendationService.getBooksUserHasCompleted(sessionStorage.getItem("userName"))
      .subscribe(data => {
        console.log("getUserCompletedBooks() successful (calling from dashboard tab2) : ", data);
        let completedBook;
        for (completedBook of data) {
          this.readingBooks.push(completedBook);
        }
      }, error => {
        console.log("getUserCompletedBooks() failed (calling from dashboard tab2) : ", error);
        if (error.status === 200) {
          console.log("getUserCompletedBooks() works.Just json parse error (calling from dashboard tab2).");
          // complete this one according to error
          // let completedBook;
          // for( completedBook of data){
          //   this.readingBooks.push(completedBook);
          // }
        }
        else {
          console.log("getUserCompletedBooks() actually fails.(calling from dashboard tab2)");
        }
      });
  }

  getUserBookRecommendations() {
    this.recommendationService.getAllRecommendations(sessionStorage.getItem("userName"))
      .subscribe(data => {
        console.log("getAllRecommendations() successful : ", data);
        this.recommendationBooks = data;
        this.showRecommendationSpinner = false;
      }, error => {
        this.showRecommendationSpinner = false;
        console.log("getAllRecommendations() failed : ", error);
        if (error.status === 200) {
          console.log("getAllRecommendations() works.Just json parse error.");
          // complete this one according to error
          // this.allBooks = data;
        }
        else {
          console.log("getAllRecommendations() actually fails.");
        }
      });
  }

  getMostViewedBooks() {
    this.recommendationService.getMostViewedBooks()
      .subscribe(data => {
        console.log("getMostViewedBooks() successful : ", data);
        this.mostViewedBooks = data;
        this.showRecommendationSpinner = false;
      }, error => {
        this.showRecommendationSpinner = false;
        console.log("getMostViewedBooks() failed : ", error);
        if (error.status === 200) {
          console.log("getMostViewedBooks() works.Just json parse error.");
          // complete this one according to error
          // this.allBooks = data;
        }
        else {
          console.log("getMostViewedBooks() actually fails.");
        }
      });
  }
}
