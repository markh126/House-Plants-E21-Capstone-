/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Navbar, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { getHousesForHome } from '../api/houseData';
import { useAuth } from '../utils/context/authContext';
import icon from '../images/icon.png';
// import { HousesContext } from '../utils/context/housesContext';

export default function Nav() {
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
      <Navbar className="navbar navbar-expand-md bg" style={{ marginBottom: '15px' }}>
        <div className="container-fluid">
          <Navbar.Brand style={{ height: '40px', width: '35px' }}>
            <Image className="nav-image" src={icon} />
          </Navbar.Brand>
          <Link passHref href="/">
            <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
              House Plants
            </a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ml-auto">
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
      </Navbar>
    </div>
  );
}
