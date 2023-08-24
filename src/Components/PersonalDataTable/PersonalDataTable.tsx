import { FC } from "react";
import styles from "./PersonalDataTable.module.scss"

export const PersonalDataTable: FC = () => {
  const categorias = ['1', '2', '3', '4', '10']
  const tableRows = []
  for (let index = 1; index <= 100; index++) {
    tableRows.push(
      <tr>
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
    )
  }
  return(
    <>
      <thead className={styles.thead}>
        <th>N° Orden</th>
        <th>DNI</th>
        <th>Apellido</th>
        <th>Nombre</th>
        <th>Cargo</th>
        <th>Categoria</th>
        <th>Fecha Ingreso</th>
        <th>Titulo</th>
      </thead>
      <tbody className={styles.tbody}>
        {tableRows}
      </tbody>
    </>
  )
}