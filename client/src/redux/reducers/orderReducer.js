const initialData={
    orders:[]
}

//state and action being used for combining
export const ordersReducer=(state=initialData,action)=>{


switch(action.type)
{
    case 'GET_ALL_ORDERS'  :{
        return{
            ...state,
            orders:action.payload
        }
    }
    default:return state
}
}