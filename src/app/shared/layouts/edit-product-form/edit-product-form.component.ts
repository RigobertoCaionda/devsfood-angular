import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { HelperService } from '../../services/helper.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.css'],
})
export class EditProductFormComponent implements OnInit {
  error = '';
  categories: Category[] = [];
  products!: any[];
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
      name: [null],
      price: [null],
      categoryId: [null],
      productId: [null, [Validators.required]],
    });

    this.productService.getCategories().subscribe({
      next: (json) => {
        this.categories = json.data;
      },
      error: (error) => console.log(error),
    });

    this.productService.getAllProductsWithNoPagination().subscribe({
      next: (json) => {
        this.products = json.data;
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
    if (this.form.get('name')?.value) {
      fData.append('name', this.form.get('name')?.value);
    }
    if (this.form.get('price')?.value) {
      fData.append('price', this.form.get('price')?.value);
    }
    if (this.form.get('categoryId')?.value) {
      fData.append('categoryId', this.form.get('categoryId')?.value);
    }
    if (this.fileInput) {
      for (let i = 0; i < this.fileInput.length; i++) {
        fData.append('images', this.fileInput[i]);
      }
    }

    this.productService
      .update(this.form.get('productId')?.value, fData)
      .subscribe({
        next: (json) => {
          if (json.data.id) {
            let cart: any[] = JSON.parse(
              localStorage.getItem('cart') as string
            );
            let index = cart.findIndex((product) => product.id == json.data.id);
            if (index > -1) {
              cart[index].name = json.data?.name;
              cart[index].price = json.data?.price;
              cart[index].categoryId = json.data?.categoryId;
              cart[index].image = json.data.image;
              cart[
                index
              ].image[0].url = `http://localhost:3000/product/uploads/${cart[index].image[0]?.url}`;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = '/home';
          }
        },
        error: (error: HttpErrorResponse) => (this.error = error.error.message),
      });
  }
}
