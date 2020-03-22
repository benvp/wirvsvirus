import dynamic from 'next/dynamic';
import React from 'react';

const DisableSSR: React.FC = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export default dynamic(() => Promise.resolve(DisableSSR), { ssr: false });
