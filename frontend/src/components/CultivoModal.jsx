import { useState } from 'react';
import Form from './widgets/Form';
import FormLabel from './widgets/FormLabel';
import Modal from './widgets/Modal';
import FormButtons from './widgets/FormButtons';
import SelectInput from './widgets/SelectInput';
import TextAreaInput from './widgets/TextAreaInput';
import useCultivoStore from '../store/useCultivoStore';

const CultivoModal = ({show, toggle}) => {

  const guardarCultivo = useCultivoStore((state) => state.guardarCultivo);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tipoTerrenoId: "",
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
    const res = await guardarCultivo(form);
    if (res.ok) {
      alert("Sembrío guardado correctamente");
      toggleModal(); // o lo que cierre el modal
    } else {
      alert("Error: " + res.message);
      console.log(form)
    }
  };

  return (
    <>
      {show && (
        <Modal title="Agregar Sembrío">
            <Form onSubmit={handleSubmit} title="Cultivo" customClass="d-flex flex-column gap-5">
                <FormLabel name="nombre" label="Nombre del cultivo" type="text" placeholder="ej. Zanahoria" onChange={handleChange} />
                <TextAreaInput label="Descripción" name="descripcion" placeholder="Describe brevemente el cultivo..." rows={5} required={true} onChange={handleChange} />
                <SelectInput label="Tipo de suelo" name="tipoTerrenoId" required={true} options={[{ value: '1', label: 'Arcilloso' }, { value: '2', label: 'Arenoso' }, { value: '3', label: 'Limoso' }]} onChange={handleChange} />
                <FormLabel name="fechaSiembra" label="Fecha de sembrío" type="date" placeholder="Selecciona una fecha" onChange={handleChange} />
                <FormButtons label="Agregar Sembrío" toggleModal={toggle} customclass="justify-center" />
            </Form>
        </Modal>
      )}
    </>
  );
};

export default CultivoModal;
