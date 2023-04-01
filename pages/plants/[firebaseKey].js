import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image } from 'react-bootstrap';
import { deletePlant, getSinglePlant } from '../../api/plantsData';
import PlantForm from '../../components/forms/PlantForm';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPlants() {
  const [plantDetails, setPlantDetails] = useState({});
  const [show, setShow] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const deleteThisPlant = () => {
    if (window.confirm('Are you sure?')) {
      deletePlant(plantDetails.firebaseKey).then(() => router.push('/'));
    }
  };

  const viewThePlant = () => {
    getSinglePlant(firebaseKey).then(setPlantDetails);
  };

  useEffect(() => {
    getSinglePlant(firebaseKey).then(setPlantDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{plantDetails.name}</title>
      </Head>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridGap: '12px',
      }}
      >
        {(plantDetails.creator_id === user.uid)
          ? (

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              gridGap: '12px',
            }}
            >
              <PlantForm buttonTitle="Edit" obj={plantDetails} onUpdate={viewThePlant} />

              <div>
                <Button
                  style={{
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderRadius: '20px',
                    fontSize: '12px',
                    padding: '10px 22px',
                    width: '150px',
                  }}
                  onClick={deleteThisPlant}
                >Delete
                </Button>
              </div>

            </div>

          )
          : ('')}
      </div>

      {(plantDetails.creator_id === user.uid)
        ? (
          <div className="plant-alert mt-5 flex-wrap d-flex flex-column">
            <Alert show={show} variant="success">
              <Alert.Heading>Have you remembered to water this plant?</Alert.Heading>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                  Close
                </Button>
              </div>
            </Alert>
          </div>
        )
        : ('')}

      <div>
        <div className="mt-5 d-flex flex-wrap">
          <div className="d-flex flex-column">
            <Image className="plant-image" src={plantDetails.image} alt={plantDetails.name} style={{ width: '300px', borderRadius: '25px' }} />
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
            <p>Last Watered: {plantDetails.last_watered}</p>
            <p>Notes: {plantDetails.notes}</p>
          </div>
        </div>
      </div>
    </>
  );
}
