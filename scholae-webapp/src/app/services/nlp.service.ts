import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NlpService {

  constructor(private httpClient: HttpClient) { }

  public nlpFilter(input: string) {
    return this.httpClient.get<any>("http://localhost:8080/nlpservice/api/v1/filter",
      {
        params: {
          input: input,
          type: "NN,NNS,NNP,NNPS"
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
