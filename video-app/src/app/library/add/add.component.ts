import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords, Source, Video } from '../../core/models';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
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
    ,         private readonly streamingPlatform: StreamingPlatformService
    ,         @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public onAddClick(form: NgForm, platform: any): void {

    this.showErrorMessage = false;

    if (form.form.invalid) {
      return;
    }

    const videoId = this.streamingPlatform.extractIdentifier(this.apply.videoId);
    if (platform.value === 'youtube') {
      this.youtubeService.getYouTubeVideo(videoId, true, this);
    } else if (platform.value === 'vimeo') {
      this.vimeoService.getVimeoVideo(videoId, true, this);
    }
  }

  public onAddDefaultClick(): void {
    this.vimeoService.getVimeoVideo('172825105', false, this);
    this.youtubeService.getYouTubeVideo('D2qREDVuGgQ', false, this);
    this.youtubeService.getYouTubeVideo('5ZwdzeZ-T-s', false, this);
    this.youtubeService.getYouTubeVideo('ggbtTdcmqtI', false, this);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }
}
