import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES, PUBLIC_ROUTES } from '../modules/routes';
import classnames from 'classnames';
import { useCurrentUser, useAuthInfo } from '@@/context/AuthContext';

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
                  Das Projekt
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
                  <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
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
        <div className="hidden sm:hidden">
          <div className="pt-2 pb-3">
            <a
              href="#"
              className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out"
            >
              Login
            </a>
            <a
              href="#"
              className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
            >
              Trainings
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
                <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
              </div>
            </div>
            <div className="mt-3">
              <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
              >
                Settings
              </a>
              <a
                href="#"
                className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
              >
                Sign out
              </a>
            </div>
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
