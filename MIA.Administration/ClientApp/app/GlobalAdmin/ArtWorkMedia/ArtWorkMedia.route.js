(function () {
  "use strict";

  angular.module("home").config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("ArtWorkMedia", {
        url: "/ArtWorkMedia/:id",
        templateUrl:
          "./app/GlobalAdmin/ArtWorkMedia/templates/ArtWorkMedia.html",
        controller: "ArtWorkMediaController",
        controllerAs: "ArtWorkMediaCtrl",
        data: {
          permissions: {
            only: ["Admin.view_artwork"],
            redirectTo: "root",
          },
        },
      })
      .state("MultiFiles", {
        url: "/MultiFiles/:id",
        templateUrl:
          "./app/GlobalAdmin/ArtWorkMedia/templates/uploadMultiFiles.html",
        controller: "UploadMultiFilesController",
        controllerAs: "UploadMultiFilesCtrl",
        resolve: {
          ArtWorkByIdPrepService: ArtWorkByIdPrepService,
          ArtWorkMediaByArtWorkIdPrepService: ArtWorkMediaByArtWorkIdPrepService,
        },
        data: {
          permissions: {
            only: ["Admin.view_artwork"],
            redirectTo: "root",
          },
        },
      })      
      .state("newArtWorkMedia", {
        url: "/newArtWorkMedia/:id",
        templateUrl: "./app/GlobalAdmin/ArtWorkMedia/templates/new.html",
        controller: "createArtWorkMediaDialogController",
        controllerAs: "newArtWorkMediaCtrl",
        resolve: {
          ArtWorkMediaByArtWorkIdPrepService: ArtWorkMediaByArtWorkIdPrepService,
        },
        data: {
          permissions: {
            only: ["Admin.view_artwork"],
            redirectTo: "root",
          },
        },
      })
      .state("editArtWorkMedia", {
        url: "/editArtWorkMedia/:countryId",
        templateUrl: "./app/GlobalAdmin/ArtWorkMedia/templates/edit.html",
        controller: "editArtWorkMediaDialogController",
        controllerAs: "editArtWorkMediaCtrl",
        resolve: {
          ArtWorkMediaByIdPrepService: ArtWorkMediaByIdPrepService,
        },
        data: {
          permissions: {
            only: ["Admin.edit_artwork"],
            redirectTo: "root",
          },
        },
      });
  });

  ArtWorkMediaPrepService.$inject = ["ArtWorkMediaResource"];
  function ArtWorkMediaPrepService(ArtWorkMediaResource) {
    return ArtWorkMediaResource.getAllArtWorkMedias({
      pageNumber: 1,
      pageSize: 10,
    }).$promise;
  }

  ArtWorkMediaByIdPrepService.$inject = [
    "ArtWorkMediaResource",
    "$stateParams",
  ];
  function ArtWorkMediaByIdPrepService(ArtWorkMediaResource, $stateParams) {
    return ArtWorkMediaResource.getArtWorkMedia({
      countryId: $stateParams.countryId,
    }).$promise;
  }

  AllAwardPrepService.$inject = ["ArtWorkMediaResource"];
  function AllAwardPrepService(ArtWorkMediaResource) {
    return ArtWorkMediaResource.getAllAwards({ pageNumber: 1, pageSize: 10 })
      .$promise;
  }

  ArtWorkMediaByArtWorkIdPrepService.$inject = [
    "ArtWorkResource",
    "$stateParams",
  ];
  function ArtWorkMediaByArtWorkIdPrepService(ArtWorkResource, $stateParams) {
    return ArtWorkResource.getArtWorkFiles({ id: $stateParams.id }).$promise;
  }
  ArtWorkByIdPrepService.$inject = ["ArtWorkResource", "$stateParams"];
  function ArtWorkByIdPrepService(ArtWorkResource, $stateParams) {
    return ArtWorkResource.getArtWork({ id: $stateParams.id }).$promise;
  }
})();
