import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords, Source, Video } from '../models';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {

  public apply: any = {};
  public passwords = new Passwords();
  public showErrorMessage = false;

  constructor(private readonly http: HttpClient
    ,         private readonly router: Router
    ,         @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
  }

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

      this.getYouTubeVideo(videoId, true);
    } else if (platform.value === 'vimeo') {

      this.getVimeoVideo(videoId, true);
    }
  }

  private getYouTubeVideo(videoId: string, redirect: boolean): void {

    this.http.get('https://www.googleapis.com/youtube/v3/videos?id='
      + videoId +
      '&key='
      + this.passwords.YouTube +
      '&part=snippet,contentDetails,statistics,status')
      .subscribe((response: any) => {

        if (response.items.length === 0) {
          this.showErrorMessage = true;
          return;
        }

        const item = response.items[0];

        const video = new Video();
        video.sourceType = Source.Youtube;
        video.source = 'Youtube';
        video.id = item.id;
        video.title = item.snippet.title;
        video.date = item.snippet.publishedAt;
        video.image = item.snippet.thumbnails.default.url;
        video.playesCount = item.statistics.viewCount;
        video.playsCountDescription = item.statistics.viewCount;
        video.likesCount = item.statistics.likeCount;
        video.urlCode = videoId;
        video.creationDate = new Date();

        this.saveVideo(video);

        if (redirect) {
          this.router.navigate(['/home']);
        }
      });
  }

  private getVimeoVideo(videoId: string, redirect: boolean): void {

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.passwords.Vimeo
      }),
    };

    this.http.get('https://api.vimeo.com/videos/' + videoId, requestOptions)
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

        this.saveVideo(video);

        if (redirect) {
          this.router.navigate(['/home']);
        }
      }
        , (error: any) => {
          this.showErrorMessage = true;
        });
  }

  private saveVideo(video: Video): void {

    let videoList = this.storage.get('video-list');
    if (videoList === undefined) {
      videoList = new Array<Video>();
    }

    videoList.push(video);

    this.storage.set('video-list', videoList);
  }

  public onAddDefaultClick(): void {
    this.getVimeoVideo('172825105', false);
    this.getYouTubeVideo('D2qREDVuGgQ', false);
    this.getYouTubeVideo('5ZwdzeZ-T-s', false);
    this.getYouTubeVideo('ggbtTdcmqtI', false);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }
}
