import { FC, useContext, useEffect, useState } from "react";
import {
  GlobalContext,
  GlobalContextType,
} from "../GlobalContext/GlobalContext";
import Button from "../Button";
import styles from "./UploadDataSection.module.scss";
import UploadDataTable from "../UploadDataTable";
import ModalPagina from "../UploadModalSection/UploadModalSection";
import * as XLSX from 'xlsx';
// import { validateFile } from "../../assets/utils";

export const UploadDataSection: FC = () => {
  const { PersonalData, Config, updateCurrentPage, setBonifications, setPersonalData, setDiscounts, setFamily} = useContext(GlobalContext) as GlobalContextType;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTable, setCurrentTable] = useState<'PersonalData' | 'Bonifications' | 'Retenciones' | 'Asignaciones'>('PersonalData');
  const [save, setSave] = useState<number>(0);
  const [excelData, setExcelData] = useState<Array<Array<any>>>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    if (currentTable == "PersonalData") updateCurrentPage("Landing")
    if (currentTable == "Bonifications") setCurrentTable("PersonalData")
    if (currentTable == "Retenciones") setCurrentTable("Bonifications")
    if (currentTable == "Asignaciones") setCurrentTable("Retenciones")
  }

  const handleNextClick = () => {
    if ((currentTable == "PersonalData") && (PersonalData.length > 0)) setCurrentTable("Bonifications")
    if (currentTable == "Bonifications") {
      setSave(save + 1)
      setTimeout(() => {
        setCurrentTable("Retenciones")
      }, 0);
    }
    if (currentTable == "Retenciones") {
      setSave(save + 1)
      setTimeout(() => {
        setCurrentTable("Asignaciones")
      }, 0);
    } 
    if (currentTable == "Asignaciones"){
      setSave(save + 1)
      setTimeout(() => {
        updateCurrentPage("Preview")
      }, 0);
    }
  }

  const titles = {
    "PersonalData": "Carga de Datos Personales",
    "Bonifications": "Cargar Bonificaciones",
    "Retenciones": "Cargar Retenciones",
    "Asignaciones": "Asignaciones Familiares"
  }

  const handleFileChange = (file) => {
    const reader = new FileReader();
    setPersonalData([])
    setBonifications([])
    setDiscounts([])
    setFamily([])
    // setFinalData([])

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as Array<Array<any>>;
      // validateFile(jsonData, Config)
      setExcelData(jsonData)
    };
    // excelData.forEach((dataArray) => {
    //   setPersonalData(prevPersonalData => {
    //     const newPersonalData = [...prevPersonalData]
    //     newPersonalData.push({
    //       id: dataArray[0],
    //       lastName: dataArray[1] as string,
    //       firstName: dataArray[2] as string,
    //       dni: dataArray[3] as number,
    //       charge: dataArray[4] as string,
    //       category: dataArray[4] as string,
    //       startDate: dataArray[5] as string,
    //       title: dataArray[6] as string
    //     })
    //     return newPersonalData
    //   })
    // })
    reader.readAsArrayBuffer(file);
    // console.log(reader.result)
  };

  useEffect(() => {
    excelData.forEach((dataArray, index) => {
      if (index > 1 && dataArray.length > 0) {
        console.log(dataArray);
        
        setPersonalData(prevPersonalData => {
          const newPersonalData = [...prevPersonalData]
          newPersonalData.push({
            id: dataArray[0],
            lastName: dataArray[1] as string,
            firstName: dataArray[2] as string,
            dni: parseInt((dataArray[3] as string).replace(/,/g, "", )),
            charge: dataArray[4] as string,
            category: dataArray[5] as string,
            startDate: dataArray[6] as string,
            title: (dataArray[7] as string).replace(/ /g, "")
          })
          return newPersonalData
        })

        setBonifications(prevBonifications => {
          const newBonifications = [...prevBonifications]
          newBonifications.push({
            hsExtra: parseInt(dataArray[13]),
            medDedication: parseInt(dataArray[11]),
            fixedConcepts: [
              {
                name: "Riesgo de Caja",
                value: dataArray[9] == "SI" ? true : false
              },
              {
                name: "Presentismo",
                value: dataArray[16] == "SI" ? true : false
              }
            ],
            proportionalConcepts: [              
              {
                name: "Insalubridad",
                value: dataArray[8] == "SI" ? true : false
              },
              {
                name: "Riesgo de Vida",
                value: dataArray[10] == "SI" ? true : false
              },
              {
                name: "Dedicacion Permanente",
                value: dataArray[12] == "SI" ? true : false
              },
              {
                name: "SAC",
                value: dataArray[15] == "SI" ? true : false
              }
            ]
          })
          return newBonifications
        })

        setDiscounts(prevDiscounts => {
          const newDiscounts = [...prevDiscounts]
          newDiscounts.push({
            inasistency: dataArray[22],
            fixedConcepts: [
              {
                name: "Seguro Obligatorio",
                value: dataArray[25] == "SI" ? true : false
              },
              {
                name: "Seguro Opcional",
                value: dataArray[26] == "SI" ? true : false
              },
              {
                name: "Seguro Familiar",
                value: dataArray[27] == "SI" ? true : false
              }
            ],
            proportionalConcepts: [
              {
                name: "Jubilacion",
                value: dataArray[17] == "SI" ? true : false
              },
              {
                name: "Obra Social",
                value: dataArray[18] == "SI" ? true : false
              },
              {
                name: "Alta Complejidad",
                value: dataArray[19] == "SI" ? true : false
              },
              {
                name: "FSP",
                value: dataArray[20] == "SI" ? true : false
              }
            ]
          })
          return newDiscounts
        })

        setFamily(prevFamily => {
          const newFamily = [...prevFamily]
          newFamily.push({
            acumulativeConcepts: [
              {
                name: "Hijo",
                value: dataArray[32]
              },
              {
                name: "Escolaridad Primaria",
                value: dataArray[34]
              }
            ],
            fixedConcepts: [
              {
                name: "Conyugue",
                value: dataArray[31] == "SI" ? true : false
              },
              {
                name: "Familia Numerosa",
                value: dataArray[33] == "SI" ? true : false
              },
              {
                name: "Refrigerio",
                value: dataArray[30] == "SI" ? true : false
              }
            ],
            proportionalConcepts: [
            ]
          })
          return newFamily
        })
      }
    })
  }, [excelData])

  return (
    <div className={styles.UploadDataSection}>
      <section className={styles.header}>
        <img src="src\assets\Muni-Benitez.png" alt="" />
        <h2 className={styles.title}>{titles[currentTable]}</h2>
      </section>
      <section className={styles.tableSection}>
        <div className={styles.tableContainer}>
          <UploadDataTable currentTable={currentTable} save={save}/>
        </div>
      </section>
      <section className={styles.buttonsContainer}>
        <Button
          size="14px"
          width="100px"
          onClick={handleBackClick}
        >
          {"< Atras"}
        </Button>
        <div className={styles.mainButtons}>
          <Button primary size="20px" width="250px" onClick={openModal}>
            {"Cargar Archivo .xlvs"}
          </Button>
          <Button
            primary
            size="20px"
            width="250px"
            onClick={handleNextClick}
          >
            {currentTable == "Asignaciones" ? "Vista Previa" : "Siguiente"}
          </Button>
        </div>
      </section>
      {isModalOpen && <ModalPagina onClose={closeModal} onFileSelect={handleFileChange} />}
    </div>
  );
};