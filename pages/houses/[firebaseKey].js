// import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import viewAllHousePlants from '../../api/mergedData';
import PlantCard from '../../components/PlantCard';

function ViewHouse() {
  const router = useRouter();
  const [houseDetails, setHouselDetails] = useState({});
  const { firebaseKey } = router.query;

  const getAllThePlants = () => {
    viewAllHousePlants(firebaseKey).then(setHouselDetails);
  };

  useEffect(() => {
    viewAllHousePlants(firebaseKey).then(setHouselDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {houseDetails.plants?.map((plant) => (
          <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={getAllThePlants} />
        ))}
      </div>
    </>
  );
}

export default ViewHouse;
