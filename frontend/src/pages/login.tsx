import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { Button } from '@@components/Button/Button';
import { AuthInfo } from '../types/globalTypes';
import { useRouter } from 'next/router';
import { ROUTES } from '@@modules/routes';
import { useAuthInfo } from '../context/AuthContext';
import { apiRoutes } from '@@modules/api/api';

type Credentials = {
  username: string;
  password: string;
};

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const { setAuth, auth } = useAuthInfo();

  const [login, { data, status }] = useMutation<AuthInfo, any>((credentials: Credentials) =>
    fetch(apiRoutes.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(res => res.json()),
  );

  useEffect(() => {
    if (auth?.accessToken) {
      router.replace(ROUTES.TRAININGS);
    }
  }, [auth]);

  useEffect(() => {
    if (data?.accessToken) {
      setAuth(data);
      router.push(ROUTES.TRAININGS);
    }
  }, [data]);

  const unauthorized = (data as any)?.statusCode === 401;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      return login(values);
    },
  });

  return (
    <div className="flex flex-col justify-start sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Login</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                E-Mail Adresse
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="username"
                  // type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Passwort
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
            </div>
            {unauthorized && (
              <div className="mt-6 text-red-500">Benutzername oder Passwort falsch.</div>
            )}

            {/* <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-5">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Button disabled={status === 'loading'} className="w-full" type="submit">
                  Login
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
