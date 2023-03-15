/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { NavDropdown } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { getHousesForHome } from '../api/houseData';
import { useAuth } from '../utils/context/authContext';
import { HousesContext } from '../utils/context/housesContext';

export default function NavBar() {
  // const [houses, setHouses] = useState([]);
  const { houses, setHouses } = useContext(HousesContext);
  const { user } = useAuth();

  const getAllHouses = () => {
    getHousesForHome(user.uid).then(setHouses);
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
                <Link key={house.firebaseKey} passHref href={`/houses/${house.firebaseKey}`}>
                  <NavDropdown.Item>{house.name}</NavDropdown.Item>
                </Link>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/houses/new">
                Add a New House
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              id="nav-dropdown-dark-example"
              menuVariant="dark"
            >
              <Link passHref href="/profile">
                <NavDropdown.Item>
                  Profile
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <button type="button" className="btn btn-danger" onClick={signOut}>
                  Sign Out
                </button>
              </NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      </div>
    </nav>
  );
}
