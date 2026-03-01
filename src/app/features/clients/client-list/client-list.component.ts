import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { Client } from '../../../core/models/client.model';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  private apiService = inject(ApiService);
  private dialog = inject(MatDialog);

  clients: Client[] = [];
  displayedColumns: string[] = ['name', 'industry', 'address', 'actions'];

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.apiService.get<Client[]>('clients').subscribe(data => {
      this.clients = data;
    });
  }

  openClientForm(client?: Client) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '500px',
      data: client || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }
}
