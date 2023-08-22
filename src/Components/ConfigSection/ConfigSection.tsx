import { FC, useContext, useState } from "react";
import styles from "./ConfigSection.module.scss";
import { GlobalContext, GlobalContextType } from "../GlobalContext/GlobalContext";
import { ConfigNavigation } from "../ConfigNavigation/ConfigNavigation";

export const ConfigSection: FC = () => {
  const options = [{ name: 'Categoria', type: 'number' }, { name: 'Antiguedad', type: 'percentage' }]
  const [currentPage, setCurrentPage] = useState(options[0].name);

  const {} = useContext(GlobalContext) as GlobalContextType;

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };


  // Función para renderizar el contenido de la página actual
  const renderContent = () => {
    switch (currentPage) {
      case "Antiguedad":
        return (
          <main>
            <table className={styles["space-tabla"]}>
              <thead>
                <tr>
                  <th>Antiguedad</th>
                  <th>Montos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Antiguedad 1</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Antiguedad 2</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Antiguedad 3</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Antiguedad 4</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
        );
      case "Categoria":
        return (
          <main>
            <table className={styles["space-tabla"]}>
              <thead>
                <tr>
                  <th>Categorias</th>
                  <th>Montos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Categoria 1</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Categoria 2</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Categoria 3</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Categoria 4</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
        );

      case "Hijos":
        return (
          <main>
            <table className={styles["space-tabla"]}>
              <thead>
                <tr>
                  <th>Hijos</th>
                  <th>Montos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hijos 1</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hijos 2</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hijos 3</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hijos 4</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
        );
      case "Horas Extra":
        return (
          <main>
            <table className={styles["space-tabla"]}>
              <thead>
                <tr>
                  <th>Horas Extra</th>
                  <th>Montos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hora Extra 1</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hora Extra 2</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hora Extra 3</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Hora Extra 4</td>
                  <td>
                    <input
                      type="text"
                      placeholder=""
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode < 48 || charCode > 57) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </main>
        );

      default:
        return (
          <h1 className={styles["space-tabla"]}>
            Seleccionar que parametro se desea configurar
          </h1>
        );
    }
  };

  return (
    <main className={styles["space-toggle"]}>
      <aside className={styles.sidebar}>
        <h2 className={styles.header}>
          Configuracion
        </h2>
        <ConfigNavigation options={options} handlePageChange={handlePageChange} />
      </aside>
      {renderContent()}
    </main>
  );
}