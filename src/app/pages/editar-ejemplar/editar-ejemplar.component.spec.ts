import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEjemplarComponent } from './editar-ejemplar.component';

describe('EditarEjemplarComponent', () => {
  let component: EditarEjemplarComponent;
  let fixture: ComponentFixture<EditarEjemplarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEjemplarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEjemplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
