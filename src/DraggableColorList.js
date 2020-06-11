import React from 'react';
import DraggableColorBox from './DraggableColorBox'
import {SortableContainer} from 'react-sortable-hoc';


const DraggableColorList = SortableContainer(({colors, removeColor}) => {
    return (
        <div style={{height: `calc(100% - 64px)`}}>
            {
            colors.map((color, i)=>(
                <DraggableColorBox 
                index={i}
                key={color.name}
                color={color.color} 
                name={color.name}
                handleClick={()=> removeColor(color.name)}
                />
                ))
            }
        </div>
    )
});
export default DraggableColorList;