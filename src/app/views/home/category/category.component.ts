import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  activeCategory = 0;
  @Input() categoryInfo: Category = {} as Category;
  constructor() { }

  ngOnInit(): void {
  }

}
