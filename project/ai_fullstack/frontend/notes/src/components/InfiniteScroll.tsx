// load more 通用组件
import { 
    useRef,
    useEffect,
} from "react";

interface InfiniteScrollProps {
    hasMore: boolean; // 是否所有数据全部加载了 分页
    isLoading?: boolean; // 滚动到底部加载更多（当满足：1.滚动到底了 2.还有更多数据 3.当前已经将此页面的数据加载完全，才能触发加载下一个页面，避免重复触发）
    onLoadMore: () => void; //更多加载的一个抽象
    children: React.ReactNode // InfiniteScroll 通用的滚动功能，滚动的具体内容可以接受定制的
}   

const InfiniteScroll:React.FC<InfiniteScrollProps> = ({
    hasMore,
    onLoadMore,
    isLoading = false,
    children
}) => {
    // react 不建议直接访问DOM，使用useRef
    // TypeScript 的 DOM 库提供 HTMLDivElement 表示一个真实的div节点
    const sentinelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // 监听DOM，只有在组件挂载后才会有sentinelRef.current
        if (!hasMore || isLoading) return; // 没有数据 / 加载中
        // 浏览器内部 没有性能问题
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { // 进入视窗 viewport
                onLoadMore();
            }
        }, {
            threshold: 0, // 当元素一进入视窗时触发
        });
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        // 卸载（路由切换）
        // 更新时 
        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        }
    }, [onLoadMore, hasMore, isLoading])
    return (
        <>
            {children}
            {/* Intersection Observer 哨兵元素 用于监听滚动到底部的事件 */}
            <div ref={sentinelRef} className="h-4" />
            {
                isLoading && (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                        加载中...
                    </div>
                )
            }
        </>
    )
}

export default InfiniteScroll