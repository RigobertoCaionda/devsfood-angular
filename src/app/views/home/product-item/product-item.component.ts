import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Output() clickedProduct = new EventEmitter();
  @Input() product: Product = {} as Product;
  constructor() {}

  ngOnInit(): void {}

  handleProductItemClick(product: any) {
    this.clickedProduct.emit({ product });
  }
}
