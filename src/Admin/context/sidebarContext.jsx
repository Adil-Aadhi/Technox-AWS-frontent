import { createContext, useState } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({children}){
    const [sidebarOpens,setSidebarOpens]=useState(false);

    return(
        <SidebarContext.Provider value={{sidebarOpens,setSidebarOpens}}>
            {children}
        </SidebarContext.Provider>
    )
}