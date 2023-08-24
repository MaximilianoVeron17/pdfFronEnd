import { FC } from "react";
import styles from "./DiscountsTable.module.scss";

export const DiscountsTable: FC = () => {
  const tableRows = []
  for (let index = 1; index <= 100; index++) {
    tableRows.push(
      <tr>
        <td>{index}</td>
        <td>
          <input type="text" placeholder="Apellido" value={index < 10 ? 'Acosta' : ''} readOnly />
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
    )
  }
  return (
    <>
      <thead className={styles.thead}>
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
      </thead>
      <tbody className={styles.tbody}>
        {tableRows}
      </tbody>
    </>
  )
}