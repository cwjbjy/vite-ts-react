import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Card } from 'antd';

import Column from './components/column';
import initialData from './components/todoData';
import './index.scss';

const ReactBeautifulTodo = () => {
  const [state, setState] = useState<any>(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <section>
      <Card hoverable title={<strong>可通过拖拽进行分组与排序;暂不支持IE</strong>}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="content">
            {state.columnOrder.map((columnId: string) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId: string) => state.tasks[taskId]);

              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </div>
        </DragDropContext>
      </Card>
    </section>
  );
};

export default ReactBeautifulTodo;
