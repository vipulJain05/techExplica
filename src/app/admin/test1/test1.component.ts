import { Component, OnInit,  ElementRef } from '@angular/core';
import { Course } from '../../course';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

const URL = '/api/upload';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {
name:Course[];
refer_link:Course[];
price:Course[];
discount:Course[];
discount_till:Course[];
text_content:Course[];
course:Course[];
type;cid;
video;text;
  constructor(private _dataService:DataService,private router:Router, private http:Http,  private el: ElementRef) { }

  ngOnInit() {



    

    $(document).ready(function () {
        var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn'),
            allPrevBtn = $('.prevBtn');
    
        allWells.hide();
    
        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);
    
            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-indigo').addClass('btn-default');
                $item.addClass('btn-indigo');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });
    
        allPrevBtn.click(function(){
            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                prevStepSteps = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
    
                prevStepSteps.removeAttr('disabled').trigger('click');
        });
    
        allNextBtn.click(function(){
            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input[type='text'],input[type='url']"),
                isValid = true;
    
            $(".form-group").removeClass("has-error");
            for(var i=0; i< curInputs.length; i++){
                if (!curInputs[i]){
                    isValid = false;
                    $(curInputs[i]).closest(".form-group").addClass("has-error");
                }
            }
    
            if (isValid)
                nextStepWizard.removeAttr('disabled').trigger('click');
        });
    
        $('div.setup-panel div a.btn-indigo').trigger('click');
    });
    

















//this.showProductData = false;
this._dataService.course()
.subscribe(course => {this.course = course;


  }
);
  }
tutorial()
{
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('photo', inputEl.files.item(0));
            //call the angular http method
            this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.this line is commented default
                .post(URL, formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response this line is commented default
                 (success) => {
                         alert(success);
                },
                (error) => alert(error)
      )
           }
  this._dataService.tutorial(this.cid,this.name,this.refer_link,this.price,this.discount,this.discount_till,this.type,this.text_content)
  .subscribe();
    //this.router.navigate(['/tutorial']);
    //window.location.reload();

}
goChange(type)
{
    alert(type)
  if(type=='video')
  {
      this.video=true;
      
  }
  else if(type=='text')
  {
      this.video=false;
  }
  else if(type=='sample papers')
  {
      alert("hello")
      this.video==false;
  }
  
}




// upload() {
//   //locate the file element meant for the file upload.
//       let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
//   //get the total amount of files attached to the file input.
//       let fileCount: number = inputEl.files.length;
//   //create a new fromdata instance
//       let formData = new FormData();
//   //check if the filecount is greater than zero, to be sure a file was selected.
//       if (fileCount > 0) { // a file was selected
//           //append the key name 'photo' with the first file in the element
//               formData.append('photo', inputEl.files.item(0));
//           //call the angular http method
//           this.http
//       //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
//               .post(URL, formData).map((res:Response) => res.json()).subscribe(
//               //map the success function and alert the response
//                (success) => {
//                        alert(success);
//               },
//               (error) => alert(error)
//     )
//          }
//      }

     changeDrop(cid)
     {
         this.cid=cid;
     }

}
