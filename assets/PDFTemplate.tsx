import { forwardRef } from "react";
import styles from "./PDFTemplate.module.scss"

interface IPDFTemplate {
  personalData: {
    lastName: string;
    firstName: string;
    charge: string;
    fechaIngreso: string;
    dni: number;
    category: number;
    antiguedad: number;
  };
  haberesYDescuentos: Array<{
    haber?: {
      name: string;
      value: number;
    };
    descuento?: {
      name: string;
      value: number
    }
  }>;
  totals: {
    subtotal: number;
    htotal: number;
    dtotal: number;
    netTotal: number
  };
  month: string;
  year: number;
}

const PDFTemplate = forwardRef(({ haberesYDescuentos, personalData, month, totals, year }: IPDFTemplate,ref) => (
  <div className={styles.tableContainer} ref={ref}>
    <table className={styles.table} >
      <tr className={styles.firstHeading}>
        Recibo de Haberes
      </tr>
      <tr className={styles.secondHeader}>
        <td className={styles.twoHeaders}>
          <img src="src\assets\Muni-Benitez.png" alt="" />
        </td>
        <td className={styles.twoHeaders}>
          <p>F&#233;lix A Benitez 350</p>
          <p>{"Tel 0362 XXXXXXX/XXXXXXX"}</p>
          <p>{'"Colonia Benitez, Bella por Naturaleza"'}</p>
          <p>{"CUIT 30 - XXXXXXXX - 4"}</p>
        </td>
      </tr>
      <tr className={styles.secondHeader}>
        <td className={styles.twoHeaders}>
          <p>{`Apellido y Nombre: ${personalData.lastName} ${personalData.firstName}`}</p>
          <p>{`Cargo: ${personalData.charge}`}</p>
          <p>{`Fecha Ingreso: ${personalData.fechaIngreso}`}</p>
        </td>
        <td className={styles.twoHeaders}>
          <p>{`D.N.I. N°: ${personalData.dni}`}</p>
          <p>{`Categoría: Categoría ${personalData.category}`}</p>
          <p>{`ANTIGÜEDAD: ${personalData.antiguedad} Años`}</p>
        </td>
      </tr>
      <tr className={styles.tableTitles}>
        <th>HABERES</th>
        <th className={styles.importeTitle}>IMPORTE</th>
        <th>DESCUENTOS</th>
        <th className={styles.importeTitle}>IMPORTE</th>
      </tr>
      <tbody>
        {
          haberesYDescuentos.map(({haber, descuento}) => (
            <tr className={styles.tableRows}>
              <td>
                {haber ? haber.name : '-'}
              </td>
              <td className={styles.importe}>
                {haber ? `$ ${haber.value.toString().replace('.', ',')}` : '$'}
              </td>
              <td>
                {descuento ? descuento.name : '-'}
              </td>
              <td className={styles.importe}>
                {descuento ? `$ ${descuento.value.toString().replace('.', ',')}` : '$'}
              </td>
            </tr>
          ))
        }
      </tbody>
      <tr className={styles.totalsRow}>
        <td className={styles.totalH}>{`TOTAL HABERES MES DE ${month} DE ${year}`}</td>
        <td className={styles.importeTotals}>$ {totals.htotal.toString().replace('.', ',')}</td>
        <td>TOTAL DESCUENTOS</td>
        <td className={styles.importeTotals}>$ {totals.dtotal.toString().replace('.', ',')}</td>
      </tr>
      <tr className={styles.totalsRow}>
        <td className={styles.signs}>
          <div>
            <p>{"FECHA: ......................"}</p>
            <p>{"RECIBÍ CONFORME"}</p>
          </div>
          <p>{"Firma Agente"}</p>
          <p>{"Apellido y Nombre"}</p>
        </td>
        <td className={styles.netTotal}>
          <p>{"TOTAL NETO"}</p>
          <p>$ {totals.netTotal.toString().replace('.', ',')}</p>
        </td>
      </tr>
    </table>
  </div>
)
);

export default PDFTemplate