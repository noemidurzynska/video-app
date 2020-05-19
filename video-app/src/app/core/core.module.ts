import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from './youtube/youtube.service';
import { VimeoService } from './vimeo/vimeo.service';
import { StreamingPlatformService } from './common/streamingPlatform.service';


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
