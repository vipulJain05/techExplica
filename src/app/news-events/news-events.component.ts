import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NewsEvent } from '../news-event';

@Component({
  selector: 'app-news-events',
  templateUrl: './news-events.component.html',
  styleUrls: ['./news-events.component.scss']
})
export class NewsEventsComponent implements OnInit {
heading : NewsEvent[];
event_day:NewsEvent[];
short_desc:NewsEvent[];
long_desc:NewsEvent[];
status:NewsEvent[];
  

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  news_events()
  {
    this.dataService.news_events(this.event_day,this.heading,this.short_desc,this.long_desc)
    .subscribe();
    window.location.reload();
  }

}
