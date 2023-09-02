import { FC } from "react";
import styles from "./BonificationsTable.module.scss"

export const BonificationsTable: FC = () => {
  const tableRows = []
  for (let index = 1; index <= 100; index++) {
    tableRows.push(
      <tr>
        <td>{index}</td>
        <td>
          <input type="text" placeholder="Apellido" value={index < 10 ? 'Acosta' : ''} readOnly/>
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
            <input className={styles.checkbox} type="checkbox"/>
          </div>
        </td>
        <td>
          <div className={styles.checkbocContainer}>
            <input className={styles.checkbox} type="checkbox"/>
          </div>
        </td>
        <td>
          <div className={styles.checkbocContainer}>
            <input className={styles.checkbox} type="checkbox" />
          </div>
        </td>
      </tr>
    )
  }
  return (
    <>
      <thead className={styles.thead}>
        <th >N° Orden</th>
        <th>Apellido</th>
        <th>Nombre</th>
        <th>Hs Extra</th>
        <th>Insalubridad</th>
        <th>R. de Vida</th>
        <th>M. Dedic.</th>
        <th>Dedic. Perm.</th>
      </thead>
      <tbody className={styles.tbody}>
        {tableRows}
      </tbody>
    </>
  )
}