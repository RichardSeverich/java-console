import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

/**
 * Table reusable component for displaying
 * @param {array} headers are the headers of the table
 * @param {array} data is the information to display
 */
function CustomTable({ headers, data, showHeaders }) {
  return (
    <table className={style.table}>
      {showHeaders && (
        <thead>
          <tr className={style.tableRow}>
            {headers.map((header) => (
              <th key={`table-header-${header.name}`} className={style.header}>
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={style.tableBody}>
        {data.map((item) => {
          return (
            <tr key={`table-row-${item.id}`} className={style.tableRow}>
              {headers.map((header) => (
                <td
                  key={`table-cell-${header.name}-${item.id}`}
                  className={style.tableCell}
                >
                  {header.render(item)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CustomTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      render: PropTypes.func,
    })
  ),
  data: PropTypes.array,
  showHeaders: PropTypes.bool,
};

CustomTable.defaultProps = {
  headers: [],
  data: [],
  showHeaders: true,
};

export default CustomTable;
