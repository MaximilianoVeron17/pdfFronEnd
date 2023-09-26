import { FC, createRef } from "react";
import styles from "./PDFTemplate.module.scss"
import { useReactToPrint } from "react-to-print";
import Button from "../Components/Button";
import { FinalDataType } from "../Components/GlobalContext/GlobalContext";
import MontserratURL from "../fonts/Montserrat_Alternates/MontserratAlternates-Bold.ttf?url"
 
interface IPDFTemplate {
  personalData: FinalDataType[0]['personalData'];
  haberesYDescuentos: FinalDataType[0]['haberesYDescuentos'];
  totals: FinalDataType[0]['totals'];
  family: FinalDataType[0]['family']
  month: string;
  year: number;
  // print: boolean;
  // timeout: number;
}

const PDFTemplate:FC<IPDFTemplate> = ({ haberesYDescuentos, personalData, month, totals, year, family }) => {

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
    onAfterPrint: () => console.log('print'),
    fonts: [
      {
        family: 'Montserrat Alternates',
        source: MontserratURL,
        weight: 'bold'
      }
    ]
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
            <div style={{ paddingLeft: '30px' }}>
              <img style={{ width: '80px', height: '80px' }} src="https://scontent-eze1-1.xx.fbcdn.net/v/t39.30808-6/273460452_304214725076324_4098956786169781530_n.png?_nc_cat=103&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=3e9PrMxjkUUAX_noJys&_nc_ht=scontent-eze1-1.xx&oh=00_AfCjpAUdqjkZUk7oGFLMUDdmgpvXBF6IWlfAVusgZX0dMw&oe=65071A1D" alt="" />
            </div>
          </td>
          <td className={styles.twoHeaders}>
            <p>Félix A Benitez 350</p>
            <p>{"Tel 0362 4493175/4493041"}</p>
            <p>{'"Colonia Benitez, Bella por Naturaleza"'}</p>
            <p>{"CUIT 30 - 67021402 - 4"}</p>
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
            <p>{`Categoría: ${personalData.category}`}</p>
            <p>{`ANTIGÜEDAD: ${personalData.antiguedad}`}</p>
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
                  {haber ? haber.name : '---'}
                </td>
                <td className={styles.importe}>
                  {haber ? `$ ${haber.value.toLocaleString()}` : '---'}
                </td>
                <td>
                  {descuento ? descuento.name : '---'}
                </td>
                <td className={styles.importe}>
                  {descuento ? `$ ${descuento.value.toLocaleString()}` : '---'}
                </td>
              </tr>
            ))
          }
          <tr className={styles.tableRows}>
            <td>
              SUB TOTAL
            </td>
            <td className={styles.importe} style={{fontWeight: 'bold'}}>
              {`$ ${totals.subTotal.toLocaleString()}`}
            </td>
            <td>
              -
            </td>
            <td className={styles.importe}>
              -
            </td>
          </tr>
          {
            family.map(({ name, value }) => (
              <tr className={styles.tableRows}>
                <td>
                  {name ?? '---'}
                </td>
                <td className={styles.importe}>
                  {`$ ${value.toLocaleString()}` ?? '---'}
                </td>
                <td>
                  ---
                </td>
                <td className={styles.importe}>
                  ---
                </td>
              </tr>
            ))
          }
        </tbody>
        <tr className={styles.totalsRow}>
          <td className={styles.totalH}>{`TOTAL HABERES MES DE ${month} DE ${year}`}</td>
          <td className={styles.importeTotals}>$ {totals.hTotal.toLocaleString()}</td>
          <td>TOTAL DESCUENTOS</td>
          <td className={styles.importeTotals}>$ {totals.dTotal.toLocaleString()}</td>
        </tr>
        <tr className={styles.totalsRow}>
          <td className={styles.signs}>
            <div>
              <p>{"FECHA: ......................"}</p>
              <p>{"RECIBÍ CONFORME"}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <p>..............................................</p>
              <p>{"Firma Agente"}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <p>..............................................</p>
              <p>{"Apellido y Nombre"}</p>
            </div>
          </td>
          <td className={styles.netTotal}>
            <p>{"TOTAL NETO"}</p>
            <p>$ {totals.netTotal.toLocaleString()}</p>
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