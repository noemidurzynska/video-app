import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Video, Source } from '../models';

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
  public videos: Video[] = [];
  public allVideos: Video[] = [];
  public viewModeValue = 'metro';
  public showFavValue = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.loadVideos();
  }

  public onViewChange(viewMode: any): void {
    this.viewModeValue = viewMode.value;
    this.loadVideos();
  }

  private loadVideos(): void {
    this.allVideos = this.storage.get('video-list');
    if (!this.allVideos) {
      return;
    }

    if (this.showFavValue) {
      this.allVideos = this.allVideos.filter(x => x.fav);
    }

    this.length = this.allVideos.length;
    this.sliceVideo();
  }

  public onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sliceVideo();
  }

  private sliceVideo(): void {
    this.videos = this.allVideos.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  public onChangeFavClick(video: Video, fav: boolean): void {
    video.fav = fav;
    this.storage.set('video-list', this.allVideos);
    this.loadVideos();
  }

  public onPlayClick(video: Video): void {
    let url = '';
    if (video.sourceType === Source.Youtube) {
      url = 'https://www.youtube.com/watch?v=' + video.urlCode;
    } else {
      url = 'https://vimeo.com/' + video.urlCode;
    }

    window.open(url, '_blank');
  }

  public onDeleteClick(video: Video): void {
    this.allVideos = this.allVideos.filter(x => x.id !== video.id);
    this.storage.set('video-list', this.allVideos);
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
    this.allVideos = [];
    this.storage.set('video-list', this.allVideos);
    this.loadVideos();
  }
}
