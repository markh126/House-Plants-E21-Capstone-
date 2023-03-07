import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image } from 'react-bootstrap';
import { viewPlantDetails } from '../../api/mergedData';
import { deletePlant } from '../../api/plantsData';
import PlantForm from '../../components/forms/PlantForm';

export default function ViewPlants() {
  const [plantDetails, setPlantDetails] = useState({});
  const [show, setShow] = useState(true);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const deleteThisPlant = () => {
    if (window.confirm('Are you sure?')) {
      deletePlant(plantDetails.firebaseKey).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    viewPlantDetails(firebaseKey).then(setPlantDetails);
  }, [firebaseKey]);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Have you remembered to water this plant?</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      <div>
        <div className="mt-5 d-flex flex-wrap">
          <div className="d-flex flex-column">
            <Image src={plantDetails.image} alt={plantDetails.name} style={{ width: '300px' }} />
            <PlantForm buttonTitle="Edit" obj={plantDetails} />
            <Button onClick={deleteThisPlant}>Delete</Button>
          </div>
          <div className="text-white ms-5 details">
            <h1>Name: {plantDetails.name}
            </h1>
            <h2>Scientific Name: {plantDetails.scientific_name}</h2>
            <h3>House: {plantDetails.houseObject?.name}</h3>
            <hr />
            <p>Watering Frequency: {plantDetails.watering_frequency}</p>
            <p>Light Requirements: {plantDetails.light_requirement}</p>
            <p>Propagation Instructions: {plantDetails.propagation_instructions}</p>
            <hr />
            <p>Notes: {plantDetails.notes}</p>
          </div>
        </div>
      </div>
    </>
  );
}
