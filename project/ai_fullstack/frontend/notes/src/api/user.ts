import axios from './config';
import type { Credentail } from '@/types/index';

export const doLogin = (data: Credentail) => {
    return axios.post('/auth/login', data);
}

export const getAiAvatar = (name: string) => {
    return axios.get(`/ai/avatar?name=${name}`)
}