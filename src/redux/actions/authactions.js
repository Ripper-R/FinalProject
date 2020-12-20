import Axios from 'axios'
import { API_URLbe } from '../../helper/idformat'
import { toast } from 'react-toastify'
toast.configure()
// import {ADDCART} from './../Type'
export const LoginFunc=(user,cart)=>{
    // console.log(user)
    return{
        type:'LOGIN',
        payload:user,
        cart:cart
    }
}

export const Clearfunc=()=>{
    return{
        type:'CLEAR'
    }
}

export const LogOutfunc=()=>{
    return{
        type:'LOGOUT'
    }
}
export const AddcartAction=(cart)=>{
    return{
        type:'ADDCART',
        cart:cart
    }
}


export const LoginThunk=(username,password)=>{
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.post(`${API_URLbe}/auth/login`,{
            username:username,
            password:password
        })
        .then((res)=>{
            localStorage.setItem('id',res.data.datauser.id)
            dispatch({type:'LOGIN',payload:res.data.datauser,cart:res.data.cart})//backend
        }).catch((err)=>{
            dispatch({type:'Error',payload:err.response.data.message})
            toast.error(err.response.data.message, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        })

    }

}

// export const KeepLogin=(username,password)=>{
//     return (dispatch)=>{
//         dispatch({type:'LOADING'})
//         Axios.post(`${API_URLbe}/auth/login`,{
//             username:username,
//             password:password
//         })
//         .then((res)=>{
//             localStorage.getItem('id',res.data.datauser.id)
//             dispatch({type:'LOGIN',payload:res.data.datauser})//backend
//         }).catch((err)=>{
//             dispatch({type:'Error',payload:err.response.data.message})
//         })

//     }

// }