import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  @Input() product!: any;
  cart!: any[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCartValue().subscribe({
      next: (res) => (this.cart = res),
    });
  }

  handlePlusClick() {
    let index = this.cart.findIndex((item) => item.id == this.product.id);
    this.cart[index].qt++;
    this.productService.setCartValue(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  handleMinusClick() {
    let index = this.cart.findIndex((item) => item.id == this.product.id);
    if (this.cart[index].qt > 1) {
      this.cart[index].qt--;
    } else {
      this.cart.splice(index, 1);
    }
    this.productService.setCartValue(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
