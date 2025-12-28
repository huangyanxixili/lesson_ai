function inorder(root) {
    if(!root) {
        return 
    }

    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
}

function postorder(root) {
    if(!root){
        return 
    }

    postorder(root.left)
    postorder(root.right)
    console.log(root)
}