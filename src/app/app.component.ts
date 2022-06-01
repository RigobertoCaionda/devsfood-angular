import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/services/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputActive = false;
  clicked = false;
  searchInput = '';

  constructor(private productService: ProductService) {}

  ngOnInit() { }

  handleInputFocus() {
    this.inputActive = true;
  }

  handleInputBlur() {
    if (this.searchInput == '') {
        this.inputActive = false;
      }
  }
  
  handleCartClick() {
    this.clicked = !this.clicked;
  }

  handleSearchChange(event: any) {
    this.productService.setSearchValue(event); // Mudando o valor para toda aplicacao sempre que houver alteracao
  }
}
