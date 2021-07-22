import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './index';

describe('expected Button behavior', () => {
  it('should render the component Spinner when loading is true', () => {
    expect.assertions(1);
    const id = 'idSpinner';
    const size = 10;
    const loading = true;
    render(<div> {loading && <Spinner id={id} size={size} />} </div>);
    const spinner = document.getElementById('idSpinner');
    expect(spinner).toBeInTheDocument();
  });
});
