import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Video } from '@core/models';
import { MatDialog } from '@angular/material/dialog';
import { PlayerComponent } from '../player/player.component';
import { StreamingPlatformService } from '@core/common/streamingPlatform.service';
import { PlayerVideoData } from '@core/models/playerVideoData';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { SortEnum } from '@core/enums/sort.enum';
import { VideoFacade } from '@store/videos/video.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent extends OnDestroyMixin implements OnInit {
  public length = 0;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public videos: Video[] = [];
  public allVideos: Video[] = [];
  public filteredVideos: Video[] = [];
  public viewModeValue = 'metro';
  public showFavValue = false;
  public sortValue = 'asc';
  public canCloseWindow = false;

  constructor(
    public dialog: MatDialog,
    private readonly streamingPlatformService: StreamingPlatformService,
    private readonly videoFacade: VideoFacade
  ) {
    super();
  }

  public ngOnInit(): void {
    this.videoFacade.videos$.pipe(untilComponentDestroyed(this)).subscribe((store) => {
      this.allVideos = store.videoList;
      if (!this.allVideos) {
        return;
      }
      this.loadVideos();
    });
  }

  private loadVideos(): void {
    this.filteredVideos = [...this.allVideos];
    if (this.sortValue === 'asc') {
      this.filteredVideos = this.filteredVideos.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      this.filteredVideos = this.filteredVideos.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    if (this.showFavValue) {
      this.filteredVideos = this.filteredVideos.filter((videoElement) => videoElement.fav);
    }

    this.length = this.filteredVideos.length;
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
    this.videos = this.filteredVideos.slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }

  public onChangeFavClick(video: Video): void {
    this.videoFacade.toggleFavouriteVideo({ videoId: video.id });
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
    this.dialog
      .open(PlayerComponent, {
        data: playerVideoData,
      })
      .afterClosed()
      .subscribe(() => {
        this.canCloseWindow = false;
      });
  }

  public onDeleteClick(video: Video): void {
    this.videoFacade.deleteVideo({ videoId: video.id });
  }

  public onFavoriteShow(showFav: boolean): void {
    if (showFav) {
      this.showFavValue = true;
    } else {
      this.showFavValue = false;
    }
    this.loadVideos();
  }

  public onSortClick(sort: SortEnum): void {
    if (sort === SortEnum.sortAsc) {
      this.sortValue = 'asc';
    } else {
      this.sortValue = 'desc';
    }
    this.loadVideos();
  }

  public onDeleteAllVideosClick(): void {
    this.videoFacade.clearVideos();
  }
}
