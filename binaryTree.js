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

    // Recursive Case (Splitting array in halves)
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
    if (data < currentNode.data) currentNode.left = this.insert(data, currentNode.left);
    else if (data > currentNode.data) currentNode.right = this.insert(data, currentNode.right);

    return currentNode;
  }

  delete(data, currentNode = this.root, previousNode = null) {
    // If node cannot be found
    if (currentNode === null) {
      console.log('Node cannot be found.');
      return null;
    }

    // Base case
    if (data === currentNode.data) return this.#deleteHelper(currentNode, previousNode);
    

    // Recursive case
    if (data < currentNode.data) {
      currentNode.left = this.delete(data, currentNode.left, currentNode);
      return currentNode;
    } else if (data > currentNode.data) {
      currentNode.right = this.delete(data, currentNode.right, currentNode);
      return currentNode;
    }
  }

  //Node deletion helper. Has 3 cases to help delete() work.
  #deleteHelper(currentNode, previousNode) {
    // CASE 1: Delete a leaf node
    if (currentNode.left === null && currentNode.right === null) {
      if (previousNode) {
        if (previousNode.left === currentNode) {
            previousNode.left = null;
        } else {
            previousNode.right = null;
        }
      }
      return null;
    }

    // CASE 2: Delete a node with 2 childs
    if (currentNode.left && currentNode.right) return this.#successor(currentNode);

    // CASE 3: Delete a node with a single child
    if (currentNode.left || currentNode.right) {
      if (previousNode.left === currentNode) {
        previousNode.left = currentNode.left ? currentNode.left : currentNode.right;
        return previousNode.left
      } else if (previousNode.right === currentNode) {
        previousNode.right = currentNode.left ? currentNode.left : currentNode.right;
        return previousNode.right;
      }
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

    // CASE 2: After running while loop, set the 'deleted' node data to the successor data. Then, delete the successor node.
    if (previousNode !== rightSubtree) {
      currentNode.data = rightSubtree.data;
      (previousNode.left === rightSubtree) ? previousNode.left = rightSubtree.right : previousNode.right = rightSubtree.right;
    }
    return currentNode;
  }

  find(data, currentNode = this.root) {
    if (currentNode === null) return console.log('Node not found');

    // Base case
    if (data === currentNode.data) return currentNode;

    // Recursive case
    if (data < currentNode.data) return currentNode = this.find(data, currentNode.left);
    if (data > currentNode.data) return currentNode = this.find(data, currentNode.right);
  }

  /**
   * Breadth-first traversal
   * Goes through the tree in level order
   * Callback function gives flexibility to perform various operations. (E.g. Add 2 to every Node in the tree)
   */
  levelOrder(callbackFunction) {
    const array = [];

    if (this.root === null) return null;
    
    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      array.push(currentNode.data);

      if (callbackFunction) callbackFunction(currentNode.data);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return console.log(array);
  }

  /**
   * Depth-first traversal
   * Inorder - <Left>, <Root>, <Right>
   * Preorder - <Root>, <Right>, <Left>
   * Postorder - <Left>, <Right>, <Root>
   */
  inOrder(callbackFunction, currentNode = this.root, array = []) {
    
    // Base case
    if (currentNode === null) return null;
    
    // Recursive case
    this.inOrder(callbackFunction, currentNode.left, array);
    if (callbackFunction) callbackFunction(currentNode);
    array.push(currentNode.data);
    this.inOrder(callbackFunction, currentNode.right, array);

    return array;
  }

  preOrder(callbackFunction, currentNode = this.root, array = []) {
    // Base case
    if (currentNode === null) return null;

    // Recursive case
    if (callbackFunction) callbackFunction(currentNode);
    array.push(currentNode.data);
    this.preOrder(callbackFunction, currentNode.right, array);
    this.preOrder(callbackFunction, currentNode.left, array);
    
    return array;
  }

  postOrder(callbackFunction, currentNode = this.root, array = []) {
    // Base case
    if (currentNode === null) return null;

    // Recursive case
    this.postOrder(callbackFunction, currentNode.left, array);
    this.postOrder(callbackFunction, currentNode.right, array);
    if (callbackFunction) callbackFunction(currentNode);
    array.push(currentNode.data);

    return array;
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
      return this.depth(data, currentNode.left, counter + 1)
    } else if (data > currentNode.data) {
      return this.depth(data, currentNode.right, counter + 1);
    }
    return counter;
  }

  isBalanced(currentNode = this.root) { 
    // Recursive case (Making use of height method)
    let leftSubtree = this.height(currentNode.left.data);
    let rightSubtree = this.height(currentNode.right.data);

    // Compare the heights of leftSubtree and rightSubtree, then absolute the number.

    let compare = Math.abs(leftSubtree - rightSubtree);
    if (compare > 1) {
      console.log('Tree is not balanced');
      return false;
    } else {
      console.log('Tree is balanced');
      return true;
    }
  }

  rebalance(currentNode = this.root) {
    let array = []  

    /** 
     * Pushes the current node's data into the new Array
     * Then use the new array as an argument for buildTree
    */
    function pushToArray(node) {
      array.push(node.data);
    }

    this.inOrder(pushToArray, currentNode);
    this.root = this.buildTree(array);
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

/**
 * Binary Tree UI.
 * Easier to use through HTML page.
 */
function domElements() {
  // Definfing the tree here so all eventListeners can access it.
  let tree;

  // DOM elements
  const randomNumberInput = document.getElementById('randomNumberInput');
  const randomNumberButton = document.getElementById('randomNumberButton');
  const insertInput = document.getElementById('insertInput');
  const insertButton = document.getElementById('insertButton');
  const deleteInput = document.getElementById('deleteInput');
  const deleteButton = document.getElementById('deleteButton');
  const heightInput = document.getElementById('heightInput');
  const heightButton = document.getElementById('heightButton');
  const depthInput = document.getElementById('depthInput');
  const depthButton = document.getElementById('depthButton');
  const levelOrderButton = document.getElementById('levelOrderButton');
  const inOrderButton = document.getElementById('inOrderButton');
  const preOrderButton = document.getElementById('preOrderButton');
  const postOrderButton = document.getElementById('postOrderButton');
  const isBalancedButton = document.getElementById('isBalancedButton');
  const rebalanceButton = document.getElementById('rebalanceButton');

  // Eventlistners
  randomNumberInput.addEventListener('input', () => {
    const maxLength = 2; 
    if (randomNumberInput.value.length > maxLength) {
      randomNumberInput.value = randomNumberInput.value.slice(0, maxLength); 
    }
  });

  randomNumberButton.addEventListener('click', (event) => {
    event.preventDefault();
    const arrayData = randomNumbers(randomNumberInput.value);
    tree = new Tree(arrayData);
    tree.prettyPrint();
  });

  insertButton.addEventListener('click', () => {
    const value = parseInt(insertInput.value);
    tree.insert(value);
    tree.prettyPrint();
  });

  deleteButton.addEventListener('click', () => {
    const value = parseInt(deleteInput.value);
    tree.delete(value);
    if (tree.delete !== null) tree.prettyPrint();
  });

  heightButton.addEventListener('click', () => {
    const value = parseInt(heightInput.value);
    console.log(tree.height(value));
  });

  depthButton.addEventListener('click', () => {
    const value = parseInt(depthInput.value);
    console.log(tree.depth(value));
  });

  levelOrderButton.addEventListener('click', () => {
    (tree) ? tree.levelOrder() : console.log('Tree does not exist. Please create a new tree.');
  });

  inOrderButton.addEventListener('click', () => {
    (tree) ? console.log(tree.inOrder()) : console.log('Tree does not exist. Please create a new tree.');
  });
  
  preOrderButton.addEventListener('click', () => {
    (tree) ? console.log(tree.preOrder()) : console.log('Tree does not exist. Please create a new tree.');
  });

  postOrderButton.addEventListener('click', () => {
    (tree) ? console.log(tree.postOrder()) : console.log('Tree does not exist. Please create a new tree.');
  });

  isBalancedButton.addEventListener('click', () => {
    (tree) ? tree.isBalanced() : console.log('Tree does not exist. Please create a new tree.');
  });

  rebalanceButton.addEventListener('click', () => {
    if (tree) {
      tree.rebalance();
      tree.prettyPrint();
    } else {
      console.log('Tree does not exist. Please create a new tree.');
    }
  });
} 

function randomNumbers(size) {
  let randomArray = [];

  for (let i = 0; i < size; i++) {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    randomArray.push(randomNumber);
  }
  return randomArray;
}

domElements();


//Debugging tests

const arrayData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arrayData);

tree.delete(3);
//tree.insert(119);
//tree.find(6345);
//tree.levelOrder(console.log);
//tree.inOrder(console.log);
//console.log(tree.depth(8));
//tree.preOrder(console.log);
//tree.postOrder(console.log);
//console.log(tree.height(67));
//console.log(tree.depth(3));
//tree.isBalanced();
//tree.rebalance();
tree.prettyPrint();
tree.isBalanced();
console.log(tree);



