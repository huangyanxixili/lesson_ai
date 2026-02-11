import {
    useEffect,
} from 'react'
import {
    createPosts,
} from '@/api/posts'

export default function Chat() {
    useEffect(() => {
        (async () => {
            await createPosts()
        })()
    }, [])
    return (
        <>
            ChatBot
        </>
    )  
}