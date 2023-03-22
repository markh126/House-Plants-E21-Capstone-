import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function PlantCard({ plantObj }) {
  return (
    <div className="plant-card">
      <Card className="content">
        <Card.Body className="front">
          <Card.Img src={plantObj.image} style={{ borderRadius: '10px', width: '16rem', height: '20rem' }} />
          <Card.Title>
            <Link href={`/plants/${plantObj.firebaseKey}`}>{plantObj.name}</Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
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
