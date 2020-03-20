import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords, Source, Video } from '../../core/models';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { YoutubeService } from '../../core';

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
    ,         @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public onAddClick(form: NgForm, platform: any): void {

    this.showErrorMessage = false;

    if (form.form.invalid) {
      return;
    }

    let videoId = this.apply.videoId;

    videoId = videoId
      .replace('https://www.', '')
      .replace('https://', '')
      .replace('youtube.com/watch?v=', '')
      .replace('youtu.be/', '')
      .replace('vimeo.com/', '');

    if (platform.value === 'youtube') {

      this.youtubeService.getYouTubeVideo(videoId, true, this);
    } else if (platform.value === 'vimeo') {

      this.getVimeoVideo(videoId, true);
    }
  }

  private getVimeoVideo(videoId: string, redirect: boolean): void {

    this.http.get('https://api.vimeo.com/videos/' + videoId + '?access_token=' + this.passwords.Vimeo)
      .subscribe((response: any) => {

        const video = new Video();
        video.sourceType = Source.Vimeo;
        video.source = 'Vimeo';
        video.id = response.resource_key;
        video.title = response.name;
        video.date = response.created_time;
        video.image = response.pictures.sizes[0].link;
        video.likesCount = response.metadata.connections.likes.total;
        video.playsCountDescription = 'unknown';
        video.urlCode = videoId;
        video.creationDate = new Date();

        this.youtubeService.saveVideo(video);

        if (redirect) {
          this.router.navigate(['/home']);
        }
      }
        , (error: any) => {
          this.showErrorMessage = true;
        });
  }

  public onAddDefaultClick(): void {
    this.getVimeoVideo('172825105', false);
    this.youtubeService.getYouTubeVideo('D2qREDVuGgQ', false, this);
    this.youtubeService.getYouTubeVideo('5ZwdzeZ-T-s', false, this);
    this.youtubeService.getYouTubeVideo('ggbtTdcmqtI', false, this);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }
}
