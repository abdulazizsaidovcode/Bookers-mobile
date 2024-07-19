export interface MapStoreTypes {
    categoryId: string | null;
    setCategoryId: (id: string | null | ((prev: string | null) => string | null)) => void;
    }

export const mapCustomStyle = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#2B3343" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#746855" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#242f3e" }]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d59563" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d59563" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#263c3f" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#6b9a76" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#38414e" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#212a37" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9ca5b3" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#61729A" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#1f2835" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#f3d19c" }]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{ "color": "#2f3948" }]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d59563" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#17263c" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#515c6d" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#17263c" }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#FFFFFF" }]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#394562" }]
    }
];

