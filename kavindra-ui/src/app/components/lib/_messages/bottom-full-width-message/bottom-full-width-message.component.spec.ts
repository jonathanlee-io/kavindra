import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BottomFullWidthMessageComponent} from './bottom-full-width-message.component';

describe('BottomFullWidthMessageComponent', () => {
  let component: BottomFullWidthMessageComponent;
  let fixture: ComponentFixture<BottomFullWidthMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomFullWidthMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomFullWidthMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
