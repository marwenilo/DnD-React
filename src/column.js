import React from 'react';
import styled from 'styled-components';
import Task from './task' 
import {Droppable} from 'react-beautiful-dnd'
const Container = styled.div`
margin:8px;
border: 1px solid lightgrey;
border-raduis:2px
` 
const Title = styled.h3`
padding:8px
`
const TaskList = styled.div`
padding:8px;
transition:background-color 0.5s ease;
background-color:${props=>(props.isDraggingOver ? 'skyblue':'white')}
`
const Columns=(
    {column,
    tasks}
)=> {
    return (
        
            <Container>
                <Title>
                        {column.title}
                </Title>
                <Droppable 
                       droppableId={column.id}       >
                         {(provided,snapshot)=> (
                     <TaskList
                        ref={provided.innerRef}
                    {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         isDraggingOver={snapshot.isDraggingOver} // to change the dragged task backgroun color on the drag w/ snapshot
                     >
                 {tasks.map((task,index)=><Task key={task.id} task={task} index={index} />)}
                 {  provided.placeholder  }
                </TaskList>
                )  }
              
                </Droppable>
            </Container>
       
    )
}
export default Columns