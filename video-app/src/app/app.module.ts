import { LibraryModule } from './library/library.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { VideoReducer } from './store/videos/video.reducers';
import { VideoEffects } from './store/videos/video.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    LibraryModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({ videos: VideoReducer }),
    EffectsModule.forRoot([VideoEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
