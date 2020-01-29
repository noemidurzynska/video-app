import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { VideoModel, Source } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  public videos: VideoModel[] = [];
  public allVideos: VideoModel[] = [];
  viewModeValue = 'metro';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.loadVideos();
  }

  public onViewChange(viewMode: any): void {
    this.viewModeValue = viewMode.value;
    this.loadVideos();
  }
  private loadVideos(): void {
    const videoList = this.storage.get('video-list');
    this.allVideos = [];

    videoList.forEach(video => {
      const videoModel = new VideoModel();
      videoModel.id = video.id;
      if (video.source === Source.Youtube) {
        videoModel.source = 'Youtube';
        videoModel.playesCount = video.playesCount;
      } else if (video.source === Source.Vimeo) {
        videoModel.source = 'Vimeo';
        videoModel.playesCount = 'unknown';
      }
      videoModel.title = video.title;
      videoModel.date = video.date;
      videoModel.image = video.image;
      videoModel.likesCount = video.likesCount;
      if (this.viewModeValue === 'metro') {
        videoModel.cols = 2;
      } else {
        videoModel.cols = 4;
      }
      videoModel.rows = 1;

      this.allVideos.push(videoModel);
    });

    this.sliceVideo();
    this.length = this.videos.length;
  }

  public onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sliceVideo();
  }

  private sliceVideo(): void{
    this.videos = this.allVideos.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }
}
