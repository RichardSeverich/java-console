import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from 'app/components/Message';

describe('test the Message container', () => {
  it('should render the message container', () => {
    expect.assertions(1);
    render(<Message text="No stages defined" />);
    expect(screen.getByText('No stages defined')).toBeInTheDocument();
  });
});
