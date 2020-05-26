import { LibraryModule } from './library/library.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { VideoReducer } from './store/videos/video.reducers';
import { VideoEffects } from './store/videos/video.effects';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const reducers: ActionReducerMap<any> = { videos: VideoReducer };
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync ({ keys: ['videos'], rehydrate: true }) (reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    LibraryModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(
      reducers,
      { metaReducers }
    ),
    EffectsModule.forRoot([VideoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
