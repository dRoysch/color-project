import sizes from './sizes';
import chroma from 'chroma-js';
const styles = {
    root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    '&:hover svg': {
        color: 'white',
        transform: 'scale(1.3)'
    },
    [sizes.down('lg')]: {
        width: '25%',
        heigth: '20%'
    },
    [sizes.down('md')]: {
        width: '50%',
        heigth: '10%'
    },
    [sizes.down('xs')]: {
        width: '100%',
        heigth: '5%'
    }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        color: props => chroma(props.color).luminance() <= 0.08 ? 'rgba(255, 255, 255, 0.8)': 'rgba(0, 0, 0, 0.7)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '1.2rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
} 

export default styles;