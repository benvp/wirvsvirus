import React from 'react';
import Head from 'next/head';
import { LandingPage } from '@@/containers/LandingPage';

const Home: React.FC = () => {
  return (
    <main>
      <Head>
        <title>TrimmDich 2.0</title>
      </Head>
      <main>
        <LandingPage />
      </main>

      <footer></footer>
    </main>
  );
};

export default Home;
