import Head from 'next/head';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import { useContext, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import { getHousesForHome } from '../api/houseData';
import HouseCard from '../components/HouseCard';
import SearchForm from '../components/forms/SearchForm';
import { useAuth } from '../utils/context/authContext';
import { HousesContext } from '../utils/context/housesContext';

function Home() {
  const { houses, setHouses } = useContext(HousesContext);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getAllTheHouses = () => {
    getHousesForHome(user.uid).then(setHouses);
  };

  useEffect(() => {
    getAllTheHouses();
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <SearchForm />
      <div className="d-flex flex-wrap">
        {houses.map((house) => (
          <HouseCard key={house.firebaseKey} houseObj={house} onUpdate={getAllTheHouses} />
        ))}
      </div>
    </>
  );
}

export default Home;
