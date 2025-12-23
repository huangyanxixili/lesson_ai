function remove(head, val) {
    // 通过虚拟节点 简化头节点的删除操作，让所有节点都视为下一个节点
    // 用空间换逻辑统一
    const dummy = new ListNode(0);
    dummy.next = head;

    let cur = dummy;
    while(cur.next) {
        if (cur.next.val === val) {
            cur.next = cur.next.next
            break;
        }
        cur = cur.next
    }
    // 返还当前真正的头节点（因为原先的头节点可能已经被删除）
    return dummy.next
}