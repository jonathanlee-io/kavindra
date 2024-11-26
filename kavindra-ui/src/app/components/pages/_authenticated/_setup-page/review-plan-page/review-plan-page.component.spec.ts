import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPlanPageComponent } from './review-plan-page.component';

describe('ReviewPlanPageComponent', () => {
  let component: ReviewPlanPageComponent;
  let fixture: ComponentFixture<ReviewPlanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewPlanPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
