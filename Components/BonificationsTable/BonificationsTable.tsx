import React, { FC, useState, useEffect } from "react";
import styles from "./BonificationsTable.module.scss";

interface BonificationsTableProps {
  excelData: any[][] | null;
}

export const BonificationsTable: FC<BonificationsTableProps> = ({ excelData }) => {
  const [tableData, setTableData] = useState<any[][] | null>(excelData ? excelData.slice(1) : null);

  const defaultRows = [];
  for (let index = 1; index <= 100; index++) {
    defaultRows.push(
      <tr key={index}>
        <td>{index}</td>
        <td>
          <input type="text" placeholder="Apellido" value={index < 10 ? 'Acosta' : ''} readOnly />
        </td>
        <td>
          <input type="text" placeholder="Nombre" value={'Facundo'} readOnly />
        </td>
        <td>
          <input type="number" min={0} max={160} />
        </td>
        <td>
          <div className={styles.checkbocContainer}>
            <input className={styles.checkbox} type="checkbox" />
          </div>
        </td>
        <td>
          <div className={styles.checkbocContainer}>
            <input className={styles.checkbox} type="checkbox" />
          </div>
        </td>
        <td>
          <div className={styles.checkbocContainer}>
            <input className={styles.checkbox} type="checkbox" />
          </div>
        </td>
        <td>
          <div className={styles.checkbocContainer}>
            <input className={styles.checkbox} type="checkbox" />
          </div>
        </td>
      </tr>
    );
  }

  useEffect(() => {
    if (excelData) {
      setTableData(excelData.slice(1));
    } else {
      setTableData(null);
    }
  }, [excelData]);

  
  const renderTableRows = () => {
    if (tableData) {
      return tableData.map((row, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <input
              type="text"
              placeholder="Apellido"
              value={row[2] || ""}
              readOnly
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Nombre"
              value={row[3] || ""}
              readOnly
            />
          </td>
          <td>
            <input
              type="number"
              min={0}
              max={160}
              value={row[9] || ""}
            />
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[10] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[11] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[13] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[14] || false}
              />
            </div>
          </td>
        </tr>
      ));
    } else {
      return defaultRows;
    }
  };

  return (
    <>
      <thead className={styles.thead}>
        <tr>
          <th>N° Orden</th>
          <th>Apellido</th>
          <th>Nombre</th>
          <th>Hs Extra</th>
          <th>Insalubridad</th>
          <th>R. de Vida</th>
          <th>M. Dedic.</th>
          <th>Dedic. Perm.</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {renderTableRows()}
      </tbody>
    </>
  );
};