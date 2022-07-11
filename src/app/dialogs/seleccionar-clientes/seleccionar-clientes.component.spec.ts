import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarClientesComponent } from './seleccionar-clientes.component';

describe('SeleccionarClientesComponent', () => {
  let component: SeleccionarClientesComponent;
  let fixture: ComponentFixture<SeleccionarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
