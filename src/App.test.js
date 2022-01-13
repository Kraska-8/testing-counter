import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

// set up Enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the App Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 */
const findByTestAttribute = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttribute(wrapper,'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttribute(wrapper,'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter display starts from 0', () => {
  const wrapper = setup();
  const count = findByTestAttribute(wrapper,'count').text();
  expect(count).toBe('0');
});

describe('Increment', () => {
  test('renders increment button', () => {
    const wrapper = setup();
    const button = findByTestAttribute(wrapper, 'increment-button');

    expect(button.length).toBe(1);
  });

  test('counter increments when button is clicked', () => {
    const wrapper = setup();
    const button = findByTestAttribute(wrapper, 'increment-button');

    button.simulate('click');

    const count = findByTestAttribute(wrapper, 'count').text();
    expect(count).toBe('1');
  });
});

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttribute(wrapper, 'decrement-button');

    expect(button.length).toBe(1);
  });

  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const wrapper = setup();

    const incButton = findByTestAttribute(wrapper, 'increment-button');
    incButton.simulate('click');

    const decButton = findByTestAttribute(wrapper, 'decrement-button');
    decButton.simulate('click');

    const count = findByTestAttribute(wrapper, 'count').text();
    expect(count).toBe('0');
  });
});

describe('Error when counter goes below 0', () => {
  test('error does not show when not needed', () => {
    const wrapper = setup();
    const errorDiv = findByTestAttribute(wrapper, 'error-message');
    const errorHasHiddenClass = errorDiv.hasClass('hidden');

    expect(errorHasHiddenClass).toBe(true);
  });

  describe('counter is 0 and decrement is clicked', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
      const button = findByTestAttribute(wrapper, 'decrement-button');
      button.simulate('click');
    });

    test('error shows', () => {
      const errorDiv = findByTestAttribute(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(false);
    });

    test('counter still displays 0', () => {
      const count = findByTestAttribute(wrapper, 'count').text();

      expect(count).toBe('0');
    });

    test('clicking increment clears the error', () => {
      const incButton = findByTestAttribute(wrapper, 'increment-button');
      incButton.simulate('click');

      const errorDiv = findByTestAttribute(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');

      expect(errorHasHiddenClass).toBe(true);
    });
  });
});


