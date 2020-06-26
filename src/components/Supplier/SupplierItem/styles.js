const styles = (theme) => ({
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 1050,
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    actions: {
        justifyContent: 'flex-end',
    },

    true: {
        color: '#0061b6',
    },
    false: {
        color: '#ff7f00',
    },
    inline: {
        padding: '0px'
    },
    cell: {
        fontFamily:
            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
        fontSize: '14px',
        fontWeight: '400',
    },
});
export default styles;
