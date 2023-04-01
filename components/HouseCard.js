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
    <Card className="house-card" style={{ width: '18rem', borderRadius: '0px', marginTop: '50px' }}>
      <Card.Body>
        <Card.Title>
          <Link passHref href={`/houses/${houseObj.firebaseKey}`}>
            <a href={`/houses/${houseObj.firebaseKey}`}>{houseObj.name}</a>
          </Link>
        </Card.Title>
        <Card.Subtitle>{houseObj.city}</Card.Subtitle>
        <Card.Body>{houseObj.description}</Card.Body>
        {isMine
          ? (
            <hr className="solid" />
          )
          : ('')}
        <div
          className="house-btns"
        >
          {isMine
            ? (
              <>
                <Link href={`/houses/edit/${houseObj.firebaseKey}`} passHref>
                  <Button
                    style={{
                      backgroundColor: 'green',
                      borderColor: 'green',
                      borderRadius: '20px',
                      fontSize: '12px',
                      padding: '10px 22px',
                      width: '75px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="m-2"
                  >Edit
                  </Button>
                </Link>
                <Button
                  style={{
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderRadius: '20px',
                    fontSize: '12px',
                    padding: '10px 22px',
                    width: '75px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="m-2"
                  onClick={deleteThisHouse}
                >Delete
                </Button>
              </>
            )
            : ('')}
        </div>
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
