// load more 通用组件
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
    return (
        <>
        </>
    )
}

export default InfiniteScroll