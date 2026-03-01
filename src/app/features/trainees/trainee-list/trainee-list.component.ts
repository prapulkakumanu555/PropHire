import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import { Trainee, TraineeStage } from '../../../core/models/trainee.model';

@Component({
  selector: 'app-trainee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, MatIconModule],
  templateUrl: './trainee-list.component.html',
  styleUrls: ['./trainee-list.component.scss']
})
export class TraineeListComponent implements OnInit {
  private apiService = inject(ApiService);

  trainees: Trainee[] = [];
  displayedColumns: string[] = ['name', 'email', 'stage'];

  stages: TraineeStage[] = [
    'Sourced', 'Training Assigned', 'Training Completed', 'Certified',
    'Interviewed', 'Shortlisted', 'Offer Released', 'Hired'
  ];

  ngOnInit() {
    this.apiService.get<Trainee[]>('trainees').subscribe(data => this.trainees = data);
  }

  getStageColor(stage: TraineeStage): string {
    switch (stage) {
      case 'Hired': return 'accent';
      case 'Sourced': return '';
      default: return 'primary';
    }
  }
}
