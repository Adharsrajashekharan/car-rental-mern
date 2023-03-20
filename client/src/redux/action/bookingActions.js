import axios from 'axios'
import {message} from 'antd'
import config from '../../config'

export const bookCar=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await config.post('/api/v1/user/bookcar',reqObj)
        dispatch({type:'LOADING',payload:false})
        message.success('car booked successfully')
        setTimeout(() => {
            window.location.href('/orders')

        }, 500);
        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
        message.error("something went wrong")

    }
}




export const bookCarOffline=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        const response =await config.post('/api/v1/user/bookcaroffline',reqObj)
        dispatch({type:'LOADING',payload:false})
        message.success('car booked successfully')
        // setTimeout(() => {
        //     window.location.href('/orders')

        // }, 500);
        console.log(response.data)

    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
        message.error("something went wrong")

    }
}
export const getAllBookings=()=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    try {
        console.log("fwfsfsfsfs")
        const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

        const response =await config.get('/api/v1/user/getallbookings',{headers})
        console.log("000000000",response)
        dispatch({type:'GET_ALL_BOOKINGS',payload:response.data})
        dispatch({type:'LOADING',payload:false})
        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
    }
}

export const cancelCarBooking=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING',payload:true})
    const bo={
        reqObj
    }
    try {
        console.log("brumbo",reqObj)
        const response =await config.post('/api/v1/user/cancelcarbooking',bo)
        dispatch({type:'LOADING',payload:false})
        message.success(' booking cancelled')
        setTimeout(() => {
            window.location.href('/orders')

        }, 500);
        console.log(response.data)
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING',payload:false})
        console.log(error)
        message.error("car not cancelled please try again")

    }
}
