import React from "react";
import { PAGES_NAME } from ".";
import LoginPage from "../Authentication/login";
import Landingpage from "../components/landingpage";
import SignupPage from "../Authentication/signup";
import AboutPage from "../components/about";
import ContactUsPage from "../components/contactus";
import LC150ProblemsGrid from "../components/datagrid/lc150datagrid";

export const RouteConfig = [
    {
        pageName: PAGES_NAME.HOMEPAGE,
        path: '/',
        element: <Landingpage />,
    },
    {
        pageName: PAGES_NAME.LOGIN,
        path: '/login',
        element: <LoginPage />,
    },
    {
        pageName: PAGES_NAME.SIGNUP,
        path: '/signup',
        element: <SignupPage />,

    },
    {
        pageName: PAGES_NAME.ABOUT,
        path: '/aboutus',
        element: <AboutPage />,
    },
    {
        pageName: PAGES_NAME.CONTACT,
        path: '/contact',
        element: <ContactUsPage />,
        
    },
    {
        pageName: PAGES_NAME.LC150,
        path: '/lc150',
        element: <LC150ProblemsGrid/>,

    },
    {
        pageName: PAGES_NAME.LC300,
        path: '/lc300',
        element: '',

    },
    {
        pageName: PAGES_NAME.LC500,
        path: '/lc500',
        element: '',

    },
    {

    }
]