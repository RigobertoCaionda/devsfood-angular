import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/core/models/role';
import { User } from 'src/app/core/models/user';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css'],
})
export class UserUpdateFormComponent implements OnInit {
  error = '';
  form!: FormGroup;
  roles: Role[] = [];
  me: any;
  constructor(
    public helperService: HelperService,
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.minLength(2)],
      email: [null, Validators.email],
      password: [null],
      roleId: [null],
    });
    this.rolesService.getRoles().subscribe({
      next: (json) => this.roles = json.data,
      error: error => console.log(error)
    });
    this.userService.me().subscribe({
      next: (json: any) => {
        this.me = json.data;
        this.form.patchValue({
          name: this.me.name,
          roleId: this.me.roleId,
        });
      },
      error: error => console.log(error)
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.error = '';
    if(!this.form.valid) {
      Object.keys(this.f).forEach((field) => {
        const control = this.form.get(field);
        control?.markAsDirty();
      });
      return;
    }

    this.form.patchValue({
      roleId: parseInt(this.form.get('roleId')?.value)
    });
    let updateObj: any = {};
    if(this.form.get('name')?.value) {
      updateObj.name = this.form.get('name')?.value;
    }
    if(this.form.get('email')?.value) {
      updateObj.email = this.form.get('email')?.value;
    }
    if(this.form.get('password')?.value) {
      updateObj.password = this.form.get('password')?.value;
    }
    if(this.form.get('roleId')?.value) {
      updateObj.roleId = this.form.get('roleId')?.value;
    }
    
    this.userService.update(this.me.id, updateObj).subscribe({
      next: (json) => alert('Usuário atualizado com sucess'),
      error: (error: HttpErrorResponse) => this.error = error.error.message
    });
  }
}
