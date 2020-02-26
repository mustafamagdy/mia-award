(function () {
    angular
        .module('home')
        .factory('UploadChunkResource', ['$resource', 'appCONSTANTS', UploadChunkResource])

    function UploadChunkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'UploadChunks', {}, {
            getAllUploadChunks: { method: 'POST', url: appCONSTANTS.API_URL + 'UploadChunks/search', useToken: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getUploadChunk: { method: 'GET', useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'UploadChunks/ChangeStatus/:id/:status', useToken: true }

        })
    }

}());
