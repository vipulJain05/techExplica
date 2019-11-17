import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCourseDescriptionComponent } from './video-course-description.component';

describe('VideoCourseDescriptionComponent', () => {
  let component: VideoCourseDescriptionComponent;
  let fixture: ComponentFixture<VideoCourseDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCourseDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCourseDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
