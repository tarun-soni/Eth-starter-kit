const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  // Migrations.synchronization_timeout = 80; //timeout in seconds
  deployer.deploy(Migrations);
};
