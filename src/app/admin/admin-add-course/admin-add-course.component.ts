import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import {Course} from '../../course';
import { TextCourse} from '../../text-course';
import { VideoCourse} from '../../video-course'
import { SamplePaper} from '../../sample-paper';
@Component({
  selector: 'app-admin-add-course',
  templateUrl: './admin-add-course.component.html',
  styleUrls: ['./admin-add-course.component.scss']
})
export class AdminAddCourseComponent implements OnInit {
  currentOrientation = 'horizontal';
  course : Course[];
  topic_name : TextCourse[];
  sub_topic : TextCourse[];
  special_note : TextCourse[];
  content : TextCourse[];
  courseSelect;

  video_name : VideoCourse[];
 

  Subject : SamplePaper[];
  video_description : VideoCourse[];
  price : VideoCourse[];
  discount : VideoCourse[];
  discount_days: VideoCourse[];

  constructor(private _dataService: DataService,private router: Router) { }

  ngOnInit() {
    this._dataService.course()
  .subscribe(course => {this.course = course;
});  
  }

  add_text(){
    this._dataService.addTextCourse(this.courseSelect, this.topic_name,this.sub_topic,this.special_note,this.content)
    .subscribe(topic_name=>{
      if (topic_name.length == 0) {
                      alert("error");
                  }
                  else {
                      this.router.navigate(['/Admin-dashboard'])
                  }
    });
  }

  addVideoCourse(){
    this._dataService.addVideoCourse(this.video_name,this.video_description,this.price,this.discount,this.discount_days)
    .subscribe(video_name=>{
      if (video_name.length == 0) {
                      alert("error");
                  }
                  else {
                      this.router.navigate(['/Admin-dashboard'])
                  }
    });
  }
  
  courseData(course)
  {
    
      this.courseSelect=course;
  }

  // SamplePaper(){
  //   this._dataService.SamplePaper(this.subject_topic,)
  //   .subscribe(video_name=>{
  //     if (video_name.length == 0) {
  //                     alert("error");
  //                 }
  //                 else {
  //                     this.router.navigate(['/Admin-dashboard'])
  //                 }
  //   });
  // }
}
