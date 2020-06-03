
export default {
    '@import': 
        ["url(https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap)"],
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh'
    },
    logo: {
        marginRight: '2%',
        padding: '0 1%',
        fontSize: '22px',
        backgroundColor: '#8bcaf3',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    '& a':{
        textDecoration: 'none',
        color: 'black',
        fontFamily: "'Indie Flower', cursive"
        }
    },
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        },
        '& .rc-slider-rail': {
            height: '8px'
        },
        '& .rc-slider-handle, .rc-slider-handle:focus, .rc-slider-handle:active, .rc-slider-handle:hover': {
            backgroundColor:'#0096fa',
            outline: 'none',
            border: '0.75px solid rgb(255, 136, 0)',
            boxShadow: 'inset 0 0 3px rgb(255, 136, 0)',
            width: '15px',
            height: '15px',
            marginTop: '-5px'
        }
    },
    selectContainer: {
            marginLeft: 'auto',
            marginRight: '2rem'
        }
    
}