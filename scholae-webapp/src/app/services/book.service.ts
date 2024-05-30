import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Book, Note } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  uploadFiles: File[] = [];
  constructor(private httpClient: HttpClient) { }

  public uploadBook(file: File[], bookDetails: Book) {
    const data: FormData = new FormData();
    data.append('file', file[0]);
    data.append('file', file[1]);
    data.append('details', JSON.stringify(bookDetails));
    console.log("In frontend book service uploadBook : ", data, JSON.stringify(bookDetails));
    return this.httpClient.post<any>("http://localhost:8080/bookservice/api/v1/book/upload", data, { headers: { responseType: 'text' } })
      .pipe(catchError(this.errorHandler));
  }


  public getBookAudio(bookUrl: string) {
    return this.httpClient.post<any>("http://localhost:8080/bookservice/api/v1/audio",bookUrl)
      .pipe(catchError(this.errorHandler));
  }
  // public uploadDetails(bookDetails: string){    
  //   const data: FormData = new FormData();
  //   data.append('details',bookDetails);
  //   console.log("In frontend book service uploadDetails: ",bookDetails,data);
  //   return this.httpClient.post<any>("http://localhost:8095/api/v1/details/upload",bookDetails,{headers:{ responseType: 'text'}})
  //  .pipe(catchError(this.errorHandler));
  // }
  public downloadBook(bookUrl: string,bookTitle: string) {
    return this.httpClient.post<any>("http://localhost:8080/bookservice/api/v1/download",{"bookUrl":bookUrl,"bookTitle":bookTitle})
    .pipe(catchError(this.errorHandler));
  }

  public errorHandler(error: Response | any) {
    if (error instanceof ErrorEvent) {
      console.error("an error occured:", error.message);
      return throwError("something bad happened");
    }
    else {
      console.error(`backend returned code ${error.status},` +
        `body was:${error.message}`);
      return throwError(error);
    }

  }

  public pauseBookAudio() {
    return this.httpClient.get<any>("http://localhost:8080/bookservice/api/v1/pauseaudio")
      .pipe(catchError(this.errorHandler));
  }

  public resumeBookAudio() {
    return this.httpClient.get<any>("http://localhost:8080/bookservice/api/v1/resumeaudio")
      .pipe(catchError(this.errorHandler));
  }

  public stopBookAudio() {
    return this.httpClient.get<any>("http://localhost:8080/bookservice/api/v1/stopaudio")
      .pipe(catchError(this.errorHandler));
  }

  public addNote(note: Note, bookTitle: string){
    return this.httpClient.post("http://localhost:8080/bookservice/api/v1/addNotes",note,{
      params:{
        bookTitle:bookTitle
      }
    })
    .pipe(catchError(this.errorHandler));
  }

  public getAllNotes(emailId: string,bookTitle: string){
    return this.httpClient.get<any []>("http://localhost:8080/bookservice/api/v1/notes",{
      params:{
        userEmail:emailId,
        bookTitle:bookTitle
      }
    })
    .pipe(catchError(this.errorHandler));
  }
}
