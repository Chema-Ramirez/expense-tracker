export const getCategoryIcon = (category) => {
    const icons = {
        'Comida': <RestaurantIcon />,
        'Alimentación': <RestaurantIcon />,
        'Compras': <ShoppingBagIcon />,
        'Transporte': <DirectionsCarIcon />,
        'Vivienda': <HomeIcon />,
        'Alquiler': <HomeIcon />,
        'Servicios': <FlashOnIcon />,
        'Luz': <FlashOnIcon />,
        'Agua': <FlashOnIcon />,
        'Salud': <FavoriteIcon />,
        'Ocio': <TheaterComedyIcon />,
        'Entretenimiento': <TheaterComedyIcon />,
    };

    return icons[category] || <HelpOutlineIcon />;
};