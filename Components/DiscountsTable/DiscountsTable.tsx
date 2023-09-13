import React, { FC, useState, useEffect } from "react";
import styles from "./DiscountsTable.module.scss";

interface DiscountsTableProps {
  excelData: any[][] | null;
}

const initialRowData = {
  Apellido: "",
  Nombre: "",
  Inasistencias: "",
  "2° Cuota %50": false,
  "5% Flia. a/c": false,
  "S.Asist./Chq": false,
  "Seg.Ob.": false,
  "Seg.Op": false,
  "Seg.Fliar": false,
  Judiciales: false,
  "Cuota Sindical": false,
};

export const DiscountsTable: FC<DiscountsTableProps> = ({ excelData }) => {
  const [tableData, setTableData] = useState<any[][] | null>(
    excelData ? excelData.slice(1) : null
  );


  const defaultRows = [];
  for (let index = 1; index <= 100; index++) {
    defaultRows.push(
      <tr key={index}>
        <td>{index}</td>
        <td>
          <input
            type="text"
            placeholder="Apellido"
            value={index < 10 ? 'Acosta' : ''}
            readOnly
          />
        </td>
        <td>
          <input type="text" placeholder="Nombre" value={'Facundo'} readOnly />
        </td>
        <td>
          <input type="number" min={0} max={31} />
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
          <td>{index + 2}</td>
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
              max={31}
              value={row[2] || ""}
            />
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[3] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[4] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[5] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[6] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[7] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[8] || false}
              />
            </div>
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={row[9] || false}
              />
            </div>
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
          <th>Inasistencias</th>
          <th>2° Cuota %50</th>
          <th>5% Flia. a/c</th>
          <th>S.Asist./Chq</th>
          <th>Seg.Ob.</th>
          <th>Seg.Op</th>
          <th>Seg.Fliar</th>
          <th>Judiciales</th>
          <th>Cuota Sindical</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {renderTableRows()}
      </tbody>
    </>
  );
};