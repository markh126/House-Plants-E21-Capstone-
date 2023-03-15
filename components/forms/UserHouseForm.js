/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUsers } from '../../api/userData';
import { createUserHouse, updateUserHouse } from '../../api/userHouses';

export default function UserHouseForm({ obj, buttonTitle }) {
  const [houseUser, setHouseUser] = useState([]);
  const [formInput, setFormInput] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUsersInHouses = () => {
    getUsers(user.uid).then(setHouseUser);
  };

  useEffect(() => {
    getUsersInHouses();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      house_id: firebaseKey,
    };
    createUserHouse(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateUserHouse(patchPayload);
    });
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
          Add a User
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              onChange={handleChange}
              name="uid"
              value={obj.uid}
            >
              <option value="">Select A User</option>
              {
            houseUser.map((hu) => (
              <option
                key={hu.uid}
                value={hu.uid}
              >
                {hu.userName}
              </option>
            ))
          }
            </Form.Select>

            <Modal.Footer>
              <Button variant="primary" type="submit"> Submit User
              </Button>
            </Modal.Footer>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

UserHouseForm.propTypes = {
  obj: PropTypes.shape({
    uid: PropTypes.string,
  }),
  buttonTitle: PropTypes.string.isRequired,
};

UserHouseForm.defaultProps = {
  obj: {},
};
