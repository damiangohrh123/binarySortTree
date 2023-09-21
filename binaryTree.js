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
      console.log(currentNode);
    } else if (data > currentNode.data) {
      currentNode.right = this.insert(data, currentNode.right);
      console.log(currentNode);
    }
    return currentNode;
  }

  delete(data, currentNode = this.root) {
    // If node is empty, return
    if (currentNode === null) return;

    if (data < currentNode.data) {
      console.log(currentNode);
      currentNode.left = this.delete(data, currentNode.left)
    } else if (data > currentNode.data) {
      console.log(currentNode);
      currentNode.right = this.delete(data, currentNode.right);
    } else if (data === currentNode.data) {
      this.#deleteHelper();
    }
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

  //Node deletion helper. Has 3 cases to help delete() work.
  #deleteHelper() {
    
  }
}

const arrayData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arrayData);

// Tests
//tree.insert(10);
tree.prettyPrint();
tree.delete(9);