import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputActive = false;

  handleInputFocus() {
    this.inputActive = true;
  }

  handleInputBlur() {
    // So deverei colocar false caso o user nao tiver digitado nada, refazer essa parte.
    this.inputActive = false;
  }
}
