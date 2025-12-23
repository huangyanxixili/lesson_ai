/*
 * 使用 dummy 哨兵节点 + 头插法
 */ 
function reverseList(head) {
    // dummy 的next 将始终指向当前已反转部分的头节点
    const dummy = new ListNode(0);

    let cur = head;// 当前要处理的节点
    while(cur) {
        // 头插法 核心三步
        // cur: 1 -> 2 -> 3 -> null
        // dummy: dummy -> null
        const next = cur.next;// 1. 保存下一节点（防止断链）
        cur.next = dummy.next;// 2. 将当前节点的next 指向已反转的头部（1.next -> null）
        dummy.next = cur;     // 3. 将 dummy.next 指向当前节点（dummy -> 1）
        // cur: 2 -> 3 -> null
        // dummy: dummy -> 1 -> null

        cur = next;
    }
    // 反转后的新头节点
    return dummy.next;
}