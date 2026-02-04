import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Stack, Typography, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
    return (
        <ListItem
            sx={{
                mb: 1,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "flex-start",
                justifyContent: "space-between",
                p: 2,
            }}
        >
            <Stack spacing={0.5}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {expense.description || expense.category}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {new Date(expense.date).toLocaleDateString()}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mt={{ xs: 1, sm: 0 }}
            >
                <Chip label={`${expense.amount} €`} color="primary" size="small" />

                <IconButton
                    color="info"
                    onClick={() => onEdit(expense)}
                    size="small"
                >
                    <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                    color="error"
                    onClick={() => onDelete(expense._id)}
                    size="small"
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Stack>
        </ListItem>
    );
};

export default ExpenseItem;
