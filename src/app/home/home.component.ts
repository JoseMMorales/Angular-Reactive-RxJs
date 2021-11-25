import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { CoursesService } from '../services/courses.services';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private coursesStore: CoursesStore) {}


    /*
      Reload courses function is going to be handled by courseStore
      to control state management and avoiding duplicating same calls
      to the API
    */
  
    /*
      private courses: CoursesService, 
      private loadingService: LoadingService,
      private messagesService: MessagesService) {}
    */

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {

    /* 
      Comments in this function mean one way to add loading 
      functionality for home component when courses are being loaded
       //this.loadingService.loadingOn();
       //finalize(() => this.loadingService.loadingOff())

    */

   

  /*
    const courses$ = this.courses.loadAllCourses()
    .pipe(
      map(courses => courses.sort(sortCoursesBySeqNo)),
      catchError(err => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        return throwError(err);
      })
    );

    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

  this.beginnerCourses$ = loadCourses$
    .pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    );

    this.advancedCourses$ = loadCourses$
      .pipe(
        map(courses => courses.filter(course => course.category == "ADVANCED"))
    );
  */

    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");

    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");
  }
}




