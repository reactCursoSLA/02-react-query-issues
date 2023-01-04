import axios from 'axios';


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
});