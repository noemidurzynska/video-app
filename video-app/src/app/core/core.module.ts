import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService, VimeoService, StreamingPlatformService } from './';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    YoutubeService,
    VimeoService,
    StreamingPlatformService,
  ]
})
export class CoreModule { }
