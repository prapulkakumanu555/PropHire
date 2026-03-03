import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User, Role } from '../models/user.model';
import { Client } from '../models/client.model';
import { Project } from '../models/project.model';
import { Vendor } from '../models/vendor.model';

@Injectable({
    providedIn: 'root'
})
export class MockDataService implements InMemoryDbService {
    createDb() {
        const users: User[] = [
            { id: '1', email: 'prapul@prophire.com', name: 'Prapul Kumar', role: 'CLIENT', img: '/assets/images/prapul.png' },
            { id: '2', email: 'venkat@prophire.com', name: 'Venkat', role: 'ACCOUNT_MANAGER', img: '/assets/images/venkat.png' },
            { id: '3', email: 'pavan@prophire.com', name: 'Pavan', role: 'ACCOUNT_MANAGER', img: '/assets/images/pavan.png' }
        ];

        const clients: Client[] = [
            { id: 101, name: 'Acme Corp', address: '123 Tech Ln', industry: 'Software', contacts: [], createdAt: new Date().toISOString() }
        ];

        const projects: Project[] = [
            { id: 1, name: 'Agentic AI', type: 'On-site', clientId: 101, status: 'Active', createdAt: new Date().toISOString() },
            { id: 2, name: 'Gemini AI', type: 'On-site', clientId: 102, status: 'Active', createdAt: new Date().toISOString() },
            { id: 3, name: 'Gen AI', type: 'On-site', clientId: 103, status: 'Active', createdAt: new Date().toISOString() },
            { id: 4, name: 'Anthropic AI', type: 'On-site', clientId: 104, status: 'Active', createdAt: new Date().toISOString() }
        ];
        const trainings: any[] = [
            { id: 't1', name: 'Java Training', type: 'Computer Skills', payer: 'PropHire', certificationRequired: true }
        ];
        const vendors: Vendor[] = [
            { id: 1, name: 'Ram', email: 'ram@ramtech.com', phone: '123-456-7890', company: 'Ram Tech', status: 'Active' },
            { id: 2, name: 'Rivert', email: 'Rivert@rivertsolutions.com', phone: '987-654-3210', company: 'Rivert Solutions', status: 'Inactive' },
            { id: 3, name: 'Zindal', email: 'Zindal@zindaltech.com', phone: '555-019-2837', company: 'Zindal Tech', status: 'Active' }
        ];
        const trainees: any[] = [
            { id: 'tr1', name: 'Naveen', email: 'naveen@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },
            { id: 'tr2', name: 'Santosh', email: 'santosh@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },
            { id: 'tr3', name: 'Vasanth', email: 'vasanth@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },
            { id: 'tr4', name: 'Akhil', email: 'akhil@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },
            { id: 'tr5', name: 'Chandra', email: 'chandra@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },
            { id: 'tr6', name: 'Prakash', email: 'prakash@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },
            { id: 'tr7', name: 'Pradeep', email: 'pradeep@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },
            { id: 'tr8', name: 'Ritesh', email: 'ritesh@gmail.com', currentStage: 'Sourced', assignedTrainings: ['t1'], completedTrainings: [] },


        ];
        const workflows: any[] = [];

        return { users, clients, projects, trainings, vendors, trainees, workflows };
    }
}
