import { Dialog, DialogContent, IconButton, Typography, Box, useTheme, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalWrapper = ({ open, onClose, title, children }) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            TransitionComponent={Fade}
            transitionDuration={400}
            PaperProps={{
                sx: {
                    borderRadius: 5,
                    m: 2,
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    backgroundImage: 'none',
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" px={3} pt={2.5} pb={1}>
                <Typography variant="subtitle1" fontWeight={900}
                    sx={{
                        letterSpacing: '-0.02em',
                        background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {title}
                </Typography>
                <IconButton onClick={onClose} size="small" sx={{ '&:hover': { bgcolor: 'error.main', color: 'white' } }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 3, pt: 0 }}>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default ModalWrapper;