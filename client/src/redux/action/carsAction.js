import { message } from 'antd'
import axios from 'axios'
import config from '../../config'
export const getallcars=()=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await config.get('/api/v1/user/getallcars')
        dispatch({type:'GET_ALL_CARS',payload:response.data})
        dispatch({type:'LOADING',payload:false})
        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}


export const addCar=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})

    try {
        console.log("first",reqObj)
        await config.post('/api/v1/admin/add-car',reqObj)
        message.success("car added")
        // setTimeout(() => {
        //     window.location.href='/admin/dashboard'
        // }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}
export const editCar=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})

    try {
        await config.post('/api/v1/admin/editcar',reqObj)
        message.success("car details updated")

        setTimeout(() => {
            window.location.href='/admin/dashboard'

        }, 500);
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}

export const deleteCar=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})

    try {
        console.log("bumbo",reqObj)
        
        await config.post('/api/v1/admin/deletecar',reqObj)
        message.success("car deleted")

       
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}


