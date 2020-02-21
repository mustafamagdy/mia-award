(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('PhotoAlbum', {
                    url: '/PhotoAlbum',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/PhotoAlbum.html',
                    controller: 'PhotoAlbumController',
                    'controllerAs': 'PhotoAlbumCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newPhotoAlbum', {
                    url: '/newPhotoAlbum',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/new.html',
                    controller: 'createPhotoAlbumDialogController',
                    'controllerAs': 'newPhotoAlbumCtrl',
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editPhotoAlbum', {
                    url: '/editPhotoAlbum/:id',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/edit.html',
                    controller: 'editPhotoAlbumDialogController',
                    'controllerAs': 'editPhotoAlbumCtrl',
                    resolve: {
                        PhotoAlbumByIdPrepService: PhotoAlbumByIdPrepService
                    },
                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

                .state('mediaItems', {
                    url: '/mediaItems/:id',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/MediaItems.html',
                    controller: 'mediaItemController',
                    'controllerAs': 'mediaItemCtrl',

                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newMediaItem', {
                    url: '/newMediaItem/:id',
                    templateUrl: './app/GlobalAdmin/PhotoAlbum/templates/newMediaItem.html',
                    controller: 'createMediaItemController',
                    'controllerAs': 'newMediaItemCtrl',

                    data: {
                        permissions: {
                            redirectTo: 'root'
                        }
                    }

                })
        });

    PhotoAlbumPrepService.$inject = ['PhotoAlbumResource']
    function PhotoAlbumPrepService(PhotoAlbumResource) {
        return PhotoAlbumResource.getAllPhotoAlbums({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    PhotoAlbumByIdPrepService.$inject = ['PhotoAlbumResource', '$stateParams']
    function PhotoAlbumByIdPrepService(PhotoAlbumResource, $stateParams) {
        return PhotoAlbumResource.getPhotoAlbum({ id: $stateParams.id }).$promise;
    }

    AllAwardPrepService.$inject = ['PhotoAlbumResource']
    function AllAwardPrepService(PhotoAlbumResource) {
        return PhotoAlbumResource.getAllAwards({ pageNumber: 1, pageSize: 10 }).$promise;
    }

    MediaItemByIdPrepService.$inject = ['PhotoAlbumResource', '$stateParams']
    function MediaItemByIdPrepService(PhotoAlbumResource, $stateParams) {
        return PhotoAlbumResource.getMediaItems({ id: $stateParams.id }).$promise;
    }




}());
