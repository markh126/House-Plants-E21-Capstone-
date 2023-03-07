import Head from 'next/head';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { getAllUserPlants } from '../api/plantsData';
import PlantCard from '../components/PlantCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [plants, setPlants] = useState([]);
  const { user } = useAuth();

  const getAllThePlants = () => {
    getAllUserPlants(user.uid).then(setPlants);
  };

  useEffect(() => {
    getAllThePlants();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="d-flex flex-wrap">
        {plants.map((plant) => (
          <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={getAllThePlants} />
        ))}
      </div>
    </>
  );
}

export default Home;
