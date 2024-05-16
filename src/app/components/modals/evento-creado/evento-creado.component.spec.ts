import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoCreadoComponent } from './evento-creado.component';

describe('EventoCreadoComponent', () => {
  let component: EventoCreadoComponent;
  let fixture: ComponentFixture<EventoCreadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoCreadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventoCreadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
