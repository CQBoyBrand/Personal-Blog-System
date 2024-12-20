import { useEffect, useState } from "react"

export const useMenuToggle = (collapsed: boolean) => {
    const [menuCollapsed, setMenuCollapsed] = useState(collapsed);
    useEffect(() => {
        setMenuCollapsed(collapsed)
    }, [collapsed])
    return { menuCollapsed, setMenuCollapsed }
}