import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BusinessIcon from '@mui/icons-material/Business';

export const getCategoryConfig = (category = "") => {
    // Normalizamos: "Ocio " -> "ocio"
    const normalizedCategory = category.trim().toLowerCase();

    const configs = {
        'comida': { icon: <RestaurantIcon />, color: '#FF9800' },
        'alimentación': { icon: <RestaurantIcon />, color: '#FF9800' },
        'compras': { icon: <ShoppingBagIcon />, color: '#E91E63' },
        'transporte': { icon: <DirectionsCarIcon />, color: '#2196F3' },
        'vivienda': { icon: <HomeIcon />, color: '#795548' },
        'alquiler': { icon: <HomeIcon />, color: '#795548' },
        'servicios': { icon: <FlashOnIcon />, color: '#FFEB3B' },
        'luz': { icon: <FlashOnIcon />, color: '#FFEB3B' },
        'agua': { icon: <FlashOnIcon />, color: '#FFEB3B' },
        'salud': { icon: <FavoriteIcon />, color: '#F44336' },
        'ocio': { icon: <TheaterComedyIcon />, color: '#9C27B0' },
        'entretenimiento': { icon: <TheaterComedyIcon />, color: '#9C27B0' },
        'sueldo': { icon: <BusinessIcon />, color: '#2E7D32' },
        'ingreso': { icon: <BusinessIcon />, color: '#2E7D32' },
    };

    return configs[normalizedCategory] || { icon: <HelpOutlineIcon />, color: '#9E9E9E' };
};