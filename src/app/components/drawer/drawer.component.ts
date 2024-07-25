import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  @Input() title: string = '';
  @Output() drawerClosed = new EventEmitter<void>();

  closeDrawer(): void {
    this.drawerClosed.emit();
  }
}
