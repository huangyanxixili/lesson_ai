import {
    create
} from 'zustand';
import {
    persist
} from 'zustand/middleware';

// 状态存储的规矩和修改的方式，专业管理状态
// 企业规模达到一定程度，就需要财务来管理（状态、修改状态的规矩）
// 重要的数据状态都需要类型约束
interface CoutreState {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}


export const useCounterStore = create<CoutreState>()(
    persist(
        (set) => ({
            // 列出状态
            count: 0,
            // 修改状态
            increment: () => set((state:any) => ({ count: state.count + 1 })),
            decrement: () => set((state:any) => ({ count: state.count - 1 })),
            reset: () => set({count: 0})
        }),
        {
            name: 'counter'
        }
    )
);
