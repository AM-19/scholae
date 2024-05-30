import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Book } from '../model/book';
import { BookService } from '../services/book.service';
import genre from '../jsonfiles/genre.json';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-book-container',
  templateUrl: './upload-book-container.component.html',
  styleUrls: ['./upload-book-container.component.scss']
})
export class UploadBookContainerComponent implements OnInit {
  UploadForm: FormGroup;
  files: any[] = [];
  uploadFiles: any[] = [];
  bookDetails: Book = new Book();
  imageFile: any[] = [];
  title = 'Upload Book';
  genreList: { name: string }[] = genre;

  constructor(private dialog: MatDialog, private bookServiceImpl: BookService, private router: Router) { }
  selectedIndex: number = 0;
  clickMe() {

    this.selectedIndex = 1;

  }
  clickMeAgain() {

    this.selectedIndex = this.selectedIndex + 1;

  }


  ngOnInit() {
    this.UploadForm = new FormGroup(
      {
        bookTitle: new FormControl('', [Validators.required]),
        authorName: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        publisher: new FormControl('', [Validators.required]),
        totalPage: new FormControl(''),
        genre: new FormControl('', [Validators.required])
        // pdfContent : new FormControl('',[Validators.required]),
        // imageContent : new FormControl('',[Validators.required])
      }
    );

  }

  openDialog() {
    // this.dialog.open(DialogBoxComponent);
    const dialogForUpdate = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: "Book Uploaded Successfully"
    });
    dialogForUpdate.afterClosed().subscribe(result => {
    this.router.navigate(["/dashboard"]);
    });
  }

  uploadBook() {
    // this.UploadForm.value.pdfContent = this.files;
    // this.UploadForm.value.imageContent = this.imageFile;
    console.log("Console formValue : ", this.UploadForm.value);
    this.uploadFiles.push(this.files[0]);
    this.uploadFiles.push(this.imageFile[0]);
    this.bookDetails.bookTitle = this.UploadForm.value.bookTitle;
    console.log("Book Title : ", this.bookDetails.bookTitle);
    this.bookDetails.description = this.UploadForm.value.description;
    this.bookDetails.authorName = this.UploadForm.value.authorName;
    this.bookDetails.publisher = this.UploadForm.value.publisher;
    this.bookDetails.totalPage = this.UploadForm.value.totalPage;
    this.bookDetails.genre = this.UploadForm.value.genre;

    // this.bookServiceImpl.uploadBook(this.files,this.imageFile,this.UploadForm.value).subscribe(response => {
    this.bookServiceImpl.uploadBook(this.uploadFiles, this.bookDetails).subscribe(response => {
      console.log("Book Upload method called ", response);
      this.UploadForm.reset();
      this.deleteFile(0);
      this.deleteImageFile(0);
      this.uploadFiles = [];
      this.openDialog();
    },
      error => {
        console.log("Error in book upload ", error);
        this.UploadForm.reset();
        this.deleteFile(0);
        this.deleteImageFile(0);
        this.uploadFiles = [];
        this.openDialog();
      });
  }



  //


  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  onImageFileDropped($event) {
    this.prepareImageFilesList($event);
  }


  fileBrowseHandler(files) {
    this.prepareFilesList(files);
    // console.log("Pdf files",files);
  }


  imageBrowseHandler(files) {
    this.prepareImageFilesList(files);
    // console.log("image files",files);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  deleteImageFile(index: number) {
    this.imageFile.splice(index, 1);
  }


  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }


  uploadImageFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.imageFile.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.imageFile[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadImageFilesSimulator(index + 1);
          } else {
            this.imageFile[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }


  prepareImageFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.imageFile.push(item);
    }
    this.uploadImageFilesSimulator(0);
  }


  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }



}
