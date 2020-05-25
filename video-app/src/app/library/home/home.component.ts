import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Video } from '@core/models';
import { MatDialog } from '@angular/material/dialog';
import { PlayerComponent } from '../player/player.component';
import { StreamingPlatformService } from '@core/common/streamingPlatform.service';
import { PlayerVideoData } from '@core/models/playerVideoData';
import { VideoState } from '@store/videos/video.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as VideoActions from '@store/videos/video.actions';
import { VideoStateModel } from '@core/models/videoState.model';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends OnDestroyMixin implements OnInit {

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
  public videos$: Observable<VideoState>;



  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService
  ,           public dialog: MatDialog
  ,           private readonly streamingPlatformService: StreamingPlatformService
  ,           private readonly store: Store<VideoStateModel>
  ) {
    super();
    this.videos$ = store.select('videos');
  }

  public ngOnInit(): void {
    this.store.dispatch(VideoActions.SetVideos({ videos: this.storage.get('video-list')}));

    this.videos$
    .pipe (
      untilComponentDestroyed(this)
    )
    .subscribe(store  => {
      this.storage.set('video-list', store.videoList);
      this.allVideos = store.videoList;
      if (!this.allVideos) {
        return;
      }

      if (this.sortValue === 'asc') {
        this.allVideos = this.allVideos.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } else {
        this.allVideos = this.allVideos.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }

      if (this.showFavValue) {
        this.allVideos = this.allVideos.filter(videoElement => videoElement.fav);
      }

      this.length = this.allVideos.length;
      this.sliceVideo();
    }
      );
  }

  public onViewChange(viewMode: string): void {
    this.viewModeValue = viewMode;
    this.store.dispatch(VideoActions.GetVideos());
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
    const allVideos = this.storage.get('video-list');
    const findVideo = allVideos.find(videoElement => videoElement.id === video.id);
    if (!findVideo) {
      return;
    }

    findVideo.fav = fav;
    this.store.dispatch(VideoActions.SetVideos({ videos: this.allVideos }));
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
    .afterClosed().subscribe(() => {
      this.canCloseWindow = false;
    });
  }

  public onDeleteClick(video: Video): void {
    const allVideos = this.storage.get('video-list');
    this.allVideos = allVideos.filter(videoElement => videoElement.id !== video.id);
    this.store.dispatch(VideoActions.SetVideos({ videos: this.allVideos }));
  }

  public onFavoriteShow(showFav: string): void {
    if (showFav === 'allVideos') {
      this.showFavValue = false;
    } else {
      this.showFavValue = true;
    }
    this.store.dispatch(VideoActions.GetVideos());
  }

  public onSortClick(sort: string): void {
    if (sort === 'asc') {
      this.sortValue = 'asc';
    } else {
      this.sortValue = 'desc';
    }
    this.store.dispatch(VideoActions.GetVideos());
  }

  public onDeleteAllVideosClick(): void {
    this.allVideos = [];
    this.store.dispatch(VideoActions.SetVideos({ videos: this.allVideos }));
  }
}
