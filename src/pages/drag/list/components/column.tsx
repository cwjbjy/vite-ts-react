import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import styled from 'styled-components';

import Task from './task';

import type { TaskItem, ColumnItem } from './todoData';

interface Props {
  column: ColumnItem;
  tasks: any;
}

export default memo(function Column({ column, tasks }: Props) {
  return (
    <Continer>
      <div className="title">{column.title}</div>
      <Droppable droppableId={column.id} type="TASK">
        {(provided: any, snapshot: any) => (
          <div
            className="taskList"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
          >
            {tasks.map((task: TaskItem, index: number) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Continer>
  );
});

const Continer = styled.div`
  margin: 8px;
  background-color: var(--drag-background);
  border: 1px solid var(--card-border);
  border-radius: 2px;
  width: 33%;
  display: flex;
  flex-direction: column;
  .title {
    padding: 8px;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 600;
  }

  .taskList {
    padding: 8px;
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 500px;
  }

  .container_task {
    border: 1px solid;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    transition: background-color 0.2s ease;
    background: var(--card-background);
    &:hover {
      border: 1px solid var(--card-border-highlight);
    }
  }
`;
