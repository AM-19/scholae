import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../model/auth-user';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  public getMyToken() {
    return sessionStorage.getItem("myToken");
  }
  public setmyToken(tok, email) {
    sessionStorage.setItem("myToken", tok);
    sessionStorage.setItem("userName", email);
    console.log("In setMyToken : ", sessionStorage.getItem("myToken"), sessionStorage.getItem("userName"));
  }

  public authenticateUser(authuser: AuthUser) {
    return this.httpClient.post<AuthUser>("http://localhost:8080/authservice/api/v1/login", authuser)
      .pipe(catchError(this.errorHandler));
  }

  public getCurrentPassword(emailId: string) {
    return this.httpClient.get<any>("http://localhost:8080/authservice/api/v1/password",
      {
        params: {
          emailId: emailId
        }
      })
      .pipe(catchError(this.errorHandler));
  }

  public changePassword(authUser: AuthUser) {
    return this.httpClient.put<any>("http://localhost:8080/authservice/api/v1/changepassword", authUser)
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
