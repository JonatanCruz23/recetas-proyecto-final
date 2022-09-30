import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTablaComponent } from './listado-tabla.component';

describe('ListadoTablaComponent', () => {
  let component: ListadoTablaComponent;
  let fixture: ComponentFixture<ListadoTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
