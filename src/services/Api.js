import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL:"https://api.freeapi.app/api/v1/users",
   headers: {accept: 'application/json', 'content-type': 'application/json'},
})


api.interceptors.request.use(

    (config)=>{

        const token = Cookies.get("userId")
        if(token){
            config.headers.authorization=`Bearer ${token}`

        }

        return config
    },

    (err)=>{
      return Promise.reject(err)
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