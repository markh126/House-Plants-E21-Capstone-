import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getPlants } from '../api/plantsData';
import PlantCard from '../components/PlantCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [plants, setPlants] = useState([]);
  const { user } = useAuth();

  const getAllThePlants = () => {
    getPlants(user.uid).then(setPlants);
  };

  useEffect(() => {
    getAllThePlants();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/plants/new" passHref>
          <Button>Add A New Plant</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {plants.map((plant) => (
            <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={getAllThePlants} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
