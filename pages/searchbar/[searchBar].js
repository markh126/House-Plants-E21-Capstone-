import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSearchedPlants } from '../../api/plantsData';
import PlantCard from '../../components/PlantCard';

export default function SearchBar() {
  const [searchPlants, setSearchPlants] = useState([]);
  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllPlants = () => {
    getSearchedPlants().then((plants) => {
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
