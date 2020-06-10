import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PlayerComponent } from '../player/player.component';
import { PlayerVideoData } from '@core/models/playerVideoData';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { SortEnum } from '@core/enums/sort.enum';
import { VideoFacade } from '@store/videos/video.facade';
import { filter } from 'rxjs/operators';
import { ViewModeEnum } from '@core/enums/view-mode.enum';
import { Video } from '@core/models/video';

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
  public viewModeValue = ViewModeEnum.metro;
  public showFavValue = false;
  public sortValue = SortEnum.sortAsc;
  public canCloseWindow = false;

  constructor(public dialog: MatDialog, private readonly videoFacade: VideoFacade) {
    super();
  }

  public ngOnInit(): void {
    this.videoFacade.videos$
      .pipe(
        filter((store) => !!store.videoList),
        untilComponentDestroyed(this)
      )
      .subscribe((store) => {
        this.allVideos = store.videoList;
        this.loadVideos();
      });
  }

  public loadVideos(): void {
    this.filteredVideos = [...this.allVideos];
    if (this.sortValue === SortEnum.sortAsc) {
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

    const urlAdress = this.videoFacade.getUrlAddress(video.sourceType, video.urlCode);

    const playerVideoData: PlayerVideoData = { title: video.title, urlPlayer: urlAdress };
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

  public onDeleteAllVideosClick(): void {
    this.videoFacade.clearVideos();
  }
}
