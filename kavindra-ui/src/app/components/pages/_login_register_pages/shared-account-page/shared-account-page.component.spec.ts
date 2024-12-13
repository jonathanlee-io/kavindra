import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {faker} from '@faker-js/faker/locale/en';
import {render} from '@testing-library/angular';
import {screen} from '@testing-library/dom';

import {SharedAccountPageComponent} from './shared-account-page.component';
import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {testProviders} from '../../../../../test-util/test-providers.helper';

describe('SharedAccountPageComponent', () => {
  let mockUserAuthenticationStore: { isLoading: jasmine.Spy<jasmine.Func>; };

  beforeEach(async () => {
    mockUserAuthenticationStore = {
      isLoading: jasmine.createSpy('isLoading').and.returnValue(false),
    };
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('Unit Tests', () => {
    let component: SharedAccountPageComponent;
    let fixture: ComponentFixture<SharedAccountPageComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SharedAccountPageComponent],
        providers: [
          provideRouter([]),
          {
            provide: UserAuthenticationStore,
            useValue: mockUserAuthenticationStore,
          },
        ],
        teardown: {destroyAfterEach: false},
      }).compileComponents();

      fixture = TestBed.createComponent(SharedAccountPageComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('headingText', faker.lorem.words());
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Integration Tests', () => {
    it('should render component with heading text the same as input', async () => {
      const headingText = faker.lorem.words();
      await render(SharedAccountPageComponent, {
        inputs: {
          headingText,
        },
        providers: [
          provideRouter([]),
          {
            provide: UserAuthenticationStore,
            useValue: mockUserAuthenticationStore,
          },
          ...testProviders,
        ],
      });

      expect(screen.getByText(headingText).textContent).toBe(headingText);
    });
  });
});
