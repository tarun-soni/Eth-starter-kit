pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Tasks {
    string tasks;
    function get() public view returns (string memory){
      return (tasks);
    }
    function set(string memory _task) public {
      tasks = _task;
    }
}