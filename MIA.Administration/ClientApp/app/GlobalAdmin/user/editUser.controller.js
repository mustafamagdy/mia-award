(function () {
  "use strict";

  angular
    .module("home")
    .controller("editUserController", [
      "$stateParams",
      "blockUI",
      "$scope",
      "$filter",
      "$translate",
      "$state",
      "UserResource",
      "RoleResource",
      "EditUserPrepService",
      "ToastService",
      editUserController,
    ]);

  function editUserController(
    $stateParams,
    blockUI,
    $scope,
    $filter,
    $translate,
    $state,
    UserResource,
    RoleResource,
    EditUserPrepService,
    ToastService
  ) {
    blockUI.start("Loading...");

    $scope.isPaneShown = true;
    $scope.$emit("LOAD");
    var vm = this;
    vm.userObj = EditUserPrepService;
    vm.roles = [];
    roleList();

    vm.EditUser = function () {
      blockUI.start("Loading...");
      vm.show = false;
      var updateUser = new UserResource();
      updateUser.userId = vm.userObj.userId;
      updateUser.fullName = vm.userObj.fullName;
      updateUser.email = vm.userObj.email;
      updateUser.phoneNumber = vm.userObj.phoneNumber;
      updateUser.password = vm.userObj.password;

      updateUser.$update({ userId: vm.userObj.id }).then(
        function (data, status) {
          blockUI.stop();
          if (data.message != null)
            ToastService.show(
              "right",
              "bottom",
              "fadeInUp",
              data.message,
              "error"
            );
          else {
            ToastService.show(
              "right",
              "bottom",
              "fadeInUp",
              $translate.instant("Editeduccessfully"),
              "success"
            );
            $state.go("users");
          }
        },
        function (data, status) {
          blockUI.stop();

          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.message,
            "error"
          );
        }
      );
    };

    function roleList() {
      blockUI.start("Loading...");
      var k = RoleResource.getAllRoles().$promise.then(
        function (results) {
          const userRoles = vm.userObj.roles;

          vm.roles = results.map((r) => {
            const selected = userRoles.includes(r.name);
            return { name: r.name, selected };
          });
          blockUI.stop();
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.message,
            "error"
          );
        }
      );
    }

    vm.checkRole = function (role) {
      blockUI.start("Loading...");

      const roleObj = new RoleResource();
      roleObj.roleName = role.name;
      roleObj.userId = vm.userObj.id;

      roleObj[role.selected ? "$addUserToRole" : "$removeUserFromRole"]({
        roleName: role.name,
        userId: vm.userObj.id,
      }).then(
        function (results) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            $translate.instant("updated_success"),
            "success"
          );
        },
        function (data, status) {
          blockUI.stop();
          ToastService.show(
            "right",
            "bottom",
            "fadeInUp",
            data.message,
            "error"
          );
        }
      );
    };

    vm.close = function () {
      $state.go("users");
    };
    blockUI.stop();
  }
})();
