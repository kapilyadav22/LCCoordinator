
// export const SERVERURL = "http://localhost:8080"
export const SERVERURL = "http://165.22.223.85:8080"

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


//DATAGRIDURLS 
export const LC150 = V1 + '/lc150';




//ROUTES
export const HOMEROUTE = '/';
