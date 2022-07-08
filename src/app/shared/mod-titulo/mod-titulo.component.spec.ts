import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModTituloComponent } from './mod-titulo.component';

describe('ModTituloComponent', () => {
  let component: ModTituloComponent;
  let fixture: ComponentFixture<ModTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModTituloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
