import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createHouse, updateHouse } from '../../api/houseData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  description: '',
};

export default function HouseForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj.firebaseKey, user]);

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
      updateHouse(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput, uid: user.uid,
      };
      createHouse(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateHouse(patchPayload).then(() => router.push('/'));
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} House </h2>
        <FloatingLabel className="mb-3" label="Name" controlId="houseName">
          <Form.Control
            type="text"
            placeholder="House Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Description" controlId="houseDescription">
          <Form.Control
            type="text"
            placeholder="House Description"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button className="btn btn-primary" type="submit">
          {obj.firebaseKey ? 'Update' : 'Create'} House
        </Button>

      </Form>
    </div>
  );
}

HouseForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

HouseForm.defaultProps = {
  obj: initialState,
};
