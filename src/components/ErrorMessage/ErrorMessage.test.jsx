import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorMessage } from './ErrorMessage';
import { describe, it, expect } from 'vitest';

describe('ErrorMessage Component', () => {
  function renderErrorMessage(type) {
    return render(
      <MemoryRouter>
        <ErrorMessage type={type} />
      </MemoryRouter>,
    );
  }

  it('renders default error message with no prop passed', () => {
    renderErrorMessage();
    expect(
      screen.getByText(/something went wrong\. please try again later/i),
    ).toBeInTheDocument();
  });

  it('renders proper error message with "fetch" prop passed', () => {
    renderErrorMessage('fetch');
    expect(
      screen.getByText(/unable to load products right now/i),
    ).toBeInTheDocument();
  });

  it('renders proper error message with "route" prop passed', () => {
    renderErrorMessage('route');
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
