// import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { viewAllHousePlants } from '../../api/mergedData';
import PlantForm from '../../components/forms/PlantForm';
import UserHouseForm from '../../components/forms/UserHouseForm';
import PlantCard from '../../components/PlantCard';

function ViewHouse() {
  const router = useRouter();
  const [houseDetails, setHouseDetails] = useState({});
  const { firebaseKey } = router.query;

  const getAllThePlants = () => {
    viewAllHousePlants(firebaseKey).then(setHouseDetails);
  };

  useEffect(() => {
    viewAllHousePlants(firebaseKey).then(setHouseDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{houseDetails.name}</title>
      </Head>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '10px',
      }}
      >
        <PlantForm onUpdate={getAllThePlants} buttonTitle="New Plant" />
        <UserHouseForm buttonTitle="Add a User" />
      </div>
      <div className="d-flex flex-wrap">
        {houseDetails.plants?.map((plant) => (
          <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={getAllThePlants} />
        ))}
      </div>
    </>
  );
}

export default ViewHouse;
