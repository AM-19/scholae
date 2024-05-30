import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookContainerComponent } from './upload-book-container.component';

describe('UploadBookContainerComponent', () => {
  let component: UploadBookContainerComponent;
  let fixture: ComponentFixture<UploadBookContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBookContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBookContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
