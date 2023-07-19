import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
 
import { Subscription } from 'rxjs';

import { UserApiService } from 'src/app/service/user-api.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  createUserForm: FormGroup = this.formBuilder.group({});
  postUserSubscription: Subscription;
  feedback: { type: string; msg: string };
  timeoutId: ReturnType<typeof setTimeout>;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private UserApi: UserApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createUserForm = this.formBuilder.group({
      name: [""],
      email: [""],
    })
    this.feedback = { type: "", msg: "" }
  }

  onPost() {
    if (this.createUserForm.invalid) return;
    this.isLoading = true;
    this.postUserSubscription = this.UserApi.postuser({
      name: this.name.value,
      email: this.email.value,
    })
      .subscribe({
        error: (err) => {
          this.feedback = { type: 'error', msg: err.error.message };
          if (err.error.errors) {
            this.feedback.msg = this.feedback.msg + '<br>Errors:<br>';
            err.error.errors.map((error) => {
              this.feedback.msg = this.feedback.msg + error.message + '<br>';
            });
          }
        },
        complete: () => (
          (this.feedback = {
            type: 'success',
            msg: 'User successfully created!',
          }),
          (this.isLoading = false)
        ),
      });

    this.timeoutId = setTimeout(() => {
      this.feedback = { type: '', msg: '' };
    }, 3000);
  }

  get name(): FormControl {
    return <FormControl>this.createUserForm.controls['name'];
  }
  get email(): FormControl {
    return <FormControl>this.createUserForm.controls['email'];
  }
}
