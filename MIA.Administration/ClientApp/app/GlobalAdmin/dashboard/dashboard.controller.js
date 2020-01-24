(function () {
    'use strict';

    angular
        .module('home')
        .controller('dashboardController', ['blockUI', '$scope', '$state',
            '$translate', 'dashboardResource', 'QuestionResource', 'TicketDashboardPrepService',
            'AnswerQuestionPrepService', '$filter', 'allcategoryTypePrepService', 'AnswerQuestionResource', 'CountriesPrepService',
            'BranchManagerPrepService', 'TechnasianPrepService', 'DepartmentPrepService',
            'GovernrateResource', 'CityResource', 'AreaResource', 'UsersAnswersQuestionPrepService', dashboardController]);

    function dashboardController(blockUI, $scope, $state,
        $translate, dashboardResource, QuestionResource, TicketDashboardPrepService,
        AnswerQuestionPrepService, $filter, allcategoryTypePrepService, AnswerQuestionResource, CountriesPrepService,
        BranchManagerPrepService, TechnasianPrepService, DepartmentPrepService,
        GovernrateResource, CityResource, AreaResource, UsersAnswersQuestionPrepService) {

        $('.pmd-sidebar-nav>li>a').removeClass("active")
        $($('.pmd-sidebar-nav').children()[10].children[0]).addClass("active")
        blockUI.start("Loading...");

        var Manufacture = this;

        function init() {
            Manufacture.ticketsFilter = [
                {
                    name: $translate.instant('Country'),
                    value: "country"
                },
                {
                    name: $translate.instant('Governrate'),
                    value: "Governrate"
                },
                {
                    name: $translate.instant('City'),
                    value: "city"
                },
                {
                    name: $translate.instant('Area'),
                    value: "area"
                },
                {
                    name: $translate.instant('Branch'),
                    value: "branch"
                },
                {
                    name: $translate.instant('Department'),
                    value: "department"
                },
                {
                    name: $translate.instant('CategoryLbl'),
                    value: "category"
                }
            ]
            Manufacture.selectedTicketFilter = "branch"
            Manufacture.options = {
                chart: {
                    type: 'multiBarChart',
                    height: 300,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 65,
                        left: 50
                    },
                    stacked: true,

                    duration: 100,
                    xAxis: {
                        // axisLabel: 'X Axis',
                        rotateLabels: 30
                    },
                    yAxis: {
                        axisLabel: $translate.instant('ticketsCount'),
                        axisLabelDistance: -10,

                    }
                }
            };
            loadTicketDashboard(TicketDashboardPrepService);
            Manufacture.questionList = AnswerQuestionPrepService.results;
            Manufacture.categoryTypes = [];
            Manufacture.selectedCategoryType = { categoryTypeId: 0, titleDictionary: { "en": "All", "ar": "كل" } };
            Manufacture.categoryTypes.push(Manufacture.selectedCategoryType);
            Manufacture.categoryTypes = Manufacture.categoryTypes.concat(allcategoryTypePrepService.results)

            //init survey filter
            Manufacture.countiesSurvey = [];
            Manufacture.selectedCountrySurvey = { countryId: 0, titleDictionary: { "en": "All Countries", "ar": "كل البلاد" } };
            Manufacture.countiesSurvey.push(Manufacture.selectedCountrySurvey);
            Manufacture.countiesSurvey = Manufacture.countiesSurvey.concat(CountriesPrepService.results)

            Manufacture.selectedGovernrateSurvey = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.GovernratesSurvey = [];
            Manufacture.GovernratesSurvey.push(Manufacture.selectedGovernrateSurvey);
            Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.citiesSurvey = [];
            Manufacture.citiesSurvey.push(Manufacture.selectedCitySurvey);
            Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.areaListSurvey = [];
            Manufacture.areaListSurvey.push(Manufacture.selectedAreaSurvey);
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey = [];
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);

            Manufacture.selectedDepartmentSurvey = { departmentId: 0, titleDictionary: { "en": "All Departments", "ar": "كل الاقسام" } };
            Manufacture.departmentsSurvey = [];
            Manufacture.departmentsSurvey.push(Manufacture.selectedDepartmentSurvey);
            Manufacture.departmentsSurvey = Manufacture.departmentsSurvey.concat(DepartmentPrepService.results)
            Manufacture.selectedCategorySurvey = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categoriesSurvey = [];
            Manufacture.categoriesSurvey.push(Manufacture.selectedCategorySurvey);

            Manufacture.selectedAnswersUser = { userId: 0, userName: $translate.instant('allUsers') };
            Manufacture.AnswersUsers = [];
            Manufacture.AnswersUsers.push(Manufacture.selectedAnswersUser);
            Manufacture.AnswersUsers = Manufacture.AnswersUsers.concat(UsersAnswersQuestionPrepService)

            //init tickets filter
            Manufacture.counties = [];
            Manufacture.selectedCountry = { countryId: 0, titleDictionary: { "en": "All Countries", "ar": "كل البلاد" } };
            Manufacture.counties.push(Manufacture.selectedCountry);
            Manufacture.counties = Manufacture.counties.concat(CountriesPrepService.results)

            Manufacture.selectedGovernrate = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.Governrates = [];
            Manufacture.Governrates.push(Manufacture.selectedGovernrate);
            Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.cities = [];
            Manufacture.cities.push(Manufacture.selectedCity);
            Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.areaList = [];
            Manufacture.areaList.push(Manufacture.selectedArea);
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList = [];
            Manufacture.branchList.push(Manufacture.selectedBranch);

            Manufacture.selectedDepartment = { departmentId: 0, titleDictionary: { "en": "All Departments", "ar": "كل الاقسام" } };
            Manufacture.departments = [];
            Manufacture.departments.push(Manufacture.selectedDepartment);
            Manufacture.departments = Manufacture.departments.concat(DepartmentPrepService.results)
            Manufacture.selectedCategory = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categories = [];
            Manufacture.categories.push(Manufacture.selectedCategory);

            Manufacture.selectedBranchManager = { userId: 0, userName: $translate.instant('allBranchesM') };
            Manufacture.BranchManagers = [];
            Manufacture.BranchManagers.push(Manufacture.selectedBranchManager);
            Manufacture.BranchManagers = Manufacture.BranchManagers.concat(BranchManagerPrepService.results)
            Manufacture.selectedTechnician = { userId: 0, userName: $translate.instant('allTechnasian') };
            Manufacture.Technicians = [];
            Manufacture.Technicians.push(Manufacture.selectedTechnician);
            Manufacture.Technicians = Manufacture.Technicians.concat(TechnasianPrepService.results)

        }
        //start ticket filter functions
        Manufacture.countryChange = function () {
            /*for (var i = Manufacture.counties.length - 1; i >= 0; i--) {
                if (Manufacture.counties[i].countryId == 0) {
                    Manufacture.counties.splice(i, 1);
                }
            }*/
            Manufacture.selectedGovernrate = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.Governrates = [];
            Manufacture.cities = [Manufacture.selectedCity];
            Manufacture.areaList = [Manufacture.selectedArea];
            Manufacture.Governrates.push(Manufacture.selectedGovernrate);

            Manufacture.branchList = [];
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList.push(Manufacture.selectedBranch);
            GovernrateResource.getAllGovernrates({ countryId: Manufacture.selectedCountry.countryId, pageSize: 0 }).$promise.then(function (results) {

                Manufacture.Governrates = Manufacture.Governrates.concat(results.results);
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            blockUI.stop();
        }
        Manufacture.GovernrateChange = function () {
            if (Manufacture.selectedGovernrate.GovernrateId != undefined) {
                /*for (var i = Manufacture.Governrates.length - 1; i >= 0; i--) {
                    if (Manufacture.Governrates[i].GovernrateId == 0) {
                        Manufacture.Governrates.splice(i, 1);
                    }
                }*/
                Manufacture.cities = [];
                Manufacture.areaList = [];
                Manufacture.selectedCity = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
                Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.cities.push(Manufacture.selectedCity);
                Manufacture.areaList = [Manufacture.selectedArea];

                Manufacture.branchList = [];
                Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchList.push(Manufacture.selectedBranch);
                CityResource.getAllCities({ GovernrateId: Manufacture.selectedGovernrate.GovernrateId, pageSize: 0 }).$promise.then(function (results) {

                    Manufacture.cities = Manufacture.cities.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.cityChange = function () {
            if (Manufacture.selectedCity.cityId != undefined) {
                /*for (var i = Manufacture.cities.length - 1; i >= 0; i--) {
                    if (Manufacture.cities[i].cityId == 0) {
                        Manufacture.cities.splice(i, 1);
                    }
                }*/
                Manufacture.areaList = [];
                Manufacture.selectedArea = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.areaList.push(Manufacture.selectedArea);

                Manufacture.branchList = [];
                Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchList.push(Manufacture.selectedBranch);
                AreaResource.getAllAreas({ cityId: Manufacture.selectedCity.cityId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.areaList = Manufacture.areaList.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.areaChange = function () {
            // Manufacture.areaList.splice(0, 1);
            Manufacture.branchList = [];
            Manufacture.selectedBranch = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchList.push(Manufacture.selectedBranch);
            if (Manufacture.selectedArea.areaId > 0)
                Manufacture.branchList = Manufacture.branchList.concat(Manufacture.selectedArea.branches);
        }

        Manufacture.departmentChange = function () {
            // Manufacture.areaList.splice(0, 1);

            Manufacture.categories = [];
            Manufacture.selectedCategory = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categories.push(Manufacture.selectedCategory);
            if (Manufacture.selectedDepartment.departmentId > 0)
                Manufacture.categories = Manufacture.categories.concat(Manufacture.selectedDepartment.categories);
        }
        Manufacture.countryId = 0;
        Manufacture.GovernrateId = 0;
        Manufacture.cityId = 0;
        Manufacture.areaId = 0;
        Manufacture.branchId = 0;
        Manufacture.departmentId = 0;
        Manufacture.categoryId = 0;

        Manufacture.branchManagerId = 0;
        Manufacture.technasianId = 0;
        Manufacture.from = "";
        Manufacture.to = "";
        Manufacture.applyFilter = function () {
            Manufacture.from = ""
            if ($('#fromdate').val() != "") {
                var fromDate = $('#fromdate').val().split('/')
                Manufacture.from = (new Date(fromDate[1] + "/" + fromDate[0] + "/" + fromDate[2])).toISOString().replace('Z', '');
            }
            Manufacture.to = ""
            if ($('#todate').val() != "") {
                var toDate = $('#todate').val().split('/')
                Manufacture.to = (new Date(toDate[1] + "/" + toDate[0] + "/" + toDate[2])).toISOString().replace('Z', '');
            }
            Manufacture.countryId = Manufacture.selectedCountry.countryId;
            Manufacture.GovernrateId = Manufacture.selectedGovernrate.GovernrateId;
            Manufacture.cityId = Manufacture.selectedCity.cityId;
            Manufacture.areaId = Manufacture.selectedArea.areaId;
            Manufacture.branchId = Manufacture.selectedBranch.branchId;
            Manufacture.branchManagerId = Manufacture.selectedBranchManager.userId;
            Manufacture.technasianId = Manufacture.selectedTechnician.userId;

            Manufacture.departmentId = Manufacture.selectedDepartment.departmentId;
            Manufacture.categoryId = Manufacture.selectedCategory.categoryId;
            Manufacture.status = Manufacture.selectedStatus;
            Manufacture.ticketFilterChange()
        }
        function loadTicketDashboard(tickets) {
            var assigned = [];
            var closed = [];
            var InProgress = [];
            var Pending = [];
            var Rejected = [];
            var Reassigned = [];
            var complete = [];
            tickets.forEach(function (element) {
                assigned.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.assignedCount
                })
                InProgress.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.inProgressCount
                })
                Pending.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.pendingCount
                })
                Rejected.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.rejectedCount
                })
                closed.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.closedCount
                })
                Reassigned.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.reassignedCount
                })
                complete.push({
                    x: element.xaxisName[$scope.selectedLanguage],
                    y: element.completedCount
                })
            }, this);
            Manufacture.data = [
                {
                    "key": $translate.instant('AssignedStatus'),
                    "values": assigned
                },
                {
                    "key": $translate.instant('InProgressStatus'),
                    "values": InProgress
                },
                {
                    "key": $translate.instant('Pending'),
                    "values": Pending
                },
                {
                    "key": $translate.instant('RejectedStatus'),
                    "values": Rejected
                },
                {
                    "key": $translate.instant('ClosedStatus'),
                    "values": closed
                },
                {
                    "key": $translate.instant('Reassigned'),
                    "values": Reassigned
                },
                {
                    "key": $translate.instant('completed'),
                    "values": complete
                }
            ];
        }
        init();

        Manufacture.ticketFilterChange = function () {
            dashboardResource.getTicketsDashboard({
                xaxis: Manufacture.selectedTicketFilter,
                countryId: Manufacture.countryId, GovernrateId: Manufacture.GovernrateId, cityId: Manufacture.cityId,
                areaId: Manufacture.areaId, branchId: Manufacture.branchId, from: Manufacture.from, to: Manufacture.to,
                departmentId: Manufacture.departmentId, categoryId: Manufacture.categoryId,
                branchManagerId: Manufacture.branchManagerId, technasianId: Manufacture.technasianId,
                status: Manufacture.status
            }).$promise
                .then(function (results) {
                    loadTicketDashboard(results)
                },
                function (data, status) {
                    blockUI.stop();

                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        //end ticket filter

        //start survey filter
        Manufacture.countrySurveyChange = function () {
            Manufacture.selectedGovernrateSurvey = { GovernrateId: 0, titleDictionary: { "en": "All Governrates", "ar": "كل الأقاليم" } };
            Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
            Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
            Manufacture.GovernratesSurvey = [];
            Manufacture.citiesSurvey = [Manufacture.selectedCitySurvey];
            Manufacture.areaListSurvey = [Manufacture.selectedAreaSurvey];
            Manufacture.GovernratesSurvey.push(Manufacture.selectedGovernrateSurvey);

            Manufacture.branchListSurvey = [];
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
            GovernrateResource.getAllGovernrates({ countryId: Manufacture.selectedCountrySurvey.countryId, pageSize: 0 }).$promise.then(function (results) {

                Manufacture.GovernratesSurvey = Manufacture.GovernratesSurvey.concat(results.results);
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            blockUI.stop();
        }
        Manufacture.GovernrateSurveyChange = function () {
            if (Manufacture.selectedGovernrateSurvey.GovernrateId != undefined) {
                Manufacture.citiesSurvey = [];
                Manufacture.areaListSurvey = [];
                Manufacture.selectedCitySurvey = { cityId: 0, titleDictionary: { "en": "All Cities", "ar": "كل المدن" } };
                Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.citiesSurvey.push(Manufacture.selectedCitySurvey);
                Manufacture.areaListSurvey = [Manufacture.selectedAreaSurvey];

                Manufacture.branchListSurvey = [];
                Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
                CityResource.getAllCities({ GovernrateId: Manufacture.selectedGovernrateSurvey.GovernrateId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.citiesSurvey = Manufacture.citiesSurvey.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.citySurveyChange = function () {
            if (Manufacture.selectedCitySurvey.cityId != undefined) {
                Manufacture.areaListSurvey = [];
                Manufacture.selectedAreaSurvey = { areaId: 0, titleDictionary: { "en": "All Areas", "ar": "كل المناطق" } };
                Manufacture.areaListSurvey.push(Manufacture.selectedAreaSurvey);

                Manufacture.branchListSurvey = [];
                Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
                Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
                AreaResource.getAllAreas({ cityId: Manufacture.selectedCitySurvey.cityId, pageSize: 0 }).$promise.then(function (results) {
                    Manufacture.areaListSurvey = Manufacture.areaListSurvey.concat(results.results);
                },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
            }
        }
        Manufacture.areaSurveyChange = function () {
            Manufacture.branchListSurvey = [];
            Manufacture.selectedBranchSurvey = { branchId: 0, titleDictionary: { "en": "All Branches", "ar": "كل الفروع" } };
            Manufacture.branchListSurvey.push(Manufacture.selectedBranchSurvey);
            if (Manufacture.selectedAreaSurvey.areaId > 0)
                Manufacture.branchListSurvey = Manufacture.branchListSurvey.concat(Manufacture.selectedAreaSurvey.branches);
        }

        Manufacture.departmentSurveyChange = function () {
            Manufacture.categoriesSurvey = [];
            Manufacture.selectedCategorySurvey = { categoryId: 0, titleDictionary: { "en": "All Categories", "ar": "كل الفئات" } };
            Manufacture.categoriesSurvey.push(Manufacture.selectedCategorySurvey);
            if (Manufacture.selectedDepartmentSurvey.departmentId > 0)
                Manufacture.categoriesSurvey = Manufacture.categoriesSurvey.concat(Manufacture.selectedDepartmentSurvey.categories);
        }
        Manufacture.countryIdSurvey = 0;
        Manufacture.GovernrateIdSurvey = 0;
        Manufacture.cityIdSurvey = 0;
        Manufacture.areaIdSurvey = 0;
        Manufacture.branchIdSurvey = 0;
        Manufacture.departmentIdSurvey = 0;
        Manufacture.categoryIdSurvey = 0;

        Manufacture.fromSurvey = "";
        Manufacture.toSurvey = "";

        Manufacture.applySurveyFilter = function () {
            blockUI.start("Loading...");
            Manufacture.fromSurvey = ""
            if ($('#fromdateSurvey').val() != "") {
                var fromDateSurvey = $('#fromdateSurvey').val().split('/')
                Manufacture.fromSurvey = (new Date(fromDateSurvey[1] + "/" + fromDateSurvey[0] + "/" + fromDateSurvey[2])).toISOString().replace('Z', '');
            }
            Manufacture.toSurvey = ""
            if ($('#todateSurvey').val() != "") {
                var toDateSurvey = $('#todateSurvey').val().split('/')
                Manufacture.toSurvey = (new Date(toDateSurvey[1] + "/" + toDateSurvey[0] + "/" + toDateSurvey[2])).toISOString().replace('Z', '');
            }
            Manufacture.countryIdSurvey = Manufacture.selectedCountrySurvey.countryId;
            Manufacture.GovernrateIdSurvey = Manufacture.selectedGovernrateSurvey.GovernrateId;
            Manufacture.cityIdSurvey = Manufacture.selectedCitySurvey.cityId;
            Manufacture.areaIdSurvey = Manufacture.selectedAreaSurvey.areaId;
            Manufacture.branchIdSurvey = Manufacture.selectedBranchSurvey.branchId;

            Manufacture.departmentIdSurvey = Manufacture.selectedDepartmentSurvey.departmentId;
            Manufacture.categoryIdSurvey = Manufacture.selectedCategorySurvey.categoryId;
            Manufacture.AnsweredBy = Manufacture.selectedAnswersUser.userId;

            AnswerQuestionResource.getAllQuestions({
                catgoryTypeId: Manufacture.selectedCategoryType.categoryTypeId,
                departmentId: Manufacture.departmentIdSurvey, categoryId: Manufacture.categoryIdSurvey
            }).$promise.then(function (results) {
                Manufacture.questionList = results.results;

                blockUI.stop();
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        //end survey filter
        Manufacture.getQuestionDashbard = function (question) {
            question.isloading = true;
            QuestionResource.getQuestionDashBoard({
                questionId: question.questionId,
                countryId: Manufacture.countryIdSurvey, GovernrateId: Manufacture.GovernrateIdSurvey, cityId: Manufacture.cityIdSurvey,
                areaId: Manufacture.areaIdSurvey, branchId: Manufacture.branchIdSurvey, from: Manufacture.fromSurvey, to: Manufacture.toSurvey,
                AnsweredBy: Manufacture.AnsweredBy
            }).$promise
                .then(function (results) {
                    question.dashboard = results;
                    question.isloading = false;
                    if (question.questionTypeId == 0) {
                        question.data = []
                        if (question.dashboard.optionsCount != undefined) {
                            for (var element in question.dashboard.optionsCount) {
                                question.data.push({
                                    key: ($filter('filter')(question.questionDetailses, { questionDetailsId: element }))[0].titleDictionary[$scope.selectedLanguage],
                                    y: question.dashboard.optionsCount[element]
                                })
                            }

                            question.options = {
                                chart: {
                                    type: 'pieChart',
                                    height: 350,
                                    x: function (d) { return d.key; },
                                    y: function (d) { return d.y; },
                                    showLabels: true,
                                    duration: 500,
                                    // labelThreshold: 0.01,
                                    // labelSunbeamLayout: true,
                                    legend: {
                                        margin: {
                                            top: 5,
                                            right: 35,
                                            bottom: 5,
                                            left: 0
                                        }
                                    }
                                }
                            };
                        }
                    }
                    if (question.questionTypeId == 1) {
                        question.data = [
                            {
                                key: $translate.instant('onestar'),
                                y: question.dashboard.oneStartCount
                            },
                            {
                                key: $translate.instant('twostar'),
                                y: question.dashboard.twoStartCount
                            },
                            {
                                key: $translate.instant('threestar'),
                                y: question.dashboard.threeStartCount
                            },
                            {
                                key: $translate.instant('fourstar'),
                                y: question.dashboard.fourStartCount
                            },
                            {
                                key: $translate.instant('fivestar'),
                                y: question.dashboard.fiveStartCount
                            }
                        ]
                        question.options = {
                            chart: {
                                type: 'pieChart',
                                height: 350,
                                x: function (d) { return d.key; },
                                y: function (d) { return d.y; },
                                showLabels: true,
                                duration: 500,
                                // labelThreshold: 0.01,
                                // labelSunbeamLayout: true,
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 35,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }
                        };
                    }
                    if (question.questionTypeId == 2) {
                        question.data = [
                            {
                                key: $translate.instant('LikeLbl'),
                                y: question.dashboard.likeCount
                            },
                            {
                                key: $translate.instant('DisLikeLbl'),
                                y: question.dashboard.disLikeCount
                            }
                        ]
                        question.options = {
                            chart: {
                                type: 'pieChart',
                                height: 300,
                                x: function (d) { return d.key; },
                                y: function (d) { return d.y; },
                                showLabels: true,
                                donut: true,
                                pie: {
                                    startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2 },
                                    endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2 }
                                },
                                // labelThreshold: 0.01,
                                // labelSunbeamLayout: true,
                                legend: {
                                    margin: {
                                        top: 5,
                                        right: 35,
                                        bottom: 5,
                                        left: 0
                                    }
                                }
                            }
                        };
                    }
                },
                function (data, status) {
                    question.isloading = false;
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
        }
        blockUI.stop();

        Manufacture.exportPDF = function(){
         //   canvg(document.getElementById('cc'),document.getElementById('surveyDiv').innerHTML)
            
            html2canvas(document.getElementById('surveyDiv')).then(function(canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        height:canvas.height,
                        width:500   
                    }],
                    // pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                    //     return currentNode.startPosition.top >= 650;
                    //     }
                };
                pdfMake.createPdf(docDefinition).download("test.pdf");
            });
//             html2canvas(document.getElementById('surveyDiv'), {
//                 renderer:function(canvas){
// var k = canvas;
//                 },
//                 onrendered: function (canvas) {
//                     var data = canvas.toDataURL();
//                     var docDefinition = {
//                         content: [{
//                             image: data,
//                             width: 500,
//                         }]
//                     };
//                     pdfMake.createPdf(docDefinition).download("test.pdf");
//                 }
//             });
        }


    }

}());