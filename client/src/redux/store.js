import { createStore, applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
import { carsReducer } from './reducers/carsReducer';
import {getUser} from './reducers/userReducer'
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});


//combine reducers takes all the object of child reducers
//we may have more than one reducers so we use combine reducers
const rootReducer=combineReducers({
    carsReducer,
    alertsReducer,
    bookingsReducer,
    getUser,
    
    
})



//code taken from redux-devtools-extension
const store = createStore(
  rootReducer,
  composeEnhancers(
    //we use only one middleware so thunk is used
    applyMiddleware(thunk),
    // other store enhancers if any
  )
);


export default store