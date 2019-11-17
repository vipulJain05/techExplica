import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";
import{User} from './user';
import { Course } from './course';
import { TextCourse } from './text-course';
import { VideoCourse } from './video-course';
import { Payment } from './payment';
import { Category } from './category';
import { Contact } from './contact';
import { FileLoc } from './file-loc';
import { NewsEvent } from './news-event';
import { Faculty } from './faculty';
import { stringify } from '@angular/core/src/util';
@Injectable()
export class DataService {
  result:any;

  constructor(private _http: Http) { }

  getData():Observable<User[]>{

    return this._http.get('api/list')
    .map((response:Response)=><User[]>response.json())
    .do(data1=> console.log(JSON.stringify(data1)));
  }
  checkLoginFromServer(email_id:String,Password:String):Observable<User[]>{
    return this._http.post("api/check-login",{email_id,Password})
    .map(response => <User[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }

  register(Username:String,email_id:String,Password:String,School:String,phone:number,line1:String,line2:String,city:String,state:String,pincode:Number,interest:String):Observable<User[]>{
    return this._http.post("api/register",{Username,email_id,Password,School,phone,line1,line2,city,state,pincode,interest})
    .map(response => <User[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }


  regcontact(data):Observable<User[]>{
    return this._http.post("api/contact",data)
    .map(response => <User[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }


  course():Observable<Course[]>{
    return this._http.get("/api/courselist")
      .map((response:Response) => <Course[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  }

  addCourse(course:any,subject_code:any,description: any):Observable<Course[]>{
    return this._http.post("api/addCourse",{course,subject_code,description})
    .map(response => <Course[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }
  addTextCourse(courseSelect:any,topic_name:any,sub_topic:any,special_note: any,content:any):Observable<TextCourse[]>{
    return this._http.post("api/addTextCourse",{courseSelect,topic_name,sub_topic,special_note,content})
    .map(response => <TextCourse[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }

  addVideoCourse(video_name:any,video_description:any,price:any,discount:any,discount_days:any):Observable<VideoCourse[]>{
    return this._http.post("api/addVideoCourse",{video_name,video_description,price,discount,discount_days})
    .map(response => <VideoCourse[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
  }
  getvideo():Observable<VideoCourse[]> {    
    return this._http.get("/api/getvideoCourse")
      .map((response:Response) => <VideoCourse[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
  } 
  getvideoCourseData():Observable<VideoCourse[]> {    
    return this._http.get("/api/getvideoCourse")
      .map((response:Response) => <VideoCourse[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
}
CourseContent(videoCourse:String):Observable<Course[]> {    
  return this._http.post("/api/getContentByCourse",{videoCourse})
    .map((response:Response) => <Course[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
}
getvideobyID(tid:Number):Observable<VideoCourse[]>{
  alert("in data service"+tid);
  return this._http.post("/api/getvideobyID",{tid})
    .map((response:Response) => <VideoCourse[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
}

payment():Observable<Payment[]>
{
  return this._http.get("/api/payment")
      .map((response:Response) => <Payment[]> response.json())
      .do(data => console.log(JSON.stringify(data)));
}

addCategory(type:any,categoryName:any):Observable<Category[]>
{
  alert(type);
  return this._http.post("api/addCategory",{type,categoryName})
    .map(response => <Category[]> response.json())
    .do(data => console.log(JSON.stringify(data)));
}
getCategory():Observable<Category[]>
{
  return this._http.get("/api/getCategory")
      .map((response:Response) => <Category[]> response.json())
      .do(data => console.log(JSON.stringify(data)));

}
tutorial(cid:Number,name:any,refer_link:any,price:any,discount:any,discount_days:any,type:any,text_content:any):Observable<Course[]>
{
  return this._http.post("/api/tutorial",{cid,name,refer_link,price,discount,discount_days,type,text_content})
  .map(response => <Course[]>response.json())
  .do(data => console.log(JSON.stringify(data)));
}

contact(name:String,email:String,school:String,phone:Number,message:String):Observable<Contact[]>
{
  alert("school"+school);
  return this._http.post("/api/contactStore",{name,email,school,phone,message})
  .map(response => <Contact[]> response.json())
  .do(data => console.log(JSON.stringify(data)));
}

news_events(event_day:any,heading:any,short_desc:any,long_desc:any):Observable<NewsEvent[]>
{
  return this._http.post("/api/news_events",{event_day,heading,short_desc,long_desc})
  .map(response => <NewsEvent[]> response.json())
  .do(data => console.log(JSON.stringify(data)));
}

news():Observable<NewsEvent[]>
{
  return this._http.get("/api/getnews")
  .map(response => <NewsEvent[]> response.json())
  .do(data => console.log(JSON.stringify(data)));
}
getEvent(heading:any):Observable<NewsEvent[]>
{
  return this._http.post("/api/getEvent",{heading})
.map((response:Response) => <NewsEvent[]> response.json())
.do(data => console.log(JSON.stringify(data)));
}

getCourseData(cid:Number):Observable<Course[]>
{
  return this._http.post("/api/getCourseData",{cid})
  .map(response => <Course[]> response.json())
  .do(data => console.log(JSON.stringify(data)));
}

getUserNumber():Observable<User[]>
{
  return this._http.get("/api/getUserNumber")
  .map((response:Response) => <User[]> response.json())
  .do(data => console.log(JSON.stringify(data)));
}

getcourseNumber():Observable<Course[]>
{
  return this._http.get("/api/getcourseNumber")
  .map((response:Response) => <Course[]> response.json())
  .do(data => console.log(JSON.stringify(data)));
}

//text course data from side nav

textCourseData(sideData:any):Observable<Course[]>
{
  alert("inside data service"+sideData);
  return this._http.post("/api/textCourseData",{sideData})
  .map(response => <Course[]> response.json())
  .do(data => console.log(JSON.stringify(data)))};

  getvideoData(tid:Number):Observable<FileLoc[]>
{
  return this._http.post("/api/getvideoData",{tid})
  .map(response => <FileLoc[]> response.json())
  .do(data => console.log(data));
}
getfacultyNumber():Observable<Faculty[]>
{
  return this._http.get("api/getfacultyNumber")
  .map(response => <Faculty[]> response.json())
  .do(data => console.log(JSON.stringify(data)));
}

// list of dropdown

getList(getItem:any):Observable<Course[]>
{
  console.log("jdjfkfs");
  return this._http.post('/api/getList',{getItem})
  .map(response => <Course[]> response.json());
}

}

