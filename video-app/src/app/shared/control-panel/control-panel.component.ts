import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SortEnum } from '@core/enums/sort.enum';
import { ViewModeEnum } from '@core/enums/view-mode.enum';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.less'],
})
export class ControlPanelComponent {
  @Input() public sort: SortEnum;
  @Input() public fav: boolean;
  @Input() public view: ViewModeEnum;

  @Output() public sortChange = new EventEmitter<SortEnum>();
  @Output() public viewChange = new EventEmitter<ViewModeEnum>();
  @Output() public favChange = new EventEmitter<boolean>();
  @Output() public loadVideoEvent = new EventEmitter();

  public onViewChange(viewMode: ViewModeEnum): void {
    this.viewChange.emit(viewMode);
    this.loadVideoEvent.emit();
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
