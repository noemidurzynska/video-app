import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords } from '../../core/models';
import { YoutubeService, VimeoService, StreamingPlatformService } from '../../core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent {

  public apply: any = {};
  public passwords = new Passwords();
  public showErrorMessage = false;

  constructor(private readonly http: HttpClient
    ,         private readonly router: Router
    ,         private readonly youtubeService: YoutubeService
    ,         private readonly vimeoService: VimeoService
    ,         private readonly streamingPlatform: StreamingPlatformService) { }

  public onAddClick(form: NgForm, platform: any): void {

    this.showErrorMessage = false;

    if (form.form.invalid) {
      return;
    }

    const videoId = this.streamingPlatform.extractIdentifier(this.apply.videoId);
    if (platform.value === 'youtube') {
      this.youtubeService.getYouTubeVideo(videoId)
      .subscribe(result => {
        this.showErrorMessage = result;
        if (!this.showErrorMessage) {
          this.router.navigate(['/home']);
        }
      });
    } else if (platform.value === 'vimeo') {
      this.vimeoService.getVimeoVideo(videoId, true, this);
    }
  }

  public onAddDefaultClick(): void {

    this.youtubeService.getYouTubeVideo('D2qREDVuGgQ')
      .pipe(
        switchMap(() => this.youtubeService.getYouTubeVideo('5ZwdzeZ-T-s'))
        , switchMap(() => this.youtubeService.getYouTubeVideo('ggbtTdcmqtI'))
      )
      .subscribe(() => {
        this.vimeoService.getVimeoVideo('172825105', false, this);
        this.router.navigate(['/home']);
      });
  }
}
