import { Box } from "@mui/material"
import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { ThemeContext } from "../Context/ThemeContext.js"
import { RouteConfig } from "../config/RouteConfig"
import { darkmodecolor, lightmodecolor } from "../constants/urlConstants.js"

export const RouteAllPages = () => {
    const { mode } = useContext(ThemeContext);

    return (
        <>
            <Box sx={{
                padding: 2,
                marginTop: '2%',
                minHeight: 'calc(100vh - 120px)',
                background: mode === 'light' ? lightmodecolor : darkmodecolor,
            }}>
                <Routes>
                    {
                        RouteConfig.map(item => {
                            return (
                                <Route path={item.path} element={item.element} key={item.path} />
                            )
                        })
                    }
                </Routes>
            </Box>
        </>
    )
}