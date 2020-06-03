import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SortEnum } from '@core/enums/sort.enum';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less'],
})
export class ControlPanelComponent {
  @Input() public sort: SortEnum;
  @Input() public fav: boolean;

  @Output() public sortChange = new EventEmitter();
  @Output() public favChange = new EventEmitter();
  @Output() public changeViewEvent = new EventEmitter<string>();
  @Output() public loadVideoEvent = new EventEmitter();

  public onViewChange(viewMode: string): void {
    this.changeViewEvent.emit(viewMode);
  }

  public onFavoriteShow(showFav: boolean): void {
    this.favChange.emit(showFav);
    this.loadVideoEvent.emit();
  }

  public onSortClick(sort: SortEnum): void {
    this.sortChange.emit(sort);
    this.loadVideoEvent.emit();
  }
}
