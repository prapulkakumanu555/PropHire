import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../core/services/api.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private dialogRef = inject(MatDialogRef<ClientFormComponent>);

  clientForm = this.fb.group({
    name: ['', Validators.required],
    industry: ['', Validators.required],
    address: ['', Validators.required]
  });

  isEdit = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client | null) {
    if (data) {
      this.isEdit = true;
      this.clientForm.patchValue(data);
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      if (this.isEdit && this.data) {
        this.apiService.put(`clients/${this.data.id}`, { ...this.data, ...clientData }).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.apiService.post('clients', { ...clientData, contacts: [], createdAt: new Date().toISOString() }).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
