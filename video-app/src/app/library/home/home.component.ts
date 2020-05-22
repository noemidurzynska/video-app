import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Video } from '../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { PlayerComponent } from '../player/player.component';
import { StreamingPlatformService } from 'src/app/core/common/streamingPlatform.service';
import { PlayerVideoData } from 'src/app/core/models/playerVideoData';

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
  public sortValue = 'asc';
  public canCloseWindow = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService
  ,           public dialog: MatDialog
  ,           private readonly streamingPlatformService: StreamingPlatformService) { }

  ngOnInit() {
    this.loadVideos();
  }

  public onViewChange(viewMode: string): void {
    this.viewModeValue = viewMode;
    this.loadVideos();
  }

  private loadVideos(): void {
    this.allVideos = this.storage.get('video-list');
    if (!this.allVideos) {
      return;
    }

    if (this.sortValue === 'asc') {
      this.allVideos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.allVideos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
    this.allVideos = this.storage.get('video-list');
    const findVideo = this.allVideos.find(x => x.id === video.id);
    if (!findVideo) {
      return;
    }

    findVideo.fav = fav;
    this.storage.set('video-list', this.allVideos);
    this.loadVideos();
  }

  public onPlayClick(video: Video): void {

    if (this.canCloseWindow) {
        return;
    }
    this.canCloseWindow = true;

    const urlAdress = this.streamingPlatformService.getUrlAddress(video.sourceType, video.urlCode);

    const playerVideoData = new PlayerVideoData();
    playerVideoData.title = video.title;
    playerVideoData.urlPlayer = urlAdress;
    this.dialog.open(PlayerComponent, {
      data: playerVideoData
    })
    .afterClosed().subscribe(result => {
      this.canCloseWindow = false;
    });
  }

  public onDeleteClick(video: Video): void {
    this.allVideos = this.allVideos.filter(x => x.id !== video.id);
    this.storage.set('video-list', this.allVideos);
    this.loadVideos();
  }

  public onFavoriteShow(showFav: string): void {
    if (showFav === 'allVideos') {
      this.showFavValue = false;
    } else {
      this.showFavValue = true;
    }
    this.loadVideos();
  }

  public onSortClick(sort: string): void {
    if (sort === 'asc') {
      this.sortValue = 'asc';
    } else {
      this.sortValue = 'desc';
    }
    this.loadVideos();
  }

  public onDeleteAllVideosClick(): void {
    this.allVideos = [];
    this.storage.set('video-list', this.allVideos);
    this.loadVideos();
  }
}
