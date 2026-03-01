import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import { Client } from '../../../core/models/client.model';
import { TrainingType, PayerType } from '../../../core/models/training.model';

@Component({
  selector: 'app-project-stepper',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './project-stepper.component.html',
  styleUrls: ['./project-stepper.component.scss']
})
export class ProjectStepperComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private dialogRef = inject(MatDialogRef<ProjectStepperComponent>);

  clients: Client[] = [];

  detailsForm = this.fb.group({
    name: ['', Validators.required],
    type: ['On-site' as 'On-site' | 'Off-site', Validators.required],
    clientId: ['', Validators.required]
  });

  trainingForm = this.fb.group({
    trainings: this.fb.array([])
  });

  trainingTypes: TrainingType[] = ['Computer Skills', 'Business Skills', 'Logic Skills'];
  payerTypes: PayerType[] = ['PropHire', 'Client', 'Trainee'];

  ngOnInit() {
    this.apiService.get<Client[]>('clients').subscribe(data => this.clients = data);
    this.addTraining(); // Start with one training entry
  }

  get trainings() {
    return this.trainingForm.get('trainings') as FormArray;
  }

  addTraining() {
    const group = this.fb.group({
      type: ['Computer Skills' as TrainingType, Validators.required],
      payer: ['PropHire' as PayerType, Validators.required],
      certificationRequired: [false]
    });
    this.trainings.push(group);
  }

  removeTraining(index: number) {
    this.trainings.removeAt(index);
  }

  // Business Logic Enforcement
  get isTrainingValid(): boolean {
    const type = this.detailsForm.get('type')?.value;
    const count = this.trainings.length;

    // If On-site → minimum 2 trainings mandatory
    if (type === 'On-site') {
      return count >= 2;
    }
    return true; // Off-site has no minimum
  }

  onSubmit() {
    if (this.detailsForm.valid && this.isTrainingValid) {
      const projectData = {
        ...this.detailsForm.value,
        trainings: this.trainingForm.value.trainings,
        status: 'Active',
        createdAt: new Date().toISOString()
      };

      this.apiService.post('projects', projectData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
