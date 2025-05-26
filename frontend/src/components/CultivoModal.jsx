import React, { useState } from 'react';
import AddButton from './AddButton';
import Form from './Form';
import FormLabel from './FormLabel';
import Modal from './Modal';
import FormButtons from './FormButtons';
import SelectInput from './SelectInput';
import TextAreaInput from './TextAreaInput';

const CultivoModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <AddButton label="Agregar Sembrío" onClick={toggleModal} />

      {showModal && (
        <Modal title="Agregar Sembrío">
            <Form action="/api/cultivos" title="Cultivo" customClass="d-flex flex-column gap-5">
                <FormLabel label="Nombre del cultivo" type="text" placeholder="ej. Zanahoria" />
                <TextAreaInput label="Descripción" name="descripcion" placeholder="Describe brevemente el cultivo..." rows={5} required={true} />
                <SelectInput label="Tipo de suelo" name="tipo_suelo" required={true} options={[{ value: 'arcilloso', label: 'Arcilloso' }, { value: 'arenoso', label: 'Arenoso' }, { value: 'limoso', label: 'Limoso' }]} />
                <FormLabel label="Fecha de sembrío" type="date" placeholder="Selecciona una fecha" />
                <FormButtons label="Agregar Sembrío" toggleModal={toggleModal} customclass="justify-center" />
            </Form>
        </Modal>
      )}
    </>
  );
};

export default CultivoModal;
