import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Label } from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TableCell, withStyles } from '@material-ui/core';
import style from './styles';
import SettingsIcon from '@material-ui/icons/Settings';

// const getItems = count =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k}`,
//         content: <TableCell style={{ width: '100px' }} ad='ad' style={{ background: '#fff' }}>aaaaaaaaaaaaaaaaaaaaaaaaaaa</TableCell>,
//     }));

const getItems = () => {
    return [
        {
            id: 1,
            header: <TableCell align="left">Mã nhà cung cấp</TableCell>,
            show: true,
        },
        {
            id: 2,
            header: <TableCell align="left">Tên nhà cung cấp</TableCell>,
            show: true,
        },
        {
            id: 3,
            header: <TableCell align="left">Địa chỉ</TableCell>,
            show: true,
        },
        {
            id: 4,
            header: <TableCell align="left">Email</TableCell>,
            show: true,
        },
        {
            id: 5,
            header: <TableCell align="left">Số điện thoại</TableCell>,
            show: true,
        },
        {
            id: 6,
            header: <TableCell align="left">Trạng thái</TableCell>,
            show: true,
        },
        {
            id: 7,
            header: <TableCell align="left">Ngày tạo</TableCell>,
            show: false,
        },
        {
            id: 8,
            header: <TableCell align="left">Cập nhật cuối</TableCell>,
            show: false,
        },
        {
            id: 9,
            header: <TableCell align="left">Website</TableCell>,
            show: false,
        },
        {
            id: 10,
            header: <TableCell align="left">Mã số thuế</TableCell>,
            show: false,
        },
        {
            id: 11,
            header: <TableCell align="left">Mô tả</TableCell>,
            show: false,
        },
        {
            id: 12,
            header: <TableCell align="left">Địa chỉ 2</TableCell>,
            show: false,
        },
    ];
}

var x = getItems();

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    //debugger
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: 0,
//     margin: `0 0px 0 0`,
//     // change background colour if dragging
//     background: isDragging ? 'black' : '#fff',
//     // styles we need to apply on draggables
//     ...draggableStyle,
// });

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#fff' : '#fff',
    display: 'flex',
    width: '100%',
    padding: 2,
    overflow: 'auto',
    justifyContent: 'space-between',
});

class SupplierModal extends Component {
    constructor(props) {
        //debugger
        super(props);
        this.state = {
            default: true,
            modal: false,
            items: null,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    getItems = supplier => {
        return [
            {
                id: 1,
                header: <TableCell align="left">Mã nhà cung cấp</TableCell>,
                show: true,
            },
            {
                id: 2,
                header: <TableCell align="left">Tên nhà cung cấp</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.name}
                </TableCell>,
                show: true,
            },
            {
                id: 3,
                header: <TableCell align="left">Địa chỉ</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.address}
                </TableCell>,
                show: true,
            },
            {
                id: 4,
                header: <TableCell align="left">Email</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.email}
                </TableCell>,
                show: true,
            },
            {
                id: 5,
                header: <TableCell align="left">Số điện thoại</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.phone}
                </TableCell>,
                show: true,
            },
            {
                id: 6,
                header: <TableCell align="left">Trạng thái</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.status}
                </TableCell>,
                show: true,
            },
            {
                id: 7,
                header: <TableCell align="left">Ngày tạo</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.createdDate}
                </TableCell>,
                show: false,
            },
            {
                id: 8,
                header: <TableCell align="left">Cập nhật cuối</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.modifiedDate}
                </TableCell>,
                show: false,
            },
            {
                id: 9,
                header: <TableCell align="left">Website</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.website}
                </TableCell>,
                show: false,
            },
            {
                id: 10,
                header: <TableCell align="left">Mã số thuế</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.taxCode}
                </TableCell>,
                show: false,
            },
            {
                id: 11,
                header: <TableCell align="left">Mô tả</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.description}
                </TableCell>,
                show: false,
            },
            {
                id: 12,
                header: <TableCell align="left">Địa chỉ 2</TableCell>,
                body: <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.address2}
                </TableCell>,
                show: false,
            },
        ];
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        })
    }

    updateOrder = () => {
        this.props.cb(this.state.items);
        this.setState({
            modal: !this.state.modal,
        })
    }

    onDragEnd(result) {
        // dropped outside the list
        //debugger
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index,
        );
        this.setState({
            default: false,
            items,
        });
        this.props.cb(items);
    }

    // componentWillMount() {
    //     debugger
    //     console.log('will mount');
    //     this.setState((state, props) => ({
    //         items: props.backItems,
    //     }));
    // }

    componentDidMount() {
        //console.log("mount");
        this.setState((state, props) => ({
            items: props.backItems,
        }));
    }

    handleCheckbox = (e) => {
        //debugger
        let _items = this.state.items;
        let index = _items.findIndex(item => item.id == e.target.id);
        _items[index].show = e.target.checked;
        this.setState({
            items: _items,
            default: false,
        });
        this.props.cb(_items);
    }

    handleCheckboxDefault = (e) => {
        if (e.target.checked) {
            x = this.state.items;
            this.setState({
                items: getItems(),
                default: true,
            });
            this.props.cb(getItems());
        }
        else {
            this.setState({
                items: x,
                default: false,
            });
            this.props.cb(x);
        }
    }
    // componentWillMount() {
    //     console.log('m');
    // }

    // componentDidUpdate() {
    //     console.log('u');
    // }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    renderDND() {
        //console.log(this.state.items);
        //debugger
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {this.state.items.map((item, index) => (
                                item.show ?
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <TableCell align='left'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            // style={getItemStyle(
                                            //     snapshot.isDragging,
                                            //     provided.draggableProps.style
                                            // )}
                                            >
                                                <b>{item.header.props.children}</b>
                                            </TableCell>
                                        )}
                                    </Draggable> : ''
                            )
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }

    render() {
        const { modal, items } = this.state;
        const { backItems, classes } = this.props;
        //debugger
        // const { handle } = this.props;
        return (
            <div>
                {/* <Button color="danger" onClick={this.toggle}>Hello</Button> */}
                <div onClick={this.toggle} style={{ cursor: 'pointer' }}>
                    <Label style={{ cursor: 'pointer' }}>Điều chỉnh cột hiển thị</Label>
                    <SettingsIcon ></SettingsIcon>
                </div>
                <Modal size='lg' centered={false} style={{ maxWidth: '1600px', width: '80%' }} isOpen={modal} toggle={this.toggle}>
                    {/* <ModalHeader toggle={this.toggle}>Điều chỉnh cột hiển thị trên trang danh sách</ModalHeader> */}
                    <ModalBody>
                        <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                            <CustomInput type="checkbox" checked={this.state.default} name="default" id='0' onChange={this.handleCheckboxDefault} label="Quay về mặc định" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 1).show} name="code" id='1' onChange={this.handleCheckbox} label="Mã nhà cung cấp" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 2).show} name="name" id='2' onChange={this.handleCheckbox} label="Tên nhà cung cấp" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 3).show} name="address" id='3' onChange={this.handleCheckbox} label="Địa chỉ" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 4).show} name="address" id='4' onChange={this.handleCheckbox} label="Email" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 5).show} name="email" id='5' onChange={this.handleCheckbox} label="Số điện thoại" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 6).show} name="status" id='6' onChange={this.handleCheckbox} label="Trạng thái" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 7).show} name="createdDate" id='7' onChange={this.handleCheckbox} label="Ngày tạo" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 8).show} name="modifiedDate" id='8' onChange={this.handleCheckbox} label="Cập nhật cuối" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 9).show} name="website" id='9' onChange={this.handleCheckbox} label="Website" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 10).show} name="taxCode" id='10' onChange={this.handleCheckbox} label="Mã số thuế" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 11).show} name="description" id='11' onChange={this.handleCheckbox} label="Mô tả" />
                            <CustomInput type="checkbox" checked={backItems.find(x => x.id == 12).show} name="address2" id='12' onChange={this.handleCheckbox} label="Địa chỉ 2" />
                        </div>
                        {this.renderDND()}
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button color="primary" onClick={this.updateOrder}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter> */}
                </Modal>
            </div>
        );
    }
}
export default withStyles(style)(SupplierModal);