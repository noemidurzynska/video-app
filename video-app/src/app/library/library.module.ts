import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';

import { PlayerComponent } from './player/player.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [HomeComponent, AddComponent, PlayerComponent],
  imports: [SharedModule],
  entryComponents: [PlayerComponent],
})
export class LibraryModule {}
