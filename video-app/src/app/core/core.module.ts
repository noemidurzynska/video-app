import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from './';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    YoutubeService
  ]
})
export class CoreModule { }
