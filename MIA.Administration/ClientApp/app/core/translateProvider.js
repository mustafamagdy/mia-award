(function () {
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

        'Role' :"Role",
        'NewsLbl' :"News",
        'Booth' :"Booth",
        'ArtWork' :"ArtWork",
        'Award' :"Award",
        'VotingCriteria' :"Voting Criteria",
        'PhotoAlbum' :"Photo Album",
        'JudgeArtWorkLbl' :"Judge ArtWork",
        'ArtworkVotes' :"Artwork Votes",
        'ArtworkStatistics' :"Artwork Statistics",
        'MyJudges' :"My Judges",
        'MyDashboard' :"My Dashboard",
        'closing_judge' :"Close All Judge",
        'user' :"Users",
        'All' :"All",
        "remaining":"Remaining",
        "done":"Done",

        "NoJudgeArtWorksAvailableForLevel1":"No artworks for level 1",
        "remaining_level1Artworks":"Remaining Level 1",
        "NoJudgeArtWorksAvailableForLevel2":"No artworks for level 2",
        "remaining_level2Artworks":"Remaining Level 2",
        "EditNews":"Edit News",
        "booth_report":"Booth Report",
        "are_you_sure_to_close_all_judges": "are you sure to close all judges",
        "yes_sure": "Yes sure",
        "done_level1Artworks":"Level 1 artworks (DONE)",
        "remaining_level1Artworks":"Level 1 artworks (REMAINING)",
        "done_level2Artworks":"Level 2 artworks (DONE)",
        "remaining_level2Artworks":"Level 2 artworks (REMAINING)"
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
        "EditRoleLbl": "تعديل الدور",
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
    
        "descLbl": "الوصف",
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
        "AddNewNewsBtn": "اضافة خبر",
        "EditNews": " تعديل خبر",
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

        'Role' :"انواع المستخدمين",
        'NewsLbl' :"الاخبار",
        'Booth' :"المعارض",
        'ArtWork' :"الاعمال",
        'Award' :"الجوائز",
        'VotingCriteria' :"عناصر التحكيم",
        'PhotoAlbum' :"الميديا",
        'JudgeArtWorkLbl' :"تحكيم الاعمال",
        'ArtworkVotes' :"نتائج التحكيم",
        'ArtworkStatistics' :"احصائيات التحكيم",
        'MyJudges' :"حكامي",
        'MyDashboard' :"منصتي",
        'closing_judge' :"اغلاق كل التحكيم",
        'user' :"المستخدمين",
        'All' :"الكل",

        "remaining":"باقي",
        "done":"اكتمل",

        "NoJudgeArtWorksAvailableForLevel1":"لا يوجد اعمال للمستوى الاول",
        "remaining_level1Artworks":"اعمال باقية مستوى اول",
        "NoJudgeArtWorksAvailableForLevel2":"لا يوجد اعمال للمستوى الثاني",
        "remaining_level2Artworks":"اعمال باقية مستوى ثاني",

      }
      $translateProvider.translations('en', en_translations);

      $translateProvider.translations('ar', ar_translations);

      $translateProvider.preferredLanguage(appCONSTANTS.defaultLanguage);

    }]);

}());