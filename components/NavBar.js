/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavDropdown } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { getHouses } from '../api/houseData';
import PlantForm from './forms/PlantForm';
import { getPlants } from '../api/plantsData';

export default function NavBar() {
  const [houses, setHouses] = useState([]);

  const getAllHouses = () => {
    getHouses().then(setHouses);
  };

  const getAllPlants = () => {
    getPlants();
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            House Plants
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Home
                </a>
              </Link>
            </li>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Houses"
              menuVariant="dark"
            >
              {houses.map((house) => (
                <>
                  <Link key={house.firebaseKey} passHref href={`/houses/${house.firebaseKey}`}>
                    <NavDropdown.Item>{house.name}</NavDropdown.Item>
                  </Link>
                </>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/houses/new">
                Add a New House
              </NavDropdown.Item>
            </NavDropdown>

            <PlantForm onUpdate={getAllPlants} buttonTitle="Add a New Plant" />

            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
