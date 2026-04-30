import API from "../_api";

export const getAuthors = async () => {
    const { data } = await API.get('/authors')
    return data
};

export const createAuthor = async (data) => {
    try {
        const response = API.post('/authors', data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
