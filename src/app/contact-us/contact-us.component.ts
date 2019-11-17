import { Component, OnInit } from '@angular/core';
//import swal from 'sweetalert';
import { $ } from '../../../node_modules/protractor';
import {DataService} from '../data.service';
  

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
 
  model:any = {};
  constructor(private _DataService: DataService) { }

  ngOnInit() {
   }

   testContact(){
    
     var data = {};
   data['email'] = this.model.email;
   data['name'] = this.model.name;
   data['school'] = this.model.school;
   data['phone'] = this.model.phone;
   data['text'] = this.model.text;

   this._DataService.regcontact(data)
   .subscribe(data => {
       if (data.length == 0) {
           alert("error login");
       }
       
      });
      
      // this._DataService.contact(this.model.name,this.model.email,this.model.school,this.model.phone,this.model.message)
      // .subscribe();
   }

}
