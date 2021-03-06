(function () {
  "use strict";

  angular.module("home").config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("Award", {
        url: "/Award",
        templateUrl: "./app/GlobalAdmin/Award/templates/Award.html",
        controller: "AwardController",
        controllerAs: "AwardCtrl",
        data: {
          permissions: {
            only: ["Admin.view_award"],
            redirectTo: "root",
          },
        },
      })
      .state("newAward", {
        url: "/newAward",
        templateUrl: "./app/GlobalAdmin/Award/templates/new.html",
        controller: "createAwardDialogController",
        controllerAs: "newAwardCtrl",
        data: {
          permissions: {
            redirectTo: "root",
          },
        },
      })
      .state("editAward", {
        url: "/editAward/:id",
        templateUrl: "./app/GlobalAdmin/Award/templates/edit.html",
        controller: "editAwardDialogController",
        controllerAs: "editAwardCtrl",
        resolve: {
          AwardDetailsByAwardIdPrepService: AwardDetailsByAwardIdPrepService,
          ListAllUsersPrepService: ListAllUsersPrepService,
        },
        data: {
          permissions: {
            only: [
              "Admin.view_award",
              "Admin.edit_award",
              "Admin.manage_award_judges",
            ],
            redirectTo: "root",
          },
        },
      });
  });

  AwardPrepService.$inject = ["AwardResource"];
  function AwardPrepService(AwardResource) {
    return AwardResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
  }

  AwardByIdPrepService.$inject = ["AwardResource", "$stateParams"];
  function AwardByIdPrepService(AwardResource, $stateParams) {
    return AwardResource.getAward({ id: $stateParams.id }).$promise;
  }

  AllAwardPrepService.$inject = ["AwardResource"];
  function AllAwardPrepService(AwardResource) {
    return AwardResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
  }

  AwardDetailsByAwardIdPrepService.$inject = ["AwardResource", "$stateParams"];
  function AwardDetailsByAwardIdPrepService(AwardResource, $stateParams) {
    return AwardResource.getAwardDetails({ id: $stateParams.id }).$promise;
  }

  ListAllUsersPrepService.$inject = ["UserResource", "$stateParams"];
  function ListAllUsersPrepService(UserResource, $stateParams) {
    return UserResource.allUsersForDropdown().$promise;
  }
})();
