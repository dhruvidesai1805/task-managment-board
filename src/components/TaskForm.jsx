import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Box
} from '@mui/material';

const TaskForm = ({ open, onClose, onSubmit, task }) => {
    const [formData, setFormData] = useState({ name: '', description: '', status: 'todo', dueDate: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData({ name: '', description: '', status: 'todo', dueDate: '' });
        }
        setErrors({});
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Task Name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit({ ...formData, id: task?.id || Date.now().toString() });
            setFormData({ name: '', description: '', status: 'todo', dueDate: '' })
        }
    };

    useEffect(() => {
        if (!task) {
            setFormData({ name: '', description: '', status: 'todo', dueDate: '' })
        }
    }, [open])
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogContent className="space-y-4 pt-2">
                <Box className="my-3">
                    <TextField
                        name="name"
                        label="Task Name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}

                    />
                </Box>

                <Box className="my-3">
                    <TextField
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Box>

                <Box className="my-3">
                    <TextField
                        select
                        name="status"
                        label="Status"
                        fullWidth
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="inProgress">In Progress</MenuItem>
                        <MenuItem value="completed">Done</MenuItem>
                    </TextField>
                </Box>

                <Box className="my-3">
                    <TextField
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.dueDate}
                        onChange={handleChange}
                        error={!!errors.dueDate}
                        helperText={errors.dueDate}
                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                    />
                </Box>

            </DialogContent>

            <DialogActions className="pr-4 pb-4">
                <Button onClick={onClose} className='!capitalize'>Cancel</Button>
                <Button variant="contained" className='!capitalize' onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;