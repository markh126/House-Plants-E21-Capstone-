import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
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
    getAllTheHouses(user.uid);
  }, [user, firebaseKey]);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <SearchForm />

      <div className="text-center d-flex flex-column justify-content-center align-content-center">
        <div className="d-flex flex-wrap house-cards">
          {houses.map((house) => (
            <HouseCard key={house.firebaseKey} houseObj={house} onUpdate={getAllTheHouses} isMine={house.creator_id === user.uid} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
