import { message } from 'antd'
import axios from 'axios'
import config from '../../config'


export const userorders=()=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await config.get('/api/v1/user/orders')
        dispatch({type:'GET_ALL_ORDERS',payload:response.data})
        dispatch({type:'LOADING',payload:false})
        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}