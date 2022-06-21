import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: any = [];
  products: any = [];
  product: any;
  totalPages: Array<any> = [];
  activePage = 1;
  activeCategory = 0;
  searchText = '';
  modalStatus = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getSearchValue()
      .pipe(debounceTime(2000))
      .subscribe({
        next: (search) => {
          this.searchText = search;
          this.getProducts();
        },
        error: (error) => console.log(error),
      }); // Sera nottificado sempre que houver uma alteracao no search do servico

    this.productService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => console.log(error), // Fazer aparecer esse erro em forma de modal
    });
    this.getProducts();
  }

  handlePageClick(index: number) {
    this.activePage = index + 1;
    this.productService
      .getProducts(this.activeCategory, this.activePage, this.searchText)
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

  getClickedProduct(product: any) {
    this.modalStatus = true;
    this.product = product;
  }

  cancelBtnClicked() {
    this.modalStatus = false;
  }

  getProducts() {
    return this.productService
      .getProducts(this.activeCategory, this.activePage, this.searchText)
      .subscribe({
        next: (products) => {
          this.products = products;
          this.totalPages = Array(products.result.pages).fill(0);
        },
        error: (error) => console.log(error),
      });
  }
}
