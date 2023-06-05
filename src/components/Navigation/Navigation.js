import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

import css from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <div>
      <header>
        <nav>
          <ul className={css.headerList}>
            <li className={css.headerListItem}>
              <NavLink
                to="/"
                className={`${css.headerListItemLink} ${
                  location.pathname === '/' ? css.activeLink : ''
                }`}
                exact={true}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/card"
                className={`${css.headerListItemLink} ${
                  location.pathname === '/card' ? css.activeLink : ''
                }`}
              >
                Card
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className={css.container}>
        <span className={css.Footer}></span>
      </footer>
    </div>
  );
};

export default Navigation;
