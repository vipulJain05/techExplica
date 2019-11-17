import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(course: any, term: any): any {
   console.log(course);
   
   if(term === undefined){
     return course;
   }
   return course.filter(function(product){     
     return product.Name.toLowerCase().includes(term.toLowerCase());
   })
  }

}
