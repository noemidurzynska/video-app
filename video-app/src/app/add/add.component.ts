import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords } from '../models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {

  public apply: any = {};
  public passwords = new Passwords();

  constructor(private readonly http: HttpClient
    , private readonly router: Router) { }

  ngOnInit() {
  }

  public onAddClick(form: NgForm, platform: any): void {

    if (form.form.invalid) {
      return;
    }

    let videoId = this.apply.videoId;

    videoId = videoId
      .replace('https://www.', '')
      .replace('https://', '')
      .replace('youtube.com/watch?v=', '')
      .replace('youtube.be/', '')
      .replace('vimeo.com/', '');

    if (platform.value === 'youtube') {

      this.getYouTubeVideo(videoId);
    } else if (platform.value === 'vimeo') {

      this.getVimeoVideo(videoId);
    }
  }

  private getYouTubeVideo(videoId: string): void {

    this.http.get('https://www.googleapis.com/youtube/v3/videos?id='
      + videoId +
      '&key='
      + this.passwords.YouTube +
      '&part=snippet,contentDetails,statistics,status')
      .subscribe((response: any) => {

        this.router.navigate(['/home']);
      });
  }

  private getVimeoVideo(videoId: string): void {

    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.passwords.Vimeo
      }),
    };

    this.http.get('https://api.vimeo.com/videos/' + videoId, requestOptions)
      .subscribe((response: any) => {

        this.router.navigate(['/home']);
      });
  }
}
