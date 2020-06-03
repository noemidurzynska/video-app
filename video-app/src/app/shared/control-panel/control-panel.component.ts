import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SortEnum } from '@core/enums/sort.enum';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less'],
})
export class ControlPanelComponent {
  @Input() public sort: SortEnum;
  @Output() public sortChange = new EventEmitter();

  @Output() public changeViewEvent = new EventEmitter<string>();
  @Output() public changeFavShowEvent = new EventEmitter<boolean>();
  @Output() public loadVideoEvent = new EventEmitter();

  public onViewChange(viewMode: string): void {
    this.changeViewEvent.emit(viewMode);
  }

  public onFavoriteShow(showFav: boolean): void {
    this.changeFavShowEvent.emit(showFav);
  }

  public onSortClick(sort: SortEnum): void {
    this.sortChange.emit(sort);
    this.loadVideoEvent.emit();
  }
}
