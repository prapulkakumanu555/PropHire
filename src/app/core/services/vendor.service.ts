import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../models/vendor.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    private apiService = inject(ApiService);
    private endpoint = 'vendors';

    getVendors(): Observable<Vendor[]> {
        return this.apiService.get<Vendor[]>(this.endpoint);
    }

    getVendor(id: number | string): Observable<Vendor> {
        return this.apiService.get<Vendor>(`${this.endpoint}/${id}`);
    }

    addVendor(vendor: Omit<Vendor, 'id'>): Observable<Vendor> {
        return this.apiService.post<Vendor>(this.endpoint, vendor);
    }

    updateVendor(id: number | string, vendor: Vendor): Observable<Vendor> {
        return this.apiService.put<Vendor>(`${this.endpoint}/${id}`, vendor);
    }

    deleteVendor(id: number | string): Observable<any> {
        return this.apiService.delete(`${this.endpoint}/${id}`);
    }
}
