import { 
    useState,
    createContext,
    useEffect
} from "react";

export const ThemeContext = createContext(null); // 空对象（容器）

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme((t) => t === 'light' ? 'dark' : 'light')
    }
    useEffect(() => {
        // 监听 theme 的变化
        // document.documentElement => html 
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])


    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme
        }}>
        {children}
        </ThemeContext.Provider>
    )
}
