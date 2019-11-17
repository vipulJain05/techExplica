import { Component, OnInit } from '@angular/core';
import { NavService } from './nav.service';
import { DataService } from '../data.service';
import { User } from '../user';
import { Router } from '@angular/router';
import {Course} from '../course';

import {BehaveService} from '../behave.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  //Username:User[];
  course:Course[];
  isAdmin;isUser;
  login;
  isCourseSelected;
  getItem;
  list;
  //name:String;
  constructor(private _dataService: DataService,private router: Router,private _behaveService: BehaveService) {  

   }

  ngOnInit() {





    if(sessionStorage.getItem("currentUser") == "1")
    {     
      //this.isAdmin=true;   
      this._behaveService.setMessage(true);   
    }
    if(sessionStorage.getItem("currentUser") == "2")
    {     
      this._behaveService.setnav(true);   
    }

    this._behaveService.telecast.subscribe((isAdmin)=>{
      console.log(isAdmin);
      this.isAdmin=isAdmin;
    });  

    this._behaveService.userTelecast.subscribe((isUser)=>{
      console.log(isUser);
      this.isUser=isUser;
    });  

    

    //this.showProductData = false;
    this._dataService.course()
    .subscribe(course => {this.course = course;
  });

  this._behaveService.course.subscribe((isCourseSelected)=>{
    console.log("isCourseSelected"+isCourseSelected);
    this.isCourseSelected=isCourseSelected;
  });

  }

  logout()
  {
    if(sessionStorage.getItem("currentUser") == "1")
    {
      sessionStorage.removeItem("currentUser");
      this.login = false;
      //this.isAdmin = false;
      this._behaveService.setMessage(false);
       this.router.navigate(['/home']);
    }
    if(sessionStorage.getItem("currentUser") =="2")
    {
      sessionStorage.removeItem("currentUser");
      this.login = false;
      //this.isAdmin = false;
      this._behaveService.setnav(false);
       this.router.navigate(['/home']);
    }
  }

  goToCourse(cid){
    alert(cid);
    this.router.navigate(['/textCourse',cid]);
  
}
getList(getItem)
{
  console.log("jdjfkfs");
  this._dataService.getList(getItem)
  .subscribe(list => {this.list = list;
});
}
}
