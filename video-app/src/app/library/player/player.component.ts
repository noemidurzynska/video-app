import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlayerVideoData } from '@core/models/playerVideoData';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less'],
})
export class PlayerComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlayerVideoData,
    public dialogRef: MatDialogRef<PlayerComponent>
  ) {}

  public onCloseClick(): void {
    this.dialogRef.close();
  }
}
