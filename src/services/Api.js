import axios from "axios";


const api = axios.create({
    baseURL:"https://api.freeapi.app/api/v1/users",
   headers: {accept: 'application/json', 'content-type': 'application/json'},
})


api.interceptors.request.use(

    (config)=>{

        const token ="12gthi345"
        if(token){
            config.headers.authorization= token

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
        return res.data
        
      

    },
    loginUser:async(fromdata)=>{

        const res = await api.post("/login" ,fromdata)
        console.log(res.data)
        return res.data
    }


}