const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
    background: '#f4f6f8',
    height: 890,
  },
  content: {
    padding: 0,
    marginTop: theme.spacing(2),
  },
  row: {
    // height: '42px',
    display: 'block',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  search: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
  button: {
    background: 'linear-gradient(180deg,#08f,#4697fe)',
    color: 'white',
    float: 'right',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  haha: {
    '&>div.popover': {
      maxWidth: 500,
      transform: 'translate3d(224px, 185px, 0px)!important',
      marginTop: 18,
    },
    '&&>div span.arrow': {
      left: '70px !important',
    },
  },
  button2: {
    '&:focus': {
      outline: 0,
    },
    '&:active': {},
    padding: 0,
    color: '#495057',
    background: 'linear-gradient(180deg,#e9ecef,#e9ecef)',
  },
  cell: {
    borderBottom: 'none',
    marginLeft: '-16px',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    // padding: 0,
  },
  cell1: {
    borderBottom: 'none',
    marginLeft: '-16px',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
    fontSize: '12px',
    fontWeight: '400',
    // padding: 0,
  },
});
export default styles;
{
  // /* <div>
  //           <UncontrolledPopover
  //             className={classes.haha}
  //             placement="bottom"
  //             target="PopoverLegacy"
  //             trigger="legacy"
  //           >
  //             <PopoverHeader
  //               style={{
  //                 fontFamily:
  //                   '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
  //                 fontSize: '14px',
  //                 fontWeight: '400',
  //               }}
  //             >
  //               Lọc đơn hàng theo
  //             </PopoverHeader>
  //             <PopoverBody>
  //               Sed posuere consectetur est at lobortis. Aenean eu leo quam.
  //               Pellentesque ornare sem lacinia quam venenatis vestibulum.
  //             </PopoverBody>
  //           </UncontrolledPopover>
  //         </div> */
}
{
  /* <InputGroup style={{ marginLeft: '-17px' }}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <SearchIcon
                          className={classes.icon}
                          onClick={this.Search}
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Nhập mã đơn hàng"
                      style={{
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        height: 40,
                      }}
                      onChange={this.onChange}
                      name="search"
                    />
                  </InputGroup> */
}
{
  /* <InputGroupText style={{ marginLeft: '-17px' }}> */
}
{
  /* <Button
                    id="PopoverLegacy"
                    type="button"
                    className={classes.button2}
                    outline
                  >
                    <span
                      style={{
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        textTransform: 'none',
                      }}
                    >
                      Tìm kiếm nâng cao
                    </span>
                    <span>
                      <i
                        className="fas fa-filter"
                        style={{
                          fill: '#637381',
                          width: '20px',
                          height: '20px',
                          position: 'relative',
                          top: '2px',
                          left: '1px',
                          color: '#637381',
                        }}
                      />
                    </span>
                  </Button> */
}
