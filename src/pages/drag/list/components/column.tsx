import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Task from './task';

import type { TaskItem, ColumnItem } from './todoData';

interface Props {
  column: ColumnItem;
  tasks: any;
}

const Column = memo(function Column({ column, tasks }: Props) {
  return (
    <div className="container">
      <div className="title">{column.title}</div>
      <Droppable droppableId={column.id} type="TASK">
        {(provided: any, snapshot: any) => (
          <div
            className="taskList"
            ref={provided.innerRef}
            {...provided.droppableProps}
            // eslint-disable-next-line react/no-unknown-property
            isdraggingover={snapshot.isDraggingOver.toString()}
          >
            {tasks.map((task: TaskItem, index: number) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});

export default Column;
