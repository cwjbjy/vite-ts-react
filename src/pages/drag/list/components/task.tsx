import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import type { TaskItem } from './todoData';

interface Props {
  task: TaskItem;
  index: number;
}

const Task = memo(function Task({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          className="container_task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // eslint-disable-next-line react/no-unknown-property
          isdragging={snapshot.isDragging.toString()}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
});

export default Task;
