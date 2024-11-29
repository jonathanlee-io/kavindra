import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SharedAccountPageComponent} from './shared-account-page.component';

describe('SharedAccountPageComponent', () => {
  let component: SharedAccountPageComponent;
  let fixture: ComponentFixture<SharedAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAccountPageComponent],
    })
        .compileComponents();

    fixture = TestBed.createComponent(SharedAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
