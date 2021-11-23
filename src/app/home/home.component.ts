import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.services';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  beginnerCourse: Course[];

  advancedCourses$: Observable<Course[]>;

  advancedCourse: Course[];

  constructor(
    private courses: CoursesService, 
    private dialog: MatDialog) {

  }

  ngOnInit() {

    const courses$ = this.courses.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      );

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == "BEGINNER"))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == "ADVANCED"))
      );

      // Lo mismo pero con otra syntax 

    // this.courses.loadAllCourses()
    // .pipe(
    //       tap(courses => {
    //         const arr = courses.filter(course => course.category == "BEGINNER")
    //         const arr2 = courses.filter(course => course.category == "ADVANCED")
            
    //         this.beginnerCourses$ = of(arr)
    //         this.advancedCourses$ = of(arr2)
    //       })
    // ).subscribe()

  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }

}




