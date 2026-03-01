import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TrainingCourse } from '../models/training.model';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    // Base URL for backend API (placeholder)
    private apiUrl = 'api/trainings';

    private courses: TrainingCourse[] = [
        {
            id: 'course-1',
            title: 'Angular Professional',
            description: 'Master Angular fundamentals and advanced concepts to build scalable web applications.',
            fullDescription: 'This comprehensive course covers everything from basic component structure to advanced state management with NgRx. You will learn how to build large-scale applications with industry best practices.',
            imageUrl: '/assets/images/angular.jpeg',
            duration: '40 Hours',
            instructor: 'Dr.Neelima',
        },
        {
            id: 'course-2',
            title: 'Workflow Automation',
            description: 'Learn how to automate complex business processes using our advanced workflow engine.',
            fullDescription: 'Understand the core principles of BPMN 2.0 and how to implement custom workflow nodes using our proprietary engine. Perfect for account managers looking to streamline client operations.',
            imageUrl: '/assets/images/WFA.jpg',
            duration: '25 Hours',
            instructor: 'Dr.Surya',
        },
        {
            id: 'course-3',
            title: 'UI/UX Design Systems',
            description: 'Deep dive into creating consistent and accessible user interfaces with Material Design.',
            fullDescription: 'Focus on user-centric design principles. Learn how to create themeable components using Angular Material and CSS Custom Properties while maintaining WCAG 2.1 accessibility standards.',
            imageUrl: '/assets/images/images.png',
            duration: '30 Hours',
            instructor: 'Dr.Lavanya',
        },
        {
            id: 'course-4',
            title: 'Backend Scalability',
            description: 'Strategies for building robust and performant backend services for enterprise users.',
            fullDescription: 'Explore microservices architecture, database optimization, and caching strategies. Learn how to handle high concurrency and ensure data consistency in distributed systems.',
            imageUrl: '/assets/images/backend.jpeg',
            duration: '35 Hours',
            instructor: 'Dr.Venkat Narayana',
        }
    ];

    constructor(private http: HttpClient) { }

    /**
     * Fetch all courses.
     * Logic: If API is available, fetch from there. Otherwise, use local mock data.
     */
    getCourses(): Observable<TrainingCourse[]> {
        // For local mockup/static data:
        return of(this.courses);

        // For Real Backend Integration:
        // return this.http.get<TrainingCourse[]>(this.apiUrl);
    }

    /**
     * Fetch a single course by ID.
     */
    getCourseById(id: string): Observable<TrainingCourse | undefined> {
        const course = this.courses.find(c => c.id === id);
        return of(course);

        // For Real Backend Integration:
        // return this.http.get<TrainingCourse>(`${this.apiUrl}/${id}`);
    }
}
