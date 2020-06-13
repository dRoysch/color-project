const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        '& form': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }
    },
    picker: {
        width: '95% !important',
        marginTop: '2rem'
    },
    addColor: {
        width: '95%',
        padding: '1rem',
        marginTop: '0.5rem',
        fontSize: '2rem'
    },
    inputText: {
        width: '95%',
        marginTop: '0.5rem',
        height: '75px',
    },
    resize : {
        fontSize: '1.5rem',
        textAlign: 'center'
    }
}

export default styles;