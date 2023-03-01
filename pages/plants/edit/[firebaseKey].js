import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlant } from '../../../api/plantsData';
import PlantForm from '../../../components/forms/PlantForm';

export default function EditPlant() {
  const [editPlant, setEditPlant] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlant(firebaseKey).then(setEditPlant);
  }, [firebaseKey]);

  return (
    <PlantForm obj={editPlant} />
  );
}
