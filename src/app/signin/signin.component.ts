import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';
import{User} from '../user';

import {BehaveService} from '../behave.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers:[DataService ]
})
export class SigninComponent implements OnInit {
  users:User[];
  title = 'app';
  applied = true;
  _showModal = false;
  model:any = {};
  isAdmin;login;isUser;
  constructor(private _dataService: DataService,private router: Router,private _behaveService: BehaveService) { }
  showdata(){
    this._dataService.checkLoginFromServer(this.model.email_id,this.model.Password)
    .subscribe(data =>{
      if(data.length == 0){
        alert("error login");
      }
      else{
        //this.router.navigate(['/signin']);
      }
    });
  }

  showModal(){  
    this._showModal = false;
  }

  

  ngAfterContentInit(){
    if(sessionStorage.getItem("currentUser") == "1"){
        this.isAdmin = true;
        this.login = true; 
      }
      else{
        this.isAdmin = false;
        this.isUser= true;
        this.login = false;
      }    
  };
  

    ngOnInit() {
      this._behaveService.telecast.subscribe((isAdmin)=>{
        console.log(isAdmin);
        this.isAdmin=isAdmin;
      });
      this._behaveService.userTelecast.subscribe((isUser)=>{
        console.log(isUser);
        this.isAdmin=isUser;
      });
      if(sessionStorage.getItem("currentUser") == "1"){
        this.isAdmin = true;
        this.login = true; 
      }
      else{
        this.isAdmin = false;
        this.isUser = true;
        this.login = false;
      }    
      //this._dataService.getData().subscribe(User1=> this.users = User1);
  }

  // logOut(){
  //   alert("logout");
  //     sessionStorage.removeItem("currentUser");
  //     this.login = false;
  //     this.isAdmin = false;
  //      this.router.navigate(['/contact-us']);

  // }
  // showData(){
  //   //_dataService.checkLoginFromServer(this.model.email_id,this.model.Password);
    
  // }

  
  checkLogin(){


    if (this.model.email_id==" "){
      alert(" email can't be blank");}
      else if (this.model.Password.length==" ")
      {
        alert(" Password can't be blank");}
        
    this._dataService.checkLoginFromServer(this.model.email_id,this.model.Password)
    .subscribe(
                data => {
                  this.model.email_id = "";
                  this.model.Password = "";
                    if(data.length == 0){
                      alert("error login");
                    }
                    else{
                        if(data[0].role == 1){
                          this.isAdmin = true;
                          sessionStorage.setItem('currentUser', data[0].role.toString());
                           sessionStorage.setItem('currentemail_id', data[0].email_id);
                          this.login = true;
                          this._behaveService.setMessage(true);
                          this.router.navigate(['/Admin-dashboard']);
                         
                        }
                      else{
                        sessionStorage.setItem('currentUser', data[0].role.toString());
                        sessionStorage.setItem('currentemail_id', data[0].email_id);
                       this.login = true;
                       this._behaveService.setnav(true);
                        this.router.navigate(['/User-Dashboard']);
                      }
                    }
                },
                error => {
                    /*this.alertService.error(error);
                    this.loading = false;*/
                    alert("error login")
                });
  }

}
