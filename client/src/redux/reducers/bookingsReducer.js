//initial data
const initialData={
    bookings:[]
}

//state and action being used for combining
export const bookingsReducer=(state=initialData,action)=>{


switch(action.type)
{
    case 'GET_ALL_BOOKINGS'  :{
        return{
            ...state,
            bookings:action.payload
        }
    }
    default:return state
}
}
