import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/plants/new" passHref>
          <Button>Add A New Plant</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {houseDetails.plants?.map((plant) => (
            <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={getAllThePlants} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewHouse;
