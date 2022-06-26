import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanniersComponent } from './panniers.component';

describe('PanniersComponent', () => {
  let component: PanniersComponent;
  let fixture: ComponentFixture<PanniersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanniersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanniersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
