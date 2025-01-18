
// export const SERVERURL = "http://localhost:8080"
export const SERVERURL = "http://165.22.223.85:8080"

export const V1 = SERVERURL + "/api/v1";
export const PUBLIC =  V1 + "/public";
export const PRIVATE =  V1 + "/private";
export const SENDEMAIL = PUBLIC + "/sendemail";

//ROUTES
export const HOMEROUTE = '/';
export const LOGIN = '/login';



//PROFILE
export const PROFILE = "/profile";
export const EDITPROFILE  = SERVERURL + PROFILE;


//Authentication
export const LOGINURL = SERVERURL + '/auth/login';
export const FORGETPASSWORD = SERVERURL + '/auth/forgetpassword';
export const VERIFYOTP = SERVERURL + '/auth/verifyOTP';
export const CHANGEPASSWORD = SERVERURL + '/auth/changepassword';
export const RESETPASSWORD = SERVERURL + '/auth/resetpassword';
export const VERIFYEMAIL = SERVERURL + '/auth/verifyEmail';


//REGISTER
export const REGISTERURL = SERVERURL + '/register';

//ARTICLES
export const BLOGSURL = SERVERURL + '/articles';
export const ADDBLOGSURL = BLOGSURL + '/addArticle';
export const DeleteBLOGSURL = BLOGSURL + '/deleteArticle';


//DATAGRIDURLS 
export const LC150 = V1 + '/lc150';
export const LC300 = V1 + '/lc300';
export const BinarySearch = V1 + '/bs';
export const RECURSION = V1 + '/recursion';
export const NUMBERTHEORY = V1 + '/numbertheory';
export const TREES = V1 + '/trees';
export const GREEDY = V1 + '/greedy';
export const PREFIXSUM = V1 + '/prefixsum';
export const BACKTRACKING = V1 + '/backtracking';
export const SLIDINGWINDOW = V1 + '/slidingwindow';
export const  GRAPH = V1 + '/graph';
export const  DYNAMICPROGRAMMING= V1 + '/dp';

export const UPLOADCSV = "/upload-csv";

  //Profile URL
  export const GFG = '/';
  export const LEETCODE = "https://leetcode.com/graphql";
  export const GITHUB = "https://api.github.com/users";
  export const CODECHEF = "https://api.codechef.com/users";
  export const CODEFORCES = "https://codeforces.com/api/user.info?handles=";

  export const LEETCODE_QUERY = (username) => `
  query {
    user(username: "${username}") {
      username
      profile {
        reputation
        ranking
        submissionCount
        solvedProblems
        contestRanking
        totalAcSolved
        totalQuestionCount
      }
    }
  }
`;

//LLM Search
export const LLMSEARCHURL = "/llmsearch";
export const backtracking_LLMSEARCH = SERVERURL + "/ai/generateStream?search=";
// export const backtracking_LLMSEARCH = SERVERURL + "/ai/generate?search=";
// export const backtracking_LLMSEARCH = "/llmsearch/backtracking?search=";
export const prefixsum_LLMSEARCH = "/llmsearch/prefixsum?search=";
export const numbertheory_LLMSEARCH = "/llmsearch/numbertheory?search=";
export const slidingwindow_LLMSEARCH = "/llmsearch/slidingwindow?search=";
export const greedy_LLMSEARCH = "/llmsearch/greedy?search=";
export const recursion_LLMSEARCH = "/llmsearch/recursion?search=";
export const dp_LLMSEARCH = "/llmsearch/dp?search=";
export const trees_LLMSEARCH = "/llmsearch/trees?search=";
export const graph_LLMSEARCH = "/llmsearch/graph?search=";
export const lc150_LLMSEARCH = "/llmsearch/lc150?search=";
export const lc300_LLMSEARCH = "/llmsearch/lc300?search=";
export const bs_LLMSEARCH = "/llmsearch/bs?search=";


//Gradient Colors
export const lightmodecolor = 'linear-gradient(152deg, #ffffff 0%, #ffcc06 100%)';
export const darkmodecolor = 'linear-gradient(135deg, #310363 0%, #000000 100%)';



export const  SocialMediaLinks = {
  "linkedin" :'https://www.linkedin.com/in/kapilyadav22/',
  "github" : 'https://github.com/kapilyadav22',
  "medium" :'https://kapilyadav22.medium.com/',
  "youtube" : 'https://www.youtube.com/@kapilyadav0180',
  "telegram" : 'https://t.me/LCCoordinator',
  "discord" :'https://discord.gg/sPdtSpKk',
}

export const navigationTimer = 1500;

//Visualizer
export const VisualiserCommonUrl = "https://www.cs.usfca.edu/~galles/visualization";


