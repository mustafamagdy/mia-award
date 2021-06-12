(function () {
    'use strict';

    angular
        .module('home')
        .controller('settingController', ['$rootScope', 'blockUI', '$scope', '$http', '$filter', '$translate',
            '$state', '$localStorage',
            'authorizationService', 'appCONSTANTS',
            'ToastService', '$stateParams'
            , '$uibModal', 'settingsPrepService', 'BranchPrepService', 'AddSettingsResource', 'UpdateSettingsResource', settingController]);


    function settingController($rootScope, blockUI, $scope, $http, $filter, $translate,
        $state, $localStorage, authorizationService,
        appCONSTANTS, ToastService, $stateParams, $uibModal, settingsPrepService
        , BranchPrepService, AddSettingsResource, UpdateSettingsResource) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[14].children[0]).addClass("active")

        // blockUI.start("Loading...");

        var Manufacture = this;
        $scope.settingsPrepService = settingsPrepService;
        Manufacture.orderType = {
            type: 'item'
        };

        Manufacture.currency;
        Manufacture.minDays;
        Manufacture.maxPause;
        Manufacture.allowPause;
        Manufacture.allowHistory;
        Manufacture.programDiscount=$scope.settingsPrepService.programDiscount;

        if ($scope.settingsPrepService.isActive != undefined) {
            if ($scope.settingsPrepService.isSMS && $scope.settingsPrepService.isMail) {
                Manufacture.orderType.type = "both"
            }
            else if ($scope.settingsPrepService.isSMS) {
                Manufacture.orderType.type = "sms"
            }
            else if ($scope.settingsPrepService.isMail) {
                Manufacture.orderType.type = "mail"
            }
            else {
                Manufacture.orderType.type = "none"
            }

        }
        // $scope.currencyPrepService = currencyPrepService;

        // $http.get('http://country.io/currency.json').then(function (response) {
        //     $scope.currencyPrepService = response.data;
        // });

        $scope.BranchPrepService = BranchPrepService;

        Manufacture.currentPage = 1;
        $scope.changePage = function (page) {
            Manufacture.currentPage = page;
            refreshAreas();
        }

        Manufacture.UpdateProgram = function (program) {
            change(program, false);
        }

        // function confirmationDelete(model) {
        //     model.isDeleted = true;
        //     change(model, true);

        // }

        Manufacture.AddSetting = function () {
            blockUI.start("Loading...");

            var setting = new AddSettingsResource();

            if (Manufacture.orderType.type == "none") {
                setting.isSMS = false;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "sms") {
                setting.isSMS = true;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "mail") {
                setting.isSMS = false;
                setting.isMail = true;
            }
            else if (Manufacture.orderType.type == "both") {
                setting.isSMS = true;
                setting.isMail = true;
            }

            setting.isDeleted = false;
            setting.isPause = Manufacture.allowPause;

            if (Manufacture.allowPause == true) {
                setting.maxPauseDays = Manufacture.maxPause;
            }
            else if (Manufacture.allowPause == false) {
                setting.maxPauseDays = 0;
            }
            setting.allowHistory = Manufacture.allowHistory;
            setting.currencyCode = Manufacture.currency;
            setting.minNoDaysPerProgram = Manufacture.minDays;
            setting.isDeleted = false;
            setting.isActive = true;
            setting.programDiscount = Manufacture.programDiscount;

            setting.$create().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    // localStorage.setItem('data', JSON.stringify(data.userId));
                    // $state.go('callCenter');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        Manufacture.UpdateSetting = function () {
            blockUI.start("Loading...");

            var setting = new UpdateSettingsResource();

            if (Manufacture.orderType.type == "none") {
                setting.isSMS = false;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "sms") {
                setting.isSMS = true;
                setting.isMail = false;
            }
            else if (Manufacture.orderType.type == "mail") {
                setting.isSMS = false;
                setting.isMail = true;
            }
            else if (Manufacture.orderType.type == "both") {
                setting.isSMS = true;
                setting.isMail = true;
            }

            setting.isDeleted = false;
            setting.isPause = $scope.settingsPrepService.isPause;

            if (setting.isPause == true) {
                setting.maxPauseDays = $scope.settingsPrepService.maxPauseDays;
            }
            else if (setting.isPause == false) {
                setting.maxPauseDays = 0;
            }
            setting.allowHistory = $scope.settingsPrepService.allowHistory;
            setting.currencyCode = $scope.settingsPrepService.currencyCode;
            setting.minNoDaysPerProgram = $scope.settingsPrepService.minNoDaysPerProgram;
            setting.isDeleted = false;
            setting.isActive = true;
            setting.programDiscount = Manufacture.programDiscount;


            setting.$update().then(
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('AddedSuccessfully'), "success");

                    // localStorage.setItem('data', JSON.stringify(data.userId));
                    // $state.go('callCenter');

                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );
        }

        $scope.EditBranchDialog = function (branchIdd) {
            blockUI.stop();
            Manufacture.branch = $scope.BranchPrepService.results.filter(x => x.branchId == branchIdd);

            $uibModal.open({
                templateUrl: './app/GlobalAdmin/setting/templates/editBranchFees.html',
                controller: 'editBranchFeesController',
                controllerAs: 'editBranchFeesCtrl',
                resolve: {
                    // BranchId: function () { return branchId; },
                    branchFeesPrepService: function () { return Manufacture.branch; }
                    // callBackFunction: function () { return refreshPrograms }
                }
            });
        }

        function change(program, isDeleted) {
            
            var updateObj = new UpdateProgramResource();
            updateObj.ProgramId = program.programId;
            if (!isDeleted)
                updateObj.isActive = (program.isActive == true ? false : true);
            updateObj.isDeleted = program.isDeleted;

            updateObj.$update().then(
                function (data, status) {
                    if (isDeleted)
                        refreshPrograms();

                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('Editeduccessfully'), "success");
                    program.isActive = updateObj.isActive;

                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                }
            );

        }

        function refreshPrograms() {
            blockUI.start("Loading...");

            var k = GetProgramResource.gatAllPrograms().$promise.then(function (results) {
                $scope.programList = results;

                blockUI.stop();
            },
                function (data, status) {
                    blockUI.stop();
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }

        // Manufacture.openDeleteDialog = function (model, name, id) {
        //     var modalContent = $uibModal.open({
        //         templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
        //         controller: 'confirmDeleteDialogController',
        //         controllerAs: 'deleteDlCtrl',
        //         resolve: {
        //             model: function () { return model },
        //             itemName: function () { return name },
        //             itemId: function () { return id },
        //             message: function () { return null },
        //             callBackFunction: function () { return confirmationDelete }
        //         }

        //     });
        // }
    }

})();
