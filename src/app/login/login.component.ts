import { Component, OnInit } from '@angular/core';
//import { getMaxListeners } from 'process';
import { Router,ActivatedRoute } from '@angular/router'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  contrasena: any
  user:any
  login: any

  constructor(private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute
    .queryParams
    .subscribe(params => {
      this.login = params['login']

    });


    console.log(">>>>>>", this.login)

  }



  acceder(){
    this.router.navigate(['home'])
  }





}
