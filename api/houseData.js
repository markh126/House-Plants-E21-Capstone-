/* eslint-disable camelcase */
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getHouses = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/houses.json`, {
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

const getHousesForHome = (creator_id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/houses.json?orderBy="creator_id"&equalTo="${creator_id}"`, {
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

const getSingleHouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/houses/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createHouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/houses.json`, {
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

const updateHouse = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/houses/${payload.firebaseKey}.json`, {
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

const deleteHouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/houses/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteSingleHouse = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/houses/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getHousePlants = (houseFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants.json?orderBy="house_id"&equalTo="${houseFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getHouses,
  getHousesForHome,
  getSingleHouse,
  createHouse,
  updateHouse,
  deleteHouse,
  deleteSingleHouse,
  getHousePlants,
};
