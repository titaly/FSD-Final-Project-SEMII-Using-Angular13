import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  username = "";
  password = "";

  allName:any = [];
  isLoggedIn:boolean = false;
  onSubmit():void{
    this.isLoggedIn = true;
    while (this.username != "" && this.password != ""){

      this.username = "";
      this.password = "";

      if (this.loginForm.valid){
        this.auth.login(this.loginForm.value).subscribe(
          (result) => {
            this.router.navigate(['/content'])
          },
          (err: Error) => {
            alert(err.message);
            this.loginForm = new FormGroup({
              name: new FormControl(''),
              password: new FormControl('')
            })
          }
        )
      }
    }
  }
}
