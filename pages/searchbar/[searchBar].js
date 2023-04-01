import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSearchedPlants } from '../../api/plantsData';
import PlantCard from '../../components/PlantCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchBar() {
  const [searchPlants, setSearchPlants] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { searchBar } = router.query;

  const searchAllPlants = () => {
    getSearchedPlants(user.uid).then((plants) => {
      const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(searchBar.toLowerCase()));
      setSearchPlants(filteredPlants);
    });
  };

  useEffect(() => {
    searchAllPlants();
    return () => {
      setSearchPlants([]);
    };
  }, [searchBar]);

  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <div>
        {(searchPlants.length === 0 ? (
          <div className="d-flex justify-content-center">
            <p style={{
              backgroundColor: 'rgb(216, 208, 208)',
              borderColor: 'grey',
              borderRadius: '20px',
              fontSize: '12px',
              padding: '10px 22px',
              width: '150px',
            }}
            >
              No Search Results
            </p>
          </div>
        )
          : searchPlants.map((plant) => <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={searchAllPlants} />))}
      </div>
    </>
  );
}
