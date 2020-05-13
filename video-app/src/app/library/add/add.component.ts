import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords } from '../../core/models';
import { YoutubeService, VimeoService, StreamingPlatformService } from '../../core';
import { ErrorStateMatcher } from '@angular/material/core';
import * as VideoActions from '../store/actions/video.actions';
import { VideoState } from '../store/states/video.state';
import { Store, select } from '@ngrx/store';

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
export class AddComponent implements OnInit, OnDestroy {

  public apply: any = {};
  public passwords = new Passwords();

  public video$: Observable<VideoState>;
  public videoSubscription: Subscription;
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
      this.video$ = store.pipe(select('videos'));
     }

    public ngOnInit(): void {
      this.videoSubscription = this.video$
        .pipe(
          map(x => {
            this.showErrorMessage = x.ShowErrorMessage;

            // ToDo: how to redirect to home page
            // if (!this.showErrorMessage) {
            //   this.router.navigate(['/home']);
            // }
          })
        )
        .subscribe();
    }

    public ngOnDestroy(): void {
      if (this.videoSubscription) {
        this.videoSubscription.unsubscribe();
      }
    }

  public onAddClick(form: NgForm, platform: any): void {

    this.showErrorMessage = false;

    if (form.form.invalid || !this.apply.videoId) {
      return;
    }

    const videoId = this.streamingPlatform.extractIdentifier(this.apply.videoId);

    if (platform.value === 'youtube') {
      this.store.dispatch(VideoActions.BeginYouTubeAddVideoAction ({ payload: videoId}));
    }

    if (platform.value === 'vimeo') {
        this.store.dispatch(VideoActions.BeginVimeoAddVideoAction ({ payload: videoId}));
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
