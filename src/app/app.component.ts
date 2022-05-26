import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputActive = false;
  clicked = false;
  searchInput = '';

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
}
