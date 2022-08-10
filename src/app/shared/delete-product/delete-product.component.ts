import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  error = '';
  products!: any[];
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public helperService: HelperService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productId: [null, [Validators.required]],
    });

    this.productService.getAllProductsWithNoPagination().subscribe({
      next: (json) => {
        this.products = json.data;
      },
      error: (error) => console.log(error),
    });
  }
  get f() {
    return this.form.controls
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

    this.productService
      .delete(this.form.get('productId')?.value)
      .subscribe({
        next: (json) => {
          window.location.href = '/home';
        },
        error: (error: HttpErrorResponse) => (this.error = error.error.message)
      });
  }
}
