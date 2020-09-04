import React, { useState } from "react";
import Column from "./column";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";
const App = () => {
  const [data, setData] = useState(initialData);
  let tasks;
  let column;

  const onDragEnd = (result) => {
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

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index,0,draggableId);
    const newColumn = {
      ...column,
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
    //call for the end point in this point to save the new order ! :D 
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        column = data.columns[columnId];
        console.log(column, "c");
        tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        console.log(tasks, "e");
        return <Column umn key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};
export default App;
