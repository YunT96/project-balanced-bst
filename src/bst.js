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
      // Use 'root.data' instead of 'root.key'
      root.left = this.insert(root.left, value);
    } else if (value > root.data) {
      root.right = this.insert(root.right, value);
    }

    return root;
  }
}
