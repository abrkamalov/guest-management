import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Button from '../Button/Button';
import styles from './GuestList.module.css';
import { ROUTES } from '../../utils/constants';

function GuestList({ guests, onRemoveGuest }) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`${ROUTES.GUEST_DETAIL.replace(':id', id)}`);
  };

  const handleRemoveClick = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this guest?')) {
      onRemoveGuest(id);
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.headerCell}>Most Recent Name</th>
            <th className={styles.headerCell}>Most Recent Email</th>
            <th className={styles.headerCell}>Phone</th>
            <th className={styles.headerCellAction}>Action</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(({ id, phone, names, emails }) => (
            <tr
              key={id}
              onClick={() => handleRowClick(id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRowClick(id);
                }
              }}
              className={styles.tableRow}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${names[0]}`}
            >
              <td className={styles.tableCell} data-label="Name">{names[0]}</td>
              <td className={styles.tableCell} data-label="Email">{emails[0]}</td>
              <td className={styles.tableCell} data-label="Phone">{phone}</td>
              <td className={styles.tableCellAction} data-label="Remove">
                <Button
                  onClick={(e) => handleRemoveClick(e, id)}
                  variant="danger"
                  className={styles.removeButton}
                  aria-label={`Remove ${names[0]}`}
                >
                  <Trash2 size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {guests.length === 0 && (
        <p className={styles.noGuests}>
          No guests found.
        </p>
      )}
    </div>
  );
}

export default GuestList;
