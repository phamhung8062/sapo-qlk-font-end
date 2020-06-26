import http from './common';


const getAll = () =>{
    return http.get('categories')
}

const addCategory = (data) =>{
    return http.post('categories', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const changeCategoryInProduct = (idCategory, idProduct) => {
    return http.put(`categories/${idCategory}/products/${idProduct}`)
}

export default {
    getAll,
    addCategory,
    changeCategoryInProduct,
    


}