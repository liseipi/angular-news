import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZkComponent } from './zk.component';

describe('ZkComponent', () => {
  let component: ZkComponent;
  let fixture: ComponentFixture<ZkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZkComponent]
    });
    fixture = TestBed.createComponent(ZkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
