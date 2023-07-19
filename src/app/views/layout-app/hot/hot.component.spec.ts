import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotComponent } from './hot.component';

describe('HotComponent', () => {
  let component: HotComponent;
  let fixture: ComponentFixture<HotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotComponent]
    });
    fixture = TestBed.createComponent(HotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
