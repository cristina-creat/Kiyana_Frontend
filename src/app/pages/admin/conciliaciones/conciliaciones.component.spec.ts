import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionesComponent } from './conciliaciones.component';

describe('ConciliacionesComponent', () => {
  let component: ConciliacionesComponent;
  let fixture: ComponentFixture<ConciliacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
