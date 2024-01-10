// import {useContext,useEffect,useState} from "react";
// import { useSearchParams,useNavigate } from "react-router-dom";
// import { Alert,CircularProgress } from "@mui/material";
// import { AuthContext }

// export  const VerifyEmail = () =>{
//   const {user,updateUser} = useContext(AuthContext);
//   const [isLoading,setIsLoading] = useState(false);
//   const [error,setError] = usestate(false);
//   const [searchParams,setSearchparams] = useSearchParams();
//   const navigate = useNavigate();

//   const emailToken = searchparams.get("emailToken");

//   console.log(user);

//   useEffect(()=>{
//     async () =>{
//       if(user?.isVerified){
//         setTimeout(()=>{
//           return navigate("/")
//         },3000);
//       }else {
//         if(emailToken){
//           setIsLoading(true);

//           const response = await postRequest(
//             `${baseUrl}/users/verify-email`,
//             JSON.stringify({emailToken})
//           )

//           setIsLoading(false);
//           console.log("res",response);

//           if(response.error){
//             return setError(response);
//           }
//           updateUser(response)
//         }
//       }
//     }
//   },[emailToken,user])

//   return()
// }