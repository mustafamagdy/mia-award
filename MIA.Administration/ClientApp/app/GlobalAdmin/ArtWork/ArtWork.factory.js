(function () {
    angular
        .module('home')
        .factory('ArtWorkResource', ['$resource', 'appCONSTANTS', ArtWorkResource])

    function ArtWorkResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'artWorks', {}, {
            getAllArtWorks: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/search', useToken: true, params: { lang: '@lang' } },
            getAllNominees: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/nominees', useToken: true, isArray: true, params: { lang: '@lang' } },
            getAllAwards: { method: 'POST', url: appCONSTANTS.API_URL + 'Awards/search', useToken: true, params: { lang: '@lang' } },
            getAllCountries: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/countries', useToken: true, isArray: true, params: { lang: '@lang' } },
            create: { method: 'POST', useToken: true },
            update: { method: 'PUT', useToken: true },
            getArtWork: { method: 'GET', useToken: true },
            getArtWorkWithFiles: { method: 'GET',url: appCONSTANTS.API_URL + 'artWorks/:id/withFiles', useToken: true },
            getPayment: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getPayment?id=:id', useToken: true },
            getArtWorkFiles: { method: 'GET', url: appCONSTANTS.API_URL + 'artWorks/getArtWorkFiles?id=:id', isArray: true, useToken: true },
            delete: { method: 'DELETE', useToken: true },
            changeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/ChangeStatus/:id/:status', useToken: true },

            createPayment: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/createPayment', useToken: true },
            updatePayment: { method: 'PUT', url: appCONSTANTS.API_URL + 'artWorks/updatePayment', useToken: true },
            UpdateTrailerVideoUrl: { method: 'PUT', url: appCONSTANTS.API_URL + 'artWorks/UpdateTrailerVideoUrl', useToken: true },
            allowFileUpload: { method: 'POST', url: appCONSTANTS.API_URL + 'artWorks/:id/allow-file-upload', useToken: true },

        })
    }

}());
