import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails: User = new User();

  constructor(private httpClient: HttpClient) { }


  public registerUser(user: User) {
    return this.httpClient.post<User>("http://localhost:8080/userservice/api/v1/user", user)
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

  public getUserAction(emailId: string) {
    console.log("In getUserAction() ", emailId);
    return this.httpClient.get<any>("http://localhost:8080/userservice/api/v1/actions", {
      params:
      {
        emailId: emailId
      }
    })
      .pipe(catchError(this.errorHandler));
  }

  public updateUserDetails(emailId: string, address: string, phoneNumber: number) {
    this.userDetails.emailId=emailId;
    this.userDetails.address=address;
    this.userDetails.phoneNumber=phoneNumber;    
    return this.httpClient.put<any>("http://localhost:8080/userservice/api/v1/updatedetails",this.userDetails)
      .pipe(catchError(this.errorHandler));
  }

  public getUserDetails(emailId: string) {
    return this.httpClient.get("http://localhost:8080/userservice/api/v1/getUser",{
      params:{
        emailId:emailId
      }
    })
      .pipe(catchError(this.errorHandler));
  }

}
