import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function HouseCard({ houseObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{houseObj.name}</Card.Title>
        <Card.Subtitle>{houseObj.city}</Card.Subtitle>
        <Card.Body>{houseObj.description}</Card.Body>
        <Link href={`/houses/${houseObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
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
};
