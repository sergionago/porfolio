import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalizarPedidoComponent } from './formalizar-pedido.component';

describe('FormalizarPedidoComponent', () => {
  let component: FormalizarPedidoComponent;
  let fixture: ComponentFixture<FormalizarPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormalizarPedidoComponent]
    });
    fixture = TestBed.createComponent(FormalizarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
