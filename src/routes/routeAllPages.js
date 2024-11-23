import { Route, Routes } from "react-router-dom"
import { RouteConfig } from "../config/RouteConfig"
import React from "react"

export const RouteAllPages = () => {
    return (
        <>
            <Routes>
                {
                    RouteConfig.map(item => {
                        return (
                                <Route path={item.path} element={item.element} key={item.path} />
                        )
                    })
                }
            </Routes>
        </>
    )
}