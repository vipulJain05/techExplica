import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Course } from '../../course';
@Component({
  selector: 'app-admin-add-subject',
  templateUrl: './admin-add-subject.component.html',
  styleUrls: ['./admin-add-subject.component.scss']
})
export class AdminAddSubjectComponent implements OnInit {

  constructor(private _dataService: DataService, private router: Router) { }
  course: Course[];
  subject_code: Course[];
  description: Course[];
  ngOnInit() {
  }

  addCourse() {
    this._dataService.addCourse(this.course, this.subject_code, this.description)
      .subscribe(course => {
        if (course.length == 0) {
          alert("error");
        }
        else {
          this.router.navigate(['Admin-dashboard']);
        }
      });
  }


}
