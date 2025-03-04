
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Paper, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskForm from './TaskForm';
import { getTasksFromStorage, saveTasksToStorage } from '../../utils/TaskUtils';
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';

const TaskBoard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(getTasksFromStorage);
  const [editTask, setEditTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-blue-500' },
    { id: 'inProgress', title: 'In Progress', color: 'border-yellow-500' },
    { id: 'completed', title: 'Done', color: 'border-green-500' }
  ];

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);
  ;

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = Array.from(tasks[source.droppableId]);
    const destList = Array.from(tasks[destination.droppableId]);

    const [movedItem] = sourceList.splice(source.index, 1);
    movedItem.status = destination.droppableId;

    destList.splice(destination.index, 0, movedItem);

    const updatedTasks = {
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    };

    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const handleAddTask = (newTask) => {
    const { status } = newTask;
    const updatedTasks = {
      ...tasks,
      [status]: [...tasks[status], { ...newTask, id: Date.now().toString() }]
    };
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (updatedTask) => {
    const oldStatus = editTask?.status;
    const newStatus = updatedTask.status;

    const updatedTasks = { ...tasks };

    if (oldStatus === newStatus) {
      updatedTasks[newStatus] = updatedTasks[newStatus].map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
    } else {
      updatedTasks[oldStatus] = updatedTasks[oldStatus].filter(task => task.id !== updatedTask.id);
      updatedTasks[newStatus] = [...updatedTasks[newStatus], updatedTask];
    }

    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    setEditTask(null);
    setIsFormOpen(false);
  };

  const openEditForm = (task) => {
    setEditTask(task);
    setIsFormOpen(true);
  };

  const confirmDeleteTask = () => {
    if (deleteTarget) {
      const { listId, id } = deleteTarget;
      const updatedTasks = {
        ...tasks,
        [listId]: tasks[listId].filter(task => task.id !== id)
      };
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl w-full m-auto bg-gradient-to-br from-blue-50 to-blue-100 py-8">
     <UserMenu />
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-bold text-gray-800">Task Manager</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsFormOpen(true)}
            sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '8px' }}
          >
            Add Task
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(({ id, title, color }) => (
              <Droppable key={id} droppableId={id}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-lg bg-white p-4 shadow-xl min-h-[400px] flex flex-col gap-3"
                  >
                    <Typography
                      variant="h6"
                      className={`font-semibold text-gray-700 border-b-4 pb-1 ${color}`}
                    >
                      {title}
                    </Typography>
                    {tasks[id].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-center hover:shadow-lg transition cursor-grab"
                          >
                            <div className="flex-1">
                              <Typography className="font-semibold text-gray-800">{task.name}</Typography>
                              <Typography variant="body2" className="text-gray-500">{task.description}</Typography>
                            </div>
                            <div className="flex gap-2">
                              <IconButton size="small" onClick={() => openEditForm(task)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={() => setDeleteTarget({ id: task.id, listId: id, name: task.name })}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>

                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        <TaskForm
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditTask(null);
          }}
          onSubmit={editTask ? handleUpdateTask : handleAddTask}
          task={editTask}
        />

        <ConfirmationDialog
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDeleteTask}
          taskName={deleteTarget?.name}
        />

      </div>
    </div>
  );
};

export default TaskBoard;