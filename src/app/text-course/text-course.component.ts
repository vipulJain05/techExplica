import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service';
import { BehaveService } from '../behave.service';


@Component({
  selector: 'app-text-course',
  templateUrl: './text-course.component.html',
  styleUrls: ['./text-course.component.scss']
})
export class TextCourseComponent implements OnInit {
  cid;
  title;
  sidedats;
  textData;
  isCourseSelected
  constructor(private route:ActivatedRoute,private _dataService:DataService,private _behaveService:BehaveService) {
    this.cid=this.route.snapshot.params.cid;
    alert(this.cid);
    this.textData;
   }
  

  ngOnInit() {

      // this._behaveService.userTelecast.subscribe((isCourseSelected)=>{
      // console.log(isCourseSelected);
      // this._behaveService.userTelecast.subscribe((isCourseSelected)=>{
      // console.log(isCourseSelected);
      // });  

//******************************************************
//this code is for chaange page 


      // if(sessionStorage.getItem("currentUser") == "2")
      // {     
      //   this._behaveService.setnav(true);   
      // }
      // this._behaveService.course.subscribe((isCourseSelected)=>{
      //   console.log("isCourseSelected" +isCourseSelected);
      //   this.isCourseSelected=isCourseSelected;
      // });    

    
    this._dataService.getCourseData(this.cid)
    .subscribe(title=>{this.title=title});
  }

  //get data from side nav

  textTutorial(sidedata)
  {
    this._dataService.textCourseData(sidedata)
    .subscribe(textData => {this.textData=textData});
  }


}
