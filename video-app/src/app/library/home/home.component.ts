import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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



  constructor(public dialog: MatDialog
  ,           private readonly streamingPlatformService: StreamingPlatformService
  ,           private readonly store: Store<VideoStateModel>
  ) {
    super();
    this.videos$ = store.select('videos');
  }

  public ngOnInit(): void {

    this.videos$
    .pipe (
      untilComponentDestroyed(this)
    )
    .subscribe(store  => {
      this.allVideos = store.videoList;
      if (!this.allVideos) {
        return;
      }
      this.loadVideos();
    }
      );
  }

  private loadVideos(): void {
    if (this.sortValue === 'asc') {
      this.videos = [...this.allVideos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.videos = [...this.allVideos].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    if (this.showFavValue) {
      this.videos = this.videos.filter(videoElement => videoElement.fav);
    }

    this.length = this.videos.length;
    this.sliceVideo();
  }

  public onViewChange(viewMode: string): void {
    this.viewModeValue = viewMode;
  }

  public onPageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sliceVideo();
  }

  private sliceVideo(): void {
    this.videos = this.videos.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  public onChangeFavClick(video: Video): void {
    this.store.dispatch(VideoActions.toggleFavouriteVideo ({ videoId: video.id }) );
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
    this.store.dispatch(VideoActions.deleteVideo ({ videoId: video.id }));
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
    this.store.dispatch(VideoActions.clearVideos());
  }
}
