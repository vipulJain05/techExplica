import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';
import{User} from '../user';
import * as $ from 'jquery';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users:User[];
  title = 'app';
  applied = true;
  _showModal = false;
  model:any = {};
  isAdmin;login;

  constructor(private _DataService: DataService,private router: Router) {}
  

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




 }
register() {
    // if(this.model.Username||this.model.email_id || this.model.Password ||this.model.School||this.model.phone||this.model.line1||this.model.line2||this.model.city||this.model.state||this.model.pincode||this.model.interest=="NULL")
    // {
    //     alert("Every field is required");
    //     alert(this.model.Username);
    // }
    // else
    // {
    if(this.model.Password!=this.model.Retype)
    {
        alert("please retype your password");
        //window.location.reload();
      return false;
    }
    else
    {

        //alert(" your password");
         this._DataService.register(this.model.Username,this.model.email_id, this.model.Password,this.model.School,this.model.phone,this.model.line1,this.model.line2,this.model.city,this.model.state,this.model.pincode,this.model.interest)
         .subscribe();
         this.router.navigate(['signin']);
        return false;
    }
}
}
