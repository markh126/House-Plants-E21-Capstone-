import Head from 'next/head';
// import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import HouseCard from '../components/HouseCard';
import SearchForm from '../components/forms/SearchForm';
import { useAuth } from '../utils/context/authContext';
import { HousesContext } from '../utils/context/housesContext';
import { usersWithHouses } from '../api/mergedData';
import { getHousesForHome } from '../api/houseData';

function VisitHouses() {
  const { /* houses, */ setHouses } = useContext(HousesContext);
  const [visitedHouses, setVisitedHouses] = useState([]);
  const { user } = useAuth();
  // const router = useRouter();
  // const { firebaseKey } = router.query;

  const getAllTheHouses = () => {
    usersWithHouses(user.uid).then((userObj) => {
      setHouses(userObj);
      getHousesForHome(userObj.uid).then(setVisitedHouses);

      // console.warn(userObj);
    });
  };

  useEffect(() => {
    getAllTheHouses();
  }, [user]);

  return (
    <>
      <Head>
        <title>Visited Homes</title>
      </Head>
      <SearchForm />
      <div className="d-flex flex-wrap">
        {visitedHouses.map((house) => (
          <HouseCard key={house.firebaseKey} houseObj={visitedHouses} onUpdate={getAllTheHouses} />
        ))}
      </div>
    </>
  );
}

export default VisitHouses;
