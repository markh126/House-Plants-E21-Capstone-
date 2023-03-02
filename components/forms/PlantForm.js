import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createPlant, updatePlant } from '../../api/plantsData';

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

export default function PlantForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();
  // const { firebaseKey } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlant(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput, uid: user.uid,
      };
      createPlant(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlant(patchPayload).then(() => router.push('/'));
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Plant</h2>
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
            required
          />
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Image" controlId="plantImage">
          <Form.Control
            type="url"
            placeholder="Image Url"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Watering Frequency" controlId="wateringFrequency">
          <Form.Control
            type="text"
            placeholder="Watering Frequency"
            name="watering_frequency"
            value={formInput.watering_frequency}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Light Requirements" controlId="lightRequirements">
          <Form.Control
            type="text"
            placeholder="Light Requirements"
            name="light_requirement"
            value={formInput.light_requirement}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Propagation Instructions" controlId="propagation">
          <Form.Control
            type="text"
            placeholder="Propagation Instructions"
            name="propagation_instructions"
            value={formInput.propagation_instructions}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Notes" controlId="notes">
          <Form.Control
            type="text"
            placeholder="Notes"
            name="notes"
            value={formInput.notes}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Form.Check
          className="text-white mb-3"
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

        <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Plant
        </Button>

      </Form>
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
};

PlantForm.defaultProps = {
  obj: initialState,
};
