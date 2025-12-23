// 链表
function remove(head, val) {
    // 要删除的节点是头节点，对头节点特殊处理
    // 头节点没有前驱节点，尾节点没有后继节点
    // 给一个前驱节点，方便删除头节点（哨兵节点 dummy节点）
    if (head && head.val == val) {
        return head.next
    }

    let cur = head
    while(cur.next) { // 遍历链表，找到要删除的节点
        if (cur.next.val === val) {
            cur.next = cur.next.next
            break;
        }
        cur = cur.next
    }
    return head
}