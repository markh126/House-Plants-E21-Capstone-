/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createPlant, updatePlant } from '../../api/plantsData';
import { getHouses } from '../../api/houseData';

const initialState = {
  name: '',
  scientific_name: '',
  image: '',
  watering_frequency: '',
  light_requirement: '',
  propagation_instructions: '',
  notes: '',
  watered: false,
};

export default function PlantForm({ obj, onUpdate, buttonTitle }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setHouses] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getHouses().then(setHouses);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      setFormInput((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlant(formInput)
        .then(() => {
          onUpdate();
          handleClose();
        });
    } else {
      const payload = {
        ...formInput, creator_id: user.uid, house_id: firebaseKey,
      };
      createPlant(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlant(patchPayload).then(() => {
          onUpdate();
          handleClose();
        });
      });
    }
  };

  return (
    <div>
      <Button
        onClick={handleShow}
      >
        {buttonTitle}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{obj.firebaseKey ? 'Update' : 'Add a New'} Plant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel className="mb-3" label="Name" controlId="plantName">
              <Form.Control
                type="text"
                placeholder="Plant Name"
                name="name"
                value={formInput.name}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Scientific Name" controlId="scientificName">
              <Form.Control
                type="text"
                placeholder="Scientific Name"
                name="scientific_name"
                value={formInput.scientific_name}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel className="mb-3" controlId="plantImage">
              <Form.Control
                type="file"
                placeholder="Upload an Image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formInput.image && (
                <img
                  src={formInput.image}
                  alt="profile"
                  style={{ height: '250px', width: '250px' }}
                />
              )}
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Watering Frequency" controlId="wateringFrequency">
              <Form.Control
                type="text"
                placeholder="Watering Frequency"
                name="watering_frequency"
                value={formInput.watering_frequency}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Light Requirements" controlId="lightRequirements">
              <Form.Control
                type="text"
                placeholder="Light Requirements"
                name="light_requirement"
                value={formInput.light_requirement}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Propagation Instructions" controlId="propagation">
              <Form.Control
                type="text"
                placeholder="Propagation Instructions"
                name="propagation_instructions"
                value={formInput.propagation_instructions}
                onChange={handleChange}
              />
            </FloatingLabel>

            <FloatingLabel className="mb-3" label="Notes" controlId="notes">
              <Form.Control
                type="text"
                placeholder="Notes"
                name="notes"
                value={formInput.notes}
                onChange={handleChange}
              />
            </FloatingLabel>

            <Form.Check
              className="text-black mb-3"
              type="switch"
              id="watered"
              name="watered"
              label="Watered?"
              checked={formInput.watered}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  watered: e.target.checked,
                }));
              }}
            />

            <Modal.Footer>
              <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Plant
              </Button>
            </Modal.Footer>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

PlantForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    scientific_name: PropTypes.string,
    image: PropTypes.string,
    watering_frequency: PropTypes.string,
    light_requirement: PropTypes.string,
    propagation_instructions: PropTypes.string,
    notes: PropTypes.string,
    watered: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  buttonTitle: PropTypes.string.isRequired,
};

PlantForm.defaultProps = {
  obj: initialState,
  onUpdate: () => {},
};
