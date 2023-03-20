import axios from 'axios'
import config from '../../config'


export const getUserInfo=()=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await config.get('/api/v1/user/getuserinfo')

        dispatch({type:'GET_USER_INFO',payload:response.data})
        dispatch({type:'LOADING',payload:false})

        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}
export const UserProfile=(req)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await config.post('/api/v1/user/profile,req')
        dispatch({type:'LOADING',payload:false})
        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}

