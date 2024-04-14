import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosComponent } from './vehiculos.component';

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculosComponent]
    });
    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
