(function () {
    'use strict';

    angular
        .module('home')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('Products', {
                    url: '/Product',
                    templateUrl: './app/GlobalAdmin/Product/templates/Product.html',
                    controller: 'ProductController',
                    'controllerAs': 'ProductCtrl',
                    resolve: {
                        ProductPrepService: ProductPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('newProduct', {
                    url: '/newProduct',
                    templateUrl: './app/GlobalAdmin/Product/templates/new.html',
                    controller: 'createProductDialogController',
                    'controllerAs': 'newProductCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                        ProductNewCodePrepService: ProductNewCodePrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })
                .state('editProduct', {
                    url: '/editProduct/:id',
                    templateUrl: './app/GlobalAdmin/Product/templates/edit.html',
                    controller: 'editProductDialogController',
                    'controllerAs': 'editProductCtrl',
                    resolve: {
                        CategoryPrepService: CategoryPrepService,
                        ProductByIdPrepService: ProductByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('ProductDetails', {
                    url: '/ProductDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Product/templates/ProductDetails.html',
                    controller: 'ProductDetailsController',
                    'controllerAs': 'ProductDetailsCtrl',
                    resolve: {
                        ProductDetaqilsByProductIdPrepService: ProductDetaqilsByProductIdPrepService,
                        ProductInfoByIdPrepService: ProductInfoByIdPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })

                .state('newProductDetails', {
                    url: '/newProductDetails/:produdctId',
                    templateUrl: './app/GlobalAdmin/Product/templates/NewProductDetailsDialog.html',
                    controller: 'createProductDetailsDialog',
                    'controllerAs': 'createProductDetailsDialoglCtrl',
                    resolve: {
                        SKUConversionPrepService: SKUConversionPrepService
                    },
                    data: {
                        permissions: {
                            only: ['3'],
                            redirectTo: 'root'
                        }
                    }

                })
        });

    ProductPrepService.$inject = ['ProductResource']
    function ProductPrepService(ProductResource) {
        return ProductResource.getAllProducts().$promise;
    }

    ProductByIdPrepService.$inject = ['ProductResource', '$stateParams']
    function ProductByIdPrepService(ProductResource, $stateParams) {
        return ProductResource.getProduct({ id: $stateParams.id }).$promise;
    }
    ProductInfoByIdPrepService.$inject = ['ProductResource', '$stateParams']
    function ProductInfoByIdPrepService(ProductResource, $stateParams) {
        return ProductResource.getProduct({ id: $stateParams.produdctId }).$promise;
    }

    ProductDetaqilsByProductIdPrepService.$inject = ['ProductResource', '$stateParams']
    function ProductDetaqilsByProductIdPrepService(ProductResource, $stateParams) {
        return ProductResource.getProductDetails({ produdctId: $stateParams.produdctId }).$promise;
    }

    ProductNewCodePrepService.$inject = ['ProductResource', '$stateParams']
    function ProductNewCodePrepService(ProductResource, $stateParams) {
        return ProductResource.generateNewProductCode().$promise;
    }

    SKUConversionPrepService.$inject = ['ProductResource']
    function SKUConversionPrepService(ProductResource) {
        return ProductResource.getAllSKUConversion().$promise;
    }
    ProductPrepService.$inject = ['ProductResource']
    function ProductPrepService(ProductResource) {
        return ProductResource.search().$promise;
    }

    /*Category */
    CategoryPrepService.$inject = ['CategoryResource']
    function CategoryPrepService(CategoryResource) {
        return CategoryResource.getAllActiveCategories().$promise;
    }

}());
