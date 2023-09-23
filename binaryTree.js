class Node {
  constructor(data) {
    this.data = data;
    this.left = this.right = null;
  }
}

class Tree {
  constructor(array) {
  /**
   * Sort the array by removing duplicates and in ascending order.
   * The Set operator is used to make sure only unique values are present.
   * The spread operator (...) is used to convert the Set back into an Array,
   * to allow sorting of the values.
   */
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray) {
    // Base case
    if (sortedArray.length === 0) return null;

    const midPoint = Math.floor(sortedArray.length / 2);
    const newNode = new Node(sortedArray[midPoint]);

    // Recursive Case
    newNode.left = this.buildTree(sortedArray.slice(0, midPoint));
    newNode.right = this.buildTree(sortedArray.slice(midPoint + 1));

    return newNode;
  }

  insert(data, currentNode = this.root) {
    // If node is empty, create a new node with data as value
    if (currentNode === null) {
      return new Node(data);
    }
    // Recursive case
    if (data < currentNode.data) {
      currentNode.left = this.insert(data, currentNode.left);
    } else if (data > currentNode.data) {
      currentNode.right = this.insert(data, currentNode.right);
    }
    return currentNode;
  }

  delete(data, currentNode = this.root, previousNode = null) {
    // Base case: If node is empty, return null
    if (currentNode === null) return this.root;

    // Recursive case: passing data, current node and previous node
    if (data < currentNode.data) {
      currentNode.left = this.delete(data, currentNode.left, currentNode)
      return currentNode;
    } else if (data > currentNode.data) {
      currentNode.right = this.delete(data, currentNode.right, currentNode);
      return currentNode;
    } else if (data === currentNode.data) {
      return this.#deleteHelper(currentNode, previousNode);
    }
  }

  //Node deletion helper. Has 3 cases to help delete() work.
  #deleteHelper(currentNode, previousNode) {
    // CASE 1: Delete a leaf node
    if (currentNode.left === null && currentNode.right === null) {
      return currentNode = null;
    }

    // CASE 2: Delete a node with 2 childs
    if (currentNode.left && currentNode.right) {
     return this.#successor(currentNode);
    }

    // CASE 3: Delete a node with a single child
    if (currentNode.left || currentNode.right) {

    }
  }

  /**
   * In the case where the current node has 2 children (#deleteHelper CASE 3),
   * this functions finds the minimum value in the right subtree of the current node.
   */
  #successor(currentNode) {

    let rightSubtree = currentNode.right;
    let previousNode = rightSubtree;

    // Use inorder traversal to find minimum value in the right subtree of the current node.
    while (rightSubtree.left !== null) {
      previousNode = rightSubtree;
      rightSubtree = rightSubtree.left;
    }

    // Set the 'deleted' node data to the successor data. Then, delete the successor node.
    if (previousNode === rightSubtree && rightSubtree.left === null) {
      currentNode.data = rightSubtree.data;
      currentNode.right = null;
      console.log(currentNode);
      console.log(rightSubtree);
      console.log(previousNode);
    }

    if (previousNode !== rightSubtree) {
      currentNode.data = rightSubtree.data;
      previousNode.left = null;
    }
    return currentNode;
  }

    /**
   * Console logs out the Binary Tree in a structured format to make it easier to visualize.
   * No idea how this code works. Will try to understand in the future.
   */
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
}

//const arrayData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arrayData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const tree = new Tree(arrayData);

// Tests
//tree.insert(3);
tree.delete(9);
tree.prettyPrint();
console.log(tree);
