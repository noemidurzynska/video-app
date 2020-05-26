import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Passwords } from '@core/models';
import { StreamingPlatformService } from '@core/common/streamingPlatform.service';
import { ErrorStateMatcher } from '@angular/material/core';
import * as VideoActions from '@store/videos/video.actions';
import { VideoState } from '@store/videos/video.state';
import { Store, select } from '@ngrx/store';
import { PlatformEnum } from '@core/enums/platform.enum';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import { AddVideo } from '@core/models/addVideo';
import { VideoStateModel } from '@core/models/videoState.model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent  extends OnDestroyMixin implements OnInit {

  public addVideoData: AddVideo = new AddVideo();
  public passwords = new Passwords();

  public videos$: Observable<VideoState>;
  public showErrorMessage = false;

  public identifierFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public matcher = new MyErrorStateMatcher();

  constructor(private readonly streamingPlatform: StreamingPlatformService
    ,         private readonly store: Store<VideoStateModel>) {
    super();
    this.videos$ = store.pipe(select('videos'));
     }

  public ngOnInit(): void {

    this.videos$
        .pipe(
          untilComponentDestroyed(this)
        )
        .subscribe(state => {
          this.showErrorMessage = state.showErrorMessage;
        });
    }

  public onAddClick(form: NgForm, platform: PlatformEnum): void {

    this.showErrorMessage = false;

    if (form.form.invalid || !this.addVideoData.videoId) {
      return;
    }

    const videoId = this.streamingPlatform.extractIdentifier(this.addVideoData.videoId);

    if (platform === PlatformEnum.youTube) {
      this.store.dispatch(VideoActions.addYouTubeVideo ({ videoId }));
    }

    if (platform === PlatformEnum.vimeo) {
        this.store.dispatch(VideoActions.addVimeoVideo ({ videoId }));
    }
  }

  public onAddDefaultClick(): void {
    const videosIds = ['3kptlAtiNV8', 'o0W_0MuvlwQ', 'BHnMItX2hEQ', '172825105' ];

    videosIds.forEach(videoId => this.store.dispatch(VideoActions.addYouTubeVideo ({ videoId })));

  }
}
