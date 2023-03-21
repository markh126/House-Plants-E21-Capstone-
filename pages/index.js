import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { getHousesForHome } from '../api/houseData';
import HouseCard from '../components/HouseCard';
// import SearchForm from '../components/forms/SearchForm';
import { useAuth } from '../utils/context/authContext';
import { HousesContext } from '../utils/context/housesContext';

function Home() {
  const { houses, setHouses } = useContext(HousesContext);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  // const getAllTheHouses = () => {s
  //   getHousesForHome(user.uid).then(setHouses);
  // };

  useEffect(() => {
    getHousesForHome(user.uid).then(setHouses);
  }, [firebaseKey, user]);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="d-flex flex-wrap">
        {houses.map((house) => (
          <HouseCard key={house.firebaseKey} houseObj={house} onUpdate={getHousesForHome} isMine={house.creator_id === user.uid} />
        ))}
      </div>
    </>
  );
}

export default Home;
