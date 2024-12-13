import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {faker} from '@faker-js/faker/locale/en';
import {createRoutingFactory, Spectator} from '@ngneat/spectator';
import {render} from '@testing-library/angular';
import {screen} from '@testing-library/dom';

import {SharedAccountPageComponent} from './shared-account-page.component';
import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {testProviders} from '../../../../../test-util/test-providers.helper';

describe('SharedAccountPageComponent', () => {
  let mockUserAuthenticationStore: { isLoading: jasmine.Spy<jasmine.Func>; };

  describe('Unit Tests', () => {
    let component: SharedAccountPageComponent;
    let fixture: ComponentFixture<SharedAccountPageComponent>;

    beforeEach(async () => {
      mockUserAuthenticationStore = {
        isLoading: jasmine.createSpy('isLoading').and.returnValue(false),
      };

      await TestBed.configureTestingModule({
        imports: [SharedAccountPageComponent],
        providers: [
          provideRouter([]),
          {
            provide: UserAuthenticationStore,
            useValue: mockUserAuthenticationStore,
          },
        ],
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

  describe('@testing-library Integration Tests', () => {
    it('should render component with heading text the same as input', async () => {
      mockUserAuthenticationStore = {
        isLoading: jasmine.createSpy('isLoading').and.returnValue(false),
      };
      const headingText = faker.lorem.words();
      await render(SharedAccountPageComponent, {
        inputs: {
          headingText,
        },
        providers: [
          ...testProviders,
          provideRouter([]),
          {
            provide: UserAuthenticationStore,
            useValue: mockUserAuthenticationStore,
          },
        ],
      });

      expect(screen.getByText(headingText).textContent).toBe(headingText);
      expect(mockUserAuthenticationStore.isLoading).toHaveBeenCalled();
    });
  });

  describe('Spectator Integration Tests', () => {
    let spectator: Spectator<SharedAccountPageComponent>;
    const createComponent = createRoutingFactory({
      component: SharedAccountPageComponent,
      detectChanges: false,
    });

    beforeEach(() => {
      mockUserAuthenticationStore = {
        isLoading: jasmine.createSpy('isLoading').and.returnValue(false),
      };
      spectator = createComponent({providers: [{
        provide: UserAuthenticationStore,
        useValue: mockUserAuthenticationStore,
      }]});
    });

    it('should have text same as input', () => {
      const headingText = faker.lorem.words();
      spectator.setInput('headingText', headingText);
      spectator.detectChanges();
      expect(spectator.query('h2')).toHaveText(headingText);
      expect(mockUserAuthenticationStore.isLoading).toHaveBeenCalled();
    });
  });
});
