import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ImportForm from './index';

describe('importForm is the component for import programs through a csv file', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(1);
    const mockHandleImport = jest.fn();
    const mockResultSaved = '';
    const mockResultRejected = '';
    const mockTypeFile = '';
    const mockErrorMessage = '';
    render(
      <ImportForm
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
  it('should render the error message if there is a code when loaded', () => {
    expect.assertions(1);
    const mockHandleImport = jest.fn();
    const mockResultSaved = '';
    const mockResultRejected = '';
    const mockTypeFile = '';
    const mockErrorMessage = 'Error Message';
    render(
      <ImportForm
        id="inputUpload"
        handleImport={mockHandleImport}
        resultSaved={mockResultSaved}
        resultRejected={mockResultRejected}
        typeFile={mockTypeFile}
        errorMessage={mockErrorMessage}
      />
    );
    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });
  it('should be called when the import button is pressed with the file', () => {
    expect.assertions(2);
    const mockHandleImport = jest.fn();
    const mockResultSaved = '';
    const mockResultRejected = '';
    const mockTypeFile = 'csv';
    const mockErrorMessage = '';
    const mockFile = new File(['Dev30'], 'file.csv');
    render(
      <ImportForm
        id="inputUpload"
        handleImport={mockHandleImport}
        resultSaved={mockResultSaved}
        resultRejected={mockResultRejected}
        typeFile={mockTypeFile}
        errorMessage={mockErrorMessage}
      />
    );
    document.getElementById('inputUpload').value = '';
    fireEvent.change(screen.getByDisplayValue(''), {
      target: { files: [mockFile] },
    });
    fireEvent.click(screen.getByText('Import'));
    expect(mockHandleImport.mock.calls).toHaveLength(0);
    expect(screen.getByDisplayValue('').files[0]).toStrictEqual(mockFile);
  });
});
