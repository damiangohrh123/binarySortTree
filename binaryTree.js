class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
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

  insert(data, root) {

  }
}


const arrayData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newData = new Tree(arrayData);
console.log(newData);