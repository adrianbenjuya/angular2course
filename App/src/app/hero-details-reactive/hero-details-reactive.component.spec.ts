import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailsReactiveComponent } from './hero-details-reactive.component';

describe('HeroDetailsReactiveComponent', () => {
  let component: HeroDetailsReactiveComponent;
  let fixture: ComponentFixture<HeroDetailsReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailsReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailsReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
