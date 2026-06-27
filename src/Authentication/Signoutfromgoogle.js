// import React from 'react';
// import { auth } from './firebase';
// import { HOMEROUTE } from '../constants/urlConstants';

// const SignOutButton = ({ updateLogin, updateUserName }) => {

//   const { alert, showAlert } = useCustomAlert();

//   const signOutWithGoogle = async () => {
//     try {
//       await auth.signOut();
//       showAlert("success", "Signout Successfull");
//       localStorage.removeItem("username");
//       localStorage.removeItem("isLoggedIn");
//       setTimeout(() => {
//         updateLogin();
//         updateUserName("Login");
//         navigate(HOMEROUTE);
//       }, 1000);

//     } catch (error) {
//       showAlert("error", "Error signing out");
//     }
//   };

//   return (
//     <li style={{ cursor: 'pointer' }} className='mr-4' onClick={() => signOutWithGoogle()}>
//       Sign Out
//     </li>
//   );
// };

// export default SignOutButton;



