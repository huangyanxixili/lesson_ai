// 扁平列表
// parentId 树状结构
// 树根 parentId 为 0
// 树结构 -> 递归实现
const list = [
    { id: 1, name: 'A', parentId: 0 },
    { id: 2, name: 'B', parentId: 1 },
    { id: 3, name: 'C', parentId: 1 },
    { id: 4, name: 'D', parentId: 2 },
]

function list2tree(list, parentId = 0) {
    
}