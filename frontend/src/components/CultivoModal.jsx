import React, { useState } from 'react';
import Form from './widgets/Form';
import FormLabel from './widgets/FormLabel';
import Modal from './widgets/Modal';
import FormButtons from './widgets/FormButtons';
import SelectInput from './widgets/SelectInput';
import TextAreaInput from './widgets/TextAreaInput';
import Button from './widgets/Button';

const CultivoModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div className="button-container d-flex justify-center align-center">
        <Button label="Agregar Sembrío" onClick={toggleModal} className='add-button'/>
      </div>
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
