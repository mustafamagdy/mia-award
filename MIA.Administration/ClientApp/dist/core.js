(function() {
    "use strict";

    angular.module("core", [
        "ngResource",
        "ui.router",
        "ngStorage",
        "permission",
        "bw.paging",
        "ui.event",
        "ngProgressLite",
        "ui.bootstrap",
        "pascalprecht.translate",
        "blockUI",
        "ui.carousel",
        "angular.filter",
        "ncy-angular-breadcrumb",
        "angular-jwt",
        "rzSlider",
        // "datatables"
        // "jwt-decode"
        // 'base64',
    ]);
})();;(function() {
  "use strict";
  angular.module("home", ["core"]);
})();
;(function() {
  'use strict';

  angular
      .module('core')
      // registering 'lodash' as a constant to be able to inject it later
      .constant('_', window._)
      .run(function($rootScope, $state, $stateParams,blockUIConfig) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        blockUIConfig.autoBlock = false;
        
      })
/*      .config(function($mdThemingProvider, $mdIconProvider) {
        // angular material design configs
        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128);

        // use default purble color for now - uncomment to change colors
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('orange');
      })*/;

      
}());
;(function () {
    const apiBaseUrl = "http://localhost:62912";
    // const apiBaseUrl = "";
    angular
        .module("core")
        .constant("appCONSTANTS", {
            API_URL: `${apiBaseUrl}/api/`,

            defaultLanguage: "ar",
            supportedLanguage: {
                en: { key: "en", value: "english" },
                ar: { key: "ar", value: "arabic" }
            }
        })
        .constant("messageTypeEnum", {
            success: 0,
            warning: 1,
            error: 2
        })
        .constant("status", {
            StatusList: [
                { Id: 0, shortName: 'Waiting' },
                { Id: 1, shortName: 'Confirmed' },
                { Id: 2, shortName: 'Rejected' },
            ]
        })
        .constant("awardType", {
            TypeList: [
                { Id: 1, shortName: 'Person' },
                { Id: 0, shortName: 'Artwork' }
            ]
        })
        .constant("userRolesEnum", {
            GlobalAdmin: "GlobalAdmin"
        });
})();;(function() {
    'use strict';

    angular
        .module('core')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            // main views
            $stateProvider
              .state('root', {
                    url: '/',
               
                    controller: 'loginController',
                   
                    data: {
                       permissions: {
                          
                        }
                    },
                 
                })
                .state('login', {
                    url: '/login',
                    templateUrl: './app/core/login/templates/login.html',
                    'controller': 'loginController'
                })
                .state('403', {
                    url: '/403',
                    templateUrl: './app/shell/403.html'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: './app/shell/404.html'
                })
                .state('401', {
                    url: '/401',
                    templateUrl: './app/shell/401.html'
                })
        });
    
}());
;
angular.module('core')

  .directive('equalto', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        otherModelValue: '=equalto'
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.equalto = function(modelValue) {
          return modelValue == scope.otherModelValue.$modelValue;
        };
        scope.$watch('otherModelValue.$modelValue', function() {
          ngModel.$validate();
        },true);

      }
    };
  }

)
.directive('numbersOnly', function () {
  return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
              if (text) {
                  var transformedInput = text.replace(/[^0-9]/g, '');

                  if (transformedInput !== text) {
                      ngModelCtrl.$setViewValue(transformedInput);
                      ngModelCtrl.$render();
                  }
                  return transformedInput;
              }
              return undefined;
          }            
          ngModelCtrl.$parsers.push(fromUser);
      }
  };
})
.directive('loadingPane', function ($timeout, $window) {
  return {
      restrict: 'A',
      link: function (scope, element, attr) {
          var directiveId = 'loadingPane';

          var targetElement;
          var paneElement;
          var throttledPosition;

          function init(element) {
              targetElement = element;

              paneElement = angular.element('<div>');
              paneElement.addClass('loading-pane');

              if (attr['id']) {
                  paneElement.attr('data-target-id', attr['id']);
              }

              var spinnerImage = angular.element('<div>');
              spinnerImage.addClass('spinner-image');
              spinnerImage.appendTo(paneElement);

              angular.element('body').append(paneElement);

              setZIndex();

              //reposition window after a while, just in case if:
              // - watched scope property will be set to true from the beginning
              // - and initial position of the target element will be shifted during page rendering
              $timeout(position, 100);
              $timeout(position, 200);
              $timeout(position, 300);

              throttledPosition = _.throttle(position, 50);
              angular.element($window).scroll(throttledPosition);
              angular.element($window).resize(throttledPosition);
          }

          function updateVisibility(isVisible) {
              if (isVisible) {
                  show();
              } else {
                  hide();
              }
          }

          function setZIndex() {                
              var paneZIndex = 500;

              paneElement.css('zIndex', paneZIndex).find('.spinner-image').css('zIndex', paneZIndex + 1);
          }

          function position() {
              paneElement.css({
                  'left': targetElement.offset().left,
                  'top': targetElement.offset().top - $(window).scrollTop(),
                  'width': targetElement.outerWidth(),
                  'height': targetElement.outerHeight()
              });
          }

          function show() {
              paneElement.show();
              position();
          }

          function hide() {
              paneElement.hide();
          }

          init(element);

          scope.$watch(attr[directiveId], function (newVal) {
              updateVisibility(newVal);
          });

          scope.$on('$destroy', function cleanup() {
              paneElement.remove();
              $(window).off('scroll', throttledPosition);
              $(window).off('resize', throttledPosition);
          });
      }
  };
});
;
;(function () {
  'use strict';

  angular
    .module('core').config(["$translateProvider", "appCONSTANTS", function ($translateProvider, appCONSTANTS) {

      var en_translations = {
        "PhoneLengthError320": "digits must be from 3 :20",
        "FirstNameLbl": "FirstName",
        "LastNameLbl": "lastName",
        "EmailLbl": "Email",
        "NameLengthError": "Name is required",
        "FirstNameLengthError": "FirstName is required",
        "LastNameLengthError": "LastName is required",
        "EmailLengthError": "Email is required",
        "PhoneReqError": "Phone is required",
        "PhoneLengthError": "digits must be 11",
        "NameLengthError": "character must be from 11 :50",
        "NameLengthError3": "character must be from 3 :50",
        "NameLengthError200": "character must be from 11 :200",
        "NameLengthError255": "character must be from 11 :255",
        "NameLengthError3": "character must be from 3 :255",
        "NotPhoneNumber": "please enter numbers only",
        "PasswordLengthError": "Password is required",
        "UserPasswordLbl": "password",
        "NewUser": "New User",
        "EditUser": "Edit User",
        "ConfirmPasswordLbl": "Confirm password",
        "saveChangesBtn": "save changes",
        "DiscardBtn": "Discard",
        "LimitUserValidation": "Must be at least 1 user",
        "AddUserBtn": "Add new user",
        "BasicInfoLbl": "Basic Info",
        "NextLbl": "Next",
        "userName": "UserName",
        "userDistributer": "user Distributer",
        "userManufacture": "user Manufacturer",
        "userRetailer": "user Retailer",
        "StatusLbl": "Disable/Enable",
        "ProductTitleLbl": "Product Title",
        "ProductDescLbl": "Product Desc",
        "Edit": "Edit",
        "userlimitLbl": "Limit",
        "concumerLbl": "Consumer User",
        "startDateLbl": "Start Date",
        "enddateLbl": "End Date ",
        "AddProductBtn": "Add Product",
        "Products": "Products",
        "user": "Users",
        "logoutBtn": "logout",
        "TextOnly": "Text Only",
        "passworddontmatch": "Passwords don't match",
        "WrongMail": "invalid Email",
        "ApiUrlLbl": "Website Url",
        "Wrongapi": " Wrong Website Url",
        "requiredApi": "Website Url  is required",
        "productEditSuccess": "Update Edit Success",
        "productAddSuccess": "Update Add Success",
        "product": "Product",
        "englishName": "English Name",
        "arabicName": "Arabic Name",
        "english": "english",
        "arabic": "arabic",
        "View": "View",
        "NousertypesAvailable": "No user's types Available",
        "AddBtn": "Add",
        "Name": "Name",
        "status": "Status",
        "Static": "Static",
        "NewUserTypeLbl": "New User Type",
        "NoRolesAvailable": "No Role Available",
        "NewRoleLbl": "New Role",
        "Permission": "Permission",
        "SelectGroups": "Select Groups",
        "UserType": "User Type",
        "Role": "Role",
        "Area": "Area",
        "phoneLbl": "Mobile number",
        "AddedSuccessfully": "Added Successfully",
        "Editeduccessfully": "Edited Successfully",
        "DeletedSuccessfully": "Deleted Successfully",
        "Answers": "Answers",
        "noAnswersLbl": "There is no answers",
        "fromLbl": "from",
        "toLbl": "to",
        "AddNewNewsBtn": "Add News",
        "requiredErr": "Required",
        "Dynamic": "Dynamic",
        "Question": "Question",
        "AnswerQuestion": "Answers Questions",
        "titleLbl": "Title",
        "descLbl": "Description",
        "AddImageBtn": "Add image",
        "Pending": "Pending",
        "Assigned": "Assigned To",
        "InProgress": "In Progress by",
        "Closed": "Closed by",
        "Rejected": "Rejected by",
        "DetailsBtn": "View details",
        "AssignedBtn": "Assigned to",
        "CreateMap": "Create Map",
        "NewsLbl": "News",
        "isBasic": "isBasic",
        "NoContactTypeAvailable": "No Contact Type Available",
        "selectTech": "Select Technacian",
        "ApproveBtn": "Approve",
        "CloseBtn": "Close",
        "RejectBtn": "Reject",
        "commentLbl": "Comment",
        "Creator": "Created by",
        "CreatTime": "Creation time",
        "AssignedBy": "Assigned by",
        "AssignedTime": "Assigned time",
        "image": "Image",
        "employee": "Employee",
        "Tech": "Technacian",
        "DashboardLbl": "Dashboard",
        "RejectedStatus": "Rejected",
        "QuestionType": "Question Type",
        "Checkbox": "Checkbox",
        "Rate": "Rate",
        "value": "Promotion Value",
        "note": "note",
        "questionAr": "Option arabic",
        "RemoveBtn": "Remove",
        "dateLbl": "Date",
        "NoCountriesAvailable": "No Countries Available",
        "NewCountry": "New Country",
        "EditCountry": "Edit Country",
        "Country": "Country",
        "EditGovernrate": "Edit Governrate",
        "selectedManufacture": "you must select Manufacture",
        "NoGovernratesAvailable": "No Governrates Available",
        "NewGovernrate": "New Governrate",
        "Governrate": "Governrate",
        "NoCitiesAvailable": "No Cities Available",
        "NewCity": "New City",
        "City": "City",
        "viewGovernrates": "view Governrates",
        "viewCities": "view cities",
        "EditCities": "Edit cities",
        "allTechnasian": "All technicians",
        "AllLbl": "All",
        "categoryType": "News Type",
        "NoQuestionsAvailable": "There is no questions available",
        "NewcategoryTypeLbl": "New category type",
        "allUsers": "All users",
        "NocategoryTypesAvailable": "There is no category types available",
        "Completed": "Completed",
        "CompleteBtn": "Complete",
        "modifyBy": "Modify by",
        "modifyTime": "Modification date",
        "PreviousBtn": "Previous",
        "NextBtn": "Next",
        "Project": "Project",
        "Vendor": "Vendor",
        "addressLbl": "Address",
        "totalService": "Total Service",
        "price": "Total Price",
        "service": "service",
        "percentage": "percentage",
        "PaymentMethod": "Payment Method",
        "urlErrorLbl": "Sorry Not a Valid URL, Don't Forget to Use http://",
        "NoProjectsAvailable": "No Projects Available",
        "NoVendorsAvailable": "No Vendors Available",
        "NoServicesAvailable": "No Services Available",
        "Debit": "Debit",
        "Credit": "Credit",
        "Recevied": "Recevied",
        "NotRecevied": "Not Recevied",
        "priceLengthError": "Price Length Error",
        "from0to100": "Percentage from 0 to 100",
        "ProductsBtn": "View Products",
        "NoProductAvailable": "there is no Products.",
        "AddProductBtn": "Add new Product",
        "ProductAddSuccess": "Product added successfully.",
        "NewProduct": "New Product",
        "UpdateProductLbl": "Update Product",
        "Pricelbl": "Price",
        "ProductDeleteSuccess": "Product deleted successfully.",
        "RecommendedProductImage": "Recommended dimension 423 x 139",
        "Status": "Status",
        "Day": "Day",
        "SelectProducts": "Select Products",
        "Step": "Step",
        "Save": "Save",
        "Edit": "Edit",
        "NameLengthError255": "Characters between 11 : 255",
        "saveUser": "Save User",
        "FirstName": "First Name",
        "lastName": "Last Name",
        "AddressDescription": "Address Description",
        "Product": "Product",
        "ValidateUser": "Validate User",
        "MakeOrder": "Make Order",
        "Order": "Order",
        "Pickup": "Pickup",
        "OrderType": "Order Type",
        "SelectAddress": "Select Address",
        "search": "search",
        "searchbyRetailerName": " search by Retailer Name",
        "SearchbyOrderNo": "Search by Order No",
        "SearchbyBasketNo": "Search by Basket No",
        "BaiscInfo": "Baisc Info",
        "Summary": "Summary",
        "orderPickDateTime": "Order Date Time",
        "Settings": "Settings",
        "searchbyProductName": " search by Product Name",
        "Total": "Total",
        "AddNew": "Add New",
        "costlbl": "cost",
        "PriceBeforeDiscount": "Price Before Discount",
        "PriceAfterDiscount": "Price After Discount",
        "NoNewssAvailable": "No News Available",
        "mustchooseProduct": "Must Choose an Product",
        "imageTypeError": "Image Type Error",
        "imgaeSizeError": "Image Size Error",
        "OrderCode": "Order Code",
        "Date": "Date",
        "startDate": "Start Date",
        "Payment": "Payment",
        "Ordertype": "Order Type",
        "OnTheWay": "On The Way",
        "description": "Description",
        "Creationdate": "Creation Date",
        "orderdetails": "Order Details",
        "Preperied": "Prepared",
        "SendVer": "Send Verification",
        "None": "None",
        "Both": "Both",
        "AllowPause": "Allow Pause",
        "deleteConfirmationLbl": "Are you sure you want to delete: ",
        "messageConfirmationLbl": " Are you sure you want to finish judge on this artwork",
        "deleteBtn": "Delete",
        "cancelBtn": "Cancel",
        "refresh": "Refresh",
        "Reports": "Reports",
        "maxlength": "Length Error",
        "wrongpattern": "wrong pattern",
        "MakeitPrepering": "Make it Prepering",
        "NoPickupsAvailable": "No Pickups Available",
        "PromotionLbl": "Promotion",
        "NewPromotionLbl": "New Promotion",
        "UpdatePromotionLbl": "Update Promotion",
        "NoPromotionAvailable": "No Promotion Available",
        "CheckPromotion": "Check Promotion",
        "SizeLengthError": "Name length must be 1-10 characters.",
        "DescLengthError": "Description length must be 3-300 characters.",
        "englishdescLbl": "English Description",
        "arabicdescLbl": "Arabic Description",
        "UploadImageBtn": "Select Image",
        "SelectNews": "Select category",
        "addProductBtn": "Add Product",
        "Length": "Length",
        "codeLbl": "Code",
        "AddressLbl": "Address ",
        "websiteLbl": "Web Site",
        "ManfactureLbl": " Manfacture",
        "infoLbl": "Address & Location Information",
        "GovernateLbl": "Governate",
        "RequiredLbl": "Required !",
        "NotvalidLbl": "Notvalid",
        "First": "First",
        "VillageLbl": "Village",
        "CityLbl": "City",
        "DistrictLbl": "District",
        "PoliceStationLbl": "Police Station",
        "LblCenter": "Center",
        "AreaLbl": "Area",
        "EMail": "E-Mail",
        "mobileNo": "Mobile No. ",
        "Title": "Title",
        "AddtoTable": "Add To Table",
        "goBack": "go Back",
        "ContactType": "Contact Type",
        "NewContactType": "New Contact Type",
        "EditContactType": "Edit Contact Type",
        "Action": "Action",
        "taxnumber": "Tax No.",
        "Regnumber": "landline No.",
        "Choose_Manufacture": "Choose Manufacturer",
        "SKU": "SKU",
        "NewRetailer": "New Retailer",
        "EditRetailer": "Edit Retailer",
        "RetailerLbl": "Retailer",
        "DistributorLbl": "Distributer",
        "ManufactureLbl": "Manufacturer",
        "basic": "basic",
        "NewSKU": "NewSKU",
        "CompanyLogo": "Company logo",
        "NoDistributorssAvailable": "No Distributers Available",
        "Zone": "Zone",
        "EGP": "EGP",
        "ZoneRelationLbl": "Zone",
        "ZoneDetails": "Zone Details",
        "ZoneRelation": "Zone Relation",
        "ListOfProduct": "List Of Product",
        "Addtotable": "Add to table",
        "UploadPhoto": "Upload  Photo",
        "ContactInformation": "Contact Information",
        "commercialInformation": "commercial Information",
        "CreateZoneRelation": "Create Zone Relation",
        "EditZoneRelation": "Edit Zone Relation",
        "ListOfRetailer": "List Of Retailer",
        "Selcted": "Selected",
        "UnSelcted": "UnSelected",
        "FullName": "FullName",
        "ChooseDistributer": "Choose Distributer",
        "ChooseRetailer": "Choose Retailer",
        "ChooseProduct": "Choose Product",
        "DistributorZone": "Distributer Zone",
        "RetailerZone": "Retailer Zone",
        "ProductDetails": "Product Details",
        "EditDistributor": "Edit Distributer",
        "NewDistributor": "New Distributer",
        "EditManufactureL": "Edit ManufacturerL",
        "NewManufactureL": "New ManufacturerL",
        "NewProductDetails": "New Product Details",
        "editProductDetails": "edit Product Details",
        "Region": "Region",
        "EditRoleLbl": "Edit Role",
        "searchbyGovernrateName": " search by Governrate Name",
        "EditSKU": "Edit SKU",
        "NoSKUsAvailable": "No SKUs Available",
        "DistributorZones": "Distributer Zones",
        "RetailerZones": "Retailer Zones",
        "NewZoneDetails": "New Zone Details",
        "editZoneDetails": "edit Zone Details",
        "OrderNo": "Order No.",
        "BasketNo": "Basket No.",
        "Quantity": "Quantity",
        "ForwordSelected": "Forword Selected",
        "CancelSelected": "Cancel Selected",
        "logout": "logout",
        "NameError": "Name Required! ",

        "logout": "logout",
        "OrderDetails": "Order Details",
        ////////////////////////////////////////////

        "ArtWork": "Art Work",
        "Award": "Award",
        "VotingCriteria": "Voting Criteria",
        "PhotoAlbum": "Photo Album",
        "DisplayEposides": "Display Eposides",
        "StartJudge": "Start judging",
        "JudgeArtWorkLbl": "Judging ArtWork",

      }
      var ar_translations = {
        "OrderDetails": "تفاصيل الطلب",
        "logout": "خروج",
        "Quantity": "كمية",
        "ForwordSelected": "تحويل الكل",
        "CancelSelected": "الغاء الكل",
        "OrderNo": "رقم الطلب",
        "BasketNo": "رقم السله",
        "NewZoneDetails": "اضافه تفاصيل مناطق جديده",
        "editZoneDetails": "تعديل تفاصيل المنطقه",
        "DistributorZones": "مناطق التوزيع",
        "RetailerZones": "مناطق محلات",
        "userDistributer": "مستخدم الموزع",
        "userManufacture": " مستخدم المصتع",
        "userRetailer": "مستخدم المحل",
        "EditSKU": " تعديل وحده ضيط المتجر",
        "EditRoleLbl": "تعديل المحل",
        "goBack": "رجوع",
        "Regions": "مناطق",
        "Region": "المنطقه",
        "editProductDetails": "تعديل تفاصيل المنتج",
        "searchbyGovernrateName": " بحث باسم الاقليم",
        "NewManufactureL": "اسم مصنع جديد",
        "NewDistributor": "اسم موزع جديد",
        "EditDistributor": " تعديل اسم الموزع ",
        "EditCities": "تعديل البلاد",
        "NewProductDetails": "تفاصيل لمنتج جديد",
        "ProductDetails": "تفاصيل المنتج",
        "barCode": "الباركود",
        "blockOnDate": "منع الطلب عند",
        "IsPromoteProduct": "يظهر في العرض",
        "minQty": "الحد الادني للطلب",
        "RetailerZone": "مناطق المحلات",
        "NewRetailer": "محل جديد",
        "DistributorZone": "مناطق المصانع",
        "IOO": "مدير العمليات ",
        "ChooseProduct": "اختيار منتج",
        "All Orders": "كل الطلبات",
        "Manufacture Orders": "طلبان المصنع",
        "addyouraddresshere": "اضافه عنوانك",
        "searchbyRetailerName": " بحث باسم المحل",
        "SearchbyOrderNo": "بحث برقم الطلب",
        "SearchbyBasketNo": "بحث برقم السله",
        "EGP": "جنيه مصري",
        "IOA": "اداره العمليات",
        "ChooseRetailer": "اختيار محل",
        "ChooseDistributer": "اختيار موزع",
        "Selcted": "المحدد",
        "UnSelcted": "غير المحدد",
        "isBasic": "رئيسي",
        "ListOfRetailer": "قائمه المحلات",
        "EditZoneRelation": "تعديل منطقه التوزيع",
        "CreateZoneRelation": "انشاء منطقه التوزيع",
        "commercialInformation": "معلومات التجاريه",
        "ContactInformation": "طرق التواصل",
        "Addtotable": "اضافه الي الجدول",
        "MobileNo": "رقم الموبيل ",
        "ListOfProduct": "قائمه المنتجات",
        "ZoneRelation": "علاقات مناطق التوزيع ببعضها",
        "ZoneDetails": "تفاصيل منطقه التوزيع",
        "ZoneRelationLbl": "منطقه التوزيع",
        "Zone": "منطقه التوزيع",
        "Nextstep": "الخطوه القادمه",
        "PreviousStep": "الخطوه السابقه",
        "Third step": "الخطوه الثالثه",
        "Second step": "الخطوه الثانيه",
        "First step": "الخطوه الاولي",
        "NoDistributorssAvailable": "لا يوجد موزع متاح",
        "CompanyLogo": "لوجو الشركه",
        "NoSKUsAvailable": "لا يوجد مناطق متاحه",
        "NewSKU": "وحده ضبط المتجر جديده",
        "basic": "الاساسيه",
        "selectedManufacture": "يجب اختيار مصنع",
        "ManufactureLbl": "المصنع",
        "EditManufactureL": "تعديل المصنع",
        "DistributorLbl": "الموزع",
        "EditRetailer": "تعديل المحل",
        "RetailerLbl": "المحل",
        "Retailer": "المحل",
        "SKU": "وحده ضبط المتجر",
        "CreateMap": "اضافه خريطه",
        "Choose_Manufacture": "اختيار المصنع",
        "Regnumber": "الرقم الارضي ",
        "search": "بحث",
        "taxnumber": "رقم الفاكس",
        "EMail": "الايميل",
        "mobileNo": "رقم الموبيل  ",
        "Title": "العنوان",
        "AddtoTable": "اضافه الي الجدول",
        "ContactType": "طرق التواصل ",
        "EditContactType": "تعديل طرق التواصل ",
        "NewContactType": "طريقه تواصل جديده ",
        "Account": "حساب",
        "All": "الكل",
        "undefined": "غير موجود",
        "Action": "حدث",
        "AreaLbl": "محيط",
        "LblCenter": "مركز",
        "AddNew": "اضافه جديده ",
        "PoliceStationLbl": "القسم",
        "DistrictLbl": "منطقة",
        "CityLbl": "مدينه",
        "VillageLbl": "القريه",
        "First": "الاول",
        "NotvalidLbl": "غير صحيح ",
        "addyouraddresshere": "اضافه عنوانك",
        "RequiredLbl": "مطلوب !",
        "NameError": "الاسم مطلوب",
        "UploadPhoto": "تنزيل صوره",
        "GovernateLbl": "المحافظه",
        "infoLbl": "ِالعنوان و معلومات الموقع",
        "ManfactureLbl": "مصنع",
        "websiteLbl": "الموقع الالكتروني",
        "AddressLbl": "العنوان ",
        "codeLbl": "كود",
        "Length": "الطول",
        "CheckPromotion": "تحقق الترويج",
        "PriceShouldbeMoreThanCost": "يجب أن يكون السعر أكثر من التكلفة",
        "PromotionLbl": "ترويج",
        "NewPromotionLbl": " ترويج جديد",
        "UpdatePromotionLbl": "تحديث ترويج",
        "NoPromotionAvailable": "لا يوجد ترويج متاح",
        "NoContactTypeAvailable": "لا يوجد طرق تواصل",
        "wrongpattern": "نمط خاطئ",
        "maxlength": "خطأ في عدد الارقام",
        "Reports": "التقارير",
        "refresh": "تحديث",
        "deleteBtn": "مسح",
        "cancelBtn": "الغاء",
        "messageConfirmationLbl": "هل أنت متأكد من أنك تريد مسح: ",
        "deleteConfirmationLbl": "هل أنت متأكد أنك تريد إنهاء الحكم على هذا العمل الفني ",
        "OnTheWay": "في الطريق",
        "description": "الوصف",
        "Creationdate": "تاريخ الانشاء",
        "orderdetails": "تفاصيل الطلب",
        "SendVer": "ارسال التأكيد",
        "None": "لا شيء",
        "Both": "الاثنين",
        "Date": "التاريخ",
        "Payment": "الدفع",
        "Ordertype": "نوع الطلب",
        "OrderCode": "كود الطلب",
        "imgaeSizeError": "خطأ في حجم الصورة",
        "imageTypeError": "خطأ في نوع الصورة",
        "mustchooseProduct": "يجب ان تختار عنصر",
        "NoNewssAvailable": "لا يوجد اخبار متاحه",
        "PriceBeforeDiscount": "سعر قبل الخصم",
        "PriceAfterDiscount": "سعر بعد الخصم",
        "Total": "مجموع",
        "costlbl": "التكلفه",
        "Settings": "الإعدادات",
        "Pickup": "امسك",
        "orderPickDateTime": "وقت الطلب",
        "FirstName": "الاسم الاول",
        "lastName": "الاسم الاخير",
        "AddressDescription": "وصف العنوان",
        "Product": "منتج",
        "ValidateUser": "التأكد من العميل",
        "MakeOrder": "طلب",
        "Order": "طلب",
        "Pickup": "استلام من الفرع",
        "Deivery": "التوصيل",
        "OrderType": "نوع الطلب",
        "SelectAddress": "اختر العنوان",
        "BaiscInfo": "معلومات اساسيه",
        "saveUser": "حفظ مستخدم",
        "Status": "الحالة",
        "Day": "اليوم",
        "SelectProducts": "اختر العناصر",
        "Step": "خطوة",
        "PreviousStep": "الخطوة السابقه",
        "NextStep": "الخطوة التاليه",
        "Save": "حفظ",
        "Edit": "تعديل",
        "NameLengthError255": "الحروف بين 11 : 255 حروف",
        "NameLengthError3": "الحروف بين 3 : 255 حروف",
        "RecommendedProductImage": "423 x 139 البعد الموصى به",
        "ProductsBtn": "عرض منتجات",
        "NoProductAvailable": ".لا يوجد منتاجات",
        "AddProductBtn": "اضف منتج جديد",
        "ProductAdd ccess": ".تم ادخال منتج بنجاح",
        "NewProduct": "منتج جديد",
        "UpdateProductLbl": "تحديث المنتج",
        "searchbyProductName": " بحث باسم المنتج",
        "FullName": "الاسم بالكامل",
        "Pricelbl": "السعر",
        "ProductDeleteSuccess": ".تم حذف المنتج بنجاح",
        "from0to100": "النسبه من 0 الي 100",
        "priceLengthError": "خطأ في السعر",
        "Recevied": "استلمت",
        "NotRecevied": "لم تستلم",
        "Credit": "دائن",
        "Debit": "مدين",
        "PhoneLengthError320": "يجب أن تكون الأرقام من 3: 20",
        "NoServicesAvailable": "لا يوجد خدمات متاحه ",
        "NoVendorsAvailable": "لا يوجد بائع متاح",
        "NoProjectsAvailable": "لا يوجد مشاريع متاحه",
        "urlErrorLbl": "عذرًا ، ليس عنوان URL صالحًا ، لا تنس أن تستخدم http: //",
        "service": "خدمه",
        "percentage": "نسبه",
        "PaymentMethod": "طريقة الدفع",
        "price": "المجموع",
        "totalService": "مجموع الخدمات",
        "addressLbl": "العنوان",
        "Project": "المشروع",
        "Vendor": "البائع",
        "PreviousBtn": "السابق",
        "NextBtn": "التالي",
        "Editeduccessfully": "تم التعديل بنجاح",
        "AddedSuccessfully": "تمت الاضافة بنجاح",
        "DeletedSuccessfully": "تم الحذف بنجاح",
        "phoneLbl": "رقم الجوال",
        "users": "المستخدمين",
        "Area": "منطقه",
        "Role": "دور",
        "UserType": "نوع المستخدم",
        "SelectGroups": "اختر المجموعات",
        "Permission": "اذن",
        "NewRoleLbl": "دور جديد",
        "NoRolesAvailable": "لا يوجد دور",
        "NewUserTypeLbl": "نوع مستخدم جديد",
        "NewUser": "مستخدم جديد",
        "EditUser": "تعديل المستخدم",
        "Static": "ثابته",
        "status": "الحالة",
        "Name": "الاسم",
        "AddBtn": "اضافة",
        "NousertypesAvailable": "لا يوجد أنواع للمستخدم",
        "FirstNameLbl": "الاسم الاول",
        "LastNameLbl": "الاسم الثاني",
        "EmailLbl": "البريد الالكتروني",
        "FirstNameLengthError": "اسم المستخدم الاول مطلوب",
        "LastNameLengthError": "اسم المستخدم الثاني مطلوب",
        "EmailLengthError": "البريد الالكتروني مطلوب",
        "PhoneReqError": "رقم الهاتف مطلوب",
        "NameLengthError3": "يجب أن تكون الحروف من 3 : 50",
        "NameLengthError200": "يجب أن تكون الحروف من 11 : 200",
        "NameLengthError255": "يجب أن تكون الحروف من 11 : 255",
        "PhoneLengthError": "يجب أن تكون الأرقام 11",
        "NotPhoneNumber": "برجاء إدخال أرقام فقط",
        "PasswordLengthError": "كلمه المرور مطلوبه",
        "UserPasswordLbl": "كلمة مرور  ",
        "ConfirmPasswordLbl": "تأكيد كلمه المرور",
        "saveChangesBtn": "حفظ",
        "DiscardBtn": "تجاهل",
        "LimitUserValidation": "لابد من اختيارعلي الاقل مستخدم واحد",
        "AddUserBtn": "اضافه عميل جديد",
        "BasicInfoLbl": "البيانات الاساسيه",
        "NextLbl": "التالي",
        "userName": "اسم المستخدم",
        "StatusLbl": "مفعل / غير مفعل",
        "ProductTitleLbl": "اسم المنتج",
        "ProductDescLbl": "شرح المنتج",
        "Edit": "تعديل",
        "userlimitLbl": "عدد",
        "AddProductBtn": "اضافه منتج",
        "Products": "المنتجات",
        "user": "المستخدمين",
        "logoutBtn": "خروج",
        "TextOnly": "حروف فقط",
        "WrongMail": "يرجى إدخال تنسيق البريد الإلكتروني الصحيح ",
        "passworddontmatch": "كلمه المرور غير متطابقه",
        "ApiUrlLbl": "رابط الموقع",
        "Wrongapi": " رابط الموقع غير صحيح",
        "requiredApi": "رابط الموقع مطلوب",
        "productEditSuccess": "تم التعديل بنجاح",
        "productAddSuccess": "تم الاضافه بنجاح",
        "product": "المنتج",
        "englishName": "الاسم انجليزي",
        "arabicName": "الاسم عربي",
        "english": "انجليزي",
        "arabic": "عربي",
        "View": "عرض",
        "Answers": "الأجوبة",
        "noAnswersLbl": "لا يوجد اجوبة",
        "fromLbl": "من",
        "toLbl": "الي",
        "AddNewNewsBtn": "اضافة الفئة",
        "EditNews": " تعديل الفئه",
        "requiredErr": "مطلوب",
        "titleLbl": "عنوان",
        "AddImageBtn": "أضف صورة",
        "Pending": "قيد الانتظار",
        "InProgress": "في تَقَدم من طرف",
        "Closed": "مغلق من طرف",
        "Rejected": "مرفوض من طرف",
        "DetailsBtn": "عرض التفاصيل",
        "NewsLbl": "فئة",
        "selectTech": "أختار فني",
        "ApproveBtn": "تأكيد",
        "CloseBtn": "غلق",
        "RejectBtn": "رفض",
        "commentLbl": "تعليق",
        "image": "صور",
        "deptManager": "مدير أدارة",
        "DashboardLbl": "لوحة القيادة",
        "RejectedStatus": "مرفوض",
        "averageLbl": "متوسط",
        "QuestionType": "نوع السؤال",
        "Checkbox": "اختيار",
        "Rate": "تقييم",
        "value": "قيمه الترويج",
        "note": "ملحوظه",
        "RemoveBtn": "حذف",
        "dateLbl": "تاريخ",
        "NoCountriesAvailable": "لا يوجد بلاد متاحه",
        "NewCountry": "بلد جديده",
        "EditCountry": "تعديل البلد",
        "Countries": "بلاد",
        "Country": "بلد",
        "NoGovernratesAvailable": "لا يوجد أقاليم متاحه",
        "NewGovernrate": "اقليم جديد",
        "EditGovernrate": "تعديل الاقليم",
        "Governrate": "اقليم",
        "NoCitiesAvailable": "لا يوجد مدن",
        "NewCity": "مدينة جديده",
        "City": "مدينة",
        "viewGovernrates": "عرض الأقاليم",
        "viewCities": "عرض المدن",
        "allTechnasian": "كل الفنيين",
        "AllLbl": "كل", "categoryType": "نوع الفئة",
        "NoQuestionsAvailable": "لا يوجد اسئلة متاحة",
        "NewcategoryTypeLbl": "نوع فئة جديد",
        "allUsers": "كل المستخدميين",
        "NocategoryTypesAvailable": "لايوجد نوع فئة متاحة",
        "ReassignedBtn": "إعادة تعيين ل",
        "modifyBy": "تعديل بواسطة",
        "modifyTime": "تاريخ التعديل",
        "DescLengthError": ".طول الوصف يجب من 11-300 حرف",
        "englishdescLbl": "وصف انجليزي",
        "arabicdescLbl": "وصف عربي",
        "UploadImageBtn": "اختار الصوره",
        "SelectNews": "أختار قسم",
        "addProductBtn": "أضف منتج",


        //////////////////////

        "ArtWork": "العروض",
        "Award": "الجوائز",
        "VotingCriteria": "معايير التصويت",
        "PhotoAlbum": "إلبوم الصور",
        "DisplayEposides": "عرض الحلقات",
        "StartJudge": "إبدأ التحكيم",
        "JudgeArtWorkLbl": "القاضي الفني",
      }
      $translateProvider.translations('en', en_translations);

      $translateProvider.translations('ar', ar_translations);

      $translateProvider.preferredLanguage(appCONSTANTS.defaultLanguage);

    }]);

}());
;(function() {
    angular
        .module('home')
        .factory('ToastService', ToastService);

    function ToastService() {
        return {
            show: function($positionX,$positionY,$dataEffect,$dataMessage,$dataType,$actionText,$action,$duration){
			
					
				if($(window).width() < 768){
					$positionX = "center";
				}else {
					$positionX = $positionX;
				}		

				if(!$(".pmd-alert-container."+ $positionX +"."+ $positionY).length){
					$('body').append("<div class='pmd-alert-container "+$positionX+" "+$positionY+"'></div>");
				}
					
				var $currentPath = $(".pmd-alert-container."+ $positionX +"."+ $positionY);
				function notificationValue(){
					if($action == "true"){
						if($actionText == null){
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>×</a></div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}else {
						if($actionText == null){
							$notification = "<div class='pmd-alert' data-action='false'>"+$dataMessage+"</div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='false'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}
				}
				var $notification = notificationValue();
				var boxLength = $(".pmd-alert-container."+ $positionX +"."+ $positionY + " .pmd-alert").length;
				
				if($(this).attr("data-duration") !== undefined){
					$duration = $(this).attr("data-duration");
				}else {
					$duration = 3000;
				}
				
				if (boxLength > 0) {
					if ($positionY == 'top') {
						$currentPath.append($notification);
					}
					else {
						$currentPath.prepend($notification);
					}
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}else {
					$currentPath.append($notification);
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}
				var $middle = $(".pmd-alert").outerWidth() / 2;  
				$(".pmd-alert-container.center").css("marginLeft","-" + $middle+"px");
		}
		
        }

    }


}());
;(function () {
	'use strict';
	angular
		.module('home')
		.controller('confirmDeleteDialogController', ['$uibModalInstance', 'model', 'itemName', 'itemId', 'message', 'callBackFunction', confirmDeleteDialogController])

	function confirmDeleteDialogController($uibModalInstance, model, itemName, itemId, message, callBackFunction) {
		var vm = this;
		vm.itemName = itemName;
		vm.model = model;
		vm.message = message;
		vm.close = function () {
			$uibModalInstance.dismiss();
		}

		vm.Confirm = function () { 
			callBackFunction(model);
			$uibModalInstance.dismiss();
		}

	}
}());
;(function () {
    'use strict';

    angular
        .module('home')
        .controller('loginController', ['$rootScope', '$scope', '$state', '$localStorage', 'authorizationService', 'appCONSTANTS', loginController]);

    function loginController($rootScope, $scope, $state, $localStorage, authorizationService, appCONSTANTS) {
        if (!!$localStorage.authInfo) {
            var user = authorizationService.getUser();
            // if (user.PermissionId[0] == 1)
            //     $state.go('users'); 
            // if (user.PermissionId[0] == 3)
            //     $state.go('Role');
            // if (user.PermissionId[0] == 4)
            //     $state.go('Area'); 
            // if ($scope.user.PermissionId[0] == 10)
            //     $state.go('Dashboard');

        }
        else {
            $state.go('login');
        }
    }

}());(function() {
  "use strict";

  angular
    .module("home")
    .controller("homeCtrl", [ 
      "$interval",
      "$filter",  
      "ToastService",
      "$window",
      "$rootScope",
      "blockUI",
      "$transitions",
      "$translate",
      "$scope",
      "appCONSTANTS",
      "$state",
      "_",
      "authenticationService",
      "authorizationService",
      "$localStorage",
      homeCtrl
    ]);

  function homeCtrl( 
    $interval,
    $filter,  
    ToastService,
    $window,
    $rootScope,
    blockUI,
    $transitions,
    $translate,
    $scope,
    appCONSTANTS,
    $state,
    _,
    authenticationService,
    authorizationService,
    $localStorage
  ) {
    // $scope.$on('LOAD', function () { $scope.loading = true });
    // $scope.$on('UNLOAD', function () { $scope.loading = false });

    var vm = this;
    $scope.appCONSTANTS = appCONSTANTS;
    $scope.emailEmpty = false;
    $scope.passwordEmpty = false;
    $scope.ManufactureList = [];
    $scope.totalCount = 0;
    $scope.CurrentDate = new Date();
 
    $scope.languages = [
      {
        id: "en",
        label: "english"
      },
      {
        id: "ar",
        label: "arabic"
      }
    ];
    $scope.init = function() {
      if (!!$localStorage.authInfo) {
        $scope.user = authorizationService.getUser();
      } else {
        $state.go("login");
        return;
      }

      $scope.selectedManufacture = $localStorage.tenant;
      if ($scope.user.userTypeId == 4 || $scope.user.userTypeId == 5) getManufactures();
      if ($scope.user.userTypeId == 2 || $scope.user.userTypeId == 7) {
        refreshOrders();
        getManufactureById();

        //uncomment to run signal R
        // vm.connection = new signalR.HubConnectionBuilder().withUrl(appCONSTANTS.SIGNAL_URL + "newOrder").build();
        // console.log(vm.connection.id);

        // vm.connection.on("NewOrder", function(user) {
        //   ToastService.show("right", "bottom", "fadeInUp", "لديك طلب جديد", "success");
        //   refreshOrders();
        //   return console.log(user);
        // });

        // vm.connection.on("RefreshOrder", function(user) {
        //   refreshOrders();
        //   return console.log(user);
        // });

        // vm.connection
        //   .start()
        //   .then(function() {})
        //   .catch(function(err) {
        //     return console.error(err.toString());
        //   });
      }
      if ($localStorage.tenant != undefined) {
        $scope.selectedTenant = $localStorage.tenant.manufactureId;
        $scope.selectedManufacture = $localStorage.tenant;
      }
    };
    $scope.init(); 

    $scope.openOrder = function(orderId) {
      blockUI.start("Loading...");
      // var updateObj = new OrderResource();
      // updateObj.orderId = orderId;
      // updateObj.$changeStatusOpen({ orderId: orderId }).then(
      //   function(data, status) {
      //     vm.connection.invoke("getConnectionId").then(function(connectionId) {
      //       vm.connectionId = connectionId;
      //       vm.connection.invoke("refresh"); // Send the connectionId to controller
      //     });
      //     blockUI.stop();
      //     $state.go("OrderDetailsByTenant", { orderId: orderId });
      //   },
      //   function(data, status) {
      //     blockUI.stop();
      //     ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
      //   }
      // );
    };
    

    if ($localStorage.language == null) {
      $scope.selectedLanguage = $scope.languages[0].id;
      $localStorage.language = $scope.selectedLanguage;
    } else $scope.selectedLanguage = $localStorage.language;

    $translate.use($scope.selectedLanguage);

    $scope.submit = function(username, password) {
      blockUI.start("Loading...");

      authorizationService.isPasswordchanged = false;
      $("#passwordChanged").hide();
      //  $('#userInActivated').hide();
      if (!username) $scope.emailEmpty = true;
      if (!password) $scope.passwordEmpty = true;
      if (username && password) {
        $scope.afterSubmit = false;
        $scope.emailEmpty = $scope.passwordEmpty = false;
        authenticationService.authenticate(username, password).then(loginSuccess, loginFailed);
        //.error(loginFailed);;
      } else {
        $scope.afterSubmit = false;
      }
    };

    $scope.reloadPage = true;
    $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
      if (fromState.name != "" && $scope.reloadPage) {
        e.preventDefault();
        $scope.reloadPage = false;
        $state.go(toState.name, toParams, { reload: true });
      }
    });
    $transitions.onStart({}, function(transition) {
      if (authorizationService.isLoggedIn()) {
        var user = authorizationService.getUser();
        var authorize = false;
        if (transition._targetState._identifier.self != undefined) {
          if (transition._targetState._identifier.self.data.permissions.only != undefined) {
            transition._targetState._identifier.self.data.permissions.only.forEach(function(element) {
              if (user.PermissionId.includes(element.toString())) authorize = true;
            }, this);
            if (!authorize) $state.go(transition._targetState._identifier.self.data.permissions.redirectTo);
          }
        }
      } else {
        $state.go("login");
      }
    });
    $scope.$watch(
      function() {
        return $localStorage.authInfo;
      },
      function(newVal, oldVal) {
        if (oldVal != undefined && newVal === undefined && $localStorage.authInfo == undefined) {
          console.log("logout");
          $state.go("login");
        }
        if (oldVal === undefined && newVal !== undefined && $localStorage.authInfo != undefined) {
          console.log("login");
          $scope.user = authorizationService.getUser();
          loginSuccess();
          // authorizationService.isLoggedIn() && !location.href.contains('connect')
        }
      }
    );
    function loginSuccess(response) {
      blockUI.stop();
      if (response.data.userId == 0) {
        $scope.invalidLoginInfo = false;
        $scope.inActiveUser = true;
        $scope.errorMessage = response.data.message; //"User not found";
        return;
      }

       
      $scope.afterSubmit = false;
      $scope.invalidLoginInfo = false; 
      $scope.user = authorizationService.getUser();
      
    }

    function loginFailed(response) {
      blockUI.stop();
      //  $scope.errorMessage = response.data.message;
      $scope.afterSubmit = true;
      if (response.data == null) {
        $scope.invalidLoginInfo = false;
        $scope.inActiveUser = true;
        $scope.errorMessage = "Can't reach to the server";
      }
      // $scope.invalidLoginInfo = true;
      if (response) {
        if (response.data.message == "Password invalied") {
          $scope.invalidLoginInfo = true;
          $scope.inActiveUser = false;
        }
        if (response.data.message == "User not found") {
          $scope.invalidLoginInfo = false;
          $scope.inActiveUser = true;
        }

        if (response.data.message == "Account is Locked") {
          $scope.errorMessage = response.data.message;
          $scope.invalidLoginInfo = false;
          $scope.inActiveUser = true;
        }
      }
    }

    $scope.logout = function() {
      authorizationService.logout();
      $state.go("login");
    };
    $scope.reset = function() {
      $scope.invalidLoginInfo = false;
      $scope.inActiveUser = false;
    };
    $scope.isLoggedIn = function() {
      return authorizationService.isLoggedIn();
    };
    $scope.changeLanguage = function(language) {
      $scope.selectedLanguage = language;
      $localStorage.language = $scope.selectedLanguage;
      $state.reload();
      $translate.use(language);
    };
    $scope.getCurrentTime = function() {
      return new Date().getTime();
    };
     
  }
})();
;(function() {
  'use strict';

  angular
    .module('core')
    .constant('AUTH_EVENTS', {
      loginFailed : 'login-failed',
      loginSuccess : 'login-success',
      logoutSuccess : 'logout-success',
      refreshedToken : 'refresh-token-success',
      invalidToken : 'invalid-token',
      failedToAuthorize: 'not-authorized',
      invalidRefreshToken: 'refresh-token-failure',
      passwordChanged: 'password-changed'

    });
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .factory('authEventsHandlerService', authEventsHandlerService);

    authEventsHandlerService.$inject = ['$rootScope', 'AUTH_EVENTS', '$state'];

  function authEventsHandlerService($rootScope, AUTH_EVENTS, $state) {
    var factory = {
      initialize : initialize
    }

    return factory;

    function initialize() {
      $rootScope.$on(AUTH_EVENTS.logoutSuccess,logoutHandler);
    }

    function logoutHandler(){
      $state.go('login');
    }
  }
}());
;(function() {
  "use strict";

  angular.module("core").factory("authenticationService", authenticationService);

  authenticationService.$inject = ["$injector", "appCONSTANTS", "authorizationService", "AUTH_EVENTS", "$rootScope", "$q", "ToastService"];

  function authenticationService($injector, appCONSTANTS, authorizationService, AUTH_EVENTS, $rootScope, $q, ToastService) {
    var factory = {
      authenticate: authenticate,
      getToken: getToken,
      isAuthenticated: isAuthenticated
    };

    return factory;

    function authenticate(email, password) {
      var credentials = {
        username: email,
        password: password
      };
      var request = requestToken(credentials, "password");
      request.then(authenticated, authenticaionFailed);
      return request;

      //.error(authenticaionFailed);
    }

    function authenticated(res) {
      if (res.data == null) authenticaionFailed(res);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      return res;
    }

    function authenticaionFailed(res) {
    debugger;
      ToastService.show("right", "bottom", "fadeInUp", res.data.errorMessage, "error");
      // data.data = null;
      res.status = "-1";
      res.statusText = "";
      res.xhrStatus = "error";
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      return res;
    }

    function getToken(forceRefresh) {
      if (!isAuthenticated()) {
        return $q.reject({
          status: 401
        });
      }
      var authInfo = authorizationService.getAuthInfo();
      var expirydate = new Date(authInfo[".expires"]);
      if (forceRefresh || new Date() >= expirydate) {
        return refreshToken(authInfo["refresh_token"]).then(refreshedToken, function() {
          authorizationService.logout();
        });
      }
      var defer = $q.defer();
      defer.resolve(authInfo);
      return defer.promise;
    }

    function isAuthenticated() {
      return !!authorizationService.getAuthInfo();
    }

    function refreshToken(refreshToken) {
      var credentials = {
        refresh_token: refreshToken
      };
      return requestToken(credentials, "refresh_token");
    }

    function refreshedToken(response) {
      $rootScope.$broadcast(AUTH_EVENTS.refreshedToken);
      authorizationService.setAuthInfo(response);
      return response.data;
    }

    function requestToken(credentials, grantType) {
      angular.extend(credentials, {
        grant_type: grantType
      });

      var $http = $injector.get("$http");
      var result = $http.post(appCONSTANTS.API_URL + "auth/login", JSON.stringify(credentials));
      result.then(function(res) {
        
        if (res.data != null) authorizationService.setAuthInfo(res);
        else return (result = res);
      });
      return result;
    }
  }
})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('unAuthenticatedInterceptor', unAuthenticatedInterceptor);

    unAuthenticatedInterceptor.$inject = ['$q','$rootScope','AUTH_EVENTS'];

    function unAuthenticatedInterceptor($q,$rootScope,AUTH_EVENTS) {
      var factory = {
        responseError: responseErrorInterceptor
      };
      return factory;

      function responseErrorInterceptor(rejection) {
          if(rejection.status == 403) {
              $rootScope.$broadcast(AUTH_EVENTS.failedToAuthorize);
          }else if (rejection.status == 401) {
            if (rejection.data=="password changed") {
              $rootScope.$broadcast(AUTH_EVENTS.passwordChanged);
            }
            else {
              $rootScope.$broadcast(AUTH_EVENTS.invalidToken);
            }
          }
          else if (rejection.status == 406) {
              $rootScope.$broadcast(AUTH_EVENTS.invalidRefreshToken);
          }
          //  else if (rejection.status == 400) {
          //     $rootScope.$broadcast(AUTH_EVENTS.refresh-token-failure);
          // }
          
          return $q.reject(rejection);
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('unAuthenticatedInterceptor');
    }
  })();

})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('useTokenInterceptor', useTokenInterceptor);

    useTokenInterceptor.$inject = ['authenticationService','$localStorage'];


    function useTokenInterceptor(authenticationService,$localStorage) {
      var tokenInterceptor = {
        request: requestInterceptor
      };
      return tokenInterceptor;

      function requestInterceptor(config) {
          if (config.useToken) {
            return authenticationService.getToken()
              .then(function(data){
                config.headers['Authorization'] = data['token_type'] + " " + data['token'];
				if(config.params== null || config.params.lang ==null)
					config.headers['Accept-Language'] = $localStorage.language;//"en";
				else
					config.headers['Accept-Language'] = config.params.lang;
                if (!config.headers.hasOwnProperty('Content-Type')) 
                {
                    config.headers['Content-Type'] = 'application/json';
                }
                return config;
              });

          }
          return config;
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('useTokenInterceptor');
    }
  })();

})();
;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];

  function runBlock(PermissionStore, authorizationService, userRolesEnum) {
    PermissionStore
      .definePermission('GlobalAdmin', function () {
          return authorizationService.hasRole(String(userRolesEnum.GlobalAdmin));
      });
  }

}());
;(function() {
    'use strict';
  
    angular
      .module('core')
      .run(runBlock);
  
    runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];
  
    function runBlock(PermissionStore, authorizationService, userRolesEnum) {
      PermissionStore
        .definePermission('RestaurantAdmin', function () {
            return authorizationService.hasRole(String(userRolesEnum.RestaurantAdmin));
        });
    }
  
  }());
  ;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore','authorizationService'];

  function runBlock (PermissionStore, authorizationService){
    PermissionStore
      .definePermission('anonymous',function(){
        return !authorizationService.isLoggedIn();
      });
  }

}());
;(function () {
  "use strict";

  angular.module("core").factory("authorizationService", authorizationService);
  authorizationService.$inject = ["$rootScope", "$localStorage", "AUTH_EVENTS", "jwtHelper"];
  function authorizationService($rootScope, $localStorage, AUTH_EVENTS, jwtHelper) {
    var factory = {
      getAuthInfo: getAuthInfo,
      setAuthInfoAfterChangeTenant: setAuthInfoAfterChangeTenant,
      getUser: getUser,
      hasRole: hasRole,
      isLoggedIn: isLoggedIn,
      logout: logout,
      setAuthInfo: setAuthInfo,
      isDisabled: false,
      isPasswordchanged: false
    };

    return factory;

    function isLoggedIn() {
      return !!$localStorage.authInfo;
    }

    function getAuthInfo() {
      return $localStorage.authInfo;
    }

    function getUser() {
      var token = getAuthInfo();
      if (token == undefined) return undefined;
      const userDetails = jwtHelper.decodeToken(token);
      userDetails.PermessionId  = userDetails.PermessionId || '';
      userDetails.PermessionId = userDetails.PermessionId.split(';').map(a => a.trim());
      userDetails.PermessionModules = JSON.parse(userDetails.PermessionModules);

      return userDetails;
      // return {
      //   tenantId: info ? info.tenantId : "",
      //   name: info ? info.username : "",
      //   role: info ? info.Role : "",
      //   id: info ? info.userId : "",
      //   permessionModules: info ? info.permessionModules : 0,
      //   PermissionId: info ? info.PermissionId : [],
      //   userTypeId: info && info.userType ? info.userType : 0
      // };
    }

    function hasRole(role) {
      if (!isLoggedIn()) {
        return false;
      }
      // return JSON.parse(getAuthInfo().Roles).indexOf(role) > -1;
      return getAuthInfo().Role == role;
    }

    function logout() {
      $localStorage.authInfo = undefined;
      $localStorage.tenant = undefined;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function setAuthInfo(info) {
      // info.data.PermissionId = info.data.permissionId;
      // info.data.permessionModules = info.data.permessionModules;
      // info.data.expires_in = "172799";
      // info.data.token_type = "bearer";

      // $localStorage.authInfo = info.data;
      // var currentDate = new Date();
      // $localStorage.authInfo['expires_in'] = currentDate.setSeconds(currentDate.getSeconds() + $localStorage.authInfo['expires_in']);

      $localStorage.authInfo = info.data;
    }

    function setAuthInfoAfterChangeTenant(info) {
      info.PermissionId = info.PermissionId;
      info.permessionModules = info.permessionModules;
      info.expires_in = "172799";
      info.token = info.token;
      info.token_type = "bearer";
      info.userType = info.userType;

      $localStorage.authInfo = info;
      var currentDate = new Date();
      $localStorage.authInfo["expires_in"] = currentDate.setSeconds(currentDate.getSeconds() + $localStorage.authInfo["expires_in"]);
    }
  }
})();
