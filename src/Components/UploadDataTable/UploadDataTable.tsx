import { FC } from "react";
import styles from "./UploadDataTable.module.scss"
import PersonalDataTable from "../PersonalDataTable";
import BonificationsTable from "../BonificationsTable";
import DiscountsTable from "../DiscountsTable";

export const UploadDataTable: FC<{currentTable: string}> = ({currentTable}) => {
  const categorias = ['1', '2', '3', '4', '10']
  const tableRows = []
  for (let index = 1; index <= 100; index++) {
    tableRows.push(
      <tr>
        <td>{index}</td>
        <td>
          <input type="text" placeholder="Apellido" />
        </td>
        <td>
          <input type="text" placeholder="Nombre" />
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
          <input className={styles.fechaIngreso} type="date" placeholder="Fecha Ingreso"/>
        </td>
        <td>
          <input type="checkbox"/>
        </td>
        <td>
          <input type="number" min={0} max={720} placeholder="Hs Extra"/>
        </td>
        <td>hola</td>
        <td>hola</td>
      </tr>
    )
  }

  return (
    <table className={styles.table}>
      {/* <thead>
        <th>N° Orden</th>
        <th>Apellido</th>
        <th>Nombre</th>
        <th>Categoria</th>
        <th>Fecha Ingreso</th>
        <th>Titulo</th>
        <th>Horas Extra</th>
        <th>Extras</th>
        <th>. . .</th>
      </thead> */}
      {currentTable == 'PersonalData' && <PersonalDataTable />}
      {currentTable == 'Bonifications' && <BonificationsTable />}
      {currentTable == 'Descuentos' && <DiscountsTable />}
      {/* <tbody>
        {tableRows}
      </tbody> */}
    </table>
  )
}