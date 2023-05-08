import { NavLink, Outlet } from 'react-router-dom';
import css from '../App/App.module.css';
import headerCss from './Header.module.css';
import { Suspense } from 'react';

const Header = () => {
  return (
    <>
      <header className={headerCss.header}>
        <div className={css.container}>
          <nav>
            <ul className={headerCss.navList}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/movies">Movies</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
