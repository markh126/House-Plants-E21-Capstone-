import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { createHouse, getHousesForHome, updateHouse } from '../../api/houseData';
import { useAuth } from '../../utils/context/authContext';
import { HousesContext } from '../../utils/context/housesContext';

const initialState = {
  name: '',
  city: '',
  description: '',
};

export default function HouseForm({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { setHouses } = useContext(HousesContext);
  const { user } = useAuth();
  const router = useRouter();

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
        .then(() => {
          onUpdate();
        });
    } else {
      const payload = {
        ...formInput, creator_id: user.uid,
      };
      createHouse(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateHouse(patchPayload).then(() => {
          getHousesForHome(user.uid).then((houses) => {
            router.push(`/houses/${name}`);
            setHouses(houses);
          });
        });
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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

        <FloatingLabel className="mb-3" label="City" controlId="houseCity">
          <Form.Control
            type="text"
            placeholder="House City"
            name="city"
            value={formInput.city}
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
    city: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

HouseForm.defaultProps = {
  obj: initialState,
  onUpdate: () => {},
};
