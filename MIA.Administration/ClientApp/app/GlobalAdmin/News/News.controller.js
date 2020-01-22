(function () {
    'use strict';

    angular
        .module('home')
        .controller('NewsController', ['appCONSTANTS', '$scope', '$translate', 'NewsResource', 'blockUI', '$uibModal', 'NewsPrepService',
            'ToastService', NewsController]);


    function NewsController(appCONSTANTS, $scope, $translate, NewsResource, blockUI, $uibModal, NewsPrepService, ToastService) {
        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        var vm = this;
        // vm.actionList = [];
        // for (var i = 1; i <= $scope.user.permessionModules[1][2].length; i++)  
        //     vm.actionList.push(i);
        vm.currentPage = 1;
        vm.appCONSTANTS = appCONSTANTS;
        $scope.totalCount = NewsPrepService.metadata.totalItemCount;
        $scope.NewsList = NewsPrepService.items;
        console.log(NewsPrepService);
        function refreshNewss() {
            blockUI.start("Loading...");

            var k = NewsResource.getAllCategories({ pageNumber: vm.currentPage, pageSize: 10 }).$promise.then(function (results) {
                $scope.NewsList = results.items;

                console.log($scope.NewsList);
                blockUI.stop();

            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        function change(news, isDeleted) {
            var updateObj = new NewsResource();
            updateObj.id = news.id;
            if (!isDeleted)
                updateObj.status = (news.status == true ? false : true);
            updateObj.isDeleted = news.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    // if (isDeleted)
                    refreshNewss();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    news.status = updateObj.status;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }
        vm.UpdateNews = function (news) {
            change(news, false);
        }

        function confirmationDelete(model) {
            debugger; 
            var updateObj = new NewsResource();
            // updateObj.id = model.id;
            updateObj.$delete({ id: model.id }).then(
                function (data, status) {
                    refreshNewss();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('DeletedSuccessfully'), "success");
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }
        vm.openDeleteDialog = function (model, name, id) {
            var modalContent = $uibModal.open({
                templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
                controller: 'confirmDeleteDialogController',
                controllerAs: 'deleteDlCtrl',
                resolve: {
                    model: function () { return model },
                    itemName: function () { return name },
                    itemId: function () { return id },
                    message: function () { return null },
                    callBackFunction: function () { return confirmationDelete }
                }

            });
        }
        vm.ChangeStatus = function (model) {

            var updateObj = new NewsResource();
            updateObj.id = model.id;
            updateObj.title = model.title;
            updateObj.body = model.body;
            updateObj.outdated = (model.outdated == true ? false : true);
            updateObj.$update().then(
                function (data, status) {
                    //  refreshNewss();
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    model.outdated = updateObj.outdated;
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                }
            );
            return;
        }

        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshNewss();
        }

    }

})();
