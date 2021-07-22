import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidateDetails from './index';

describe('expected CandidateDetails behavior', () => {
  it('should render the componenent CandidateDetails when loaded', async () => {
    expect.assertions(17);
    render(
      <CandidateDetails
        firstNames="Diego"
        lastNames="Mejia"
        email="diego.mejia@gmail.com"
        city="Cochabamba"
        cellphone="77856945"
        university="UPB"
        career="Sistemas"
        semester="10"
        birthDate="2014-08-18"
        fullName="Diego Mejia"
      />
    );
    expect(screen.getByDisplayValue('Diego')).toBeTruthy();
    expect(screen.getByDisplayValue('Mejia')).toBeTruthy();
    expect(screen.getByDisplayValue('diego.mejia@gmail.com')).toBeTruthy();
    expect(screen.getByDisplayValue('Cochabamba')).toBeTruthy();
    expect(screen.getByDisplayValue('77856945')).toBeTruthy();
    expect(screen.getByDisplayValue('UPB')).toBeTruthy();
    expect(screen.getByDisplayValue('Sistemas')).toBeTruthy();
    expect(screen.getByDisplayValue('2014-08-18')).toBeTruthy();
    expect(await screen.findAllByText('First Names')).toBeTruthy();
    expect(await screen.findAllByText('City')).toBeTruthy();
    expect(await screen.findAllByText('Email')).toBeTruthy();
    expect(await screen.findAllByText('University')).toBeTruthy();
    expect(await screen.findAllByText('Semester')).toBeTruthy();
    expect(await screen.findAllByText('Last Names')).toBeTruthy();
    expect(await screen.findAllByText('Cellphone')).toBeTruthy();
    expect(await screen.findAllByText('Birthdate')).toBeTruthy();
    expect(await screen.findAllByText('Career')).toBeTruthy();
  });
});
