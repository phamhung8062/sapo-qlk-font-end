import React, { useEffect, useState } from 'react'
import ImageAPI from '../../../apis/image'
export default function ChangeImageModal({ productId, imageList}) {

    const [imageSelect, setImageSelect] = useState({id: null, path: ''})

    useEffect(()=>{
    }, [imageSelect, imageList])


    const onAddImage = (event) => {
        event.preventDefault()
        let image = event.target.files[0]
        let reader = new FileReader()
        let imageUpload = null

        reader.onloadend = () => {
            imageUpload = { nameImage: image.name, base64Image: reader.result.split(',')[1] }
            ImageAPI.addImage(productId, imageUpload).
                then(res => {
                    window.location.reload(false)
                }).catch(err => {
                    alert('có lỗi.. thử lại sau!!!  ', err);
                })
        }
        reader.readAsDataURL(image)


    }


    const onChangeImageActive = (e)=>{
        e.preventDefault()
        console.log("alo onSave image to Variant")
        ImageAPI.changeImageActive(productId, imageSelect)
        .then(res =>{
            window.location.reload(false)
        })
        .catch(err =>{
            alert('có lỗi xảy ra.. thử lại sau!!! ' , err);
        })
    }

    const onChangeImage = (e, idImage)=>{e.preventDefault()
        e.preventDefault()
        console.log(idImage)
        setImageSelect(idImage)
        console.log("image select: ", imageSelect)
    }

    return (
        <div className="modal fade" id="changeImageModal" tabIndex={-1} role="dialog" aria-labelledby="changeImageModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Thay ảnh</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {imageList && imageList.map(image => {
                            if(imageSelect == null)
                                    return <div className="col-3" onClick={(e) =>onChangeImage(e, image.id)}>
                                                <div className="modal-variant-images">
                                                    <img value={image.id} className="modal-image" src={"/image/" + image.path} alt="ảnh" ></img>
                                                </div>
                                            </div>
                            else if(imageSelect == image.id)
                                return  <div className="col-3 "  onClick={(e) =>onChangeImage(e, image.id)}>
                                        <div className="modal-variant-images select-image">
                                            <img value={image.id} className="modal-image" src={"/image/" + image.path} alt="ảnh" ></img>
                                        </div>
                                    </div>
                                    
                            else{
                                return <div className="col-3"  onClick={(e) =>onChangeImage(e, image.id)}>
                                        <div className="modal-variant-images">
                                            <img value={image.id} className="modal-image" src={"/image/" + image.path} alt="ảnh" ></img>
                                        </div>
                                    </div>
                            }
                            

                        }



                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" style={{ height: '40px' }} >
                            <span className="float-right">
                                <div className="fileupload text-white">
                                    <input type="file" onChange={(e) => onAddImage(e)} />
                                        Thêm ảnh
                                </div>
                            </span>
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onChangeImageActive}>lưu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
