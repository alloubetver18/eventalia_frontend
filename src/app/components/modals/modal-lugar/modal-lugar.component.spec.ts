import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLugarComponent } from './modal-lugar.component';

describe('ModalLugarComponent', () => {
  let component: ModalLugarComponent;
  let fixture: ComponentFixture<ModalLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLugarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
