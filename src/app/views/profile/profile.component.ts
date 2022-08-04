import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  me!: any;
  name = '';
  constructor(
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.me().subscribe({
      next: (json: any) => {
        this.me = json.data;
        this.name = json.data.name
      },
      error: error => console.log(error)
    });
  }

  deleteUser() {
    this.userService.delete(this.me.id).subscribe({ // Se vc não subscrever, nada acontece
      next: json => this.authService.doLogout()
    });
  }
}
