import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Video } from '@core/models/video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
})
export class VideoComponent {
  @Input() public video: Video;

  @Output() public playEvent = new EventEmitter<Video>();
  @Output() public changeFavEvent = new EventEmitter<Video>();
  @Output() public deleteEvent = new EventEmitter<Video>();

  public onPlayClick(video: Video): void {
    this.playEvent.emit(video);
  }

  public onChangeFavClick(video: Video): void {
    this.changeFavEvent.emit(video);
  }

  public onDeleteClick(video: Video): void {
    this.deleteEvent.emit(video);
  }
}
