import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaSeleccionadaComponent } from './factura-seleccionada.component';

describe('FacturaSeleccionadaComponent', () => {
  let component: FacturaSeleccionadaComponent;
  let fixture: ComponentFixture<FacturaSeleccionadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaSeleccionadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaSeleccionadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
