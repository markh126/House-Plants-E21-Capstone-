/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { NavDropdown } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { getHousesForHome } from '../api/houseData';
import { useAuth } from '../utils/context/authContext';
// import { HousesContext } from '../utils/context/housesContext';

export default function NavBar() {
  // const { houses, setHouses } = useContext(HousesContext);
  const { user } = useAuth();

  const getAllHouses = () => {
    getHousesForHome(user.uid);
  };

  useEffect(() => {
    getAllHouses();
  }, []);

  return (
    <div>
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
              <li className="nav-item">
                <Link href="/houses/new">
                  <a className="nav-link">
                    Add a New House
                  </a>
                </Link>
              </li>

              <NavDropdown
                id="nav-dropdown-dark-example"
                menuVariant="dark"
              >
                <Link passHref href="/profile">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </Link>
                <Link passHref href="/VisitHouses">
                  <NavDropdown.Item>
                    Visiting Houses
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
    </div>
  );
}
