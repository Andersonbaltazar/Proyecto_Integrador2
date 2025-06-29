import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import Button from "../components/widgets/Button";
import useAuthStore from "../store/useAuthStore";

const SettingsPage = () => {
  const { user } = useAuthStore();
  const { updateUser } = useAuthStore();
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    picture: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        picture: user.picture || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, picture } = formData;

    const result = await updateUser({
      first_name,
      last_name,
      picture,
    });

    if (result.success) {
      alert("Datos actualizados correctamente.");
    } else {
      alert("Error al actualizar los datos.");
    }
  };

  return (
    <div className="page-layout d-flex">
      <Sidebar />
      <article className="page-content-container d-flex flex-column">
        <header className="header-dashboard-container d-flex">
          <h1 className="title-header-dashboard">Configuración de la Cuenta</h1>
        </header>
        <section className="w-full h-full d-flex flex-column mt-3">
          <form onSubmit={handleSubmit} className="p-3">
            <div className="d-flex flex-column mb-3 w-80">
              <h2>Perfil de Cuenta</h2>
              <span>
                Administra tu cuenta. Todos los cambios que realices aquí se
                aplicarán a todos tus espacios de trabajo. Puedes actualizar tu
                información personal, cambiar tu foto de perfil y gestionar la
                configuración de seguridad.
              </span>
            </div>
            <div className="d-flex gap-2 mb-4 w-full">
              <div className="d-flex flex-column w-50 gap-3">
                <div className="d-flex flex-column w-full gap-3">
                  <label htmlFor="first_name">Nombre:</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column w-full gap-3">
                  <label htmlFor="last_name">Apellidos:</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column w-full gap-3">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    className="form-input"
                  />
                </div>
                <div className="d-flex w-full mt-3">
                  <Button type="submit" className="button mt-4">
                    Guardar
                  </Button>
                </div>
              </div>
              <div className="d-flex w-50 justify-center">
                <div className="d-flex flex-column align-center gap-5 justify-center">
                  <img
                    src={formData.picture}
                    alt={formData.name}
                    className="avatar"
                  />
                  <Button
                    type="button"
                    className="button"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Cambiar foto
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const previewURL = URL.createObjectURL(file);
                        setFormData((prev) => ({
                          ...prev,
                          picture: previewURL,
                          pictureFile: file,
                        }));
                      }
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </form>
          <form action="" className="p-3">
            <div className="d-flex flex-column mt-2 mb-3 w-80">
              <h2>Eliminar Cuenta</h2>
              <span className="text-muted">
                Esta acción eliminará permanentemente tu cuenta y todos los
                datos asociados. Ten en cuenta que esta operación no se puede
                deshacer.
              </span>
            </div>
            <div className="d-flex flex-column w-50 gap-3">
              <label htmlFor="email">Confirma tu Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Coloca tu Email"
                className="form-input"
              />
            </div>
            <div className="d-flex w-full mt-3">
              <Button type="submit" className="button mt-4">
                Eliminar Cuenta
              </Button>
            </div>
          </form>
        </section>
      </article>
    </div>
  );
};

export default SettingsPage;
