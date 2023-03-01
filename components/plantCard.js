import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deletePlant } from '../api/plantsData';

export default function PlantCard({ plantObj, onUpdate }) {
  const deleteThisPlant = () => {
    if (window.confirm('Are you sure?')) {
      deletePlant(plantObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Img src={plantObj.image} />
        <Card.Title>{plantObj.name}</Card.Title>
        <Link href={`/plants/${plantObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Button onClick={deleteThisPlant}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

PlantCard.propTypes = {
  plantObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
