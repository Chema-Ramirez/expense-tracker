import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BusinessIcon from '@mui/icons-material/Business';
import FlightIcon from '@mui/icons-material/Flight';


export const CATEGORIES = [
    { id: 'ahorro', label: 'Ahorro', icon: <BusinessIcon />, color: '#00f700' },
    { id: 'electrónica', label: 'Electrónica', icon: <FlashOnIcon />, color: '#00D1FF' },
    { id: 'comida', label: 'Alimentación', icon: <RestaurantIcon />, color: '#FF9800' },
    { id: 'compras', label: 'Compras', icon: <ShoppingBagIcon />, color: '#815183' },
    { id: 'transporte', label: 'Transporte', icon: <DirectionsCarIcon />, color: '#0e4470' },
    { id: 'vivienda', label: 'Vivienda', icon: <HomeIcon />, color: '#795548' },
    { id: 'servicios', label: 'Servicios', icon: <FlashOnIcon />, color: '#1411c4' },
    { id: 'salud', label: 'Salud', icon: <FavoriteIcon />, color: '#ff1100' },
    { id: 'ocio', label: 'Ocio', icon: <TheaterComedyIcon />, color: '#5f186b' },
    { id: 'viajes', label: 'Viajes', icon: <FlightIcon />, color: '#f700c1' },
];

export const getCategoryConfig = (category = "") => {
    const normalizedCategory = category.trim().toLowerCase();

    const config = CATEGORIES.find(c => c.id === normalizedCategory);
    if (config) return config;

    const aliases = {
        'alimentación': { icon: <RestaurantIcon />, color: '#FF9800' },
        'alquiler': { icon: <HomeIcon />, color: '#795548' },
        'luz': { icon: <FlashOnIcon />, color: '#FFEB3B' },
        'agua': { icon: <FlashOnIcon />, color: '#FFEB3B' },
        'entretenimiento': { icon: <TheaterComedyIcon />, color: '#9C27B0' },
        'sueldo': { icon: <BusinessIcon />, color: '#2E7D32' },
    };

    return aliases[normalizedCategory] || { icon: <HelpOutlineIcon />, color: '#9E9E9E' };
};