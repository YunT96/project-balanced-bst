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

  levelOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    const queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  inOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    const queue = [];
    let current = this.root;
    while (current !== null || queue.length > 0) {
      while (current !== null) {
        queue.push(current);
        current = current.left;
      }
      current = queue.pop();
      callback(current);
      current = current.right;
    }
  }

  preOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    const queue = [];
    let current = this.root;
    while (current !== null || queue.length > 0) {
      while (current !== null) {
        callback(current);
        queue.push(current);
        current = current.left;
      }
      current = queue.pop();
      current = current.right;
    }
  }

  postOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    const queue = [];
    let current = this.root;
    while (current !== null || queue.length > 0) {
      while (current !== null) {
        queue.push(current);
        current = current.left;
      }
      current = queue.pop();
      callback(current);
      current = current.right;
    }
  }

  height(root) {
    if (root === null) return -1;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  depth(root, value) {
    if (root === null) return -1;
    if (root.data === value) return 0;
    if (value < root.data) return this.depth(root.left, value) + 1;
    return this.depth(root.right, value) + 1;
  }

  isBalanced(root) {
    // Helper function to check balance and height in one go
    const checkBalance = (node) => {
      if (node === null) return { height: 0, balanced: true };

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      const balanced =
        left.balanced &&
        right.balanced &&
        Math.abs(left.height - right.height) <= 1;
      const height = Math.max(left.height, right.height) + 1;

      return { height, balanced };
    };

    return checkBalance(root).balanced;
  }

  rebalance() {
    const inOrderArray = [];
    this.inOrder((node) => inOrderArray.push(node.data));
    this.root = this.sortedArrayToBST(inOrderArray);
  }
}
