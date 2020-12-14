//remove item action
export const removeItem=()=>{
    return{
        type: 'REMOVE_ITEM',
    }
}
//subtract qt action
export const subtractQuantity=()=>{
    return{
        type: 'SUB_QUANTITY',
    }
}
//add qt action
export const addQuantity=()=>{
    return{
        type: 'ADD_QUANTITY',
    }
}

//clear cart action
export const CLearcart=()=>{
    return{
        type: 'CLEARCART',

    }
}
