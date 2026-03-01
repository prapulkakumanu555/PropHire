import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Vendor } from '../../../core/models/vendor.model';
import { VendorService } from '../../../core/services/vendor.service';
import { VendorFormComponent } from '../vendor-form/vendor-form.component';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.scss'
})
export class VendorListComponent implements OnInit {
  private vendorService = inject(VendorService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'email', 'phone', 'company', 'status', 'actions'];
  dataSource = new MatTableDataSource<Vendor>();

  // Combined filter object
  filters = {
    search: '',
    status: 'All'
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.setupFilterPredicate();
    this.loadVendors();
  }

  setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: Vendor, filter: string) => {
      try {
        const filterValues = JSON.parse(filter);
        const matchStatus = filterValues.status === 'All' || data.status === filterValues.status;
        const matchSearch = !filterValues.search ||
          data.name.toLowerCase().includes(filterValues.search) ||
          data.email.toLowerCase().includes(filterValues.search) ||
          data.company.toLowerCase().includes(filterValues.search);
        return matchStatus && matchSearch;
      } catch (e) {
        return true;
      }
    };
  }

  loadVendors(): void {
    this.vendorService.getVendors().subscribe({
      next: (vendors) => {
        this.dataSource.data = vendors;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading vendors', err);
        this.snackBar.open('Error loading vendors', 'Close', { duration: 3000 });
      }
    });
  }

  applySearch(event: Event): void {
    this.filters.search = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilters();
  }

  onStatusChange(status: string): void {
    this.filters.status = status;
    this.applyFilters();
  }

  applyFilters(): void {
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  openVendorForm(vendor?: Vendor): void {
    const dialogRef = this.dialog.open(VendorFormComponent, {
      width: '500px',
      data: vendor || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (vendor) {
          this.vendorService.updateVendor(vendor.id, { ...vendor, ...result }).subscribe({
            next: () => {
              this.snackBar.open('Vendor updated successfully', 'Close', { duration: 3000 });
              this.loadVendors();
            },
            error: (err) => {
              console.error('Error updating vendor', err);
              this.snackBar.open('Error updating vendor', 'Close', { duration: 3000 });
            }
          });
        } else {
          this.vendorService.addVendor(result).subscribe({
            next: () => {
              this.snackBar.open('Vendor added successfully', 'Close', { duration: 3000 });
              this.loadVendors();
            },
            error: (err) => {
              console.error('Error adding vendor', err);
              this.snackBar.open('Error adding vendor', 'Close', { duration: 3000 });
            }
          });
        }
      }
    });
  }

  deleteVendor(id: number | string): void {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.vendorService.deleteVendor(id).subscribe({
        next: () => {
          this.snackBar.open('Vendor deleted successfully', 'Close', { duration: 3000 });
          this.loadVendors();
        },
        error: (err) => {
          console.error('Error deleting vendor', err);
          this.snackBar.open('Error deleting vendor', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
