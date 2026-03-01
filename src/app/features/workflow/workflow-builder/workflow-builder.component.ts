import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkflowService } from '../../../core/services/workflow.service';
import { WorkflowNode, NodeType, WorkflowConnection } from '../../../core/models/workflow.model';

@Component({
  selector: 'app-workflow-builder',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule
  ],
  templateUrl: './workflow-builder.component.html',
  styleUrls: ['./workflow-builder.component.scss']
})
export class WorkflowBuilderComponent {
  workflowService = inject(WorkflowService);
  private snackBar = inject(MatSnackBar);

  availableNodes: NodeType[] = [
    'Decision Node',
    'Training Node',
    'Payment Node',
    'Certification Node',
    'Interview Node',
    'Hiring Node'
  ];

  nodes$ = this.workflowService.nodes$;
  connections$ = this.workflowService.connections$;

  connectingSourceNode: WorkflowNode | null = null;
  mousePos = { x: 0, y: 0 };

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.connectingSourceNode) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mousePos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      // New node dropped from palette
      const nodeType = event.item.data as NodeType;
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();

      // Calculate drop position relative to canvas
      const px = event.dropPoint.x - rect.left - 75; // 75 is half width
      const py = event.dropPoint.y - rect.top - 25; // 25 is half height

      this.workflowService.addNode(nodeType, px, py);
    }
  }

  onNodeDragEnded(event: CdkDragEnd, node: WorkflowNode) {
    const position = event.source.getFreeDragPosition();
    // Update model with new position
    this.workflowService.updateNodePosition(node.id, node.x + position.x, node.y + position.y);
    // Reset local drag position to avoid compound translation offsets
    event.source.reset();
  }

  startConnection(node: WorkflowNode, event: MouseEvent) {
    event.stopPropagation();
    this.connectingSourceNode = node;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mousePos = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  completeConnection(node: WorkflowNode, event: MouseEvent) {
    event.stopPropagation();
    if (this.connectingSourceNode && this.connectingSourceNode.id !== node.id) {
      this.workflowService.addConnection(this.connectingSourceNode.id, node.id);
    }
    this.connectingSourceNode = null;
  }

  cancelConnection() {
    this.connectingSourceNode = null;
  }

  deleteNode(nodeId: string, event: MouseEvent) {
    event.stopPropagation();
    this.workflowService.removeNode(nodeId);
  }

  deleteConnection(connId: string) {
    this.workflowService.removeConnection(connId);
  }

  // SVG Helper
  getCurvedPath(x1: number, y1: number, x2: number, y2: number): string {
    // Basic bezier curve algorithm
    const cp1x = x1 + (x2 - x1) / 2;
    const cp1y = y1;
    const cp2x = x1 + (x2 - x1) / 2;
    const cp2y = y2;
    return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
  }

  getNodeById(id: string): WorkflowNode | undefined {
    return this.workflowService.nodes.find(n => n.id === id);
  }

  save() {
    const json = this.workflowService.saveWorkflow();
    console.log(json);
    this.snackBar.open('Workflow saved! (Check console for JSON)', 'Close', { duration: 3000 });
  }

  load() {
    // Dummy JSON load representation
    const jsonStr = `{"id":"wf_latest","name":"Custom Workflow","nodes":[{"id":"node_1","type":"Training Node","label":"Training Node","x":100,"y":100,"config":{}},{"id":"node_2","type":"Decision Node","label":"Decision Node","x":300,"y":200,"config":{}}],"connections":[{"id":"conn_1","sourceId":"node_1","targetId":"node_2"}]}`;
    this.workflowService.loadWorkflow(jsonStr);
    this.snackBar.open('Sample Workflow loaded!', 'Close', { duration: 3000 });
  }
}
