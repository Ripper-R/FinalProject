const INITIAL_STATE={
    id:0,
    email:'',
    password:'',
    islogin:'',
    role:''

}
const reducers=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':
            return {...state,...action.payload}
        case 'LOGOUT':
            return INITIAL_STATE
        case 'CLEAR':
            return{...state,error:''}
        default:
            return state
    }
}
export default reducers