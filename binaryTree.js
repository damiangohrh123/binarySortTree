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

  delete(data, currentNode = this.root) {
    // If node is empty, return null
    if (currentNode === null) {
      console.log('Tree is empty.');
      return null;
    }

    //If data cannot be found, return null
    if (!currentNode.left && !currentNode.right && data !== currentNode.data) {
      console.log('Data could not be found.')
      return null;
    }

    // Base case
    if (data === currentNode.data) {
      return this.#deleteHelper(currentNode);
    }

    // Recursive case
    if (data < currentNode.data) {
      currentNode.left = this.delete(data, currentNode.left);
      return currentNode;
    } else if (data > currentNode.data) {
      currentNode.right = this.delete(data, currentNode.right);
      return currentNode;
    }
  }

  //Node deletion helper. Has 3 cases to help delete() work.
  #deleteHelper(currentNode) {
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
      if (currentNode.left) {
        currentNode.data = currentNode.left.data;
        currentNode.left = null;
      } else if (currentNode.right) {
        currentNode.data = currentNode.right.data;
        currentNode.right = null;
      }
      return currentNode;
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
    while (rightSubtree.left) {
      previousNode = rightSubtree;
      rightSubtree = rightSubtree.left;
    }

    // CASE 1: When rightSubtree.left is null from the start which means while loop did not run.
    // Set the 'deleted' node data to the successor data. Then, delete the successor node.
    if (previousNode === rightSubtree && rightSubtree.left === null) {
      currentNode.data = rightSubtree.data;
      currentNode.right = null;
    }

    // CASE 2: After running while loop,
    // Set the 'deleted' node data to the successor data. Then, delete the successor node.
    if (previousNode !== rightSubtree) {
      currentNode.data = rightSubtree.data;
      previousNode.left = null;
    }
    return currentNode;
  }

  find(data, currentNode = this.root) {
    if (currentNode === null) return console.log('Node not found');

    // Base case
    if (data === currentNode.data) {
      console.log('Node found: ')
      console.log(currentNode);
      return currentNode;
    }

    // Recursive case
    if (data < currentNode.data) {
      return currentNode = this.find(data, currentNode.left);
    } else if (data > currentNode.data) {
      return currentNode = this.find(data, currentNode.right);
    }
  }

  /**
   * Breadth-first traversal
   * Goes through the tree in level order
   * Callback function gives flexibility to perform various operations. (E.g. Add 2 to every Node in the tree)
   */
  levelOrder(callbackFunction) {
    if (this.root === null) return null;

    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (callbackFunction) {
        callbackFunction(currentNode.data);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  /**
   * Depth-first traversal
   * Inorder - <Left>, <Root>, <Right>
   * Preorder - <Root>, <Right>, <Left>
   * Postorder - <Left>, <Right>, <Root>
   */
  inOrder(callbackFunction, currentNode = this.root) {
    // Base case
    if (currentNode === null) return null;
    
    // Recursive case
    this.inOrder(callbackFunction, currentNode.left);
    callbackFunction(currentNode);
    this.inOrder(callbackFunction, currentNode.right);
  }

  preOrder(callbackFunction, currentNode = this.root) {
    // Base case
    if (currentNode === null) return null;

    // Recursive case
    callbackFunction(currentNode);
    this.preOrder(callbackFunction, currentNode.right);
    this.preOrder(callbackFunction, currentNode.left);
    
  }

  postOrder(callbackFunction, currentNode = this.root) {
    // Base case
    if (currentNode === null) return null;

    // Recursive case
    this.postOrder(callbackFunction, currentNode.left);
    this.postOrder(callbackFunction, currentNode.right);
    callbackFunction(currentNode);
  }
  
  height(data) {
    // Make use of find method
    let node = this.find(data);

    function getHeight(currentNode) {

      // Base case
      if (currentNode === null) return -1;

      // Recursive case
      let leftSubtree = getHeight(currentNode.left);
      let rightSubtree = getHeight(currentNode.right);

      // Get the larger height. Add 1 to count for the root node.
      return Math.max(leftSubtree, rightSubtree) + 1;
    }
    return getHeight(node);
  }

  depth(data, currentNode = this.root, counter = 0) {
    if (currentNode === null) return null;

    // Base case
    if (data === currentNode.data) {
      return counter;
    }

    // Recursive case
    if (data < currentNode.data) {
      console.log(currentNode);
      return this.depth(data, currentNode.left, counter + 1)
    } else if (data > currentNode.data) {
      console.log(currentNode);
      return this.depth(data, currentNode.right, counter + 1);
    }
    return counter;
  }

  isBalanced(currentNode = this.root) {

    // Recursive case (Making use of height method)
    let leftSubtree = this.height(currentNode.left.data);
    let rightSubtree = this.height(currentNode.right.data);

    // Compare the heights of leftSubtree and rightSubtree,
    // then absolute the number.

    let compare = Math.abs(leftSubtree - rightSubtree);
    if (compare > 1) {
      console.log('Tree is not balanced');
      return false;
    } else {
      console.log('Tree is balanced');
      return true;
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
}

const arrayData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arrayData);

// Tests
tree.insert(119);
tree.insert(118);
//tree.delete(10);
tree.prettyPrint();
//tree.find(6345);
//console.log(tree);
//tree.levelOrder(console.log);
//tree.inOrder(console.log);
console.log(tree.depth(8));
//tree.preOrder(console.log);
//tree.postOrder(console.log);
//console.log(tree.height(67));
//console.log(tree.depth(3));
tree.isBalanced();
