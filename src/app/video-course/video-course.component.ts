import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { VideoCourse } from '../video-course';
import { Course } from '../course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-course',
  templateUrl: './video-course.component.html',
  styleUrls: ['./video-course.component.scss']
})
export class VideoCourseComponent implements OnInit {
isUser;
course:Course[];
courseList :String;
video;
video_course:VideoCourse[];
  constructor(private _dataService:DataService,private router:Router) { 
   
  }

  ngOnInit() {
    if(sessionStorage.getItem("currentUser") == "2")
    {
      this.isUser=true;
        
    }

    
    this._dataService.getvideo()
    .subscribe(video_course => {this.video_course = video_course;
      console.log(this.video_course + 'service');
    });
  }

  goToSignUp(courseList){
    alert(courseList);
    if(sessionStorage.getItem("currentUser") == "2")
    {
      
      this.router.navigate(['/video-course-description',courseList]);
    }
   
  }

  gotochange()
  {
    this.router.navigate(["signin"]);
  }

//   CourseContent(videoCourse)
//   {
//     this._dataService.CourseContent(this.videoCourse)
//       .subscribe(videoCourse => {this.videoCourse = videoCourse;
//       console.log(this.videoCourse);
//   });
// }

}
