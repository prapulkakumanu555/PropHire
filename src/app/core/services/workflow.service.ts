import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkflowNode, WorkflowConnection, NodeType, Workflow } from '../models/workflow.model';

@Injectable({
    providedIn: 'root'
})
export class WorkflowService {
    private nodesSubject = new BehaviorSubject<WorkflowNode[]>([]);
    public nodes$ = this.nodesSubject.asObservable();

    private connectionsSubject = new BehaviorSubject<WorkflowConnection[]>([]);
    public connections$ = this.connectionsSubject.asObservable();

    constructor() { }

    get nodes() { return this.nodesSubject.value; }
    get connections() { return this.connectionsSubject.value; }

    addNode(type: NodeType, x: number, y: number) {
        const newNode: WorkflowNode = {
            id: `node_${new Date().getTime()}`,
            type,
            label: type,
            x,
            y,
            config: {}
        };
        this.nodesSubject.next([...this.nodes, newNode]);
    }

    updateNodePosition(id: string, x: number, y: number) {
        const updated = this.nodes.map(n => n.id === id ? { ...n, x, y } : n);
        this.nodesSubject.next(updated);
    }

    addConnection(sourceId: string, targetId: string) {
        // Prevent self connection
        if (sourceId === targetId) return;

        // Prevent exact duplicate connections
        if (this.connections.some(c => c.sourceId === sourceId && c.targetId === targetId)) return;

        const newConnection: WorkflowConnection = {
            id: `conn_${new Date().getTime()}`,
            sourceId,
            targetId
        };
        this.connectionsSubject.next([...this.connections, newConnection]);
    }

    removeNode(id: string) {
        this.nodesSubject.next(this.nodes.filter(n => n.id !== id));
        // Remove orphaned connections
        this.connectionsSubject.next(this.connections.filter(c => c.sourceId !== id && c.targetId !== id));
    }

    removeConnection(id: string) {
        this.connectionsSubject.next(this.connections.filter(c => c.id !== id));
    }

    saveWorkflow(): string {
        const workflow: Workflow = {
            id: 'wf_latest',
            name: 'Custom Workflow',
            nodes: this.nodes,
            connections: this.connections
        };
        return JSON.stringify(workflow);
    }

    loadWorkflow(jsonStr: string) {
        try {
            const workflow: Workflow = JSON.parse(jsonStr);
            this.nodesSubject.next(workflow.nodes || []);
            this.connectionsSubject.next(workflow.connections || []);
        } catch (e) {
            console.error('Failed to parse workflow', e);
        }
    }

    clear() {
        this.nodesSubject.next([]);
        this.connectionsSubject.next([]);
    }
}
