import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessLoginComponent } from './success-login.component';

describe('SuccessLoginComponent', () => {
  let component: SuccessLoginComponent;
  let fixture: ComponentFixture<SuccessLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessLoginComponent]
    });
    fixture = TestBed.createComponent(SuccessLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
