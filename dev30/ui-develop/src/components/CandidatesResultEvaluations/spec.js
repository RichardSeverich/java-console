import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidatesResultEvaluations from './index';

describe('candidatesResultEvaluations is a component for view all results evaluations of a candidate', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(2);
    const resultsEvaluationsMockList = [
      {
        id: 1,
        program: 'DEV-30',
        activity: 'Charla UMSS',
        exam: 'English level',
        set: 'Second set',
        score: 95.5,
      },
      {
        id: 2,
        program: 'DEV-30',
        activity: 'Charla Fundacion',
        exam: 'Psicotechnical interview',
        set: 'Second set',
        score: 95.5,
      },
    ];

    render(
      <CandidatesResultEvaluations results={resultsEvaluationsMockList} />
    );
    expect(screen.getByText('Charla UMSS')).toBeInTheDocument();
    expect(screen.getByText('Charla Fundacion')).toBeInTheDocument();
  });
});
