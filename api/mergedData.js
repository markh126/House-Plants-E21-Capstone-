import { getHousePlants, getSingleHouse } from './houseData';
import { getSinglePlant } from './plantsData';

const viewAllHousePlants = (houseFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleHouse(houseFirebaseKey),
    getHousePlants(houseFirebaseKey)])
    .then(([houseObject, housePlantsArray]) => {
      resolve({ ...houseObject, plants: housePlantsArray });
    }).catch((error) => reject(error));
});

const viewPlantDetails = (plantFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlant(plantFirebaseKey)
    .then((plantObject) => {
      getSingleHouse(plantObject.house_id)
        .then((houseObject) => {
          resolve({ houseObject, ...plantObject });
        });
    }).catch((error) => reject(error));
});

export {
  viewAllHousePlants,
  viewPlantDetails,
};
