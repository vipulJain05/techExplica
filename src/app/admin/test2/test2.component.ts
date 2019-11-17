import { Component, OnInit } from '@angular/core';
import { Category } from '../../category';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {
type;
category:Category[];
categoryName:Category[];
name:Category[];
  constructor(private _dataService:DataService,private router: Router) { }

  ngOnInit() {
    this._dataService.getCategory()
    .subscribe(category => {this.category = category;
    });  
  }
  goChange(name)
  {
    
    this.type=name;
    
  }

  addCategory(){
    this._dataService.addCategory(this.type,this.categoryName)
    .subscribe();
    this.router.navigate(['/category']);
  }
 

}
