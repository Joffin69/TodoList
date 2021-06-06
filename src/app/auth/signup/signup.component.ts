import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  signUp(): void {
    if (this.signUpForm.status === 'VALID') {
      this.authService.signInUser(this.signUpForm.value);
    }
  }

}
