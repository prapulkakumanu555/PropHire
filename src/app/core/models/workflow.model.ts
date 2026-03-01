export type NodeType = 'Decision Node' | 'Training Node' | 'Payment Node' | 'Certification Node' | 'Interview Node' | 'Hiring Node';

export interface WorkflowNode {
    id: string;
    type: NodeType;
    label: string;
    x: number;
    y: number;
    config?: any; // Additional configuration specific to the node type
}

export interface WorkflowConnection {
    id: string;
    sourceId: string;
    targetId: string;
    label?: string; // e.g., 'Yes', 'No', 'Pass', 'Fail'
}

export interface Workflow {
    id: string;
    name: string;
    projectId?: string;
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
}
