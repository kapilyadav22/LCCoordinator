import { Route, Routes } from "react-router-dom"
import { RouteConfig } from "../config/RouteConfig"
import React from "react"
import { Box, Container } from "@mui/material"

export const RouteAllPages = () => {
    return (
        <>
        <Box sx={{ padding: 2, 
            //] backgroundColor: 'background.default',
             color: 'text.primary' }}>
        {/* <Container component="main" maxWidth="xl" sx={{height:"90%"}}> */}
            <Routes>
                {
                    RouteConfig.map(item => {
                        return (
                                <Route path={item.path} element={item.element} key={item.path} />
                        )
                    })
                }
            </Routes>
            {/* </Container> */}
           </Box>
        </>
    )
}