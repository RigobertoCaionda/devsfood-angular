import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => console.log(categories),
      error: error => console.log(error)
    });
  }

}
