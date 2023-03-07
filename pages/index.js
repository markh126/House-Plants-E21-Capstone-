import Head from 'next/head';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getHouses } from '../api/houseData';
import HouseCard from '../components/HouseCard';
// import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [houses, setHouses] = useState([]);
  const { user } = useAuth();

  const getAllTheHouses = () => {
    getHouses(user.uid).then(setHouses);
  };

  useEffect(() => {
    getAllTheHouses();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="d-flex flex-wrap">
        {houses.map((house) => (
          <HouseCard key={house.firebaseKey} houseObj={house} onUpdate={getHouses} />
        ))}
      </div>
    </>
  );
}

export default Home;
