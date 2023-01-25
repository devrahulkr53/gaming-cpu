import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingPcComponent } from './gaming-pc.component';

describe('GamingPcComponent', () => {
  let component: GamingPcComponent;
  let fixture: ComponentFixture<GamingPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamingPcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamingPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
