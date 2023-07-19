import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldwideComponent } from './worldwide.component';

describe('WorldwideComponent', () => {
  let component: WorldwideComponent;
  let fixture: ComponentFixture<WorldwideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorldwideComponent]
    });
    fixture = TestBed.createComponent(WorldwideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
