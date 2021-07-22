import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTable from 'components/Table';

describe('test reusable table component', () => {
  it('should render the table component with headers when loaded', () => {
    expect.assertions(6);
    const tableheaders = [
      {
        name: 'Name',
        render: (element) => {
          return <div>{element.name}</div>;
        },
      },
      {
        name: 'Last Name',
        render: (element) => {
          return <div>{element.lastName}</div>;
        },
      },
    ];
    const tableData = [
      { id: 1, name: 'Diego', lastName: 'Mejia' },
      { id: 2, name: 'Luis', lastName: 'Perez' },
    ];
    render(<CustomTable headers={tableheaders} data={tableData} />);
    expect(screen.getByText('Diego')).toBeInTheDocument();
    expect(screen.getByText('Luis')).toBeInTheDocument();
    expect(screen.getByText('Perez')).toBeInTheDocument();
    expect(screen.getByText('Mejia')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
  });

  it('should render the component table without the headers', () => {
    expect.assertions(4);
    const tableheaders = [
      {
        name: 'Name',
        render: (element) => {
          return <div>{element.name}</div>;
        },
      },
      {
        name: 'Last Name',
        render: (element) => {
          return <div>{element.lastName}</div>;
        },
      },
    ];
    const tableData = [
      { id: 1, name: 'Diego', lastName: 'Mejia' },
      { id: 2, name: 'Luis', lastName: 'Perez' },
    ];
    render(
      <CustomTable
        headers={tableheaders}
        data={tableData}
        showHeaders={false}
      />
    );
    expect(screen.getByText('Diego')).toBeInTheDocument();
    expect(screen.getByText('Luis')).toBeInTheDocument();
    expect(screen.getByText('Perez')).toBeInTheDocument();
    expect(screen.getByText('Mejia')).toBeInTheDocument();
  });
});
