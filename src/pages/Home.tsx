import PackageList from '@/pages/PackageList';
import React from 'react';

const Home = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Aamira Courier</h1>
            <p className="text-center">Your one-stop solution for all your package tracking needs.</p>

            <PackageList />
        </div>
    );
};

export default Home;