import { Component, OnInit } from '@angular/core';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { DataService } from '../../data.service';
import { VideoCourse } from '../../video-course'
import { User } from '../../user';
import { Course } from '../../course';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  currentOrientation = 'horizontal';
 video_course:VideoCourse[];
video : String;
userNumber:User[];
test;
courseCount:Course[];
courseNumber;
  constructor(private _dataService:DataService) {
    this.video="video_name";
  }
  

  ngOnInit(){
    this._dataService.getvideo()
      .subscribe(video_course => {this.video_course = video_course;
      console.log(this.video_course);
  });
  
  this._dataService.getUserNumber()
  .subscribe(userNumber => {this.userNumber = userNumber;
    this.test=userNumber[0].userNumber;
});

// this._dataService.getcourseNumber()
// .subscribe(courseCount => {this.courseCount = courseCount;
//   this.courseNumber=courseCount[0].courseCount;
// });
}
}
