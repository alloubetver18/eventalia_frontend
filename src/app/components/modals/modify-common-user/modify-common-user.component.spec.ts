import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCommonUserComponent } from './modify-common-user.component';

describe('ModifyCommonUserComponent', () => {
  let component: ModifyCommonUserComponent;
  let fixture: ComponentFixture<ModifyCommonUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCommonUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCommonUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
