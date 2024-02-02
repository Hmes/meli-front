// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  test('renders without errors', () => {
    render(<App />);
    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });

  test('displays loading screen when loading is true', () => {
    render(<App />);
    // Assuming LoadingScreen has a unique test ID
    expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('Set Loading to True'));

    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });
});
