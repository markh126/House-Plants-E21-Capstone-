import { getHousePlants, getSingleHouse } from './houseData';

const viewAllHousePlants = (houseFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleHouse(houseFirebaseKey),
    getHousePlants(houseFirebaseKey)])
    .then(([houseObject, housePlantsArray]) => {
      resolve({ ...houseObject, plants: housePlantsArray });
    }).catch((error) => reject(error));
});

export default viewAllHousePlants;
