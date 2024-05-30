import { Component, OnInit } from '@angular/core';
// import { PDFDocumentProxy } from 'ng2-pdf-viewer/src/app/pdf-viewer/pdf-viewer.module';
import { MatDialog } from '@angular/material';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { BookService } from '../services/book.service';
import { RecommendationService } from '../services/recommendation.service';
//import { PDFDocumentProxy } from 'ng2-pdf-viewer/src/app/pdf-viewer/pdf-viewer.module';
import Speech from 'speak-tts';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private bookService: BookService,
    private recommendationService: RecommendationService,
    private router: Router) { }

  public pageVariable = 1;
  public totalPage: number;
  pdfsrc: string = '';
  bookPdf: string = "";
  vol: number;
  first: number;
  bookTitle: string;
  completeButtonText: string = "Mark as Complete";
  isCompleteDisabled: boolean = false;
  markCompleted: string = "incomplete";
  speech = new Speech();
  bookDescription: string;

  ngOnInit() {
    this.vol = 1;
    this.first = 1;
    this.bookPdf = this.activateRoute.snapshot.params.bookUrl;
    this.bookTitle = this.activateRoute.snapshot.params.bookTitle;
    // this.bookPdf = "https://cgi-pe-scholae-bucket.s3.ap-south-1.amazonaws.com/2020-12-01T11%3A05%3A11.187168_Teams+install+%26+sign+in+GROUPINFRA.pdf";
    console.log("\n\n\nIn read book component : ", this.bookPdf);
    this.pdfsrc = "https://tika-elas-s3.s3.amazonaws.com/2020-11-25T06%3A33%3A09.922422_Teams%20install%20%26%20sign%20in%20GROUPINFRA.pdf";

    console.log("\n\n\nCheck If User Reading started (in read book ngOnInit()).");
    // this.recommendationService.checkIfUserIsReadingBook("RaviBansal@kidsjoyment.com", this.bookTitle)
    this.recommendationService.checkIfUserIsReadingBook(sessionStorage.getItem("userName"), this.bookTitle)
      .subscribe(data => {
        console.log("checkIfUserReadingBook successful (in read book ngOnInit()) : ", data);
        if (data === "User is reading book") {
          console.log("\n\nUser is reading book.Now getting the current progress (in read book ngOnInit())");
          // this.recommendationService.returnUserProgress("RaviBansal@kidsjoyment.com", this.bookTitle)
          this.recommendationService.returnUserProgress(sessionStorage.getItem("userName"), this.bookTitle)
            .subscribe(data => {
              console.log("Return user progress successful (in read book ngOnInit()) : ", data);
              this.pageVariable = data;
            }, error => {
              console.log("Return user progress failed (in read book ngOnInit()) : ", error);
              if (error.status === 200) {
                console.log("Return user progress works. Just the json parse error (in read book ngOnInit())");
              }
              else {
                console.log("Return user progress actually fails (in read book ngOnInit())");
              }
            });
        }
        else {
          this.pageVariable = 1;
        }
      }, error => {
        console.log("checkIfUserReadingBook failed (in read book ngOnInit()) : ", error);
        if (error.status === 200) {
          console.log("checkIfUserReadingBook works.Just the json parse error. (in read book ngOnInit())");
          if (error.error.text === "User is reading book") {
            console.log("\n\nUser is reading book.Now getting the current progress (in read book ngOnInit())");
            // this.recommendationService.returnUserProgress("RaviBansal@kidsjoyment.com", this.bookTitle)
            this.recommendationService.returnUserProgress(sessionStorage.getItem("userName"), this.bookTitle)
              .subscribe(data => {
                console.log("Return user progress successful (in read book ngOnInit()) : ", data);
                this.pageVariable = data;
              }, error => {
                console.log("Return user progress failed (in read book ngOnInit()) : ", error);
                if (error.status === 200) {
                  console.log("Return user progress works. Just the json parse error (in read book ngOnInit())");
                }
                else {
                  console.log("Return user progress actually fails (in read book ngOnInit())");
                }
              });
          }
          else {
            this.pageVariable = 1;
          }
        }
        else {
          console.log("checkIfUserReadingBook actually fails (in read book ngOnInit()).");
        }
      });

    // this.recommendationService.checkIfUserCompletedBook("RaviBansal@kidsjoyment.com", this.bookTitle)
    this.recommendationService.checkIfUserCompletedBook(sessionStorage.getItem("userName"), this.bookTitle)
      .subscribe(data => {
        console.log("checkIfUserCompletedBook() successful : ", data);
        if (data === "User has completed book") {
          this.completeButtonText = "Completed";
          this.isCompleteDisabled = true;
          this.markCompleted = "complete";
        }
        else if (data === "Not completed book") {
        }
      }, error => {
        console.log("checkIfUserCompletedBook() failed : ", error);
        if (error.status === 200) {
          console.log("checkIfUserCompletedBook() actually works. Just json parse error");
          if (error.error.text === "User has completed book") {
            this.completeButtonText = "Completed";
            this.isCompleteDisabled = true;
            this.markCompleted = "complete";
          }
          else if (error.error.text === "Not completed book") {
          }
        }
        else {
          console.log("checkIfUserCompletedBook() actually failed");
        }
      });
  }

  callBackFn(pdf: PDFDocumentProxy) {
    this.totalPage = pdf.numPages;
  }

  openDialog() {
    if(this.vol === 0){
      this.stopAudio();
    }
    console.log("\n\n\nBook Title : ", this.bookTitle);
    const dialogForUpdate = this.dialog.open(AddNoteDialogComponent, {
      width: '700px',
      data: {
        bookTitle: this.bookTitle
      }
    });
    dialogForUpdate.afterClosed().subscribe(result => {

    });
  }

  startAudio(){
    this.vol = 0;
    this.first = 0;
    this.recommendationService.getBookDescription(this.bookTitle).subscribe( data => {
      console.log("GetBookDescription in readBookUi successful : ");
      this.bookDescription = data;
    }, error => {
      if(error.status === 200){
        console.log("GetBookDescription works.Just the json parse error");
        this.bookDescription = error.error.text;
      }
      else{
        console.log("GetBookDescription in readBookUi actually fails");
      }
    })
    this.speech.speak({
      text: this.bookDescription,
    }).then(() => {
      console.log("Success !");
    }).catch(e => {
      console.error("An error occurred :", e);
    });
  }

  // convertTextToSpeech() {

  //   this.bookService.getBookAudio(this.bookPdf).subscribe(data => {
  //     console.log("textToSpeech() successful ", data);
  //   }, error => {
  //     console.log("textToSpeech() failed ", error);
  //   });
  // }

  stopAudio(){
    this.vol = 1;
    this.first = 1;
    this.speech.cancel();
  }

  // stopTextToSpeech() {
  //   this.bookService.stopBookAudio().subscribe(data => {
  //     console.log("StopSpeech() successful ", data);
  //   }, error => {
  //     console.log("StopSpeech() failed ", error);
  //   });
  // }

  completedReading() {
    console.log("Book reading completed");
    this.recommendationService.markBookAsCompleted(sessionStorage.getItem("userName"), this.bookTitle)
      .subscribe(data => {
        console.log("Mark book as completed successful : ", data);
        this.completeButtonText = "Completed";
        this.isCompleteDisabled = true;
        this.markCompleted = "complete";
      }, error => {
        console.log("Mark book as completed failed : ", error);
        if (error.status === 202) {
          console.log("Mark book as completed works. Just json parse error");
          this.completeButtonText = "Completed";
          this.isCompleteDisabled = true;
          this.markCompleted = "complete";
        }
      });
  }
  backToDashboard() {
    if(this.vol === 0){
      this.stopAudio();
    }
    console.log("\n\nPrinting Current Page Number : ", this.pageVariable);
    console.log("\n\n\nSave User Progress called from Read Book UI.Page Number Saved : ", this.pageVariable);
    this.recommendationService.saveUserProgress(sessionStorage.getItem("userName"), this.bookTitle, this.pageVariable)
      // this.recommendationService.saveUserProgress("RaviBansal@kidsjoyment.com", this.bookTitle, this.pageVariable)
      .subscribe(data => {
        console.log("Save Current Page Number Progress successful : ", data);
      }, error => {
        console.log("Save Current Page Number Progress fails : ", error);
        if (error.error.text === "User Progress Updated") {
          console.log("Save Current Page Number Progress actually works. Juts the json parse error");
        }
        else {
          console.log("Save Current Page Number Progress actually fails");
        }
      });
    console.log("Save User Progress call ends here.\n\n\n");
    this.router.navigate(["/dashboard"]);
  }
}
