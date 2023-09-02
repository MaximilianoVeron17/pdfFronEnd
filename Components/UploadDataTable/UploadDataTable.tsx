import React, { FC } from "react";
import styles from "./UploadDataTable.module.scss";

export const UploadDataTable: FC<{ excelData: any[][] | null }> = ({
  excelData,
}) => {
  return (
    <div className={styles.uploadDataTable}>
      <h3>Contenido del archivo Excel:</h3>
      {excelData && excelData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              {excelData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se han cargado datos de Excel.</p>
      )}
    </div>
  );
};