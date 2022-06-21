import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() product: any;
  @Input() modalStatus = false;
  @Output() cancelBtnClicked = new EventEmitter();
  @ViewChild('modal') modal!: ElementRef;
  qt = 1;
  cart: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  handleClick(type: string) {
    if (type == '-') {
      if (this.qt > 1) {
        this.qt--;
      }
    }

    if (type == '+') {
      this.qt++;
    }
  }

  handleModalClick(targetElement: any) {
    console.log(targetElement)
    const modalIsClicked = this.modal.nativeElement.contains(targetElement);
    if (!modalIsClicked) {
      this.cancel();
    }
  }

  cancel() {
    this.cancelBtnClicked.emit('clicado');
    this.qt = 1;
  }

  addCart() {
    this.productService.getCartValue().subscribe({
      next: (res) => (this.cart = res),
    });
    let cartProduct = { ...this.product, qt: this.qt };
    let index = this.cart.findIndex((item) => item.id == cartProduct.id);
    if (index > -1) {
      this.cart[index].qt += cartProduct.qt;
    } else {
      this.cart.push(cartProduct);
    }
    this.productService.setCartValue(this.cart);
    this.cancelBtnClicked.emit('clicado');
    this.qt = 1;
  }
}
