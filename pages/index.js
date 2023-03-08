import Head from 'next/head';
// import Link from 'next/link';
import { useContext, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import { getHousesForHome } from '../api/houseData';
import HouseCard from '../components/HouseCard';
import { useAuth } from '../utils/context/authContext';
import { HousesContext } from '../utils/context/housesContext';

function Home() {
  const { houses, setHouses } = useContext(HousesContext);
  const { user } = useAuth();

  const getAllTheHouses = () => {
    getHousesForHome(user.uid).then(setHouses);
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
          <HouseCard key={house.firebaseKey} houseObj={house} onUpdate={getHousesForHome} />
        ))}
      </div>
    </>
  );
}

export default Home;
