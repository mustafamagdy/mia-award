(function () {
    angular
        .module('home')
        .factory('PhotoAlbumResource', ['$resource', 'appCONSTANTS', PhotoAlbumResource])

    function PhotoAlbumResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'albums', {}, {
            getAllPhotoAlbums: { method: 'POST', url: appCONSTANTS.API_URL + 'albums/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getPhotoAlbum: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            deleteMediaItems: { method: 'DELETE',url: appCONSTANTS.API_URL + 'albums/deleteMediaItems?id=:id', useToken: true },
            updateMediaItem: { method: 'PUT', url: appCONSTANTS.API_URL + 'albums/UpdateMediaItem', useToken: true },
            toggleFeatured: { method: 'PUT', url: appCONSTANTS.API_URL + 'albums/toggleFeatured', useToken: true },
            getMediaItems: { method: 'POST', url: appCONSTANTS.API_URL + 'albums/getMediaItems', useToken: true },
            createMediaItem: { method: 'POST', url: appCONSTANTS.API_URL + 'albums/:albumId/createMediaItems', useToken: true },
            UpdateMediaItemVideoUrl: { method: 'PUT', url: appCONSTANTS.API_URL + 'albums/UpdateMediaItemVideoUrl', useToken: true }
        })
    }

}());
