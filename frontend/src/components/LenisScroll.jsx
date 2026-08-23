/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

let lenisInstance = null;

export const getLenis = () => lenisInstance;

const LenisScroll = () => {
    const location = useLocation();

    React.useEffect(() => {
        // Do not initialize Lenis smooth scroll on the dashboard page
        if (location.pathname === "/dashboard") {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: false,
            anchors: true,
        });

        lenisInstance = lenis;

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisInstance = null;
        };
    }, [location.pathname]);

    return null;
}

export default LenisScroll