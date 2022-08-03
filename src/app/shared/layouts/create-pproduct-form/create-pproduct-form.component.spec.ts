import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePproductFormComponent } from './create-pproduct-form.component';

describe('CreatePproductFormComponent', () => {
  let component: CreatePproductFormComponent;
  let fixture: ComponentFixture<CreatePproductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePproductFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePproductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
