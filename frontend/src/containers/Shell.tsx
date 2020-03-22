import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES, PUBLIC_ROUTES, DYNAMIC_ROUTES } from '../modules/routes';
import classnames from 'classnames';
import { useCurrentUser, useAuthInfo } from '@@/context/AuthContext';
import { getProfilePicture } from '@@modules/user/utils';

type NavLinkProps = {
  className?: string;
  href: string;
  active: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ className, href, active, children }) => {
  const activeClass =
    'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out';
  const inactiveClass =
    'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out';

  return (
    <Link href={href}>
      <a className={classnames(active ? activeClass : inactiveClass, className)}>{children}</a>
    </Link>
  );
};

type ShellProps = {};

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const user = useCurrentUser();
  const { logout } = useAuthInfo();
  const router = useRouter();

  const { route } = router;

  const [menuOpen, setMenuOpen] = useState(false);

  const isPublic = PUBLIC_ROUTES.includes(route);

  if (isPublic) {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href={ROUTES.ROOT}>
                  <a>
                    <img className="block lg:hidden h-8 w-auto" src="/img/trimmy.png" alt="" />
                    <img className="hidden lg:block h-8 w-auto" src="/img/trimmy.png" alt="" />
                  </a>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex">
                <NavLink href={ROUTES.ROOT} active={route === ROUTES.ROOT}>
                  Startseite
                </NavLink>

                <NavLink
                  href={ROUTES.TRAININGS}
                  active={route.includes(ROUTES.TRAININGS)}
                  className="ml-8"
                >
                  Trainings
                </NavLink>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex">
              <div className="hidden sm:ml-6 sm:flex">
                {user ? (
                  <React.Fragment>
                    <button
                      className="ml-6 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                      type="button"
                      onClick={() => {
                        logout();
                        router.replace(ROUTES.LOGIN);
                      }}
                    >
                      Abmelden
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <NavLink href={ROUTES.SIGN_UP} active={route === ROUTES.SIGN_UP}>
                      Registrieren
                    </NavLink>
                    <NavLink className="ml-6" href={ROUTES.LOGIN} active={route === ROUTES.LOGIN}>
                      Login
                    </NavLink>
                  </React.Fragment>
                )}
              </div>

              {user && (
                <div className="ml-6 relative sm:center sm:self-center">
                  <Link href={DYNAMIC_ROUTES.USER_PROFILE} as={ROUTES.userProfile(user.id)}>
                    <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                      <img
                        className="h-8 w-8 rounded-full object-center object-cover"
                        src={getProfilePicture(user)}
                        alt=""
                      />
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMenuOpen(open => !open)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className="hidden"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={menuOpen ? 'sm:hidden' : 'hidden sm:hidden'}>
          <div className="pt-2 pb-3">
            {user ? (
              <React.Fragment>
                <button
                  className="ml-6 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                  type="button"
                  onClick={() => {
                    logout();
                    router.replace(ROUTES.LOGIN);
                  }}
                >
                  Abmelden
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink href={ROUTES.SIGN_UP} active={route === ROUTES.SIGN_UP}>
                  Registrieren
                </NavLink>
                <NavLink className="ml-6" href={ROUTES.LOGIN} active={route === ROUTES.LOGIN}>
                  Login
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold leading-tight text-gray-900">
              {/* some header here */}
            </h2>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
