import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from '@core/youtube/youtube.service';
import { VimeoService } from '@core/vimeo/vimeo.service';
import { StreamingPlatformService } from '@core/common/streamingPlatform.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [YoutubeService, VimeoService, StreamingPlatformService],
})
export class CoreModule {}
