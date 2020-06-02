import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.less'],
})
export class JumbotronComponent {
  @Input() public leadText: string;
  @Input() public leadTitle: string;
  @Input() public expandedText: string;

  @Output() public addDefaultEvent = new EventEmitter<void>();

  public onAddDefaultClick(): void {
    this.addDefaultEvent.emit();
  }
}
