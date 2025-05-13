import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilesPageComponent } from './mobiles-page.component';

describe('MobilesPageComponent', () => {
  let component: MobilesPageComponent;
  let fixture: ComponentFixture<MobilesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobilesPageComponent]
    });
    fixture = TestBed.createComponent(MobilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
