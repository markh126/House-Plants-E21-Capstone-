import { clientCredentials } from '../utils/client';

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

export {
  getUserHouses,
  createUserHouse,
  updateUserHouse,
};
