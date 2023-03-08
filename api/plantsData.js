/* eslint-disable camelcase */
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPlants = (house_id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants.json?orderBy="house_id"&equalTo="${house_id}"`, {
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

const getSearchedPlants = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants.json`, {
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

const getAllUserPlants = (creator_id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants.json?orderBy="creator_id"&equalTo="${creator_id}"`, {
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

const getSinglePlant = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createPlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants.json`, {
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

const updatePlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants/${payload.firebaseKey}.json`, {
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

const deletePlant = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/plants/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getPlants,
  getSearchedPlants,
  getAllUserPlants,
  getSinglePlant,
  createPlant,
  updatePlant,
  deletePlant,
};
