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


<>
    
    <div className="p-8">
      <Heading
        cName="hero"
        name="htext123"
        imageclass="coverUser"
        img="https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-company-profile-corporate-culture-exhibition-board-display-poster-material-image_131622.jpg"
        title="Your Profile"
      />
    </div>

    <div className="container mx-auto py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <div className="mb-4">
            <Image
              src={userData.profileImageName}
              alt="avatar"
              className="rounded-full w-48 h-48 mx-auto mb-4"
            />
            <Button
              icon="pi pi-user-edit"
              className="w-full"
              onClick={() => setVisible(true)}
            />
          </div>
          {/* You can replace FileUpload with a Tailwind-styled input if needed */}
          <input
            type="file"
            id="profileimage"
            accept=".jpg, .jpeg, .png, .pdf,.avif"
            onChange={handleImage}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileimage"
                  accept=".jpg, .jpeg, .png, .pdf,.avif"
                  onChange={handleImage}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  </>