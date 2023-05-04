import { createContext, useEffect, useState } from "react";


export const AppContext = createContext({})

export const AppProvider = ( {children} ) => {
    const [qty, setQty] = useState(null)
    const [idProduct, setIdProdcut] =  useState(null)
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        
        if (cart && Object.keys(cart).length > 0) {
          const qty = Object.values(cart).reduce((total, value) => total + value, 0);
          setQty(qty);
        } else {
          setQty(null);
        }
      }, []);
    
    return <AppContext.Provider value={{qty, setQty, idProduct, setIdProdcut}}>
        {children}
    </AppContext.Provider>
}
