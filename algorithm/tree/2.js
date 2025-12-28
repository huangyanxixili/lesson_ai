const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D'
    },
    right: {
      val: 'E'
    }
  },
  right: {
    val: 'C',
    right: {
      val: 'F'
    }
  }
}

// 递归公式 
// 树形结构画出来，找到重复的地方 相似的子问题
// 递归的退出条件

function perorder(root) {
    if(!root) {
        return 
    }
    console.log(root.val);
    perorder(root.left);
    perorder(root.right);
}

perorder(root);