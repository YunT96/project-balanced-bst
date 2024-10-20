import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = null;
  }

  // Recursive function to construct BST
  sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null;

    // Find the middle element
    const mid = start + Math.floor((end - start) / 2);

    // Create root node
    const root = new Node(arr[mid]);

    // Create left subtree
    root.left = this.sortedArrayToBSTRecur(arr, start, mid - 1);

    // Create right subtree
    root.right = this.sortedArrayToBSTRecur(arr, mid + 1, end);

    return root;
  }

  sortedArrayToBST() {
    return this.sortedArrayToBSTRecur(this.arr, 0, this.arr.length - 1);
  }

  preOrder(root) {
    if (root === null) return;
    console.log(root.data);
    this.preOrder(root.left);
    this.preOrder(root.right);
  }

  inOrder(root) {
    if (root === null) return;
    this.inOrder(root.left);
    console.log(root.data);
    this.inOrder(root.right);
  }

  postOrder(root) {
    if (root === null) return;
    this.postOrder(root.left);
    this.postOrder(root.right);
    console.log(root.data);
  }

  insert(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this.insert(root.left, value);
    } else if (value > root.data) {
      root.right = this.insert(root.right, value);
    }

    return root;
  }

  getSuccessor(current) {
    let successor = current.right;
    while (successor !== null && successor.left !== null) {
      successor = successor.left;
    }
    return successor;
  }

  delete(root, value) {
    // Base case
    if (root === null) {
      return root;
    }

    // If data to be searched is in a subtree
    if (root.data > value) {
      root.left = this.delete(root.left, value);
    } else if (root.data < value) {
      root.right = this.delete(root.right, value);
    } else {
      // If root matches with the given data

      // Cases when root has 0 children or
      // only right child
      if (root.left === null) return root.right;

      // When root has only left child
      if (root.right === null) return root.left;

      // When both children are present
      const successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.delete(root.right, successor.data);
    }
    return root;
  }

  find(root, value) {
    if (root === null) return false;
    if (root.data === value) return true;
    if (value < root.data) return this.find(root.left, value);
    return this.find(root.right, value);
  }
}
