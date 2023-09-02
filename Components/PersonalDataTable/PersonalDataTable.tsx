import React, { FC, useState, useEffect } from "react";
import styles from "./PersonalDataTable.module.scss";

interface PersonalDataTableProps {
  excelData: any[][] | null;
}

export const PersonalDataTable: FC<PersonalDataTableProps> = ({ excelData }) => {
  const categorias = ['1', '2', '3', '4', '10'];
  const [tableData, setTableData] = useState<any[][] | null>(excelData ? excelData.slice(1) : null);


  const defaultRows = [];
  for (let index = 1; index <= 100; index++) {
    defaultRows.push(
      <tr key={index}>
        <td>{index}</td>
        <td>
          <input type="number" min={0} max={99999999} placeholder="N° DNI" />
        </td>
        <td>
          <input type="text" placeholder="Apellido" />
        </td>
        <td>
          <input type="text" placeholder="Nombre" />
        </td>
        <td>
          <input type="text" placeholder="Cargo" />
        </td>
        <td className={styles.categoryContainer}>
          <select className={styles.categoryOptions} name="" id="">
            {categorias.map((categoria, index) => {
              return (
                <option key={index} value={`Categoria ${categoria}`}>Categoria {categoria}</option>
              )
            })}
          </select>
        </td>
        <td>
          <input className={styles.fechaIngreso} type="date" placeholder="Fecha Ingreso" />
        </td>
        <td >
          <div className={styles.checkbocContainer}>
            <input type="checkbox" />
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
              type="number"
              min={0}
              max={99999999}
              placeholder="N° DNI"
              value={row[0] || ""}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Apellido"
              value={row[1] || ""}
            />
          </td>
          <td>
            <input type="text" placeholder="Nombre" value={row[2] || ""} />
          </td>
          <td>
            <input type="text" placeholder="Cargo" value={row[3] || ""} />
          </td>
          <td className={styles.categoryContainer}>
            <select
              className={styles.categoryOptions}
              name=""
              id=""
              value={row[4] || ""}
            >
              {categorias.map((categoria, index) => {
                return (
                  <option key={index} value={`Categoria ${categoria}`}>
                    Categoria {categoria}
                  </option>
                );
              })}
            </select>
          </td>
          <td>
            <input
              className={styles.fechaIngreso}
              type="date"
              placeholder="Fecha Ingreso"
              value={row[5] || ""}
            />
          </td>
          <td>
            <div className={styles.checkbocContainer}>
              <input type="checkbox" checked={row[6] || false} />
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
          <th>DNI</th>
          <th>Apellido</th>
          <th>Nombre</th>
          <th>Cargo</th>
          <th>Categoria</th>
          <th>Fecha Ingreso</th>
          <th>Titulo</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {renderTableRows()}
      </tbody>
    </>
  );
};