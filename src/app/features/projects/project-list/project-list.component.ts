import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { Project } from '../../../core/models/project.model';
import { ProjectStepperComponent } from '../project-stepper/project-stepper.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  private apiService = inject(ApiService);
  private dialog = inject(MatDialog);

  projects: Project[] = [];
  displayedColumns: string[] = ['name', 'type', 'status', 'createdAt'];

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.apiService.get<Project[]>('projects').subscribe(data => {
      this.projects = data;
    });
  }

  openProjectStepper() {
    const dialogRef = this.dialog.open(ProjectStepperComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjects();
      }
    });
  }
}
