const Tasks = artifacts.require("Tasks");

module.exports = function(deployer) {

  //Tasks.synchronization_timeout = 42; //timeout in seconds

  deployer.deploy(Tasks);
};
