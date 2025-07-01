import { useState } from "react";
import Form from "./widgets/Form";
import FormLabel from "./widgets/FormLabel";
import Modal from "./widgets/Modal";
import FormButtons from "./widgets/FormButtons";
import SelectInput from "./widgets/SelectInput";
import TextAreaInput from "./widgets/TextAreaInput";
import useSownStore from "../store/useSownStore";
import PropTypes from "prop-types";

const CultivoModal = ({ show, toggle }) => {
  const createSown = useSownStore((state) => state.createSown);

  const [form, setForm] = useState({
    nombre: "",
    cultivo: "",
    descripcion: "",
    tipoTerrenoId: "",
    localidad: "",
    fechaSiembra: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createSown(form);
    if (res && res.id) {
      alert("Sembrío guardado correctamente");
      setForm({
        nombre: "",
        descripcion: "",
        tipoTerrenoId: "",
        localidad: "",
        fechaSiembra: "",
      });
      toggle(); // cerrar el modal
    } else {
      alert("Error: No se pudo guardar el cultivo");
    }
  };

  return (
    <>
      {show && (
        <Modal title="Agregar Sembrío">
          <Form
            onSubmit={handleSubmit}
            title="Cultivo"
            customClass="d-flex flex-column gap-5"
          >
            <FormLabel
              name="nombre"
              label="Nombre del sembrio"
              type="text"
              placeholder="ej. Sembrio A"
              onChange={handleChange}
            />
            <FormLabel
              name="cultivo"
              label="Nombre de cultivo"
              type="text"
              placeholder="ej. Zanahoria"
              onChange={handleChange}
            />
            <TextAreaInput
              label="Descripción"
              name="descripcion"
              placeholder="Describe brevemente el cultivo..."
              rows={5}
              required={true}
              onChange={handleChange}
            />
            <SelectInput
              label="Tipo de suelo"
              name="tipoTerrenoId"
              required={true}
              options={[
                { value: "1", label: "Arcilloso" },
                { value: "2", label: "Arenoso" },
                { value: "3", label: "Limoso" },
              ]}
              onChange={handleChange}
            />
            <FormLabel
              name="localidad"
              label="Localidad"
              type="text"
              placeholder="ej. Lima"
              onChange={handleChange}
            />
            <FormLabel
              name="fechaSiembra"
              label="Fecha de sembrío"
              type="date"
              placeholder="Selecciona una fecha"
              onChange={handleChange}
            />
            <FormButtons
              label="Agregar Sembrío"
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
};

export default CultivoModal;
