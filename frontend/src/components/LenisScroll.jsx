/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import Lenis from 'lenis';

let lenisInstance = null;

export const getLenis = () => lenisInstance;

const LenisScroll = () => {
    React.useEffect(() => {
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
    }, []);

    return null;
}

export default LenisScroll