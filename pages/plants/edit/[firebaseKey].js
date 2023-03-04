import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlant } from '../../../api/plantsData';
import PlantForm from '../../../components/forms/PlantForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditPlant() {
  const [editPlant, setEditPlant] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const getSinglePlantDetails = () => {
    getSinglePlant(firebaseKey).then(setEditPlant);
  };

  useEffect(() => {
    getSinglePlantDetails(firebaseKey).then(setEditPlant);
  }, [firebaseKey, user]);

  return (
    <PlantForm obj={editPlant} onUpdate={getSinglePlantDetails} />
  );
}
