/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUsers } from '../../api/userData';
import { createUserHouse, getUserHousesByHouseId, updateUserHouse } from '../../api/userHouses';

export default function UserHouseForm({ obj, buttonTitle, onUpdate }) {
  const [houseUser, setHouseUser] = useState([]);
  const [visitedHouses, setVisitedHouses] = useState([]);
  const [visitedUserIds, setVisitedUserIds] = useState([]);
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
    getUserHousesByHouseId(firebaseKey).then(setVisitedHouses);
  }, [firebaseKey]);

  useEffect(() => {
    getUsersInHouses();
  }, [user]);

  useEffect(() => {
    setVisitedUserIds(visitedHouses.map((h) => h.uid));
  }, [visitedHouses]);

  console.warn(visitedUserIds);

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
      onUpdate();
      handleClose();
    });
  };

  return (
    <div>
      <Button
        onClick={handleShow}
        style={{
          backgroundColor: 'green',
          borderColor: 'green',
          borderRadius: '20px',
          fontSize: '12px',
          padding: '10px 22px',
          width: '150px',
        }}
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
            houseUser.filter((hu) => hu.uid !== user.uid && !visitedHouses.includes(hu.uid) && !visitedUserIds.includes(hu.uid)).map((hu) => (
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
  onUpdate: PropTypes.func,
};

UserHouseForm.defaultProps = {
  obj: {},
  onUpdate: () => {},
};
