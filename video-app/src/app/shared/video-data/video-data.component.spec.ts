import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDataComponent } from './video-data.component';

describe('VideoDataComponent', () => {
  let component: VideoDataComponent;
  let fixture: ComponentFixture<VideoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
