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

const arr = [
  1, 3, 5, 6, 7, 31, 42, 45, 56, 64, 65, 69, 73, 77, 82, 83, 96, 98, 99, 100,
];
const tree = new Tree(arr);

// Convert the array to a binary search tree
tree.root = tree.sortedArrayToBST(); // Assign the root of the BST to tree.root

// Print the pretty-printed balanced search tree
console.log("Initial tree:");
prettyPrint(tree.root);

// Print the balanced search tree after insertion
tree.root = tree.insert(tree.root, 94);
tree.root = tree.insert(tree.root, 95);
console.log("After inserting 94 and 95:");
prettyPrint(tree.root);

// Print the balanced search tree after deletion
tree.root = tree.delete(tree.root, 5);
console.log("After deleting 5:");
prettyPrint(tree.root);

// Find a value in the tree
console.log("Is 5 in the tree?", tree.find(tree.root, 5));
console.log("Is 6 in the tree?", tree.find(tree.root, 10));

// Print the in-order traversal of the tree
console.log("In-order traversal:");
tree.inOrder((node) => console.log(node.data));

// Get the height of the tree
console.log("Height of the tree:", tree.height(tree.root));

// Get the depth of the tree
console.log("Depth of the tree:", tree.depth(tree.root));

// Is tree balanced?
console.log("Is the tree balanced?", tree.isBalanced(tree.root));

// Rebalance the tree and see if its balanced
tree.rebalance();
console.log(
  "Is the tree balanced after rebalancing?",
  tree.isBalanced(tree.root),
);

// Print the pretty-printed balanced search tree
console.log("After rebalancing:");
prettyPrint(tree.root);
