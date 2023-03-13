import { deleteSingleHouse, getHousePlants, getSingleHouse } from './houseData';
import { deletePlant } from './plantsData';

const viewAllHousePlants = (houseFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleHouse(houseFirebaseKey),
    getHousePlants(houseFirebaseKey)])
    .then(([houseObject, housePlantsArray]) => {
      resolve({ ...houseObject, plants: housePlantsArray });
    }).catch((error) => reject(error));
});

const deleteHousesAndPlants = (houseId) => new Promise((resolve, reject) => {
  getHousePlants(houseId).then((plantsArray) => {
    const deletePlantPromises = plantsArray.map((plant) => deletePlant(plant.firebaseKey));
    Promise.all(deletePlantPromises).then(() => {
      deleteSingleHouse(houseId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewAllHousePlants,
  deleteHousesAndPlants,
};
