import {
  deleteSingleHouse, getHousePlants, getHouses, getSingleHouse,
} from './houseData';
import { deletePlant } from './plantsData';
import { getUsers } from './userData';
import getUserHouses from './userHouses';

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

const housesWithUsers = () => new Promise((resolve, reject) => {
  Promise.all([getUsers(), getHouses(), getUserHouses()])
    .then(([users, houses, userHousesJoin]) => {
      const allHousesInfoArray = houses.map((house) => {
        const houseRelationshipsArray = userHousesJoin
          .filter((uh) => uh.house_id === house.firebaseKey);

        const userInfoArray = houseRelationshipsArray
          .map((houseRelationship) => users.find((user) => user.uid === houseRelationship.uid));

        return { ...house, users: userInfoArray };
      });
      resolve(allHousesInfoArray);
    }).catch((error) => reject(error));
});

const usersWithHouses = () => new Promise((resolve, reject) => {
  Promise.all([getUsers(), getHouses(), getUserHouses()])
    .then(([users, houses, userHousesJoin]) => {
      const allUsersInfoArray = users.map((user) => {
        const userRelationshipsArray = userHousesJoin
          .filter((uh) => uh.uid === user.uid);

        const houseInfoArray = userRelationshipsArray
          .map((userRelationship) => houses.find((house) => house.firebaseKey === userRelationship.house_id));

        return { ...users[0], houses: houseInfoArray };
      });
      resolve(allUsersInfoArray);
    }).catch((error) => reject(error));
});

export {
  viewAllHousePlants,
  deleteHousesAndPlants,
  housesWithUsers,
  usersWithHouses,
};
