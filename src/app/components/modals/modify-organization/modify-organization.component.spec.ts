import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOrganizationComponent } from './modify-organization.component';

describe('ModifyOrganizationComponent', () => {
  let component: ModifyOrganizationComponent;
  let fixture: ComponentFixture<ModifyOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
