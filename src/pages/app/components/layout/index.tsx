import React from 'react';
import SideBar from './side-bar';

const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex">
            <SideBar />
            <div className='w-full'>
                {children}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
