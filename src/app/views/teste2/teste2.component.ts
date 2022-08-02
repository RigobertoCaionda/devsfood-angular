import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-teste2',
  templateUrl: './teste2.component.html',
  styleUrls: ['./teste2.component.css']
})
export class Teste2Component implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
