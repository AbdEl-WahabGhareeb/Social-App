import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("User Token"))
            setToken(localStorage.getItem("User Token"));
    }, []);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}
