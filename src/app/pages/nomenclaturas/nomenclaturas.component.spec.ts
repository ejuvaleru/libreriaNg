import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclaturasComponent } from './nomenclaturas.component';

describe('NomenclaturasComponent', () => {
  let component: NomenclaturasComponent;
  let fixture: ComponentFixture<NomenclaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomenclaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomenclaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
