import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL:"https://api.freeapi.app/api/v1/users",
   headers: {accept: 'application/json', 'content-type': 'application/json'},
})



api.interceptors.request.use(

    (config)=>{

        const token = Cookies.get("userId");
        console.log(token)
        if(token){
            config.headers.Authorization= token

        }
  
        console.log(config);
        return config
    },

      (err)=>{

          return Promise.reject(err)
      }
    

)

api.interceptors.response.use(
  (response)=>response ,
   async(err)=>{
     if(err.response?.status == 401){
        const rt = Cookies.get("refreshToken");
        console.log(rt);
        if(!rt) return Promise.reject(err);
        try {
        const res = await authentication.refreshToken(rt);
        Cookies.set("userId", res.data.accessToken, { expires: 1 / 24 });
        Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 });
        err.config.headers.Authorization = res.data.accessToken;
        console.log(res);
        return api(err.config);
        
        } catch (err) {
          return Promise.reject(err);
        }
     }

     return Promise.reject(err);
   }
)


export const authentication ={

    registerUser:async(fromdata)=>{

 
       const res = await api.post("/register" , fromdata)
        console.log(res.data)
        return res.data;
     

           
      

    },

    loginUser:async(fromdata)=>{

        const res = await api.post("/login" ,fromdata)
        console.log(res.data)
        return res.data
    },


    refreshToken: async(token)=>{

        const res = await api.post("/refresh-token",{refreshToken:token});

        console.log(res.data)

        return res.data;

    }


}