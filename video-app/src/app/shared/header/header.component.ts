import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
  @Input() public leadText: string;
  @Input() public leadTitle: string;
  @Input() public expandedText: string;

  @Output() public addDefaultEvent = new EventEmitter<void>();

  public onAddDefaultClick(): void {
    this.addDefaultEvent.emit();
  }
}
