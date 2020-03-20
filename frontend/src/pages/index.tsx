import Head from 'next/head';
import { useEffect } from 'react';

const useBodyClassName = (className: string) => {
  useEffect(() => {
    const elem = document.querySelector('body');

    if (!elem) {
      return;
    }

    const initialClass = elem.className;
    elem.className = className;

    return () => {
      elem.className = initialClass;
    };
  }, [className]);
};

const Home: React.FC = () => {
  useBodyClassName('antialiased font-sans bg-gray-200');

  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main className="max-w-7xl mx-auto p-4">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Delete your account</h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>Once you delete your account, you will lose all data associated with it.</p>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </main>
  );
};

export default Home;
