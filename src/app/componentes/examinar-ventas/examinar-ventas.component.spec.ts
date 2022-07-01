import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminarVentasComponent } from './examinar-ventas.component';

describe('ExaminarVentasComponent', () => {
  let component: ExaminarVentasComponent;
  let fixture: ComponentFixture<ExaminarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminarVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
