
const initialData={
    cars:[]
}

export const carsDeleteReducer=(state=initialData,action)=>{


    switch(action.type)
    {
        case 'DELETE_ALL_CARS'  :{
            return{
                ...state,
                cars:action.payload
            }
        }
        default:return state
    }
    }