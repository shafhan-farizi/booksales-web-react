import API from "../_api";

export const getGenres = async () => {
    const { data } = await API.get('/genres')
    return data
};

export const createGenre = async (data) => {
    try {
        const response = API.post('/genres', data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
