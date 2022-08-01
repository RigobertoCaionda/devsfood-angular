import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Output() clickedCategory = new EventEmitter();
  @Input() activeCategory = 0;
  @Input() categoryInfo: Category = {} as Category;
  constructor() { }

  ngOnInit(): void {}

  
  handleCategoryClick(id: number) {
   this.clickedCategory.emit(id);
  }
}
