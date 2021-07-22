import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TabPanel from './index.js';

describe('testing the basic functionality of the default tab panel', () => {
  it('will check if the TabPanel rendered correctly', () => {
    expect.assertions(2);
    const mockTabs = ['Tab1', 'Tab2', 'Tab3'];
    render(
      <MemoryRouter initialEntries={['/']}>
        <TabPanel
          className="value"
          current="Tab1"
          path="/home"
          tabs={mockTabs}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Tab1')).toBeInTheDocument();
    expect(screen.getByText('Tab3')).toBeInTheDocument();
  });
});
