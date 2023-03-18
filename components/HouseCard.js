import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteHousesAndPlants } from '../api/mergedData';

export default function HouseCard({ houseObj, onUpdate, isMine }) {
  const deleteThisHouse = () => {
    if (window.confirm('Are you sure?')) {
      deleteHousesAndPlants(houseObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{houseObj.name}</Card.Title>
        <Card.Subtitle>{houseObj.city}</Card.Subtitle>
        <Card.Body>{houseObj.description}</Card.Body>
        <Link href={`/houses/${houseObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        {isMine
          ? (
            <>
              <Link href={`/houses/edit/${houseObj.firebaseKey}`} passHref>
                <Button>EDIT</Button>
              </Link>
              <Button onClick={deleteThisHouse}>Delete</Button>
            </>
          )
          : ('')}
      </Card.Body>
    </Card>
  );
}

HouseCard.propTypes = {
  houseObj: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  isMine: PropTypes.bool.isRequired,
};
