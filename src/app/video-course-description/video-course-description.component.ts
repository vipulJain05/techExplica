import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../course';
import { DataService } from '../data.service';
import { VideoCourse } from '../video-course';
import { HttpModule,Http } from '@angular/http';
import { async } from 'rxjs/internal/scheduler/async';
import { FileLoc } from '../file-loc';
@Component({
  selector: 'app-video-course-description',
  templateUrl: './video-course-description.component.html',
  styleUrls: ['./video-course-description.component.scss']
})
export class VideoCourseDescriptionComponent implements OnInit {
course;
video;finalAmount;
video_course:VideoCourse[];
video_data:FileLoc[];
amount;
uploadDIR = './api/video/';
tid;
path = this.uploadDIR;

  constructor(private route:ActivatedRoute,private _dataService:DataService,private _http:Http) { 
    this.tid=this.route.snapshot.params.tid;
    
  }

  ngOnInit() {
    this._dataService.getvideobyID(this.tid)
    .subscribe(video_course => {
      this.video_course = video_course;
      console.log(this.video_course);
      this.amount=video_course[0].final_amount;
    });

console.log("video.ts");
    this._dataService.getvideoData(this.tid)
    .subscribe(video_data => { this.video_data = video_data;
      console.log(video_data[0].file_loc);
      console.log(this.path);
    this.path = this.path + this.video_data[0].file_loc; 
    console.log(this.path);
  });

  }

  payment(){
    //var obj = {"amount": this.amount};
    this._http.post('api/payment', {"amount": this.amount})
    .subscribe(data => {console.log(data);
      window.location.href= data.url;
    });
};

}
