import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PiggyGoalForm from "./PiggyGoalForm";

const GoalFormModal = ({ open, onClose, onSubmit, initialData }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: { borderRadius: 5, p: 1 }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={900}>
                    {initialData ? "Editar Meta" : "Nueva Meta de Ahorro"}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ borderBottom: 'none' }}>
                <PiggyGoalForm
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    initialData={initialData}
                />
            </DialogContent>
        </Dialog>
    );
};

export default GoalFormModal;