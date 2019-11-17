import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NewsEvent } from '../news-event';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
news:NewsEvent[];
read_more:String;
heading:NewsEvent[];
full_news:NewsEvent[];
  constructor(private _dataService:DataService,private router:Router) { }

  ngOnInit() {
    


    setInterval(function() {
      $('#slideshow > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#slideshow');
    }, 3000)
 

    this._dataService.news()
    .subscribe(news =>{this.news=news});
  }



  //multiple

  














  

  goToEvent(read_more)
  {
   this._dataService.getEvent(read_more)
    .subscribe(full_news => {this.full_news = full_news;
      console.log(this.full_news);
  });
  }

 



}
