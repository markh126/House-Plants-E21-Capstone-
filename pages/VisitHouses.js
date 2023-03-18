import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import HouseCard from '../components/HouseCard';
import SearchForm from '../components/forms/SearchForm';
import { useAuth } from '../utils/context/authContext';
import { HousesContext } from '../utils/context/housesContext';
// import { usersWithHouses } from '../api/mergedData';
// import { getHousesForHome } from '../api/houseData';
import { usersWithHouses } from '../api/mergedData';
// import { getUserHouses } from '../api/userHouses';

function VisitHouses() {
  const { houses, setHouses } = useContext(HousesContext);
  const [currentUserHouse, setCurrentUserHouse] = useState([]);
  const { user } = useAuth();

  const getAllTheHouses = () => {
    usersWithHouses().then(setHouses);
  };

  useEffect(() => {
    const userHouse = houses.find((h) => h.uid === user.uid);
    setCurrentUserHouse(userHouse);
  }, [houses]);

  useEffect(() => {
    getAllTheHouses();
  }, []);

  return (
    <>
      <Head>
        <title>Visited Homes</title>
      </Head>
      <SearchForm />
      <div className="d-flex flex-wrap">
        {currentUserHouse?.houses?.map((house) => (
          <HouseCard key={house.firebaseKey} houseObj={house} onUpdate={getAllTheHouses} isMine={house.creator_id === user.uid} />
        ))}
      </div>
    </>
  );
}

export default VisitHouses;
