import http from './common'


const addImage = (productId, image) =>{
    return http.post(`products/${productId}/images/`, image, {
        headers: {
            'content-type': 'application/json'
        }
    })
}

const deleteImage = (productId, imageId) =>{
    return http.delete(`products/${productId}/images/${imageId}`)
}

const getAllImageByProductId = (productId) =>{
    return http.get(`products/${productId}/images`)
}

const changeImageActive = (productId, imageId) =>{
    return http.put(`products/${productId}/images/${imageId}`)
}


export default{
    addImage,
    deleteImage,
    getAllImageByProductId,
    changeImageActive,
    

}

