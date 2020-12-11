const INITIAL_STATE={
    id:0,
    username:'',
    password:'',
    isLogin:false,
    role:'',
    error:''

}
const reducers=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':
            return {...state,...action.payload, isLogin:true, cart:action.cart}
        case 'LOGOUT':
            return INITIAL_STATE
        case 'CLEAR':
            return{...state,error:''}
        default:
            return state
    }
}
export default reducers