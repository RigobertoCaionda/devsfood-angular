import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css'],
})
export class CreateRoleComponent implements OnInit {
  error = '';
  form!: FormGroup;
  fileInput!: File;
  constructor(
    public helperService: HelperService,
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  inputFileChange(e: any) {
    if (e.target.files[0]) {
      this.fileInput = e.target.files[0];
    }
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
    const fData = new FormData();
    fData.append('name', this.form.get('name')?.value);
    fData.append('file', this.fileInput);
    this.categoryService.create(fData).subscribe({
      next: (json) => {
        if (json.id) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (error: HttpErrorResponse) => (this.error = error.error.message),
    });
  }
}
