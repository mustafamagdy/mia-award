(function () {
    angular
        .module('home')
        .factory('ArtWorkMediaResource', ['$resource', 'appCONSTANTS', ArtWorkMediaResource])

    function ArtWorkMediaResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            createMediaFile: { method: 'POST',url: appCONSTANTS.API_URL + 'artWorks/createMediaFile', useToken: true },
            UpdateMediaItemVideoUrl: { method: 'PUT', url: appCONSTANTS.API_URL + 'artWorks/UpdateMediaItemVideoUrl', useToken: true },
            deleteMediaItem: { method: 'DELETE', url: appCONSTANTS.API_URL + 'artWorks/deleteMediaItem', useToken: true },
      
        })
    }

}());
