import axios from "./config";

export const ask = async (question: string) => {
    // sdd
    const res = await axios.post('/rag/ask', { question });
    // console.log(res);
    return res.answer;
}