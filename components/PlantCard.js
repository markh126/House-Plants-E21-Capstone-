import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function PlantCard({ plantObj }) {
  return (
    <div className="plantCard">
      <Card
        className="content"
        style={{
          border: '1px solid rgb(0, 0, 0)', borderRadius: '0px', width: '300px', textAlign: 'center',
        }}
      >
        <Card.Body className="front">
          <Card.Img src={plantObj.image} style={{ borderRadius: '0px', objectFit: 'cover' }} />
          <Card.Title style={{ marginTop: '15px', marginBottom: '0px' }}>
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
