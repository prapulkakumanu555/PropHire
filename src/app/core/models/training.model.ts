export type TrainingType = 'Computer Skills' | 'Business Skills' | 'Logic Skills';
export type PayerType = 'PropHire' | 'Client' | 'Trainee';

export interface TrainingCourse {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    fullDescription?: string;
    duration?: string;
    instructor?: string;
}
