import { FC } from "react";
import styles from "./UploadDataTable.module.scss"

export const UploadDataTable: FC = () => {
  const categorias = ['1', '2', '3', '4']
  const tableRows = []
  for (let index = 1; index <= 100; index++) {
    tableRows.push(
      <tr>
        <td>{index}</td>
        <td>
          <input type="text" />
        </td>
        <td>
          <select name="" id="">
            {categorias.map((categoria, index) => {
              return (
                <option key={index} value={categoria}>{categoria}</option>
              )
            })}
          </select>
        </td>
        <td>
          <input type="number" />
        </td>
        <td>
          <input type="number" />
        </td>
        <td>
          <input type="number" />
        </td>
        <td>hola</td>
        <td>hola</td>
      </tr>
    )
  }

  return (
    <table className={styles.table}>
      <thead>
        <th>Indice</th>
        <th>Apellido y Nombre</th>
        <th>Categoria</th>
        <th>Antigüedad</th>
        <th>Hijos</th>
        <th>Horas Extra</th>
        <th>Extras</th>
        <th>. . .</th>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}