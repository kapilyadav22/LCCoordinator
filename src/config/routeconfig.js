import React from "react";
import { PAGES_NAME } from ".";
import LoginPage from "../Authentication/LoginPage";
import Landingpage from "../components/LandingPage";
import SignupPage from "../Authentication/SignupPage";
import AboutPage from "../components/AboutPage";
import ContactUsPage from "../components/ContactUsPage";
import LC150ProblemsGrid from "../components/datagrid/LC150ProblemsGrid";
import BlogsPage from "../components/BlogsPage";
import ArticleWriter from "../components/articleeditor/ArticleWriter";
import ArticleDetail from "../components/articleeditor/ArticleDetail";
import Resources from "../components/Resources";
import LC300ProblemsGrid from "../components/datagrid/LC300ProblemsGrid";

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
        path: '/aboutme',
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
        element: <LC300ProblemsGrid/>,

    },
    {
        pageName: PAGES_NAME.LC500,
        path: '/lc500',
        element: '',

    },
    {
        pageName: PAGES_NAME.BLOG,
        path: '/blogs',
        element: <BlogsPage/>,

    },
    {
        pageName: PAGES_NAME.BLOG,
        path: '/blogs',
        element: <BlogsPage/>,

    },
    {
        pageName: PAGES_NAME.ADDARTICLE,
        path: '/addarticle',
        element: <ArticleWriter/>,

    },
    {
        pageName: PAGES_NAME.VIEWARTICLE,
        path: '/article/:id',
        element: <ArticleDetail/>,
    },
    {
        pageName: PAGES_NAME.RESOURCES,
        path: '/resources',
        element: <Resources/>,
    },
    
    
]