import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { TrainingCourse } from '../../../core/models/training.model';
import { TrainingService } from '../../../core/services/training.service';

@Component({
    selector: 'app-training-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './training-detail.component.html',
    styleUrl: './training-detail.component.scss'
})
export class TrainingDetailComponent implements OnInit {
    course$: Observable<TrainingCourse | undefined> | undefined;

    constructor(
        private route: ActivatedRoute,
        private trainingService: TrainingService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.course$ = this.trainingService.getCourseById(id);
        }
    }
}
