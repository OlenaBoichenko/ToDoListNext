'use client'

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function Providers ({children}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) return <>{children}</>
    
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            {children}
        </ThemeProvider>
    );
};
