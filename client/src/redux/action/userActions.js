import axios from 'axios'
import config from '../../config'


export const userLogin=(req)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await config.post('/api/v1/user/login,req')
        localStorage.setItem('user',JSON.stringify(response.data))
        dispatch({type:'LOADING',payload:false})
        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}