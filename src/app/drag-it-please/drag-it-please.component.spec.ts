import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragItPleaseComponent } from './drag-it-please.component';

describe('DragItPleaseComponent', () => {
  let component: DragItPleaseComponent;
  let fixture: ComponentFixture<DragItPleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragItPleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragItPleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
