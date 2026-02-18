import { Dialog, DialogContent, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalWrapper = ({ open, onClose, title, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    borderRadius: 5,
                    position: 'fixed',
                    bottom: { xs: 10, sm: 'auto' },
                    m: 2
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} pb={0}>
                <Typography variant="h6" fontWeight={800}>{title}</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 2, mt: 1 }}>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default ModalWrapper;