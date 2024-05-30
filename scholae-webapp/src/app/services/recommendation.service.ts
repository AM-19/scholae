import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private httpClient: HttpClient) { }

  public getAllRecommendations(emailId: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/recommendations", {
      params: {
        emailId: emailId
      }
    })
      .pipe(catchError(this.errorHandler));
  }

  public getUserFavourites(emailId: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/favourites",
      {
        params: {
          emailId: emailId
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public getBooksUserIsReading(emailId: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/reading",
      {
        params: {
          emailId: emailId
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public getBooksUserHasCompleted(emailId: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/completelist",
      {
        params: {
          emailId: emailId
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public getAllBooksInDatabase() {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/books")
      .pipe(catchError(this.errorHandler));
  }

  public checkIfFavourite(emailId: string, bookTitle: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/userfavourite",
      {
        params: {
          emailId: emailId,
          bookTitle: bookTitle
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public addToFavourites(emailId: string, bookTitle: string) {
    return this.httpClient.post<any>("http://localhost:8080/recommendationservice/api/v1/favourite",bookTitle,
      {
        params: {
          emailId: emailId,
          bookTitle: bookTitle
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public removeFromFavourites(emailId: string, bookTitle: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/unfavourite",
      {
        params: {
          emailId: emailId,
          bookTitle: bookTitle
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public checkIfUserIsReadingBook(emailId: string, bookTitle: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/userreading",
      {
        params: {
          emailId: emailId,
          bookTitle: bookTitle
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public checkIfUserCompletedBook(emailId: string, bookTitle: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/usercompleted",
      {
        params: {
          emailId: emailId,
          bookTitle: bookTitle
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public addToRead(emailId: string, bookTitle: string) {
    return this.httpClient.post<any>("http://localhost:8080/recommendationservice/api/v1/startreading",bookTitle,
      {
        params: {
          emailId: emailId,
          bookTitle: bookTitle
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public markBookAsCompleted(emailId: string, bookTitle: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/completed",
      {
        params: {
          emailId: emailId,
          bookTitle: bookTitle
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public updateBookDownloads(bookTitle: string) {
    return this.httpClient.put<any>("http://localhost:8080/recommendationservice/api/v1/updatedownloads", bookTitle)
      .pipe(catchError(this.errorHandler));
  }

  public updateBookViews(bookTitle: string) {
    return this.httpClient.put<any>("http://localhost:8080/recommendationservice/api/v1/updateviews", bookTitle)
      .pipe(catchError(this.errorHandler));
  }

  public saveUserProgress(emailId: string, bookTitle: string,pageNumber: number) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/saveprogress",{
      params:{
        emailId:emailId,
        bookTitle:bookTitle,
        pageNumber:pageNumber.toString()
      }
    })
      .pipe(catchError(this.errorHandler));
  }

  public returnUserProgress(emailId: string, bookTitle: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/progress",{
      params:{
        emailId:emailId,
        bookTitle:bookTitle
      }
    })
      .pipe(catchError(this.errorHandler));
  }

  public getBookDescription(bookTitle: string) {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/description",{
      params:{
        bookTitle:bookTitle
      }
    })
      .pipe(catchError(this.errorHandler));
  }

  public getMostViewedBooks() {
    return this.httpClient.get<any>("http://localhost:8080/recommendationservice/api/v1/mostviewed",{
      params:{
        numBooks:"10"
      }
    })
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
}
