import { PAGES_NAME } from ".";
import ForgetPassword from "../Authentication/ForgetPassword";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import VerifyEmailPage from "../Authentication/VerifyEmailPage";
import VerifyOTP from "../Authentication/VerifyOTP";
import AboutPage from "../components/AboutPage";
import ArticleDetail from "../components/articleeditor/ArticleDetail";
import ArticleWriter from "../components/articleeditor/ArticleWriter";
import ArticlesPage from "../components/ArticlesPage";
import ContactUsPage from "../components/ContactUsPage";
import BackTrackingProblemsGrid from "../components/datagrid/BackTrackingProblemsGrid";
import BinarySearchProblemsGrid from "../components/datagrid/BinarySearchProblemsGrid";
import DynamicProgrammingProblemsGrid from "../components/datagrid/DynamicProblemsGrid";
import GraphProblemsGrid from "../components/datagrid/GraphProblemsGrid";
import GreedyProblemsGrid from "../components/datagrid/Greedyproblems";
import LC150ProblemsGrid from "../components/datagrid/LC150ProblemsGrid";
import LC300ProblemsGrid from "../components/datagrid/LC300ProblemsGrid";
import NumberTheoryProblemsGrid from "../components/datagrid/NumberTheoryProblemsGrid";
import PrefixSumProblemsGrid from "../components/datagrid/PrefixSumProblemsGrid";
import RecursionProblemsGrid from "../components/datagrid/RecursionProblemsGrid";
import SlidingWindowProblemsGrid from "../components/datagrid/SlidingWindowProblemsGrid";
import TreesProblemsGrid from "../components/datagrid/TreesProblemsGrid";
import Landingpage from "../components/LandingPage";
import { Profile } from "../components/Profile";
import Resources from "../components/Resources";
import StringUtilityTools from "../components/StringUtilityTools";
import { ARTICLES } from "../constants/urlConstants";

import HomePage from "../components/HomePage";

import TypingMaster from "../components/TypingMaster/TypingMaster";

export const RouteConfig = [
    {
        pageName: PAGES_NAME.HOMEPAGE,
        path: '/',
        element: <HomePage />,
    },
    {
        pageName: "Prepare",
        path: '/prepare',
        element: <Landingpage />,
    },
    {
        pageName: "Typing Master",
        path: '/typing-master',
        element: <TypingMaster />,
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
        path: ARTICLES,
        element: <ArticlesPage/>,

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
    {
        pageName: PAGES_NAME.NUMBERTHEORY,
        path: '/numbertheory',
        element: <NumberTheoryProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.BINARYSEARCH,
        path: '/bs',
        element: <BinarySearchProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.BACKTRACKING,
        path: '/backtrack',
        element: <BackTrackingProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.TREES,
        path: '/trees',
        element: <TreesProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.GREEDY,
        path: '/greedy',
        element: <GreedyProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.GRAPH,
        path: '/graph',
        element: <GraphProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.PREFIXSUM,
        path: '/prefixsum',
        element: <PrefixSumProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.RECURSION,
        path: '/recursion',
        element: <RecursionProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.GRAPH,
        path: '/graph',
        element: <GraphProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.DYNAMICPROGRAMMING,
        path: '/dp',
        element: <DynamicProgrammingProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.SLIDINGWINDOW,
        path: '/slidingwindow',
        element: <SlidingWindowProblemsGrid/>,
    },
    {
        pageName: PAGES_NAME.FORGETPASSWORD,
        path: '/forgetpassword',
        element: <ForgetPassword/>,
    },
    {
        pageName: PAGES_NAME.VERIFYOTP,
        path: '/verify-otp',
        element: <VerifyOTP/>,
    },
    {
        pageName: PAGES_NAME.PROFILE,
        path: '/profile',
        element: <Profile/>,
    },
    {
        pageName: PAGES_NAME.PROFILE,
        path: '/verifyEmail',
        element: <VerifyEmailPage/>,
    },
     {
        pageName: PAGES_NAME.UTILITY,
        path: '/utilitytools',
        element: <StringUtilityTools/>,
    },
    
        
]