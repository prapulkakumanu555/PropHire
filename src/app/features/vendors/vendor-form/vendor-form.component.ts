import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Vendor } from '../../../core/models/vendor.model';

@Component({
    selector: 'app-vendor-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    templateUrl: './vendor-form.component.html',
    styleUrl: './vendor-form.component.scss'
})
export class VendorFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<VendorFormComponent>);

    vendorForm: FormGroup;
    isEdit = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Vendor | null) {
        this.vendorForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            company: ['', Validators.required],
            status: ['Active', Validators.required]
        });

        if (data) {
            this.isEdit = true;
            this.vendorForm.patchValue(data);
        }
    }

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.vendorForm.valid) {
            this.dialogRef.close(this.vendorForm.value);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
