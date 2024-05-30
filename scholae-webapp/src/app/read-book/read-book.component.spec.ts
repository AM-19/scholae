import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBookComponent } from './read-book.component';

describe('ReadBookComponent', () => {
  let component: ReadBookComponent;
  let fixture: ComponentFixture<ReadBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
