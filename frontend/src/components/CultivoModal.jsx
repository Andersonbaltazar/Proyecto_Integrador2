import { useEffect, useState } from "react";
import Form from "./widgets/Form";
import FormLabel from "./widgets/FormLabel";
import Modal from "./widgets/Modal";
import FormButtons from "./widgets/FormButtons";
import SelectInput from "./widgets/SelectInput";
import TextAreaInput from "./widgets/TextAreaInput";
import useCropStore from "../store/useCropStore";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const emptyForm = {
  nombre: "",
  descripcion: "",
  tipoTerrenoId: "",
  localidad: "",
  fechaSiembra: "",
};
const CultivoModal = ({ show, toggle, initialData = null }) => {
  const createCrop = useCropStore((state) => state.createCrop);
  const updateCrop = useCropStore((state) => state.updateCrop);

  const [form, setForm] = useState(emptyForm);

  const navigate = useNavigate();

  // Cargar datos si se está editando
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    let res;

    try {
      console.log('Submitting form data:', form);
      
      if (initialData?.id) {
        res = await updateCrop(initialData.id, form);
        Swal.fire({
          icon: "success",
          title: "Sembrío actualizado",
          text: "Los datos se actualizaron correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/crops");
      } else {
        res = await createCrop(form);
        console.log('Create crop response:', res);
        
        if (res?.ok || res?.id) {
          Swal.fire({
            icon: "success",
            title: "Sembrío creado",
            text: "El sembrío se creó correctamente",
            timer: 2000,
            showConfirmButton: false,
          });
          // No navegar aquí, solo cerrar el modal
        }
      }

      if (res && (res.ok || res.id)) {
        setForm(emptyForm);
        toggle(); // Cierra el modal
        // No necesitamos navegar aquí porque el modal se cierra y la lista se actualiza automáticamente
      } else {
        throw new Error("No se pudo guardar el cultivo");
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al guardar",
      });
    }
  };

  return (
    <>
      {show && (
        <Modal title={initialData ? "Editar Cultivo" : "Agregar Cultivo"}>
          <Form
            onSubmit={handleSubmit}
            title="Cultivo"
            customClass="d-flex flex-column gap-5"
          >
            <FormLabel
              name="nombre"
              label="Nombre del cultivo"
              type="text"
              placeholder="ej. Zanahoria"
              value={form.nombre}
              onChange={handleChange}
            />
            <TextAreaInput
              label="Descripción"
              name="descripcion"
              placeholder="Describe brevemente el cultivo..."
              rows={5}
              required={true}
              value={form.descripcion}
              onChange={handleChange}
            />
            <FormLabel
              name="localidad"
              label="Localidad"
              type="text"
              placeholder="ej. Lima"
              value={form.localidad}
              onChange={handleChange}
            />
            <SelectInput
              label="Tipo de suelo"
              name="tipoTerrenoId"
              required={true}
              value={form.tipoTerrenoId || ""}
              options={[
                { value: "1", label: "Arcilloso" },
                { value: "2", label: "Arenoso" },
                { value: "3", label: "Limoso" },
              ]}
              onChange={handleChange}
            />
            <FormLabel
              name="fechaSiembra"
              label="Fecha de sembrío"
              type="date"
              placeholder="Selecciona una fecha"
              value={form.fechaSiembra}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
            
            <FormButtons
              label={initialData ? "Actualizar" : "Agregar Sembrío"}
              toggleModal={toggle}
              customclass="justify-center"
            />
          </Form>
        </Modal>
      )}
    </>
  );
};

CultivoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default CultivoModal;
