import { SigninComponent } from "./signin/signin.component";

export class Course {
    course : string;
    subject_code : string;
    description : string;
    name:string;
    refer_link:string;
    price:number;
    discount:number;
    discount_till:Date;
    type:string;
    text_content:string;
    sidedata:any;
    courseCount:number;
    constructor(course:string,subject_code : string,description : string,name:string,
    refer_link:string,
    price:number,
    discount:number,
    discount_till:Date,type:string,text_content:string,sideData:any,courseCount:number){
            this.course = course;
            this.subject_code=subject_code;
            this.description=description;
            this.name=name;
            this.refer_link=refer_link;
            this.price=price;
            this.discount=discount;
            this.discount_till=discount_till;
            this.type=type;
            this.text_content=text_content;
            this.sidedata=this.sidedata;
            this.courseCount=courseCount;
        }
}
