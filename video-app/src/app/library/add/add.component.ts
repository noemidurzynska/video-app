import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords } from '../../core/models';
import { YoutubeService } from '../../core/youtube/youtube.service';
import { VimeoService } from '../../core/vimeo/vimeo.service';
import { StreamingPlatformService } from '../../core/common/streamingPlatform.service';
import { ErrorStateMatcher } from '@angular/material/core';
import * as VideoActions from '../../store/videos/video.actions';
import { VideoState } from '../../store/videos/video.state';
import { Store, select } from '@ngrx/store';
import { PlatformEnum } from 'src/app/core/enums/platform.enum';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';


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

  public apply: any = {};
  public passwords = new Passwords();

  public video$: Observable<VideoState>;
  public showErrorMessage = false;

  public identifierFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public matcher = new MyErrorStateMatcher();

  constructor(private readonly router: Router
    ,         private readonly youtubeService: YoutubeService
    ,         private readonly vimeoService: VimeoService
    ,         private readonly streamingPlatform: StreamingPlatformService
    ,         private readonly store: Store<{ videos: VideoState }>) {
    super();
    this.video$ = store.pipe(select('videos'));
     }

  public ngOnInit(): void {

    this.video$
        .pipe(
          map(state => {
            this.showErrorMessage = state.showErrorMessage;
          })
          , untilComponentDestroyed(this)
        )
        .subscribe();
    }

  public onAddClick(form: NgForm, platform: any): void {

    this.showErrorMessage = false;

    if (form.form.invalid || !this.apply.videoId) {
      return;
    }

    const videoId = this.streamingPlatform.extractIdentifier(this.apply.videoId);

    if (platform.value === PlatformEnum.youTube) {
      this.store.dispatch(VideoActions.BeginYouTubeAddVideoAction ({ videoId }));
    }

    if (platform.value === PlatformEnum.vimeo) {
        this.store.dispatch(VideoActions.BeginVimeoAddVideoAction ({ videoId }));
    }
  }

  public onAddDefaultClick(): void {

    this.youtubeService.getVideo('3kptlAtiNV8')
      .pipe(
        switchMap(() => this.youtubeService.getVideo('3kptlAtiNV8-T-s'))
        , switchMap(() => this.youtubeService.getVideo('o0W_0MuvlwQ'))
        , switchMap(() => this.youtubeService.getVideo('BHnMItX2hEQ'))
        , switchMap(() => this.vimeoService.getVideo('172825105'))
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
