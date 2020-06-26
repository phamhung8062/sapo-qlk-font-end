import React, { useState, useEffect } from 'react'
import {
    withStyles
} from '@material-ui/core';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import styles from './styles';
import CategoryAPI from '../../../../apis/category'
import Alert from '@material-ui/lab/Alert';
import { toastError, toastSuccess } from '../../../../helpers/toastHelper';

function ListCategory({ classes, onSelectCategory }) {

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [category, setCategory] = useState(null)

    useEffect(() => {
        rechieveCategories()
    }, categoryList)

    const rechieveCategories = () => {
        CategoryAPI.getAll()
            .then(res => {
                console.log("abcc: ", res.data)
                setCategoryList(res.data)
            }).catch(err =>{
                console.log("err get list: ", err)
            })
    }

    const onClickAddCategory = (e)=>{
        e.preventDefault()
        console.log(category)
        CategoryAPI.addCategory({name: category})
        .then(res =>{
            toastSuccess("Thêm thành công!")
            setCategoryList([...categoryList, res.data])
            window.location.reload(false)
        }).catch(err => {
            console.log("err", err);
        })
        
    }

    const onSelectedCategory = (e, name, id) =>{
        e.preventDefault()
        onSelectCategory(name, id)

    }


    return (
        <div>
            <UncontrolledPopover
                className={classes.haha}
                placement="bottom"
                target="PopoverLegacy"
                trigger="legacy"
            >
                <PopoverBody >
                    {
                        categoryList.length == 0
                        ?
                        <div className="item-category mb-2">
                            chưa có thể loại nào để hiển thị
                        </div>
                        :
                         categoryList.map((item, index) => {
                            return (
                                <div className="item-category mb-2" onClick={(e) => onSelectedCategory(e, item.name, item.id)}>
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </PopoverBody>
            </UncontrolledPopover>
            <div className="modal fade" id="doAddCategoryModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thêm thể loại</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                            <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            autocomplete="off"
                            onChange={(e) => setCategory(e.target.value)}
                            />
                            <button 
                                onClick={onClickAddCategory}
                            className="btn btn-primary float-right mt-2">Lưu</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}
export default withStyles(styles)(ListCategory);
