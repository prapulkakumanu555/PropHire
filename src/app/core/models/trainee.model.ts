export type TraineeStage =
    | 'Sourced'
    | 'Training Assigned'
    | 'Training Completed'
    | 'Certified'
    | 'Interviewed'
    | 'Shortlisted'
    | 'Offer Released'
    | 'Hired';

export interface Trainee {
    id: string;
    projectId: string;
    name: string;
    email: string;
    currentStage: TraineeStage;
    assignedTrainings: string[]; // training IDs
    completedTrainings: string[];
}
