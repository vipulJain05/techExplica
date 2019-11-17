import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
heading;
  constructor(private route: ActivatedRoute) {
    this.heading = this.route.snapshot.params.heading;
   }

  ngOnInit() {
  }

}
