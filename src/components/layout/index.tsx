import React, { useState, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, hiddenFooter }: { children: ReactNode, hiddenFooter?: boolean }) => {

    return (
        <div className="">
            <Header />
            <div>{children}</div>
            {!hiddenFooter && <Footer />}
        </div>
    );
};

export default Layout;
