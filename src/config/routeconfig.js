import React from "react";
import { PAGES_NAME } from ".";
import LoginPage from "../Authentication/login";
import Landingpage from "../components/landingpage";
import SignupPage from "../Authentication/signup";
import AboutPage from "../components/about";
import ContactUsPage from "../components/contactus";
import LC150ProblemsGrid from "../components/datagrid/lc150datagrid";
import BlogsPage from "../components/blogsPage";
import ArticleWriter from "../components/articleeditor/articlewriter";
import ArticleDetail from "../components/articleeditor/viewArticle";
import Resources from "../components/resources";
import LC300ProblemsGrid from "../components/datagrid/lc300datagrid";

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