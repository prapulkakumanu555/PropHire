import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { User, Role } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiService = inject(ApiService);
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(email: string, role: Role): Observable<User> {
        return this.apiService.get<User[]>('users').pipe(
            delay(500),
            map((users: User[]) => {
                const searchEmail = email.trim().toLowerCase();
                const user = users.find(u => u.email.toLowerCase() === searchEmail && u.role === role);
                if (user) {
                    localStorage.setItem('token', 'dummy-jwt-token-for-' + user.id);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                } else {
                    throw new Error('Invalid credentials');
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    hasRole(role: Role): boolean {
        const user = this.currentUserValue;
        return user ? user.role === role : false;
    }
}
