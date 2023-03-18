import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleHouse } from '../../../api/houseData';
import HouseForm from '../../../components/forms/HouseForm';
// import { useAuth } from '../../../utils/context/authContext';

export default function EditHouse() {
  const [editHouse, setEditHouse] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleHouse(firebaseKey).then(setEditHouse);
  }, [firebaseKey]);

  return (
    <div>
      <HouseForm obj={editHouse} />
    </div>
  );
}
