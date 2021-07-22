import React from 'react';
import { render, screen } from '@testing-library/react';
import Program from 'app/mappers/Program';
import ProgramsDesign from './index';

describe('test the program design', () => {
  it('should render the component ProgramDesign when loaded', () => {
    expect.assertions(2);
    const mockProgramList = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 31, 'AT', 'Dev 31 description'),
    ];
    render(<ProgramsDesign programs={mockProgramList} />);
    expect(screen.getByText('DEV')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should render the import component with elements when loaded', () => {
    expect.assertions(1);
    const mockProgramList = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 31, 'AT', 'Dev 31 description'),
    ];
    const mockHandleImport = jest.fn();
    const mockResultSaved = '';
    const mockResultRejected = '';
    const mockTypeFile = '';
    const mockErrorMessage = '';
    render(
      <ProgramsDesign
        programs={mockProgramList}
        id="inputUpload"
        handleImport={mockHandleImport}
        resultSaved={mockResultSaved}
        resultRejected={mockResultRejected}
        typeFile={mockTypeFile}
        errorMessage={mockErrorMessage}
      />
    );
    expect(screen.getByText('Import')).toBeInTheDocument();
  });
});
