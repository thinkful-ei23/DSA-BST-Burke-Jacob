'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
      this.key = key; // if null, we have an empty tree
      this.value = value;
      this.parent = parent; // if null, it is the root
      this.left = null; // pointers to the child nodes
      this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
        this.key = key;
        this.value = value;
    }

    //If the tree already exists, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
        //if the existing node does not have any left child, 
        //meaning that if the `left` pointer is empty 
        //then we can just instantiate and insert the new node 
        //as the left child of that node, passing `this` as the parent.  
        if (this.left == null) {
            this.left = new BinarySearchTree(key, value, this); // it is now the root of its own tree
        }
        //if the node has an existing left child, 
        //then we recursively call the `insert` method 
        //so the node is added further down the tree.
        else {
            this.left.insert(key, value); // the this is now this.left 
        }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
        if (this.right == null) {
            this.right = new BinarySearchTree(key, value, this);
        }
        else {
            this.right.insert(key, value);
        }
    }
}

find(key) {
  //if the item is found at the root then return that value
  if (this.key === key) {
      return this.value;
  }
  //if the item you are looking for is less than the root 
  //then follow the left child
  //if there is an existing left child, 
  //then recursively check its left and/or right child
  //until you find the item.
  else if (key < this.key && this.left) {
      return this.left.find(key);
  }
  //if the item you are looking for is greater than the root 
  //then follow the right child
  //if there is an existing right child, 
  //then recursively check its left and/or right child
  //until you find the item.
  else if (key > this.key && this.right) {
      return this.right.find(key);
  }
  //You have searched the tree and the item is not in the tree
  else {
      throw new Error('Key Error');
  }
}

remove(key) {
  if (this.key == key) { // checking the parent of all the nodes
      if (this.left && this.right) { // once you find it, determine the children
          const successor = this.right._findMin(); // find the left most value in the right branch
          // can we do this.left._findMax(); ? and be equally ok
          this.key = successor.key;
          this.value = successor.value;
          successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
          this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
          this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
          this._replaceWith(null);
      }
  }
  else if (key < this.key && this.left) {
      this.left.remove(key); // check the left branch and on
  }
  else if (key > this.key && this.right) {
      this.right.remove(key); // check the right branch and on
  }
  else {
      throw new Error('Key Error');
  }
}

_replaceWith(node) { // this is what we're replacing
  if (this.parent) { // if the node is not a root node
      if (this == this.parent.left) { // if the one we're removing is the left child
          this.parent.left = node; // change the left child (the one we're removing) to the new value. connects the parent to the new child
      } 
      else if (this == this.parent.right) { // if the one we're removing the right child
          this.parent.right = node; // change the right child (the one we're removing) to the new value
      }

      if (node) {  
          node.parent = this.parent; // link up the new node with the old parent unless the node is null. connects the child to the new parent
      }
  }
  else { // node is a root node
      if (node) { // replacing a root node is simple
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
      }
      else { // getting rid of a root node is sinmple
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
      }
  }
}

_findMin() {
  if (!this.left) {
      return this;
  }
  return this.left._findMin();
}

}

// 1

//        2
    // 1    3
    //        2

// leaf node that doesn't have any children
// report a height everytime that happens
// compare heights

function heightBST (BST) {
  if (!BST.left && !BST.right) {
    return 0;
  } else if (BST.left && !BST.right) {
    return 1 + heightBST(BST.left);
  } else if (BST.right && !BST.left) {
    return 1 + heightBST(BST.right);
  } else {
    return 1 + Math.max(heightBST(BST.right), heightBST(BST.left));
  }
}


function isItBST (BST) {
  if (!BST.left && !BST.right) {
    return true;
  } else if (BST.left && !BST.right) {
    if (BST.left.key > BST.key) {
      return false;
    }
    return isItBST(BST.left);
  } else if (BST.right && !BST.left) {
    if (BST.right.key < BST.key) {
      return false;
    }
    return isItBST(BST.right);
  } else {
    if (BST.left.key > BST.key || BST.right.key < BST.key) {
      return false;
    }
    return isItBST(BST.right) && isItBST(BST.left);
  }
}

// =the third largest node will be on the right side of the tree
// go all the way right until there is no right child

// the largest node is the one that is the most (right)

// the second largest node is the left child of the most
// the third largest node is the parent of the largest node

// input:    5
//          / \
//        3    9
//            / \
//          6    12
//                              

// output: 6
// need to find the max of right most branch
// if we find the max
// the right most branch on the left of that is the second largest
let counter = 3;
let key = null;
// 3
// 1   4

function thirdLargestNodeRecursion(bst) {

  if (bst.right) {
    thirdLargestNodeRecursion(bst.right);
    if (key) {
      return key;
    }
  }
  counter--;

  if (counter === 0) {
    key = bst.key;
    return key;
  }

  if (bst.left) {
    thirdLargestNodeRecursion(bst.left);
  }

  
}

// function thirdLargestNode(bst) {
//     if (bst.key === null) {
//         throw new Error('bst is empty');
//     } 
//     if (!bst.left && !bst.right) {
//         throw new Error('bst is a leaf');
//     }
//     if (bst.left && !bst.right || !bst.left && bst.right) {
//         if (!bst.left.left && !bst.left.right || !bst.right.left && !bst.right.right) {
//             throw new Error('bst only contains 2 nodes');
//         }
//     }
//     let currentNode = bst;
//     while(currentNode.right) {
//         // at end of while loop let currentNode = currentNode.right
//         currentNode = currentNode.right;
//     }
//     let largestNode = currentNode;



//     // if the largest Node has a left child
//     if (largestNode.left) {
//         let currentNode = largestNode.left;
//         let secondLargestNode;

//         if (currentNode.right) { // if the largest node left child has a right branch
//           while(currentNode.right) {
//               currentNode = currentNode.right;
//           }
//           secondLargestNode = currentNode; // find the second largest node
//         } else {
//           secondLargestNode = currentNode; // else, it is the left child
//         }

//         if(secondLargestNode.left)  // if the second largest node has a left child
//             let currentNode = secondLargestNode.left;
//             let thirdLargestNode; 

//             if (currentNode.right) { // if the largest node left child has a right branch
//               while(currentNode.right) {
//                   currentNode = currentNode.right;
//               }
//               thirdLargest = currentNode; // find the second largest node
//             } else {
//               thirdLargest = currentNode; // else, it is the left child
//             }
            
//             return thirdLargest;
//         } 
//         // if the largest Node does not have a left child
        
    
//     let secondLargestNode = largestNode.parent;
//     let thirdLargest = secondLargestNode.parent > secondLargestNode.left ? secondLargestNode.parent : secondLargestNode.left;
//     return thirdLargest;
//   }

function main() {
const BST = new BinarySearchTree();
// BST.insert();
// BST.right = new BinarySearchTree(4, 2, BST);
// BST.left = new BinarySearchTree(1, 2, BST);
BST.insert(1);
BST.insert(4);
BST.insert(6);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(7);
console.log(thirdLargestNodeRecursion(BST));
console.log(key);
// console.log(BST);
// console.log(heightBST(BST));
// console.log(isItBST(BST));
}
main();