import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http'
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FeaturesComponent } from './features/features.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavComponent } from './nav/nav.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { AdminAddCourseComponent } from './admin/admin-add-course/admin-add-course.component';
import { AdminAddSubjectComponent } from './admin/admin-add-subject/admin-add-subject.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BehaveService} from './behave.service';
import { VideoCourseComponent } from './video-course/video-course.component';
import { VideoCourseDescriptionComponent } from './video-course-description/video-course-description.component';
import { FilterPipe } from './filter.pipe';
import { TextCourseComponent } from './text-course/text-course.component';
import { Test2Component } from './admin/test2/test2.component';
import { Test1Component } from './admin/test1/test1.component';
import { AddFacultyComponent } from './admin/add-faculty/add-faculty.component';
import { NewsEventsComponent } from './news-events/news-events.component';
import { NewsComponent } from './news/news.component';
import { NgxEditorModule } from 'ngx-editor';
import { QuillModule } from 'ngx-quill';


const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'home', component: HomeComponent},
  {path: 'news/:heading', component: NewsComponent},
  {path: 'features', component: FeaturesComponent},
  {path : 'about-us',component: AboutUsComponent},
  {path : 'signin/Register',component: RegisterComponent},
  {path : 'contact-us',component: ContactUsComponent},
  {path : 'not-found',component: NotFoundComponent},
  {path : 'news-events', component:NewsEventsComponent },
  {path : 'Admin-dashboard',component: AdminDashboardComponent},
  {path: 'User-Dashboard',component:UserDashboardComponent},
  {path: 'admin-add-course',component:AdminAddCourseComponent},
  {path: 'admin-add-subject',component:AdminAddSubjectComponent},
  {path: 'add-faculty',component:AddFacultyComponent},
  {path: 'video-course',component:VideoCourseComponent},
  {path : 'video-course-description/:tid',component: VideoCourseDescriptionComponent},
  {path : 'textCourse/:cid',component: TextCourseComponent},
  {path : 'tutorial',component: Test1Component},
  {path : 'category',component: Test2Component},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}

  
];
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    AboutUsComponent,
    FeaturesComponent,
    RegisterComponent,
    AdminDashboardComponent,
    ContactUsComponent,
    NavComponent,
    UserDashboardComponent,
    AdminAddCourseComponent,
    AdminAddSubjectComponent,
    NotFoundComponent,
    VideoCourseComponent,
    FilterPipe,
    VideoCourseDescriptionComponent,
    TextCourseComponent,
    Test2Component,
    Test1Component,
    AddFacultyComponent,
    NewsEventsComponent,
    NewsComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxEditorModule,
    QuillModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBc0e7OhI6XIXCgIE3ieFL4q7HHBlPYuYw'
    }),

    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),

    MDBBootstrapModule.forRoot()

  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [DataService,BehaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
