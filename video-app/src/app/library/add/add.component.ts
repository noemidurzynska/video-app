import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passwords } from '../../core/models';
import { YoutubeService, VimeoService, StreamingPlatformService } from '../../core';
import { ErrorStateMatcher } from '@angular/material/core';

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
export class AddComponent {

  public apply: any = {};
  public passwords = new Passwords();
  public showErrorMessage = false;

  public identifierFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public matcher = new MyErrorStateMatcher();

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
