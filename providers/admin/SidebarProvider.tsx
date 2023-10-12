import { useState, createContext, useContext, ReactNode } from "react"

type SidebarContext = {
    sidebarOpen: boolean,
    toggleSidebar: () => void,
    closeSidebar: () => void
}

type SidebarProviderProps = {
    children: ReactNode
}

// Context
const SidebarContext = createContext<SidebarContext | null>(null)

// Hook
export const useSidebar = () => {
    return useContext(SidebarContext)!
}

// Provider
const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const toggleSidebar = () => { setSidebarOpen(prevState => !prevState) }
    const closeSidebar = () => { setSidebarOpen(false) }

    const providerValue = {
        sidebarOpen,
        toggleSidebar,
        closeSidebar
    }

    return (
        <SidebarContext.Provider value={providerValue}>{children}</SidebarContext.Provider>
    )
}

export default SidebarProvider