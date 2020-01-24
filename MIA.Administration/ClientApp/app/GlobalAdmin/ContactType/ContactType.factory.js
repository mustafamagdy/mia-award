(function () {
    angular
        .module('home')
        .factory('ContactTypeResource', ['$resource', 'appCONSTANTS', ContactTypeResource])

    function ContactTypeResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'ContactType/CreateContactType', {}, {
            getAllContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetAllContactType',useToken: true, params: { lang: '@lang' } },
            GetAllActiveContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetAllActiveContactType',useToken: true,isArray:true },
            create: { method: 'POST', useToken: true },
            update: { method: 'POST', url: appCONSTANTS.API_URL + 'ContactType/UpdateContactType', useToken: true ,},
            getContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetContactTypeById/:contactTypeId', useToken: true },
            ChangeStatus: { method: 'POST', url: appCONSTANTS.API_URL + 'ContactType/ChangeContactTypeStatus/:contactTypeId/:status', useToken: true},
            getAllActiveContactType: { method: 'GET', url: appCONSTANTS.API_URL + 'ContactType/GetAllActiveContactType',useToken: true,isArray:true}

        })
    }

}());
