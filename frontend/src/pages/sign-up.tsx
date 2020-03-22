import React, { useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@@modules/routes';
import { useAuthInfo } from '@@/context/AuthContext';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiRoutes } from '@@modules/api/api';
import { useMutation } from 'react-query';
import { Button } from '@@components/Button/Button';

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const { auth } = useAuthInfo();
  const router = useRouter();

  useEffect(() => {
    if (auth?.accessToken) {
      router.replace(ROUTES.TRAININGS);
    }
  }, [auth]);

  const [signUp, { data, status }] = useMutation<any, any>((values: any) =>
    fetch(apiRoutes.signUp, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then(res => res.json()),
  );

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      displayName: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3)
        .required(),
      password: Yup.string()
        .min(5)
        .required(),
      displayName: Yup.string()
        .min(3)
        .required(),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')])
        .required(),
    }),
    validateOnMount: true,
    onSubmit: values => {
      const { passwordConfirmation, ...dto } = values;

      return signUp(dto).then(() => router.push(ROUTES.LOGIN));
    },
  });

  return (
    <div className="flex flex-col justify-start sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Registrieren
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Benutzername (min. 3 Zeichen)
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Diesen Namen verwendest du für deinen Login.
              </p>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="username"
                  type="text"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="displayName"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Nickname (min. 3 Zeichen)
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Dieser Name wird anderen Nutzern angezeigt.
              </p>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="displayName"
                  type="text"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.displayName}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Passwort (min. 5 Zeichen)
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Passwort wiederholen
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="passwordConfirmation"
                  type="password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirmation}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm leading-5">
                Du hast schon einen Account?
                <Link href={ROUTES.LOGIN}>
                  <a className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Jetzt Anmelden
                  </a>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Button
                  disabled={status === 'loading' || !formik.isValid}
                  className="w-full"
                  type="submit"
                >
                  Registrieren
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
