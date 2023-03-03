import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function PlantCard({ plantObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Img src={plantObj.image} />
        <Card.Title>{plantObj.name}</Card.Title>
        <Link href={`/plants/${plantObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PlantCard.propTypes = {
  plantObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    house_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
