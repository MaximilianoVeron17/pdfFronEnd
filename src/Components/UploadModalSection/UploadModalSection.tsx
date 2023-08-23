import React, { FC, useRef } from "react";
import modalStyles from "./UploadModalSection.module.scss";

interface ModalProps {
  onClose: () => void;
}

const ModalPagina: FC<ModalProps> = ({ onClose }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modal}>
        <div className={modalStyles.window}>
          <div className={modalStyles.titleBar}>
            <div className={modalStyles.botones}>
              <p className={modalStyles.botonx} onClick={onClose}>
                X
              </p>
            </div>
            <h3 className={modalStyles.titulo}>Cargar Archivo Excel</h3>
          </div>
          <div className={modalStyles.separator}>
            {" "}
            <div className={modalStyles.dragContainer}>
              <p>Arrastra el Archivo Excel Aquí</p>
            </div>
          </div>
          <div className={modalStyles.buttonsContainer}>
            <button
              className={`${modalStyles.button} ${modalStyles.busqueda}`} // Agrega las clases "button" y "busqueda"
              onClick={handleOpenFileInput}
            >
              Buscar Archivo
            </button>
            <button
              className={`${modalStyles.button} ${modalStyles.cierre}`} // Agrega las clases "button" y "cierre"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              const selectedFile = event.target.files && event.target.files[0];
              if (selectedFile) {
                console.log("Archivo seleccionado:", selectedFile);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalPagina;