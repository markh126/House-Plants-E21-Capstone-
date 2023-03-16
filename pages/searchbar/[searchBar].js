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
      console.warn(filteredPlants);
    });
  };

  useEffect(() => {
    searchAllPlants();
    return () => {
      setSearchPlants([]);
    };
  }, [searchBar]);

  return (
    <div>
      {searchPlants.map((plant) => <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={searchAllPlants} />)}
    </div>
  );
}
