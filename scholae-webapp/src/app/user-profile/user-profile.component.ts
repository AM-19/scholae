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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  interests: string[] = ["Horror", "Romance", "Comics", "Adventure", "Mythology"];
  username: string;
  emailID: string;
  mobile: string;
  address: string;
  authUser: AuthUser = new AuthUser();
  errorMessage: string = "Invalid current password!";
  isPasswordInvalid: boolean = false;

  editForm: FormGroup;

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.emailID = sessionStorage.getItem("userName");
    this.username = this.emailID.split("@")[0];
    this.editForm = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        newPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('')
      }
    );
    this.editForm.get('email').setValue(this.emailID);
    this.editForm.get('email').disable();

    this.userService.getUserDetails(sessionStorage.getItem("userName")).subscribe(data => {
      console.log("getUserDetails() successful : ", data);
      this.address = data["address"];
      this.mobile = data["phoneNumber"];
    }, error => {
      console.log("getUserDetails() failed : ", error);
      if (error.status === 200) {
        console.log("getUserDetails() successful .Just the json parse error");
        //Assign data here as well and add it in editDetails() as well.
      }
      else {
        console.log("getUserDetails() actually fails");
      }
    });

    this.editForm.valueChanges.subscribe(value => {
      if (this.isPasswordInvalid) {
        this.isPasswordInvalid = false;
      }
    });

  }


  editUser() {
    console.log("Edit formValue", this.editForm.value);
    this.authService.getCurrentPassword(this.emailID).subscribe(data => {
      console.log("Success in getting current password : ", data);
      if (this.editForm.value.currentPassword === data) {
        console.log("Passwords matched");
        this.userService.updateUserDetails(this.emailID, this.editForm.value.address, this.editForm.value.phoneNumber)
          .subscribe(data => {
            console.log("User Details Update Successful : ", data);
            this.mobile = this.editForm.value.phoneNumber;
            this.address = this.editForm.value.address;
            this.authUser.emailId = this.emailID;
            this.authUser.password = this.editForm.value.newPassword;
            this.authService.changePassword(this.authUser).subscribe(data => {
              console.log("User Password Update Successful : ", data);
              this.openDialog();
              this.editForm.reset();
              this.editForm.get('email').setValue(this.emailID);
              // this.editForm.get('email').disable();
            }, error => {
              console.log("Error changing password : ", error);
              if (error.status === 202) {
                console.log("Password update has worked : ", data);
                this.openDialog();
                this.editForm.reset();
                this.editForm.get('email').setValue(this.emailID);
              }
            });
          }, error => {
            console.log("Error in updating user details : ", error);
          });
      }
      else {
        console.log("Passwords do not match");
        this.isPasswordInvalid = true;
      }

    }, error => {
      console.log("Error in getting current password : ", error);
      if (error.status === 200) {
        console.log("\nPassword is : ", error.error.text);
        if (this.editForm.value.currentPassword === error.error.text) {
          console.log("Passwords matched");
          this.userService.updateUserDetails(this.emailID, this.editForm.value.address, this.editForm.value.phoneNumber)
            .subscribe(data => {
              console.log("User Details Update Successful : ", data);
              this.mobile = this.editForm.value.phoneNumber;
              this.address = this.editForm.value.address;
              this.authUser.emailId = this.emailID;
              this.authUser.password = this.editForm.value.newPassword;
              this.authService.changePassword(this.authUser).subscribe(data => {
                console.log("User Password Update Successful : ", data);
                this.openDialog();
                this.editForm.reset();
                this.editForm.get('email').setValue(this.emailID);
              }, error => {
                console.log("Error changing password : ", error);
                if (error.status === 202) {
                  console.log("Password update has worked : ");
                  this.openDialog();
                  this.editForm.reset();
                  this.editForm.get('email').setValue(this.emailID);
                }
              });
            }, error => {
              console.log("Error in updating user details : ", error);
            });
        }
        else {
          console.log("Passwords do not match");
          this.isPasswordInvalid = true;
        }
      }
    });
  }

  openDialog() {
    // this.dialog.open(DialogBoxComponent);
    const dialogForUpdate = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: "User details updated successfully."
    });
    dialogForUpdate.afterClosed().subscribe(result => {

    });
  }

}

