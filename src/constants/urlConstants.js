
export const SERVERURL = "http://localhost:8080"
// export const SERVERURL = "http://165.22.223.85:8080"

export const V1 = SERVERURL + "/api/v1";
export const PUBLIC =  V1 + "/public";
export const PRIVATE =  V1 + "/private";


export const SENDEMAIL = PUBLIC + "/sendemail";


//LOGIN 
export const LOGINURL = SERVERURL + '/auth/login';


//REGISTER
export const REGISTERURL = SERVERURL + '/register';

//BLOGS
export const BLOGSURL = SERVERURL + '/blogs';
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

//ROUTES
export const HOMEROUTE = '/';

export const  SocialMediaLinks = {
    "linkedin" :'https://www.linkedin.com/in/kapilyadav22/',
    "github" : 'https://github.com/kapilyadav22',
    "medium" :'https://kapilyadav22.medium.com/',
    "youtube" : 'https://www.youtube.com/@kapilyadav0180',
    "telegram" : 'https://t.me/LCCoordinator',
    "discord" :'https://discord.gg/sPdtSpKk',
  }

  export const navigationTimer = 300;