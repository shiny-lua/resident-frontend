import React from 'react';
import SideBar from './side-bar';

const Layout = ({ children }: { children: React.ReactNode }) => {

    const [isTablet, setIsTablet] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);
    const [smallSideBar, setSmallSideBar] = React.useState(false)
    const [showArrowButton, setShowArrowButton] = React.useState(false)

    React.useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth <= 1000);
            setIsMobile(window.innerWidth <= 500);
        };
        console.log(isTablet)
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [isTablet, smallSideBar, isMobile]);

    React.useEffect(() => {
        isTablet ? setSmallSideBar(true) : setSmallSideBar(false)
        // isMobile ? setSmallSideBar(true) : setSmallSideBar(false)
    }, [isTablet, isMobile])

    const onSideBar = () => {
        setSmallSideBar(!smallSideBar)
        setShowArrowButton(false)
    }

    return (
        <div className={`${!isMobile ? "flex" : "relative"}`}>
            <SideBar smallSideBar={smallSideBar} isMobile={isMobile} onSideBar={onSideBar} showArrowButton={showArrowButton} onShowArrowButton={() => setShowArrowButton(!showArrowButton)} onSmallSideBar={() => setSmallSideBar(!smallSideBar)} />
            <div className={`${smallSideBar ? "ml-[55px]" : isMobile ? "ml-0" : "ml-[230px]"}`}>
                {children}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
