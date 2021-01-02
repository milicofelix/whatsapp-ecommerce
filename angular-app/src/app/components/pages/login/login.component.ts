import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
      email: 'admin@user.com',
      password: 'password'
  };

  showMessageError = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  submit() {
    this.authService.login(this.credentials)
        .subscribe((data) => {
          this.router.navigate(['categories/list']);
        }, () => this.showMessageError = true);
    return false;
  }

}
