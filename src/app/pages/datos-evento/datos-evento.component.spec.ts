import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEventoComponent } from './datos-evento.component';

describe('DatosEventoComponent', () => {
  let component: DatosEventoComponent;
  let fixture: ComponentFixture<DatosEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
