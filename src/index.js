import "./styles.css";
import Tree from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tree = new Tree(arr);

// Convert the array to a binary search tree
tree.root = tree.sortedArrayToBST(); // Assign the root of the BST to tree.root

// Print the pretty-printed balanced search tree
prettyPrint(tree.root);

// Print the pre-order traversal of the tree
console.log("Pre-order traversal:");
tree.preOrder(tree.root);

// Insert a new key into the tree
tree.root = tree.insert(tree.root, 10); // Insert key 10 into the tree

// Print the pretty-printed balanced search tree after insertion
console.log("After inserting 10:");
prettyPrint(tree.root);
