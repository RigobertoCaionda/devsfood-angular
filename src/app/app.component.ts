import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';
import { ProductService } from './shared/services/product.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inputActive = false;
  clicked = false;
  searchInput = '';
  language = 'Português';
  userRole = '';
  cart!: any[];
  
  constructor(
    private productService: ProductService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    document.title = 'Home';
    this.productService.getCartValue().subscribe({
      next: (res) => (this.cart = res),
    });
    this.translate.setDefaultLang('pt');
    this.userRole = this.authService.getRoles()[0];
  }

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

  handleSearchChange(event: string) {
    this.productService.setSearchValue(event); // Mudando o valor para toda aplicacao sempre que houver alteracao
  }

  roleVerification(expectedRoles: string[]) {
    let index = expectedRoles.findIndex(item => item == this.userRole);
    if(index > -1) {
      return true;
    } else {
      return false;
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    if (language == 'en') {
      this.language = 'English';
    } else if (language == 'pt') {
      this.language = 'Português';
    }
  }
}
