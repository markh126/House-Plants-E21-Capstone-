import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function PlantCard({ plantObj }) {
  return (
    <Card style={{ width: '18rem', borderRadius: '25px' }}>
      <Card.Body>
        <Card.Img src={plantObj.image} style={{ borderRadius: '10px', width: '16rem', height: '20rem' }} />
        <Card.Title>
          <Link href={`/plants/${plantObj.firebaseKey}`}>{plantObj.name}</Link>
        </Card.Title>
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
