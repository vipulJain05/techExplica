import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCourseComponent } from './text-course.component';

describe('TextCourseComponent', () => {
  let component: TextCourseComponent;
  let fixture: ComponentFixture<TextCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
