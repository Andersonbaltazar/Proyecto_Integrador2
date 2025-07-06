import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import EnhancedButton from "../components/widgets/EnhancedButton";
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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field on blur
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'first_name':
        if (!value.trim()) {
          error = 'El nombre es requerido';
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        } else if (value.trim().length > 50) {
          error = 'El nombre no puede exceder 50 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          error = 'El nombre solo puede contener letras y espacios';
        }
        break;
        
      case 'last_name':
        if (!value.trim()) {
          error = 'Los apellidos son requeridos';
        } else if (value.trim().length < 2) {
          error = 'Los apellidos deben tener al menos 2 caracteres';
        } else if (value.trim().length > 50) {
          error = 'Los apellidos no pueden exceder 50 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
          error = 'Los apellidos solo pueden contener letras y espacios';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate all fields
    Object.keys(formData).forEach(field => {
      if (field !== 'email' && field !== 'picture') { // Skip email and picture validation
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasChanges = () => {
    if (!user) return false;
    
    return (
      formData.first_name.trim() !== (user.first_name || '') ||
      formData.last_name.trim() !== (user.last_name || '') ||
      formData.pictureFile // New image selected
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if there are any changes
    if (!hasChanges()) {
      setMessage({
        type: "error",
        text: "No hay cambios para guardar.",
      });
      return;
    }
    
    // Validate form before submission
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Por favor, corrige los errores en el formulario.",
      });
      return;
    }
    
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { first_name, last_name, picture } = formData;

      const result = await updateUser({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        picture,
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: "Datos actualizados correctamente.",
        });
        // Clear errors on successful submission
        setErrors({});
        setTouched({});
      } else {
        setMessage({ type: "error", text: "Error al actualizar los datos." });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error inesperado. Intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="enhanced-page-container">
      <div className="page-layout d-flex">
        <Sidebar />
        <article className="page-content-container d-flex flex-column">
          {/* Enhanced Header */}
          <header className="enhanced-header">
            <h1 className="enhanced-title">Configuración de la Cuenta</h1>
            <div className="enhanced-controls">
              <div className="enhanced-buttons">
                                  <input
                    ref={fileInputRef}
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Validate file size (max 5MB)
                        if (file.size > 5 * 1024 * 1024) {
                          setMessage({
                            type: "error",
                            text: "La imagen no puede exceder 5MB.",
                          });
                          return;
                        }
                        
                        // Validate file type
                        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                        if (!validTypes.includes(file.type)) {
                          setMessage({
                            type: "error",
                            text: "Solo se permiten archivos JPG, PNG o WebP.",
                          });
                          return;
                        }
                        
                        const previewURL = URL.createObjectURL(file);
                        setFormData((prev) => ({
                          ...prev,
                          picture: previewURL,
                          pictureFile: file,
                        }));
                        
                        setMessage({
                          type: "success",
                          text: "Imagen seleccionada correctamente.",
                        });
                      }
                    }}
                    style={{ display: "none" }}
                  />
              </div>
            </div>
          </header>

          {/* Enhanced Content */}
          <section className="enhanced-content">
            {/* Profile Section */}
            <div className="enhanced-list-container">
              <div className="settings-section-header">
                <div className="settings-section-icon">
                  <ion-icon name="person-circle-outline"></ion-icon>
                </div>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Perfil de Cuenta</h2>
                  <p className="settings-section-description">
                    Administra tu cuenta. Todos los cambios que realices aquí se
                    aplicarán a todos tus espacios de trabajo. Puedes actualizar
                    tu información personal, cambiar tu foto de perfil y
                    gestionar la configuración de seguridad.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="settings-form">
                <div className="settings-form-layout">
                  <div className="settings-form-fields">
                    <div className="form-field-group">
                      <label htmlFor="first_name" className="form-field-label">
                        <ion-icon name="person-outline"></ion-icon>
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.first_name}
                        className={`form-field-input ${errors.first_name && touched.first_name ? 'form-field-input--error' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingresa tu nombre"
                      />
                      {errors.first_name && touched.first_name && (
                        <small className="form-field-error">
                          <ion-icon name="alert-circle-outline"></ion-icon>
                          {errors.first_name}
                        </small>
                      )}
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="last_name" className="form-field-label">
                        <ion-icon name="person-outline"></ion-icon>
                        Apellidos
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.last_name}
                        className={`form-field-input ${errors.last_name && touched.last_name ? 'form-field-input--error' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingresa tus apellidos"
                      />
                      {errors.last_name && touched.last_name && (
                        <small className="form-field-error">
                          <ion-icon name="alert-circle-outline"></ion-icon>
                          {errors.last_name}
                        </small>
                      )}
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="email" className="form-field-label">
                        <ion-icon name="mail-outline"></ion-icon>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        className="form-field-input form-field-disabled"
                        disabled
                        placeholder="Tu email"
                      />
                      <small className="form-field-help">
                        El email no se puede modificar por seguridad
                      </small>
                    </div>

                    <div className="form-actions">
                      {message.text && (
                        <div
                          className={`message-alert message-alert--${message.type}`}
                        >
                          <ion-icon
                            name={
                              message.type === "success"
                                ? "checkmark-circle-outline"
                                : "alert-circle-outline"
                            }
                          ></ion-icon>
                          {message.text}
                        </div>
                      )}
                      <EnhancedButton
                        type="submit"
                        icon="save"
                        variant="secondary"
                        size="medium"
                        loading={isLoading}
                        disabled={isLoading || !hasChanges()}
                      >
                        {isLoading ? "Guardando..." : "Guardar Cambios"}
                      </EnhancedButton>
                    </div>
                  </div>

                  <div className="settings-profile-picture">
                    <div className="profile-picture-container">
                      <div className="profile-picture-wrapper">
                        <img
                          src={
                            formData.picture ||
                            "https://via.placeholder.com/150x150/224f45/ffffff?text=Usuario"
                          }
                          alt={formData.name || "Usuario"}
                          className="profile-picture"
                        />
                      </div>
                                             <EnhancedButton
                         type="button"
                         onClick={() => fileInputRef.current.click()}
                         icon="image"
                         variant="secondary"
                         size="medium"
                       >
                         Cambiar Foto
                       </EnhancedButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default SettingsPage;
