import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorNotFound from 'app/mappers/ErrorNotFound';
import SearchCandidates from './index';

describe('searchCandidates is the component for search candidates with a keyword', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(1);
    const mockSelectCandidate = jest.fn();
    const mockGetCandidates = jest.fn();
    const mockResultSearch = [{ id: 11, name: 'Cristal Flores' }];
    const mockCandidate = 'Cristal';

    const notFoundError = new ErrorNotFound();
    render(
      <div>
        <SearchCandidates
          getCandidates={mockGetCandidates}
          resultSearch={mockResultSearch}
          selectCandidate={mockSelectCandidate}
          candidate={mockCandidate}
          notFoundError={notFoundError}
        />
        <h2>{mockCandidate}</h2>
      </div>
    );
    expect(screen.getByText('Cristal Flores')).toBeInTheDocument();
  });

  it('should render the component with message Candidate not found', () => {
    expect.assertions(1);
    const mockSelectCandidate = jest.fn();
    const mockGetCandidates = jest.fn();
    const mockResultSearch = [{ id: 11, name: 'Cristal Flores' }];
    const mockCandidate = 'Test';
    const notFoundError = new ErrorNotFound('204', 'Candidate Not Found');
    render(
      <div>
        <SearchCandidates
          getCandidates={mockGetCandidates}
          resultSearch={mockResultSearch}
          selectCandidate={mockSelectCandidate}
          candidate={mockCandidate}
          notFoundError={notFoundError}
        />
        <h2>{mockCandidate}</h2>
      </div>
    );
    expect(screen.getByText('Candidate Not Found')).toBeInTheDocument();
  });
});
