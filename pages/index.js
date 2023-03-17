import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { getHousesForHome } from '../api/houseData';
import HouseCard from '../components/HouseCard';
import SearchForm from '../components/forms/SearchForm';
import { useAuth } from '../utils/context/authContext';
import { HousesContext } from '../utils/context/housesContext';
import { usersWithHouses } from '../api/mergedData';

function Home() {
  const { houses, setHouses } = useContext(HousesContext);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getAllTheHouses = () => {
    getHousesForHome(user.uid).then(setHouses);
  };

  usersWithHouses();

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
