import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Video } from '@core/models';

@Component({
  selector: 'app-video-data',
  templateUrl: './video-data.component.html',
  styleUrls: ['./video-data.component.less'],
})
export class VideoDataComponent {
  @Input() public video: Video;

  @Output() public playEvent = new EventEmitter<Video>();

  public onPlayClick(video: Video): void {
    this.playEvent.emit(video);
  }
}
