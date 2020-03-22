import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
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

  constructor(private readonly router: Router
    ,         private readonly youtubeService: YoutubeService
    ,         private readonly vimeoService: VimeoService
    ,         private readonly streamingPlatform: StreamingPlatformService) { }

  public onAddClick(form: NgForm, platform: any): void {

    this.showErrorMessage = false;

    if (form.form.invalid) {
      return;
    }

    const videoId = this.streamingPlatform.extractIdentifier(this.apply.videoId);

    this[platform.value + 'Service'].getVideo(videoId)
    .subscribe((result: boolean) => {
      this.showErrorMessage = result;
      if (!this.showErrorMessage) {
        this.router.navigate(['/home']);
      }
    });
  }

  public onAddDefaultClick(): void {

    this.youtubeService.getVideo('D2qREDVuGgQ')
      .pipe(
        switchMap(() => this.youtubeService.getVideo('5ZwdzeZ-T-s'))
        , switchMap(() => this.youtubeService.getVideo('ggbtTdcmqtI'))
        , switchMap(() => this.vimeoService.getVideo('172825105'))
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
