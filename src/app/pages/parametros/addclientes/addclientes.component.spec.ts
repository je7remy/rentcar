import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientesComponent } from './addclientes.component';

describe('AddclientesComponent', () => {
  let component: AddclientesComponent;
  let fixture: ComponentFixture<AddclientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddclientesComponent]
    });
    fixture = TestBed.createComponent(AddclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
