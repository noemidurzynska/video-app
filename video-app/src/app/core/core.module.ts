import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from '@core/youtube.service';
import { VimeoService } from '@core/vimeo.service';
import { VideoService } from './video.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [YoutubeService, VimeoService, VideoService],
})
export class CoreModule {}
