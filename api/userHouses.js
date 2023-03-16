/* eslint-disable camelcase */
import { clientCredentials } from '../utils/client';
import { getHouses } from './houseData';

const dbUrl = clientCredentials.databaseURL;

const getUserHouses = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_houses.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const getUserHousesByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_houses.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUserHousesByHouseId = (house_id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_houses.json?orderBy="house_id"&equalTo="${house_id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const createUserHouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_houses.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateUserHouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/user_houses/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const mergeHouseData = () => new Promise((resolve, reject) => {
  Promise.all([getHouses(), getUserHouses()])
    .then(([houses, userHousesJoin]) => {
      const allHousesInfoArray = houses.map((house) => {
        const houseRelationshipsArray = userHousesJoin.filter((uh) => uh.house_id === house.firebaseKey);

        return { ...houses, count: houseRelationshipsArray.length };
      });
      resolve(allHousesInfoArray);
      console.warn(allHousesInfoArray);
    }).catch((error) => reject(error));
});

export {
  getUserHouses,
  createUserHouse,
  updateUserHouse,
  mergeHouseData,
  getUserHousesByHouseId,
  getUserHousesByUid,
};
