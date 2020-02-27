(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('UploadChunk', {
                    url: '/UploadChunk',
                    templateUrl: './app/GlobalAdmin/UploadChunk/templates/UploadChunk.html',
                    controller: 'UploadChunkController',
                    'controllerAs': 'UploadChunkCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newUploadChunk', {
                    url: '/newUploadChunk',
                    templateUrl: './app/GlobalAdmin/UploadChunk/templates/new.html',
                    controller: 'createUploadChunkDialogController',
                    'controllerAs': 'newUploadChunkCtrl', 
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editUploadChunk', {
                    url: '/editUploadChunk/:id',
                    templateUrl: './app/GlobalAdmin/UploadChunk/templates/edit.html',
                    controller: 'editUploadChunkDialogController',
                    'controllerAs': 'editUploadChunkCtrl',
                    resolve: {
                        UploadChunkByIdPrepService: UploadChunkByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    UploadChunkPrepService.$inject = ['UploadChunkResource']
    function UploadChunkPrepService(UploadChunkResource) {
        return UploadChunkResource.getAllUploadChunks({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    UploadChunkByIdPrepService.$inject = ['UploadChunkResource', '$stateParams']
    function UploadChunkByIdPrepService(UploadChunkResource, $stateParams) {
        return UploadChunkResource.getUploadChunk({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['UploadChunkResource']
    function AllAwardPrepService(UploadChunkResource) {
        return UploadChunkResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }
 
}());
