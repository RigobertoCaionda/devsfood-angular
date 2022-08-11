import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: any = [];
  products: any = [];
  product!: Product;
  totalPages: Array<any> = [];
  activePage = 1;
  activeCategory = 0;
  searchText = '';
  modalStatus = false;
  take = 4;
  skip = 0;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    window.navigator.vibrate(300);
    this.productService
      .getSearchValue()
      .pipe(debounceTime(2000))
      .subscribe({
        next: (search) => {
          this.searchText = search;
          this.getProducts();
        },
        error: (error) => console.log(error),
      }); // Sera notificado sempre que houver uma alteracao no search do servico

    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => console.log(error),
    });
    this.getProducts();
  }

  handlePageClick(index: number) {
    this.activePage = index + 1;
    if (this.activePage == 1) {
      this.skip = 0;
    } else {
      this.skip = this.take * this.activePage - this.take; 
    }
    this.productService
      .getProducts(this.activeCategory, this.searchText, this.take, this.skip)
      .subscribe({
        next: (products) => (this.products = products),
        error: (error) => console.log(error),
      });
  }

  getClickedCategory(category: number) {
    this.activeCategory = category;
    this.activePage = 1;
    this.getProducts();
  }

  getClickedProduct(product: Product) {
    this.modalStatus = true;
    this.product = product;
  }

  cancelBtnClicked() {
    this.modalStatus = false;
  }

  getProducts() {
    return this.productService
      .getProducts(this.activeCategory, this.searchText, this.take, this.skip)
      .subscribe({
        next: (products) => {
          this.products = products;
          this.totalPages = Array(products.total).fill(0);
        },
        error: (error) => console.log(error),
      });
  }
}
