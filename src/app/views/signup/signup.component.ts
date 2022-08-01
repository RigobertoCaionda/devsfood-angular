import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  pages = 2;
  page = 1;
  error = '';
  roles: Role[] = [];
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public helperService: HelperService,
    private authService: AuthService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      gender: [null],
      roleId: [null, [Validators.required]],
      createPermission: [null],
      editPermission: [null],
      readPermission: [null],
      updatePermission: [null],
    });
    this.rolesService.getRoles().subscribe({
      next: json => this.roles = json.data,
      error: error => console.log(error)
    });
  }

  handleNextClick() {
    if (this.page + 1 <= this.pages) {
      this.page++;
    }
  }

  handlePrevClick() {
    if (this.page > 1) {
      this.page--;
    }
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.error = '';
    if (!this.form.valid) {
      Object.keys(this.f).forEach((field) => {
        const control = this.form.get(field);
        control?.markAsDirty();
      });
      return;
    }
    if (
      this.form.get('password')?.value !==
      this.form.get('confirmPassword')?.value
    ) {
      this.error = 'Senhas devem ser iguais';
      return;
    }
    this.form.patchValue({
      roleId: parseInt(this.form.get('roleId')?.value)
    });
   this.authService.signUp(this.form.value).subscribe({
    next: (json) => {
      this.authService.doLogin(json.token);
      window.location.href = '/';
    },
    error: (error: HttpErrorResponse) => this.error = error.error.message
   });
  }
}
