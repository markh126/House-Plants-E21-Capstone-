/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { NavDropdown } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
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
              <NavDropdown.Item href="#action/3.1">House 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                House 2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">House 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/houses/new">
                Add a New House
              </NavDropdown.Item>
            </NavDropdown>

            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
