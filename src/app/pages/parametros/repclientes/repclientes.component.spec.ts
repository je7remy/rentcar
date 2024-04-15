import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepclientesComponent } from './repclientes.component';

describe('RepclientesComponent', () => {
  let component: RepclientesComponent;
  let fixture: ComponentFixture<RepclientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepclientesComponent]
    });
    fixture = TestBed.createComponent(RepclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
