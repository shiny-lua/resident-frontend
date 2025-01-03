import React, { useState, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <div className="">
            <Header />
            <div className='pt-30'>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
