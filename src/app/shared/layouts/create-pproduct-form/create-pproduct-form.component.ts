import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { HelperService } from '../../services/helper.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-pproduct-form',
  templateUrl: './create-pproduct-form.component.html',
  styleUrls: ['./create-pproduct-form.component.css'],
})
export class CreatePproductFormComponent implements OnInit {
  error = '';
  categories: Category[] = [];
  form!: FormGroup;
  fileInput!: FileList;
  constructor(
    private formBuilder: FormBuilder,
    public helperService: HelperService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });

    this.productService.getCategories().subscribe({
      next: (json) => {
        this.categories = json.data;
      },
      error: (error) => console.log(error),
    });
  }

  get f() {
    return this.form.controls;
  }

  inputFileChange(e: any) {
    if (e.target.files) {
      this.fileInput = e.target.files;
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
    fData.append('price', this.form.get('price')?.value);
    fData.append('categoryId', this.form.get('categoryId')?.value);
    if (this.fileInput) {
      for (let i = 0; i < this.fileInput.length; i++) {
        fData.append('images', this.fileInput[i]);
      }
    }

    this.productService.createProducts(fData).subscribe({
      next: (json) => {
        if (json.data.id) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (error: HttpErrorResponse) => (this.error = error.error.message),
    });
  }
}
