import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { deletePlant, getSinglePlant } from '../../api/plantsData';

export default function ViewPlants() {
  const [plantDetails, setPlantDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const deleteThisPlant = () => {
    if (window.confirm('Are you sure?')) {
      deletePlant(plantDetails.firebaseKey).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    getSinglePlant(firebaseKey).then(setPlantDetails);
  }, [firebaseKey]);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Image src={plantDetails.image} alt={plantDetails.name} style={{ width: '300px' }} />
          <Link href={`/plants/edit/${plantDetails.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">EDIT</Button>
          </Link>
          <Button onClick={deleteThisPlant}>Delete</Button>
        </div>
        <div className="text-white ms-5 details">
          <h2>Name: {plantDetails.name}
          </h2>
          <h3>Scientific Name: {plantDetails.scientific_name}</h3>
          <hr />
          <p>Watering Frequency: {plantDetails.watering_frequency}</p>
          <p>Light Requirements: {plantDetails.light_requirement}</p>
          <p>Propagation Instructions: {plantDetails.propagation_instructions}</p>
          <hr />
          <p>Notes: {plantDetails.notes}</p>
        </div>
      </div>
    </div>
  );
}
