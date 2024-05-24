import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: { hl: "en", gl: "US" },
    headers: {
        "X-RapidAPI-Key":
        '0d94ba254bmsh068191b8c3ffb02p113c81jsn35fa5ed1c141',
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};
