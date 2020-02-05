import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { VideoModel, Source, Video } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  public length = 0;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public videos: VideoModel[] = [];
  public allVideos: VideoModel[] = [];
  public videoList: Video[] = [];
  public viewModeValue = 'metro';
  public showFavValue = false;
  public favids: string[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.loadVideos();
  }

  public onViewChange(viewMode: any): void {
    this.viewModeValue = viewMode.value;
    this.loadVideos();
  }
  private loadVideos(): void {
    this.videoList = this.storage.get('video-list');
    let videoList = this.storage.get('video-list');
    if (!videoList) {
      return;
    }

    if (this.showFavValue) {
      videoList = videoList.filter(x => this.favids.indexOf(x.id) !== -1);
    }

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
      videoModel.urlCode = video.urlCode;
      const found = this.favids.find(x => x === video.id);
      if (found) {
        videoModel.fav = true;
      } else {
        videoModel.fav = false;
      }
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

  private sliceVideo(): void {
    this.videos = this.allVideos.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  public onAddToFavClick(video: VideoModel): void {
    this.favids.push(video.id);
    this.loadVideos();
  }

  public onRemoveFromFavClick(video: VideoModel): void {
    this.favids = this.favids.filter(x => x !== video.id);
    this.loadVideos();
  }

  public onPlayClick(video: VideoModel): void {
    let url = '';
    if (video.source === 'Youtube') {
      url = 'https://www.youtube.com/watch?v=' + video.urlCode;
    } else {
      url = 'https://vimeo.com/' + video.urlCode;
    }

    window.open(url, '_blank');
  }

  public onDeleteClick(video: VideoModel): void {
    this.videoList = this.videoList.filter(x => x.id !== video.id);
    this.storage.set('video-list', this.videoList);
    this.loadVideos();
  }

  public onFavoriteShow(showFav: any): void {
    if (showFav.value === 'allVideos') {
      this.showFavValue = false;
    } else {
      this.showFavValue = true;
    }
    this.loadVideos();
  }

  public onDeleteAllVideosClick(): void {
    this.videoList = [];
    this.storage.set('video-list', this.videoList);
    this.loadVideos();
  }
}
