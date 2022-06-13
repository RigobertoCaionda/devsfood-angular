import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() product: any;
  @Output() cancelBtnClicked = new EventEmitter();
  qt = 1;
  cart: any[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    
  }

  handleClick(type: string) {
    if (type == '-') {
      if(this.qt > 1) {
        this.qt--;
      }
    }
    
    if (type == '+') {
      this.qt++;
    }
  }
  cancel() {
    this.cancelBtnClicked.emit('clicado');
    this.qt = 1;
  }

  addCart() {
    this.productService.getCartValue().subscribe({
      next: res => this.cart = res
    });
    let cartProduct = { ...this.product, qt: this.qt };
    let sameProduct = this.cart.findIndex((item) => item.id == cartProduct.id);
    console.log(sameProduct)
    if(sameProduct > -1) {
      this.cart[sameProduct].qt += cartProduct.qt;
    } else {
      this.cart.push(cartProduct); 
    }
    this.productService.setCartValue(this.cart);
    this.productService.getCartValue().subscribe({
      next: res => console.log(res)
    });
  }
}
