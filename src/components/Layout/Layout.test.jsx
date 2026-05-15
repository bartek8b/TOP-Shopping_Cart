import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders children within wrapper', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={<div data-testid="test-child">Test content</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /go to home page/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });
});
