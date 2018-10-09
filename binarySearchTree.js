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

// 3
// 2
// 1
// 3.replaceWith(2)


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

function main() {
const BST = new BinarySearchTree();
BST.insert(3);
BST.insert(1);
BST.insert(4);
BST.insert(6);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(7);
// console.log(BST);
console.log(heightBST(BST));
}
main();