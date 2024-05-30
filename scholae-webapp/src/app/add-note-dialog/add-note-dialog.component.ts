import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../model/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {

  title = "";
  note = "";
  form: FormGroup;
  bookNote: Note = new Note();
  username: string;
  panel: any = [];
  bookTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) public receivedData: any, private bookService: BookService) {
    this.bookTitle = receivedData.bookTitle;
  }

  ngOnInit() {
    console.log("\nReceived Book Title : ", this.bookTitle);
    this.form = new FormGroup(
      {
        noteTitle: new FormControl('', [Validators.required]),
        noteContent: new FormControl('', [Validators.required])
      }
    );
    this.username = sessionStorage.getItem("userName").split("@")[0];

    this.bookService.getAllNotes(sessionStorage.getItem("userName"), this.bookTitle).subscribe(data => {
      console.log("getAllNotes() successful : ", data);
      //      this.panel = data;
      for (let i = 0; i < data.length; i++) {
        this.panel.push({ "noteTitle": data[i].noteTitle, "noteContent": data[i].noteContent });
      }
      console.log("\n\nPrinting panel in ngOnInit() : ", this.panel);
    }, error => {
      console.log("getAllNotes() failed : ", error);
      if (error.status === 200) {
        console.log("getAllNotes() successful. Just the json parse error");
        //      complete this one after checking the error
        // this.panel = error.;
      }
      else {
        console.log("getAllNotes() actually failed : ");
      }
    });
  }
  submit() {
    //	console.log("\n\n\nPrinting complete panel at start : ",this.panel,"\n\n\n\n");
    this.bookNote.userEmail = sessionStorage.getItem("userName");
    //	this.bookNote.userEmail="RaviBansal@kidsjoyment.com";
    this.bookNote.noteTitle = this.form.value.noteTitle;
    this.bookNote.noteContent = this.form.value.noteContent;
    this.bookService.addNote(this.bookNote, this.bookTitle)
      .subscribe(data => {
        console.log("saveNote() is successful : ", data);
        this.panel.push({ "noteTitle": this.bookNote.noteTitle, "noteContent": this.bookNote.noteContent });
        //        this.panel.push(this.bookNote);
        console.log("\n\n\nPrinting complete panel : ", this.panel);
        this.form.reset();
      }, error => {
        console.log("saveNote() failed : ", error);
        if (error.status === 200) {
          console.log("saveNote() is successful. Just the json parse error");
          this.panel.push({ "noteTitle": this.bookNote.noteTitle, "noteContent": this.bookNote.noteContent });
          //this.panel.push(this.bookNote);
          console.log("\n\n\nPrinting complete panel : ", this.panel);
          this.form.reset();
        }
        else {
          console.log("saveNote() actually failed : ");
        }
      });

  }

  removeMe(i) {
    this.panel.splice(i, 1);
  }

}
