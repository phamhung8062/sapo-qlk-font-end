import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styles from './styles';
import SupplierItem from '../../../../components/Supplier/SupplierItem/index'
class SupplierList extends Component {
  constructor(props) {
    super(props);
    //this.state = { page: 0, rowsPerPage: 5 };
  }

  showSupplierItem = (suppliers, items, deleteAction) => {
    let result = null;
    if (suppliers.length > 0 && suppliers != undefined) {
      result = suppliers.map((supplier, index) => {
        return <SupplierItem items={items} deleteSupplier={deleteAction} key={supplier.id} supplier={supplier} index={index} />;
      });
    }
    return result;
  };


  // showSupplierItem = (suppliers) => {
  //   let _suppliers = null;
  //   if (suppliers != undefined) {
  //     if (suppliers.length > 0) {
  //       _suppliers = (this.state.rowsPerPage > 0
  //         ? suppliers.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
  //         : suppliers
  //       ).map((supplier, index) => {
  //         return (
  //           <SupplierItem key={supplier.id} supplier={supplier}
  //             index={index} />
  //         );
  //       });
  //     }
  //   }
  //   return _suppliers;
  // }

  // handlePageChange = (page, value) => {
  //   this.setState({ page: page, rowsPerPage: value });
  // }

  // setRowsPerPage = (value) => {
  //     this.setState({ rowsPerPage: value });
  // }

  // setPage = (newPage) => {
  //     this.setState({ page: newPage });
  // }

  // handleChangePage = (event, newPage) => {
  //     this.setPage(newPage);
  // };

  // handleChangeRowsPerPage = (event) => {
  //     this.setRowsPerPage(parseInt(event.target.value, 10));
  //     this.setPage(0);
  // };

  createData = (id, code, name, group, email, phone, status, address, address2, description, taxCode, website) => {
    return { id, code, name, group, email, phone, status, address, address2, description, taxCode, website };
  }
  reorderTableHeader = (items) => {
    let header = items.filter((item) => {
      return item.show;
    });
    header = header.map(v =>
      v.header
    )
    return header;
  }

  render() {
    // const suppliers = [
    //   // { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 }
    //   this.createData('1', '001', 'Le Hai Quan', 'khac', 'lehaiquantb@gmail.com', '0973391143', 'false', 'Ha Noi', 'Thai Binh', 'Nha cung cap tiem nang tu truoc den nay do', '2362', 'https://www.facebook.com/aaaaaa'),
    //   // this.createData('Eclair', 262, 16.0, 24, 6.0, 0),
    //   // this.createData('Cupcake', 305, 3.7, 67, 4.3, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    //   // this.createData('Gingerbread', 356, 16.0, 49, 3.9, 0),
    // ];

    //console.log(suppliers);

    const { suppliers } = this.props;
    const { items } = this.props;
    const { classes, deleteAction } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="left">Mã nhà cung cấp</TableCell>
                    <TableCell align="left">Tên nhà cung cấp</TableCell>
                    <TableCell align="left">Địa chỉ</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Số điện thoại</TableCell>
                    <TableCell align="left">Trạng thái</TableCell> */}
                    {this.reorderTableHeader(items)}
                    <TableCell style={{ padding: '0px' }} align="left">Thao tác</TableCell>
                    {/* <TableCell>Thao Tác</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (suppliers != undefined && suppliers != null && suppliers.length > 0)
                      ?
                      this.showSupplierItem(suppliers, items, deleteAction)
                      :
                      <td colSpan="8" className="text-center ">
                        <div className="mt-2">Không có nhà cung cấp nào để hiển thị</div>
                      </td>
                  }
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(SupplierList);
