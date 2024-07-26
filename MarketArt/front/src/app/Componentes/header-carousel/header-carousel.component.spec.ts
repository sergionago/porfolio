import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCarouselComponent } from './header-carousel.component';

describe('header-carouselComponent', () => {
  let component: HeaderCarouselComponent;
  let fixture: ComponentFixture<HeaderCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCarouselComponent]
    });
    fixture = TestBed.createComponent(HeaderCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
