import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiculosComponent } from './addvehiculos.component';

describe('AddvehiculosComponent', () => {
  let component: AddvehiculosComponent;
  let fixture: ComponentFixture<AddvehiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddvehiculosComponent]
    });
    fixture = TestBed.createComponent(AddvehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
