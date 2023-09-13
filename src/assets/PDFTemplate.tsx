import { FC, createRef, forwardRef, useEffect, useRef } from "react";
import styles from "./PDFTemplate.module.scss"
import { useReactToPrint } from "react-to-print";
import Button from "../Components/Button";

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
  // print: boolean;
  // timeout: number;
}

const PDFTemplate:FC<IPDFTemplate> = ({ haberesYDescuentos, personalData, month, totals, year, }) => {

  const ref = createRef()

  // Send print request to the Main process
  const handlePrint = function (target) {
    console.log('print')
    return new Promise(async () => {
      console.log("forwarding print request to the main process...");

      const data = target.contentWindow.document.documentElement.outerHTML;
      //console.log(data);
      const blob = new Blob(["\uFEFF" + data], { type: "text/html;charset=utf-8", });
      const url = URL.createObjectURL(blob);

      await window.electronAPI.printComponent(url, `${personalData.firstName}_${personalData.lastName}_${month}_${year}`, (response) => {
        console.log("Main: ", response);
      });
      //console.log('Main: ', data);
    });
  };

  const handleChartPrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: "Chart component",
    print: handlePrint,
    onAfterPrint: () => console.log('print')
  });

  // useEffect(()=>{
  //   if(print) {
  //       handleChartPrint()
  //   }
  // },[print])

  return (
    <div style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
    <div className={styles.tableContainer} ref={ref}>
      <table className={styles.table}>
        <tr className={styles.firstHeading}>
          <td>
            Recibo de Haberes
          </td>
        </tr>
        <tr className={styles.secondHeader}>
          <td className={styles.twoHeaders}>
            <img src="data:image/jpeg;base64,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"  alt="" />
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
      <div style={{ position: 'absolute', bottom: '20px', display: 'flex', justifyContent: 'center', width: '850px' }}>

        <Button  onClick={handleChartPrint}>Guardar</Button>
        </div>
    </div>
  )
};

export default PDFTemplate