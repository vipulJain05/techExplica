import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Course } from '../course';
import { Faculty } from '../faculty';
import { DataService } from '../data.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  userNumber:User[];
  Users;
  courseCount:Course[];
  courseNumber;
  facultyNumber:Faculty[]; //changes
  facultyCount;
  constructor(private _dataService:DataService) { }

  ngOnInit() {
    this._dataService.getUserNumber()
    .subscribe(userNumber => {this.userNumber = userNumber;
    this.Users=userNumber[0].userNumber;
  });
  this._dataService.getcourseNumber()
  .subscribe(courseCount => {this.courseCount = courseCount;
  this.courseNumber=courseCount[0].courseCount;
});


/*total faculty changes*/
  this._dataService.getfacultyNumber()
  .subscribe(facultyNumber => {this.facultyNumber = facultyNumber;
  this.facultyCount = facultyNumber[0].facultyNumber;
});
}

}
