import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingCourse } from '../../../core/models/training.model';
import { TrainingService } from '../../../core/services/training.service';

@Component({
  selector: 'app-training-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './training-list.component.html',
  styleUrl: './training-list.component.scss'
})
export class TrainingListComponent implements OnInit {
  courses$: Observable<TrainingCourse[]> | undefined;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.courses$ = this.trainingService.getCourses();
  }
}
