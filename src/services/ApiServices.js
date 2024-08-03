import axios from 'axios';

class ApiService {
    constructor() {
        this.apiUrl = 'https://book-management-apis.vercel.app/'; // Base URL for APIs
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Method to get the token from local storage
    getAuthToken() {
        return localStorage.getItem('auth-token'); // Replace 'auth-token' with your actual token key
    }

    // Method to set token in headers
    setAuthHeader() {
        const token = this.getAuthToken();
        if (token) {
            this.axiosInstance.defaults.headers.common['auth-token'] = `${token}`;
        } else {
            delete this.axiosInstance.defaults.headers.common['auth-token'];
        }
    }

    // Register a new user
    async register(userData) {
        try {
            const response = await this.axiosInstance.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error registering user');
        }
    }

    async login(credentials) {
        try {
            const response = await this.axiosInstance.post('/auth/login', credentials);
            localStorage.setItem('auth-token', response?.data?.data?.auth_token);
            this.setAuthHeader();
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.msg);
        }
    }


    async addBook(books) {
        this.setAuthHeader();

        try {
            const response = await this.axiosInstance.post('/books/', books);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.msg);
        }
    }
    async getBooks() {
        this.setAuthHeader();
        try {
            const response = await this.axiosInstance.get('/books');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.msg);
        }
    }

    async deleteBook(bookId) {
        this.setAuthHeader();
        try {
            const response = await this.axiosInstance.delete(`/books/${bookId}`);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.msg);
        }
    }

    async editBook(bookId, book) {
        this.setAuthHeader();
        try {
            const response = await this.axiosInstance.put(`/books/${bookId}`, book);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.msg);
        }
    }
}

export default new ApiService();
