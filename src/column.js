import React from 'react';
import styled from 'styled-components';
import Task from './task' 
import {Droppable} from 'react-beautiful-dnd'
const Container = styled.div`
margin:8px;
border: 1px solid lightgrey;
border-raduis:2px;
width:220px;

display:flex;
flex-direction:column;

` 
const Title = styled.h3`
padding:8px
`
const TaskList = styled.div`
padding:8px;
transition:background-color 0.5s ease;
background-color:${props=>(props.isDraggingOver ? 'skyblue':'white')};
flex-grow:1;
min-height:100px
`
const Columns=(
    {column,
    tasks,
    isDropDisabled}
)=> {
    return (
        
            <Container>
                <Title>
                        {column.title}
                </Title>
                <Droppable 
                       droppableId={column.id}  
                       isDropDisabled={isDropDisabled}  
                    //    type={column.id === "column-3" ? 'done' : 'active'} // cannot move to the type of done 'last column'
                        >
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