import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { AuthUser } from '../model/auth-user';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  test: number;
  userObject: AuthUser = new AuthUser();
  showLoginErrorMessage: boolean = false;
  loginErrorMessage: string = "User does not exists!";
  showRegisterErrorMessage: boolean = false;
  registerErrorMessage: string = "User already exist!";
  signForm: FormGroup;
  userObjects: User = new User();
  role: any;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private dialog: MatDialog) { }
  submit = false;
  one: number;

  ngOnInit() {

    this.test = 1;
    this.one = 1;
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)])
      }
    );
    this.loginForm.valueChanges.subscribe(value => {
      if (this.showLoginErrorMessage) {
        this.showLoginErrorMessage = false;
      }
    });
    this.signForm = new FormGroup(
      {
        emailId: new FormControl('', [Validators.required, Validators.email]),
        passwordId: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)])
      }
    );
    this.signForm.valueChanges.subscribe(value => {
      if (this.showRegisterErrorMessage) {
        this.showRegisterErrorMessage = false;
      }
    });
  }

  loginUser() {
    console.log("formValue", this.loginForm.value);
    this.userObject.emailId = this.loginForm.value.email;
    this.userObject.password = this.loginForm.value.password;
    this.authService.authenticateUser(this.userObject).subscribe(response => {
      console.log("user able to login", response);
      let tokenValue = response["token"];
      this.authService.setmyToken(tokenValue, this.loginForm.value.email);
      this.loginForm.reset();

      this.userService.getUserDetails(this.loginForm.value.email).subscribe(data => {
        console.log("getUserDetails() successful : ", data);
        this.role = data["userRole"];
        if (this.role === "LEARNER") {
          this.router.navigate(["/dashboard"]);
        }
        else {
          this.router.navigate(["/dashboard/upload"]);
        }
        console.log("\n\nReceived User Role : ", this.role);
      }, error => {
        console.log("getUserDetails() failed : ", error);
      });

    },
      error => {
        if (error.error == "Invalid User") {
          this.showLoginErrorMessage = true;
        }
        console.log("show ErrorMessage : ", this.showLoginErrorMessage);
        console.log("not able to login", error);
      })

  }

  onClear() {
    this.submit = false;
  }
  openRegister() {
    this.test = 0;
    this.one = 0;
    this.loginForm.reset();
  }
  openLogin() {
    this.test = 1;
    this.one = 1;
    this.signForm.reset();
  }

  registerUser() {
    console.log("formValue", this.signForm.value);
    this.userObjects.emailId = this.signForm.value.emailId;
    this.userObjects.password = this.signForm.value.passwordId;
    this.userObjects.phoneNumber = this.signForm.value.phoneNumber;
    this.userService.registerUser(this.userObjects).subscribe(response => {
      console.log("registered user", response);
      // this.router.navigate(["/login"]);
      this.signForm.reset();
      this.openDialog();
    },
      error => {
        console.log("not able to register user : ", error);
        if (error.error == "User Already Exist") {
          console.log("If part");
          this.showRegisterErrorMessage = true;
        }
        this.signForm.reset();
      })

  }
  resetUser() {
    this.signForm.reset();
  }

  openDialog() {
    // this.dialog.open(DialogBoxComponent);
    const dialogForUpdate = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: "User Registered Successfully"
    });
    dialogForUpdate.afterClosed().subscribe(result => {
      this.openLogin();
    });
  }


}


