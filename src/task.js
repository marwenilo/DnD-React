import React from 'react'
import styled from 'styled-components'
import { Draggable} from 'react-beautiful-dnd'
const Container = styled.div`
border: 1px solid lightgrey;
padding:8px;
border-raduis:2px;
margin-bottom:8px;
background-color:${props=>(props.isDragDisabled
 ? 'lightgrey'
 : props.isDragging 
    ? 'lightgreen'
    :'white')};
display:flex;
`
const Handle = styled.div`
width:20px;
height:20px;
background-color:orange;
border-raduis:4px;
margin-right:8px;
` 
 const Task = ({
    task,
    index
 }) => {
     console.log(task,'task')
     const isDragDisabled=task.id==='task-1'
    return (
       <Draggable
       draggableId={task.id} index={index}
       isDragDisabled={isDragDisabled}>
       {(provided,snapshot)=>(

            <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDragDisabled={isDragDisabled}
            isDragging={snapshot.isDragging} // to change the dragged task backgroun color on the drag w/ snapshot
            >
            <Handle
                {...provided.dragHandleProps}
            />
            {task.content}
            </Container>
            )}
        </Draggable>
       
    )
}

export default Task