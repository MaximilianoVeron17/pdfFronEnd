import { ChangeEvent, FC, useRef } from "react";
import modalStyles from "./UploadModalSection.module.scss";
import Button from "../Button";

interface ModalProps {
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

const ModalPagina: FC<ModalProps> = ({ onClose, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
      onClose();
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
            <Button
              primary
              onClick={handleOpenFileInput}
            >
              Buscar Archivo
            </Button>
            <Button
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalPagina;