import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  error = '';
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    document.title = 'Login page';
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null],
      rememberPassword: [null],
    });
  }

  onSubmit() {
    this.error = '';
   this.authService.signIn(this.form.value).subscribe({
    next: (json) => {
      this.authService.doLogin(json.token);
      window.location.href = '/';
    },
    error: (error: HttpErrorResponse) => this.error = error.error.message
   });
  }
}
