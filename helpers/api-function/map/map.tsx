import axios from "axios";

const GOOGLE_MAPS_API_KEY = "0ahUKEwiA1vuAqbOHAxUHExAIHRwOKdMQlqMCCAIoAA"

export const fetchMetroStations = async (latitude: number, longitude: number, setMetroStations: (val: any) => void) => {
    try {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=subway_station&key=${GOOGLE_MAPS_API_KEY}`);
        setMetroStations(data.results);
    } catch (error) {
        console.error("Error fetching metro stations:", error);
        return ['dwqdq'];
    }
};