import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplaresComponent } from './ejemplares.component';

describe('EjemplaresComponent', () => {
  let component: EjemplaresComponent;
  let fixture: ComponentFixture<EjemplaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjemplaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjemplaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
