import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { BookService } from '../services/book.service';
import { RecommendationService } from '../services/recommendation.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public book: any;
  @Input() public showProgress: boolean;
  @Input() public dashboardTabIndex: number;

  isFavourite: boolean;
  read: boolean;
  tracking: number;
  bookReadingTime: number;

  constructor(public httpClient: HttpClient,
    private recommendationService: RecommendationService,
    private router: Router,
    private bookService: BookService,
    private dialog: MatDialog) { }

  ngOnInit() {
    //Calculating suggested book reading time
    this.bookReadingTime = Math.round(this.book.totalPage*2.5/60);
    if (this.showProgress) {
      //First check if user has already completed book so as to handle progress tracker accordingly and 
      // also not call returnUserProgress which throws null pointer exception for completedBooks

      this.recommendationService.checkIfUserCompletedBook(sessionStorage.getItem("userName"), this.book.bookTitle)
        .subscribe(data => {
          console.log("checkIfUserCompletedBook() successful (from ngOnInit() of cardComponent) : ", data);
          if (data === "User has completed book") {
            this.tracking = 100;
          }
          else if (data === "Not completed book") {
            //Getting progress for all the other books that are not completed and are currently in reading.
            this.recommendationService.returnUserProgress(sessionStorage.getItem("userName"), this.book.bookTitle)
              .subscribe(data => {
                console.log("getUserProgressPageNumber() successful (called for calculating tracker) : ", data);
                this.tracking = (data / this.book.totalPage) * 100;
                console.log("\nTotal Pages : ", this.book.totalPage, "  Current Progress : ", data, "  Tracker : ", this.tracking);
              }, error => {
                console.log("getUserProgressPageNumber() failed (called for calculating tracker) : ", error);
                if (error.status === 200) {
                  console.log("getUserProgressPageNumber() works(called for calculating tracker).Just json parse error");

                }
                else {
                  console.log("getUserProgressPageNumber() actually fails (called for calculating tracker)");
                }
              });
          }
        }, error => {
          console.log("checkIfUserCompletedBook() failed (from ngOnInit() of cardComponent) : ", error);
          if (error.status === 200) {
            console.log("checkIfUserCompletedBook() actually works. Just json parse error.(from ngOnInit() of cardComponent)");
            if (error.error.text === "User has completed book") {
              this.tracking = 100;
            }
            else if (error.error.text === "Not completed book") {
              //Getting progress for all the other books that are not completed and are currently in reading.
              this.recommendationService.returnUserProgress(sessionStorage.getItem("userName"), this.book.bookTitle)
                .subscribe(data => {
                  console.log("getUserProgressPageNumber() successful (called for calculating tracker) : ", data);
                  this.tracking = (data / this.book.totalPage) * 100;
                  console.log("\nTotal Pages : ", this.book.totalPage, "  Current Progress : ", data, "  Tracker : ", this.tracking);
                }, error => {
                  console.log("getUserProgressPageNumber() failed (called for calculating tracker) : ", error);
                  if (error.status === 200) {
                    console.log("getUserProgressPageNumber() works(called for calculating tracker).Just json parse error");

                  }
                  else {
                    console.log("getUserProgressPageNumber() actually fails (called for calculating tracker)");
                  }
                });
            }
          }
          else {
            console.log("checkIfUserCompletedBook() actually failed.(from ngOnInit() of cardComponent)");
          }
        });
    }

    this.recommendationService.checkIfFavourite(sessionStorage.getItem("userName"), this.book.bookTitle)
      .subscribe(data => {
        // console.log("checkIfFavourite passes from ngOnInit() : ", data);
        if (data === "Book is favourite") {
          this.isFavourite = true;
        }
        else {
          this.isFavourite = false;
        }
      }, error => {
        // console.log("checkIfFavourite fails from ngOnInit() : ", error);
        if (error.status === 200) {
          // console.log("checkIfFavourite passes from ngOnInit(). Just a json parse error");
          if (error.error.text === "Book is favourite") {
            this.isFavourite = true;
          }
          else {
            this.isFavourite = false;
          }
        }
        else {
          // console.log("checkIfFavourite actually fails");
        }
      });
  }

  readBook(bookUrl: string, bookTitle: string) {
    // console.log("\n\nPrinting index of dashboard tab from which book card is opened : ", this.dashboardTabIndex);
    // console.log("\n\nTab: Home(Index : 0) | Tab: Reading(Index : 1) | Tab: Recommendation(Index : 2)")
    console.log("In readBook() : ", bookUrl);
    this.recommendationService.updateBookViews(bookTitle).subscribe(data => {
      console.log("UpdateBookViews successful : ", data);
    }, error => {
      console.log("UpdateBookViews failed : ", error);
      if (error.status === 202) {
        console.log("UpdateBookViews actually works.Just json parse error ");
      }
      else {
        console.log("UpdateBookViews actually fails");
      }
    });

    //To prevent multiple relationships. Call addToRead only if book not completed.Rest backend takes care of.
    this.recommendationService.checkIfUserCompletedBook(sessionStorage.getItem("userName"), bookTitle)
      // this.recommendationService.checkIfUserCompletedBook("RaviBansal@kidsjoyment.com", bookTitle)
      .subscribe(data => {
        console.log("checkIfUserCompletedBook success on click of Read Book : ", data);
        if (data === "Not completed book") {
          // this.recommendationService.addToRead("RaviBansal@kidsjoyment.com", bookTitle).subscribe(data => {
          this.recommendationService.addToRead(sessionStorage.getItem("userName"), bookTitle).subscribe(data => {
            console.log("AddBookToReading successful : ", data);
          },
            error => {
              console.log("AddBookToReading failed : ", error);
              if (error.status === 201) {
                console.log("AddBookToReading works. Just json parse error");
              }
              else {
                console.log("AddBookToReading has actually failed");
              }
            });
        }
      }, error => {
        console.log("checkIfUserCompletedBook fails on click of Read Book : ", error);
        if (error.status === 200) {
          if (error.error.text === "Not completed book") {
            // this.recommendationService.addToRead("RaviBansal@kidsjoyment.com", bookTitle).subscribe(data => {
            this.recommendationService.addToRead(sessionStorage.getItem("userName"), bookTitle).subscribe(data => {
              console.log("AddBookToReading successful : ", data);
            },
              error => {
                console.log("AddBookToReading failed : ", error);
                if (error.status === 201) {
                  console.log("AddBookToReading works. Just json parse error");
                }
                else {
                  console.log("AddBookToReading has actually failed");
                }
              });
          }
        }
        else {
          console.log("checkIfUserCompletedBook actually fails on click of Read Book");
        }
      });
    this.router.navigate(["/readbook", bookUrl, bookTitle]);
    // this.router.navigate(["/readbook"]);
  }

  filterBooks(event) {
    console.log("In filterBooks() of bookCardComponent : ", event);
    this.book = event;
  }

  downloadBook(bookUrl: string, bookTitle: string) {
    fetch(bookUrl).then(x => x.blob()).then(b => {
      const url = window.URL.createObjectURL(b);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "display: none";
      a.href = url;
      a.download = bookTitle + ".pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    })
    this.recommendationService.updateBookDownloads(bookTitle).subscribe(data => {
      console.log("BookDownloadCounterUpdate success : ", data);
      this.book.totalDownloads = this.book.totalDownloads + 1;
    }, error => {
      console.log("BookDownloadCounterUpdate failed : ", error);
      if (error.status === 202) {
        console.log("DownloadCounterUpdate works. Just the json parse error");
        this.book.totalDownloads = this.book.totalDownloads + 1;
      }
      else {
        console.log("DownloadCounterUpdate actually fails.");
      }
    });

    // this.bookService.downloadBook(bookUrl, bookTitle).subscribe(data => {
    //   console.log("On success of downloadBook() :", data);
    //   this.openDialog();
    //   this.recommendationService.updateBookDownloads(bookTitle).subscribe(data => {
    //     console.log("BookDownloadCounterUpdate success : ", data);
    //     this.book.totalDownloads = this.book.totalDownloads + 1;
    //   }, error => {
    //     console.log("BookDownloadCounterUpdate failed : ", error);
    //     if (error.status === 202) {
    //       console.log("DownloadCounterUpdate works. Just the json parse error");
    //       this.book.totalDownloads = this.book.totalDownloads + 1;
    //     }
    //     else {
    //       console.log("DownloadCounterUpdate actually fails.");
    //     }
    //   });

    // }, error => {
    //   console.log("On failure of downloadBook() ", error);
    //   if (error.status === 200) {
    //     console.log("Book download works. Just json parse error");
    //     this.openDialog();
    //     this.recommendationService.updateBookDownloads(bookTitle).subscribe(data => {
    //       console.log("BookDownloadCounterUpdate success : ", data);
    //       this.book.totalDownloads = this.book.totalDownloads + 1;
    //     }, error => {
    //       console.log("BookDownloadCounterUpdate failed : ", error);
    //       if (error.status === 202) {
    //         console.log("DownloadCounterUpdate works. Just the json parse error");
    //         this.book.totalDownloads = this.book.totalDownloads + 1;
    //       }
    //       else {
    //         console.log("DownloadCounterUpdate actually fails.");
    //       }
    //     });
    //   }
    // });
  }

  openDialog() {
    // this.dialog.open(DialogBoxComponent);
    const dialogForUpdate = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: "Book Downloaded Successfully"
    });
    dialogForUpdate.afterClosed().subscribe(result => {

    });
  }

  toggleFavourites(bookTitle: string) {
    this.recommendationService.checkIfFavourite(sessionStorage.getItem("userName"), bookTitle)
      .subscribe(data => {
        console.log("Check if favourites successful : ", data);
        if (data === "Book is favourite") {
          this.recommendationService.removeFromFavourites(sessionStorage.getItem("userName"), bookTitle)
            .subscribe(data => {
              this.isFavourite = false;
              console.log("Remove from favourites successful : ", data);
            }, error => {
              console.log("Remove from favourites failed : ", error);
              if (error.status === 201) {
                console.log("Remove from favourites successful (just json parse error)");
                this.isFavourite = false;
              }
              else {
                console.log("Remove from favourites failed");
              }
            });
        }
        else if (data === "Not favourite") {
          this.recommendationService.addToFavourites(sessionStorage.getItem("userName"), bookTitle)
            .subscribe(data => {
              this.isFavourite = true;
              console.log("Add to favourites successful : ", data);
            }, error => {
              console.log("Add to favourites failed : ", error);
              if (error.status === 201) {
                console.log("Add to favourites successful (just json parse error) ");
                this.isFavourite = true;
              }
              else {
                console.log("Add to favourites failed.");
              }
            });
        }
      }, error => {
        console.log("check if favourites failed : ", error)
        if (error.status === 200) {
          console.log("check If Favourites works.Just a json parse error");
          if (error.error.text === "Book is favourite") {
            this.recommendationService.removeFromFavourites(sessionStorage.getItem("userName"), bookTitle)
              .subscribe(data => {
                this.isFavourite = false;
                console.log("Remove from favourites successful : ", data);
              }, error => {
                console.log("Remove from favourites failed : ", error);
                if (error.status === 201) {
                  console.log("Remove from favourites successful (just json parse error)");
                  this.isFavourite = false;
                }
                else {
                  console.log("Remove from favourites failed");
                }
              });
          }
          else if (error.error.text === "Not favourite") {
            this.recommendationService.addToFavourites(sessionStorage.getItem("userName"), bookTitle)
              .subscribe(data => {
                this.isFavourite = true;
                console.log("Add to favourites successful : ", data);
              }, error => {
                console.log("Add to favourites failed : ", error);
                if (error.status === 201) {
                  console.log("Add to favourites successful (just json parse error) ");
                  this.isFavourite = true;
                }
                else {
                  console.log("Add to favourites failed.");
                }
              });
          }
        }
      });
  }

}
