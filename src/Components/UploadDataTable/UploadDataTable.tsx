import { FC } from "react";
import styles from "./UploadDataTable.module.scss"
import PersonalDataTable from "../PersonalDataTable";
import BonificationsTable from "../BonificationsTable";
import DiscountsTable from "../DiscountsTable";
import FamilyTable from "../FamilyTable";

export const UploadDataTable: FC<{currentTable: string, save: number}> = ({currentTable, save}) => {
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
      {currentTable == 'Bonifications' && <BonificationsTable save={save} />}
      {currentTable == 'Retenciones' && <DiscountsTable save={save} />}
      {currentTable == 'Asignaciones' && <FamilyTable save={save} />}
      {/* <tbody>
        {tableRows}
      </tbody> */}
    </table>
  )
}