import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { VideoState } from '@store/videos/video.state';
import { PlatformEnum } from '@core/enums/platform.enum';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AddVideo } from '@core/models/addVideo';
import { VideoFacade } from '@store/videos/video.facade';
import { videoConfig } from '@config/app.config';
import { Passwords } from '@core/models/passwords';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
})
export class AddComponent extends OnDestroyMixin implements OnInit {
  addVideoData: AddVideo = { videoId: '' };
  public passwords = new Passwords();
  public videos$: Observable<VideoState>;
  public showErrorMessage = false;
  public identifierFormControl = new FormControl('', [Validators.required, Validators.email]);
  public matcher = new MyErrorStateMatcher();

  constructor(private readonly videoFacade: VideoFacade) {
    super();
  }

  public ngOnInit(): void {
    this.videoFacade.videos$.pipe(untilComponentDestroyed(this)).subscribe((state) => {
      this.showErrorMessage = state.showErrorMessage;
    });
  }

  public onAddClick(form: NgForm, platform: PlatformEnum): void {
    this.showErrorMessage = false;

    if (form.form.invalid || !this.addVideoData.videoId) {
      return;
    }

    const videoId = this.videoFacade.extractIdentifier(platform, this.addVideoData.videoId);
    this.videoFacade.addVideo({ videoId, platform });
  }
  public onAddDefaultClick(): void {
    const videosYouTubeIds = videoConfig.youTubeVideoIds;

    videosYouTubeIds.forEach((videoId) =>
      this.videoFacade.addVideo({ videoId, platform: PlatformEnum.youTube })
    );

    const videosVimeoIds = videoConfig.vimeoVideoIds;

    videosVimeoIds.forEach((videoId) =>
      this.videoFacade.addVideo({ videoId, platform: PlatformEnum.vimeo })
    );
  }
}
