(function () {
    angular
        .module('home')
        .factory('OrderResource', ['$resource', 'appCONSTANTS', OrderResource])

    function OrderResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Order/CreateOrder', {}, {
            getAllOrdersBy: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrders', useToken: true },
            getAllBasketsBy: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetBaskets', useToken: true },
            getFilterBaskets: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetBasketsOperation', useToken: true },
            getOrder: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrderById/:id', useToken: true },
            getOrderDetails: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrderDetails/:orderId ', useToken: true },
            getOrderById: { method: 'GET', url: appCONSTANTS.API_URL + 'Order/GetOrderById/:orderId ', useToken: true },
            changeStatusOpen: { method: 'POST', url: appCONSTANTS.API_URL + 'Order/Open/:orderId', useToken: true },
            forwordFor: { method: 'POST', url: appCONSTANTS.API_URL + 'Order/ForwordFor/:orderItemIds', useToken: true },
            cancelFor: { method: 'POST', url: appCONSTANTS.API_URL + 'Order/CancelFor/:orderItemIds', useToken: true },
        })
    }

}());
