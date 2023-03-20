//initial data
const initialData={
    user:{}
}

//state and action being used for combining
export const getUser =(state=initialData,action)=>{


switch(action.type)
{
    case 'GET_USER_INFO'  :{
        return{
            ...state,
            user:action.payload
        }
    }
    default:return state
}
}