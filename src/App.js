import React, { useState } from "react";
import Column from "./column";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";
import styled from 'styled-components'
const Container = styled.div`
display:flex
` ;
const App = () => {
  const [data, setData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState();
  let tasks;
  let column;
  const onDragStart = start =>{
    const theIndex = data.columnOrder.indexOf(start.source.droppableId)
    setHomeIndex(theIndex)
  }
  // const onDragStart = () =>{
  //   document.body.style.color ='orange'
  //    document.body.style.transition ='background-color 0.5s ease'
  // }
  //  const onDragUpdate = (update) => {
  //   const {destination} = update;
  //   const opacity = destination
  //   ? destination.index / Object.keys(data.tasks).length
  //   : 0; 
  //   document.body.style.backgroundColor =`rgba(46,49,49,${opacity})`
  // }

  const onDragEnd = (result) => {
   setHomeIndex(null)
    //  document.body.style.color ='inherit'
    //  document.body.style.backgroundColor ='inherit'
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    if(start===finish){

  
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index,0,draggableId);
    const newColumn = {
      ...start,
      taskIds:newTaskIds
    }
    const newData = {
      ...data,
      columns:{
        ...data.columns,
        [newColumn.id]:newColumn,
      }
    }
    setData(newData)
    return;
    //call for the end point in this point to save the new order ! :D 
  }  

//Moving from one list to another
const startTaskIds = Array.from(start.taskIds);
startTaskIds.splice(source.index,1);
const newStart = {
  ...start,
  taskIds:startTaskIds,
}
const finishTaskIds = Array.from(finish.taskIds);
finishTaskIds.splice(destination.index,0,draggableId);
const newFinish = {
  ...finish,
  taskIds:finishTaskIds
}

const newData={
  ...data,
  columns:{
    ...data.columns,
    [newStart.id]:newStart,
    [newFinish.id]:newFinish,
  }
}
setData(newData)




} ;


  return (
    <DragDropContext onDragEnd={onDragEnd} 
    onDragStart={onDragStart}  
    // onDragUpdate={onDragUpdate} 
    >
    <Container>
      {data.columnOrder.map((columnId,index) => {
        column = data.columns[columnId];
        tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        const isDropDisabled = index < homeIndex
        console.log(isDropDisabled,index,homeIndex)
        return <Column umn key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;
      })}
      </Container>
    </DragDropContext>
  );
};
export default App;
