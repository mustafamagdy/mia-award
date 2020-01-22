angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/City/templates/Cities.html',
    '<div>\n' +
    '\n' +
    '    <div ncy-breadcrumb></div>\n' +
    '    <!-- <div>\n' +
    '        {{\'viewCities\' | translate}}\n' +
    '    </div> -->\n' +
    '    <div style="margin-bottom:10px">\n' +
    '\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newCity\',{ countryId: $stateParams.countryId,governrateId: $stateParams.governrateId });"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div>\n' +
    '    <div ng-if="Cities.length == 0">\n' +
    '        <span>{{\'NoCitiesAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="Cities.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'Name\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="city in Cities">\n' +
    '                        <td data-title="Name">\n' +
    '                            {{city.titles[selectedLanguage]}}\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editCity\',{countryId: $stateParams.countryId,governrateId: $stateParams.governrateId,cityId: city.cityId});"\n' +
    '                                title="Edit">mode_edit</i>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':city.isActive}" ng-model="city.isActive"\n' +
    '                                ng-click="CityCtrl.ChangeCityStatus(city)">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':city.isActive}"\n' +
    '                                    ng-model="city.isActive" ng-click="CityCtrl.ChangeCityStatus(city)">\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div>\n' +
    '        <a onclick="goBack()">\n' +
    '            <div class="col-xs-12">\n' +
    '                <button type="button"\n' +
    '                class="btn btn-primary" \n' +
    '                style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                {{\'goBack\' | translate}}\n' +
    '                </button>\n' +
    '            </div>\n' +
    '            </a>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/City/templates/edit.html',
    '<div>\n' +
    '        {{\'EditCities\' | translate}}\n' +
    '</div>  \n' +
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'City\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCityCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                    <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCityCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titles{{lang.value+\'Name\'}}" ng-model="editCityCtrl.City.titles[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div class="error" ng-messages="editTypeForm.titles{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div class="error" ng-show="editTypeForm.titles{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titles{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div class="error" ng-show="(editTypeForm.titles{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titles{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCityCtrl.UpdateCity()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCityCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/City/templates/new.html',
    '<div>\n' +
    '        {{\'NewCity\' | translate}}</div>  \n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewCity\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newAreaForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCityCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span>  {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newCityCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control" name="titles{{lang.value+\'Name\'}}" ng-model="newCityCtrl.titles[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newAreaForm.titles{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newAreaForm.titles{{lang.value+\'Name\'}}.$error.required && !newAreaForm.titles{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newAreaForm.titles{{lang.value+\'Name\'}}.$error.minlength || newAreaForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !newAreaForm.titles{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newAreaForm.$invalid" class="btn pmd-ripple-effect btn-primary" Area="button" ng-click="newCityCtrl.AddNewCity()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Area="button" ng-click="$state.go(\'Cities\',{governrateId: $stateParams.governrateId });">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Branch/templates/edit.html',
    '<div>\n' +
    '        {{\'ُEditArea\' | translate}}\n' +
    '</div>  \n' +
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Branch\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editBranchCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                    <span style="color:red">*</span>  {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editBranchCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editBranchCtrl.Branch.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editBranchCtrl.UpdateBranch()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editBranchCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Branch/templates/new.html',
    '<div>\n' +
    ' {{\'AddNewBranch\' | translate}} </div>  \n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'Branch\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newBranchForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newBranchCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span>  {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newBranchCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Branch="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="newBranchCtrl.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newBranchForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newBranchForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newBranchForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newBranchForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newBranchForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newBranchForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newBranchForm.$invalid" class="btn pmd-ripple-effect btn-primary" Branch="button" ng-click="newBranchCtrl.AddNewBranch()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Branch="button" ng-click="newBranchCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Area/templates/Area.html',
    '\n' +
    '<div>\n' +
    '        <div>\n' +
    '                 {{\'Area\' | translate}}\n' +
    '        </div>  \n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="$state.go(\'newArea\',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId});" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> \n' +
    '    <div ng-if="AreaList.results.length == 0">\n' +
    '        <span>{{\'NoAreasAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="AreaList.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Name\' | translate}}</th>\n' +
    '                    <!-- <th>{{\'status\' | translate}}</th> -->\n' +
    '                    <th>{{\'Branch\' | translate}}</th>\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat-start="Area in AreaList.results">\n' +
    '                    <td data-title="Name">\n' +
    '                        {{Area.titleDictionary[selectedLanguage] | limitTo : 20}} \n' +
    '                        {{Area.titleDictionary[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                    </td>\n' +
    '                    \n' +
    '                    <!-- <td>\n' +
    '                        <p ng-show="Area.isStatic"> Static</p>\n' +
    '                    </td> -->\n' +
    '                    <td>\n' +
    '                        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="Area.branches.length != 0" ng-click="$state.go(\'newBranch\',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId,areaId: Area.areaId});" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNewBranch\' | translate}}</button>\n' +
    '                        <span href="javascript:void(0);" ng-click="Area.show=!Area.show;AreaCtrl.showMore($event)" ng-show="Area.branches.length != 0"\n' +
    '                              class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm child-table-expand direct-expand"><i class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                    </td>\n' +
    '                   \n' +
    '                    <td width="30%" ng-show="!Area.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editArea\',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId,areaId: Area.areaId});" title="Edit">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat-end ng-show="Area.show">\n' +
    '                    <td>\n' +
    '                        <table class="table pmd-table table-hover">\n' +
    '                            <thead>\n' +
    '                                <tr>\n' +
    '                                    <th>{{\'Name\' | translate}}</th>\n' +
    '                                    <!-- <th>{{\'status\' | translate}}</th> -->\n' +
    '                                    <th></th>\n' +
    '                                </tr>\n' +
    '                            </thead>\n' +
    '                            <tbody>\n' +
    '                                <tr ng-repeat="Branch in Area.branches">\n' +
    '                                    <td data-title="Name">\n' +
    '                                        {{Branch.titleDictionary[selectedLanguage] | limitTo : 20}} \n' +
    '                                        {{Branch.titleDictionary[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                                    </td> \n' +
    '                                    <!-- <td>\n' +
    '                                        <p ng-show="Branch.isStatic"> Static</p>\n' +
    '                                    </td> -->\n' +
    '                                    <td width="30%" ng-show="!Branch.isStatic">\n' +
    '                                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editBranch\',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId,areaId: Area.areaId,branchId: Branch.branchId});">mode_edit</i>\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </tbody>\n' +
    '                        </table>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '         flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Area/templates/edit.html',
    '<div>\n' +
    ' {{\'ُEditArea\' | translate}}\n' +
    '</div>  \n' +
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Area\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editAreaCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                    <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editAreaCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editAreaCtrl.Area.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editAreaCtrl.UpdateArea()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editAreaCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Area/templates/new.html',
    '<div>\n' +
    '        {{\'NewArea\' | translate}}\n' +
    '\n' +
    '</div>  \n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewArea\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newAreaForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newAreaCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newAreaCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="newAreaCtrl.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newAreaForm.$invalid" class="btn pmd-ripple-effect btn-primary" Area="button" ng-click="newAreaCtrl.AddNewArea()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Area="button" ng-click="$state.go(\'Area\',{countryId: $stateParams.countryId,GovernrateId: $stateParams.GovernrateId,cityId:$stateParams.cityId});">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ContactType/templates/ContactType.html',
    '<div id="bold">\n' +
    '        {{\'ContactType\' | translate}}\n' +
    '</div>\n' +
    '<div>\n' +
    '\n' +
    '    <div style="margin-bottom:10px" ng-show="user.permessionModules[\'ContactType\'].includes(43)">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newContactType\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '            type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div>\n' +
    '    <div ng-if="ContactTypeCtrl.ContactTypes.length == 0">\n' +
    '        <span>{{\'NoContactTypeAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="ContactTypeCtrl.ContactTypes.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th style="width: 50%">{{\'Name\' | translate}}</th>\n' +
    '                    <th>{{\'Status\' | translate}}</th>\n' +
    '                    <th></th>\n' +
    '\n' +
    '                </tr>\n' +
    '\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="ContactType in ContactTypeCtrl.ContactTypes">\n' +
    '                    <td data-title="Name">{{ContactType.titles[selectedLanguage]}}</td>\n' +
    '                   \n' +
    '                    <td>\n' +
    '                        <div ng-show="user.permessionModules[\'ContactType\'].includes(45)"  class="btn-switch" ng-class="{\'btn-switch--on\':ContactType.status}"\n' +
    '                            ng-model="ContactType.status"\n' +
    '                            ng-click="ContactTypeCtrl.ChangeContactTypeStatus(ContactType)">\n' +
    '\n' +
    '                            <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':ContactType.status}"\n' +
    '                                ng-model="ContactType.status"\n' +
    '                                ng-click="ContactTypeCtrl.ChangeContactTypeStatus(ContactType)">\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                    </td>\n' +
    '                    <td width="30%">\n' +
    '                            <i ng-show="user.permessionModules[\'ContactType\'].includes(42)" \n' +
    '                            class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editContactType\',{contactTypeId:ContactType.contactTypeId});" title="Edit">mode_edit</i>\n' +
    '                        </td>\n' +
    '                </tr>\n' +
    '\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ContactType/templates/edit.html',
    '<div id="bold">\n' +
    '        {{\'EditContactType\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'ContactType\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editContactTypeForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in editContactTypeCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editContactTypeCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editContactTypeCtrl.ContactType.titles[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="editContactTypeForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="editContactTypeForm.titles{{lang.value+\'Name\'}}.$error.required && !editContactTypeForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(editContactTypeForm.titles{{lang.value+\'Name\'}}.$error.minlength || editContactTypeForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !editContactTypeForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editContactTypeForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editContactTypeCtrl.UpdateContactType()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editContactTypeCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ContactType/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewContactType\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newContactTypeForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newContactTypeCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span>   {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newContactTypeCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newContactTypeCtrl.titles[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newContactTypeForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="newContactTypeForm.titles{{lang.value+\'Name\'}}.$error.required && !newContactTypeForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(newContactTypeForm.titles{{lang.value+\'Name\'}}.$error.minlength || newContactTypeForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !newContactTypeForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newContactTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" Area="button"\n' +
    '            ng-click="newContactTypeCtrl.AddNewContactType()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="$state.go(\'ContactType\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Country/templates/Countries.html',
    '<div>\n' +
    '    <div id="bold">\n' +
    '             {{\'Countries\' | translate}}\n' +
    '    </div>\n' +
    '    <!-- <div style="margin-bottom:10px">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="$state.go(\'newCountry\');"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div> -->\n' +
    '    <div ng-if="Countries.length == 0">\n' +
    '        <span>{{\'NoCountriesAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="Countries.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Name\' | translate}}</th>\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="country in Countries">\n' +
    '                    <td data-title="Name">{{country.titles[selectedLanguage]}}</td>\n' +
    '                    <td ng-show="user.permessionModules[\'Governrate\'].includes(38) ||user.permessionModules[\'Governrate\'].includes(40) || user.permessionModules[\'Governrate\'].includes(41)" >\n' +
    '                        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                            ng-click="$state.go(\'Governrates\',{countryId: country.countryId});"\n' +
    '                            class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                            type="button">\n' +
    '                            {{\'viewGovernrates\' | translate}}\n' +
    '                        </button>\n' +
    '                    </td>\n' +
    '\n' +
    '                    <td width="30%">\n' +
    '                        <i ng-show="user.permessionModules[\'Country\'].includes(36)" \n' +
    '                        class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                            ng-click="$state.go(\'editCountry\',{countryId: country.countryId});" title="Edit">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div>\n' +
    '        <a onclick="goBack()">\n' +
    '            <div class="col-xs-12">\n' +
    '                <button type="button"\n' +
    '                class="btn btn-primary" \n' +
    '                style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                {{\'goBack\' | translate}}\n' +
    '                </button>\n' +
    '            </div>\n' +
    '            </a>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Country/templates/edit.html',
    '<div id="bold">\n' +
    '        {{\'EditCountry\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'Country\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editCountryForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in editCountryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span>{{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editCountryCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editCountryCtrl.Country.titles[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="editCountryForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="editCountryForm.titles{{lang.value+\'Name\'}}.$error.required && !editCountryForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(editCountryForm.titles{{lang.value+\'Name\'}}.$error.minlength || editCountryForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !editCountryForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editCountryForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editCountryCtrl.UpdateCountry()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editCountryCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Country/templates/new.html',
    '<div id="bold">\n' +
    '        {{\'NewCountry\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewCountry\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newCountryForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newCountryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span>   {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newCountryCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}" ng-model="newCountryCtrl.titles[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newCountryForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="newCountryForm.titles{{lang.value+\'Name\'}}.$error.required && !newCountryForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(newCountryForm.titles{{lang.value+\'Name\'}}.$error.minlength || newCountryForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !newCountryForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newCountryForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" Area="button"\n' +
    '            ng-click="newCountryCtrl.AddNewCountry()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Area="button"\n' +
    '            ng-click="$state.go(\'Countries\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/Distributors.html',
    '<div>\n' +
    '    <div id="bold">\n' +
    '        {{\'DistributorLbl\'| translate}}\n' +
    '    </div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.permessionModules[\'Distributer\'].includes(59)">\n' +
    '        <button ng-click="$state.go(\'newDistributor\');"\n' +
    '            style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <!--end  add button -->\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '        <div class="table-responsive">\n' +
    '                <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                        <form class="DistributorForm" name="DistributorForm">\n' +
    '                                <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                                    <div>\n' +
    '                                        <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                            id="pmd-textfield">\n' +
    '                                            <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '                                                placeholder="   search by Distributor Name   " ng-model="DistributorCtrl.name"\n' +
    '                                                ng-minlength="3" ng-maxlength="255" id="searchInput">\n' +
    '                                        </div>\n' +
    '                                        <!-- <div ng-messages="DistributorForm.searchInput.$error">\n' +
    '                                            <div class="error"\n' +
    '                                                ng-show="(DistributorForm.searchInput.$error.minlength || DistributorForm.searchInput.$error.maxlength) && !DistributorForm.searchInput.$error.required">\n' +
    '                                                {{\'NameLengthError255\' | translate}}</div>\n' +
    '                                        </div> -->\n' +
    '                                        <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                            id="pmd-textfield-verse">\n' +
    '                                            <button id="searchBtb" ng-disabled="DistributorForm.$invalid"\n' +
    '                                                class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                                ng-click="DistributorCtrl.filterDistributor(DistributorCtrl.name)">\n' +
    '                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                                    width="15px" height="14px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">\n' +
    '                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                                        <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                                        <path\n' +
    '                                                            d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                            id="Path-2" fill="#494b74c4" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                                        <path\n' +
    '                                                            d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                            id="Path" fill="#494b74c4" fill-rule="nonzero" />\n' +
    '                                                    </g>\n' +
    '                                                </svg>\n' +
    '                                                {{\'search\' | translate}}\n' +
    '                                            </button>\n' +
    '                                        </div>\n' +
    '                                        <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                            <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtb"\n' +
    '                                                ng-click="DistributorCtrl.filterDistributor()">{{\'All\' | translate}}</button>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </form>\n' +
    '                    </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-if="DistributorCtrl.DistributorsList.length == 0">\n' +
    '        <span>{{\'NoDistributorssAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="DistributorCtrl.DistributorsList.length > 0">\n' +
    '        <!-- binding data from api to Distributors list  -->\n' +
    '        <div>\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr>\n' +
    '                            <th> {{\'CompanyLogo\' | translate}}</th>\n' +
    '                            <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                            <th>{{\'Name\' | translate}}</th>\n' +
    '                            <th>{{\'AddressLbl\' | translate}}</th>\n' +
    '                            <th>{{\'GovernateLbl\' | translate}}</th>\n' +
    '                            <th>{{\'CityLbl\' | translate}}</th>\n' +
    '                            <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                            <th></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <!-- data mandatory  -->\n' +
    '                        <tr ng-repeat="Distributors in DistributorCtrl.DistributorsList">\n' +
    '                            <!-- <td data-title="CompanyLogo">{{Distributors.companyLogo}}</td> -->\n' +
    '                            <td>\n' +
    '                                <img width="100px" height="100px"\n' +
    '                                    data-ng-src="{{DistributorCtrl.appCONSTANTS.Image_URL_ACTOR}}{{Distributors.companyLogo}}" />\n' +
    '                            </td>\n' +
    '                            <td data-title="code">{{Distributors.code}}</td>\n' +
    '                            <td data-title="Name">\n' +
    '                                {{Distributors.name | limitTo : 20}}\n' +
    '                                {{Distributors.name.length > 20 ? \'...\' : \'\'}}\n' +
    '                            </td>\n' +
    '                            <td data-title="address">{{Distributors.address}}</td>\n' +
    '                            <td data-title="city">{{Distributors.city.titles[selectedLanguage]}}</td>\n' +
    '                            <td data-title="governrate">{{Distributors.governrate.titles[selectedLanguage]}}</td>\n' +
    '                            <td width="15%">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':Distributors.isActive}"\n' +
    '                                    ng-model="Distributors.isActive"\n' +
    '                                    ng-click="DistributorCtrl.ChangeDistributorsStatus(Distributors)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle"\n' +
    '                                        ng-class="{\'btn-switch-circle--on\':Distributors.isActive}"\n' +
    '                                        ng-model="Distributors.isActive"\n' +
    '                                        ng-click="DistributorCtrl.ChangeDistributorsStatus(Distributors)">\n' +
    '                                    </div>\n' +
    '\n' +
    '                            </td>\n' +
    '\n' +
    '                            <!-- action -->\n' +
    '                            <td width="30%">\n' +
    '                                <i ng-show="user.permessionModules[\'Distributer\'].includes(58)"\n' +
    '                                    class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                    ng-click="$state.go(\'editDistributor\',{distributorId: Distributors.distributorId});"\n' +
    '                                    title="Edit">mode_edit</i>\n' +
    '                                <i ng-show="user.permessionModules[\'Distributer\'].includes(61)"\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="DistributorCtrl.openDeleteDialog\n' +
    '                                    (Distributors,Distributors.name,Distributors.distributorId)"\n' +
    '                                    title="Delete">delete</i>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="DistributorCtrl.totalCount"\n' +
    '            paging-action="DistributorCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '            hide-if-empty="true" disabled-class="hide">\n' +
    '        </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/edit.html',
    '<div class="container">\n' +
    '    <!-- header -->\n' +
    '    <div class="modal-header bordered" id="bold">\n' +
    '            {{\'EditDistributor\'| translate}}\n' +
    '        </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '            <div id="vm-container">\n' +
    '                <!-- Distributor form step -->\n' +
    '                <div id="vm-step-container">\n' +
    '                    <ul class="nav nav-pills nav-justified">\n' +
    '                        <li ng-repeat="step in editDistributorCtrl.steps"\n' +
    '                            ng-class="{\'active\':step.step == editDistributorCtrl.currentStep}">\n' +
    '                            <a> {{step.step | translate }}. {{step.name | translate}}</a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- function -- get pages  -->\n' +
    '                <div id="vm-content-container">\n' +
    '                    <ng-include src="editDistributorCtrl.getStepTemplate()"></ng-include>\n' +
    '                </div>\n' +
    '                <!-- previous button  -->\n' +
    '                <div id="vm-navigation-container" class="col-lg-12">\n' +
    '                    <div class="pull-right">\n' +
    '                        <span class="btn-group">\n' +
    '                                <button class="btn btn-primary" name="next" type="button"\n' +
    '                                onclick="goBack()"> {{\'goBack\' | translate}}</button>\n' +
    '                            <button ng-disabled="editDistributorCtrl.currentStep <= 1" class="btn btn-default"\n' +
    '                                name="previous" type="button"\n' +
    '                                ng-click="editDistributorCtrl.gotoStep(editDistributorCtrl.currentStep - 1)"><i\n' +
    '                                    class="fa fa-arrow-left"></i>{{\'PreviousStep\' | translate}}\n' +
    '                            </button>\n' +
    '                            <!-- next button  -->\n' +
    '                            <button ng-disabled="editDistributorCtrl.currentStep >=editDistributorCtrl.steps.length"\n' +
    '                                class="btn btn-primary" name="next" type="button"\n' +
    '                                ng-click="editDistributorCtrl.gotoStep(editDistributorCtrl.currentStep + 1)">\n' +
    '                                {{\'Nextstep\' | translate}}\n' +
    '                                <i class="fa fa-arrow-right"></i>\n' +
    '                            </button>\n' +
    '                   \n' +
    '                        </span>\n' +
    '                        <!-- save button  -->\n' +
    '                        <button\n' +
    '                            ng-disabled="editDistributorCtrl.currentStep !=editDistributorCtrl.steps.length ||  isValid == false"\n' +
    '                            class="btn btn-success" name="next" type="button"\n' +
    '                            ng-click="editDistributorCtrl.UpdateDistributor()">\n' +
    '                            <i class="fa fa-floppy-o"></i> {{\'Save\' | translate}}</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/editstep1.html',
    '<div class="modal-content container">\n' +
    '  <div class="modal-body">\n' +
    '    <form class="editDistributorForm" name="editDistributorForm">\n' +
    '      <div>\n' +
    '        <!-- Nav tabs -->\n' +
    '        <ul>\n' +
    '          <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editDistributorCtrl.Distributor.language">\n' +
    '            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '              data-toggle="tab">\n' +
    '              {{lang.value | translate}}\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '        <div>\n' +
    '          <div>\n' +
    '            <!-- Tab panes -->\n' +
    '            <div class="tab-content table-responsive">\n' +
    '              <h2> <label for="readonly">{{\'infoLbl\' | translate}} </label></h2>\n' +
    '              <!-- left side -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- input name  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                  <input required type="text" class="mat-input form-control" name="name"\n' +
    '                    ng-model="editDistributorCtrl.Distributor.name">\n' +
    '                  <!-- length validation  -->\n' +
    '                  <div ng-messages="editDistributorForm.name.$error" class="error">\n' +
    '                    <div ng-show="editDistributorForm.name.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                    <div\n' +
    '                      ng-if="editDistributorForm.name.$error.required && !editDistributorForm.name.$pristine">\n' +
    '                      {{\'nameLengthError\' | translate}}</div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <div\n' +
    '                      ng-if="(editDistributorForm.name.$error.minlength || editDistributorForm.name.$error.maxlength) ">\n' +
    '                      {{\'NameLengthError255\'\n' +
    '                    | translate}}</div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- code field -->\n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                  </label>\n' +
    '                  <input type="text" name="code" ng-readonly="true" ng-model="editDistributorCtrl.Distributor.code"\n' +
    '                    aria-label="readonly" class="mat-input form-control">\n' +
    '                  <br>\n' +
    '                </div> -->\n' +
    '                <!-- Address field  -->\n' +
    '                <label>\n' +
    '                  <span style="color:red">*</span> {{\'AddressLbl\' | translate}}\n' +
    '                  <br>\n' +
    '                  <textarea name="address" ng-model="editDistributorCtrl.Distributor.address" required style="width: 250%;"\n' +
    '                    ng-minlength="11" placeholder="add your address here ." required>\n' +
    '                    </textarea>\n' +
    '                </label>\n' +
    '                <!-- length validation -->\n' +
    '                <div ng-messages="editDistributorForm.address.$error" class="error">\n' +
    '                  <div ng-show="editDistributorForm.address.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                  <div ng-if="editDistributorForm.address.$error.required && !editDistributorForm.address.$pristine">\n' +
    '                    {{\'NameError\' | translate}}</div>\n' +
    '                  <div\n' +
    '                    ng-if="(editDistributorForm.address.$error.minlength || editDistributorForm.address.$error.maxlength) ">\n' +
    '                    {{\'NameLengthError255\'\n' +
    '                    | translate}}</div>\n' +
    '                </div>\n' +
    '                <div>\n' +
    '                  <!-- required validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="editDistributorForm.address.$error.required && !editDistributorForm.address.$pristine">\n' +
    '                    {{\'RequiredLbl\' | translate}}\n' +
    '                  </span>\n' +
    '                  <span class="error" ng-show="editDistributorForm.address.$error.maxlength">\n' +
    '                    Too long!\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- email field  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'EmailLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="mat-input form-control" name="email"\n' +
    '                    ng-model="editDistributorCtrl.Distributor.email"\n' +
    '                    ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                  <!-- email validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="editDistributorForm.email.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- website field  -->\n' +
    '                <!-- <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'websiteLbl\' | translate}} </label>\n' +
    '                  <br>\n' +
    '                  <input type="webSite" name="editDistributorCtrl.Distributor.webSite" ng-model="editDistributorCtrl.Distributor.webSite" class="mat-input form-control ng-pristine ng-untouched\n' +
    '                      ng-empty ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength">\n' +
    '                  <label>\n' +
    '                </div> -->\n' +
    '              </div>\n' +
    '              <!-- right side  -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- country --- drop down  -->\n' +
    '                <div\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Country\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="countryId"\n' +
    '                    ng-change="editDistributorCtrl.countryChange()" ng-model="editDistributorCtrl.selectedCountryId"\n' +
    '                    ng-options="group.countryId  as group.titles[selectedLanguage] for group in editDistributorCtrl.countries">\n' +
    '                  </select>\n' +
    '                  \n' +
    '                  <div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="editDistributorForm.results[countryId].$error.required && !editDistributorForm.results[countryId].$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="editDistributorForm.results[countryId].$error.results[countryId]">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- governrate based on country id  -->\n' +
    '                <div ng-show=" editDistributorCtrl.selectedCountryId > 0"\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Governrate\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="governrateId"\n' +
    '                    ng-change="editDistributorCtrl.GovernrateChange()" ng-model="editDistributorCtrl.selectedGovernrateId"\n' +
    '                    ng-options="group.governrateId as group.titles[selectedLanguage] for group in editDistributorCtrl.Governrates">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <span class="error"\n' +
    '                      ng-show="editDistributorForm.governrateId.$error.required && !editDistributorForm.governrateId.$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="editDistributorForm.governrateId.$error.governrateId">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- city based on governrate -->\n' +
    '                <div ng-show=" editDistributorCtrl.selectedGovernrateId > 0"\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'City\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="cityId"\n' +
    '                   ng-change="editDistributorCtrl.cityChange()"\n' +
    '                    ng-model="editDistributorCtrl.selectedCityId" name="cityId"\n' +
    '                    ng-options="group.cityId as group.titles[selectedLanguage] for group in editDistributorCtrl.cities">\n' +
    '                  </select>\n' +
    '                </div>\n' +
    '\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/editstep2.html',
    '<div class="modal-content container">\n' +
    '    <h2> {{ContactInformation | translate}} </h2>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editDistributorForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newCategoryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content table-responsive">\n' +
    '                            <!-- name -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="name" style="display: inline-block; "\n' +
    '                                    ng-model="editDistributorCtrl.name" required />\n' +
    '                                <div class="error" ng-messages="editDistributorForm.name.$error">\n' +
    '                                    <div ng-if="editDistributorForm.name.$error.required && \n' +
    '                                    !editDistributorForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- title -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'Title\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="title" style="display: inline-block;"\n' +
    '                                    ng-model="editDistributorCtrl.title" required />\n' +
    '                            </div>\n' +
    '                            <!-- Mobile number -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label> <span style="color:red">*</span> {{\'MobileNo\' | translate}}</label>\n' +
    '                                <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only  style="display: inline-block;" ng-minlength="11" ng-maxlength="11"\n' +
    '                                    ng-model="editDistributorCtrl.mobileNumber" required />\n' +
    '                                <!-- required validation  -->\n' +
    '                                <div ng-messages="editDistributorForm.mobileNumber.$error">\n' +
    '                                    <div class="error" ng-if="editDistributorForm.mobileNumber.$error.required && \n' +
    '                                        !editDistributorForm.mobileNumber.$pristine">\n' +
    '                                        {{\'requiredErr\' |  translate}}\n' +
    '                                    </div>\n' +
    '                                    <!-- length validation -->\n' +
    '                                    <div class="error" ng-if="(editDistributorForm.mobileNumber.$error.minlength ||\n' +
    '                                            editDistributorForm.mobileNumber.$error.maxlength) \n' +
    '                                             && !editDistributorForm.mobileNumber.newmobileNumber.$error.required">\n' +
    '                                             {{\'PhoneLengthError\' |  translate}}\n' +
    '                                        \n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- email -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'EmailLbl\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="email" style="display: inline-block;"\n' +
    '                                    ng-model="editDistributorCtrl.email" required />\n' +
    '                            </div>\n' +
    '                            <!-- contact Type -->\n' +
    '                            <!-- contact Type -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'ContactType\' | translate}}</label>\n' +
    '                                <!-- required validation -->\n' +
    '                                <select class="form-control select-tags pmd-select2-tags"\n' +
    '                                    ng-model="editDistributorCtrl.contactType" name="contactType">\n' +
    '                                    <option ng-repeat="contact in editDistributorCtrl.ContactTypeList">\n' +
    '                                        {{contact.titles[selectedLanguage]}}\n' +
    '                                    </option>\n' +
    '                                </select>\n' +
    '\n' +
    '                            </div>\n' +
    '                            <!-- {{size.sizeNameDictionary[selectedLanguage]}} -->\n' +
    '\n' +
    '                            <!-- add button -->\n' +
    '                            <div class="col-lg-2">\n' +
    '                                <label>{{\'Addtotable\' | translate}}</label>\n' +
    '                                <input type="button" ng-click="editDistributorCtrl.AddContact()"\n' +
    '                                class="btn btn-primary" value="{{\'AddBtn\' | translate}}"\n' +
    '                                style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                        </div>\n' +
    '                            <hr>\n' +
    '                            <!-- binding data from inputs to table -->\n' +
    '                            <table class="table pmd-table table-hover">\n' +
    '                                <!-- heads -->\n' +
    '                                <thead>\n' +
    '                                    <tr>\n' +
    '                                        <th>{{\'Name\' | translate}}</th>\n' +
    '                                        <th>{{\'Title\' | translate}}</th>\n' +
    '                                        <th>{{\'MobileNo\' | translate}}</th>\n' +
    '                                        <th>{{\'EmailLbl\' | translate}}</th>\n' +
    '                                        <th>{{\'ContactType\' | translate}}</th>\n' +
    '                                        <th>{{\'Action\' | translate}}</th>\n' +
    '                                    </tr>\n' +
    '                                </thead>\n' +
    '                                <!-- binding data -->\n' +
    '                                <tbody>\n' +
    '                                    <tr\n' +
    '                                        ng-repeat="(index,Contact) in editDistributorCtrl.Distributor.distributorContactInformation">\n' +
    '                                        <td data-title="Name">{{Contact.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{Contact.title}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox"\n' +
    '                                                ng-change="editDistributorCtrl.setContactMain(Contact)"\n' +
    '                                                ng-model="Contact.main">\n' +
    '                                        </td>\n' +
    '                                        <td width="30%">\n' +
    '                                            <i\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="editDistributorCtrl.openDeleteContactTypeDialog(index)"title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                    <tr ng-repeat="(index,Contact1) in editDistributorCtrl.ContactList">\n' +
    '                                        <td data-title="Name">{{Contact1.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact1.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact1.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact1.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{editDistributorCtrl.contactType}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox"\n' +
    '                                                ng-change="editDistributorCtrl.setContactMain(Contact1)"\n' +
    '                                                ng-model="Contact1.checkbox">\n' +
    '                                        </td>\n' +
    '                                        <td width="30%">\n' +
    '                                            <i\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="editDistributorCtrl.openDeleteContactTypeDialogContactList(index)"title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                </tbody>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/editstep3.html',
    '<div class="modal-content container">\n' +
    '  <h2>{{\'commercialInformation\' | translate}} </h2>\n' +
    '\n' +
    '  <div class="modal-body">\n' +
    '    <form class="form-horizontal" name="editDistributorForm">\n' +
    '      <div>\n' +
    '        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '          <span style="color:red">*</span>\n' +
    '          <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">\n' +
    '            {{\'UploadPhoto\' | translate}}</label>\n' +
    '          <input id="image" class="hidden" type="file" img-upload ng-model="imageName" name="imageName">\n' +
    '          <img height="100" width="100" ng-src="{{image}}" />\n' +
    '          <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '            {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '\n' +
    '        </div>\n' +
    '      </div>\n' +
    '  </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/new.html',
    '<div class="container">\n' +
    '        <!-- header -->\n' +
    '        <div class="modal-header bordered" id="bold">\n' +
    '                {{\'NewDistributor\'| translate}}\n' +
    '            </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-12">\n' +
    '                <div id="vm-container">\n' +
    '                    <!-- Distributors form step -->\n' +
    '                    <div id="vm-step-container">\n' +
    '                        <ul class="nav nav-pills nav-justified">\n' +
    '                            <li ng-repeat="step in newDistributorCtrl.steps"\n' +
    '                                ng-class="{\'active\':step.step == newDistributorCtrl.currentStep}">\n' +
    '                                <a> {{step.step | translate }}. {{step.name | translate}}</a>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '    \n' +
    '                    <!-- function -- get pages  -->\n' +
    '                    <div id="vm-content-container">\n' +
    '                        <ng-include src="newDistributorCtrl.getStepTemplate()"></ng-include>\n' +
    '                    </div>\n' +
    '                    <!-- previous button  -->\n' +
    '                    <div id="vm-navigation-container" class="col-lg-12">\n' +
    '                        <div class="pull-right">\n' +
    '                            <span class="btn-group">\n' +
    '                                    <button class="btn btn-primary" name="next" type="button"\n' +
    '                                    onclick="goBack()"> {{\'goBack\' | translate}}</button>\n' +
    '                                <button ng-disabled="newDistributorCtrl.currentStep <= 1" class="btn btn-default"\n' +
    '                                    name="previous" type="button"\n' +
    '                                    ng-click="newDistributorCtrl.gotoStep(newDistributorCtrl.currentStep - 1)"><i\n' +
    '                                        class="fa fa-arrow-left"></i> {{\'PreviousStep\' | translate}}\n' +
    '                                </button>\n' +
    '                                <!-- next button  -->\n' +
    '                                <button ng-disabled="newDistributorCtrl.currentStep >=newDistributorCtrl.steps.length"\n' +
    '                                    class="btn btn-primary" name="next" type="button"\n' +
    '                                    ng-click="newDistributorCtrl.gotoStep(newDistributorCtrl.currentStep + 1)">\n' +
    '                                     {{\'Nextstep\' | translate}}\n' +
    '                                    <i class="fa fa-arrow-right"></i>\n' +
    '                                </button>\n' +
    '                            </span>\n' +
    '                            <!-- save button  -->\n' +
    '                            <button\n' +
    '                                ng-disabled="newDistributorCtrl.currentStep !=newDistributorCtrl.steps.length || image == null"\n' +
    '                                class="btn btn-success" name="next" type="button"\n' +
    '                                ng-click="newDistributorCtrl.addNewDistributors()">\n' +
    '                                <i class="fa fa-floppy-o"></i>  {{\'Save\' | translate}}</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '    \n' +
    '                </div>\n' +
    '    \n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/step1.html',
    '<div class="modal-content container">\n' +
    '    <div class="modal-body">\n' +
    '      <form class="newdistributorsForm" name="newdistributorsForm">\n' +
    '        <div>\n' +
    '          <!-- Nav tabs -->\n' +
    '          <ul>\n' +
    '            <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newmangactureCtrl.language">\n' +
    '              <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                data-toggle="tab">\n' +
    '                {{lang.value | translate}}\n' +
    '              </a>\n' +
    '            </li>\n' +
    '          </ul>\n' +
    '          <div>\n' +
    '            <div>\n' +
    '              <!-- Tab panes -->\n' +
    '              <div class="tab-content table-responsive">\n' +
    '                <h2> <label for="readonly">{{\'infoLbl\' | translate}} </label></h2>\n' +
    '                <!-- left side -->\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                  <!-- input name  -->\n' +
    '                  <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="nameStepOne"\n' +
    '                      ng-model="newDistributorCtrl.nameStepOne" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <!-- length validation  -->\n' +
    '                    <div ng-messages="newdistributorsForm.nameStepOne.$error" class="error">\n' +
    '                      <div ng-show="newdistributorsForm.nameStepOne.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                      <div\n' +
    '                        ng-if="newdistributorsForm.nameStepOne.$error.required && !newdistributorsForm.nameStepOne.$pristine">\n' +
    '                        {{\'NameError\' | translate}}</div>\n' +
    '                      <!-- required validation -->\n' +
    '                      <div\n' +
    '                        ng-if="(newdistributorsForm.nameStepOne.$error.minlength || newdistributorsForm.nameStepOne.$error.maxlength) ">\n' +
    '                        {{\'NameLengthError3\'\n' +
    '                      | translate}}</div>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                  <!-- code field -->\n' +
    '                  <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                    </label>\n' +
    '                    <input type="text" name="code" ng-readonly="true" ng-model="newDistributorCtrl.code"\n' +
    '                      aria-label="readonly" class="mat-input form-control">\n' +
    '                    <br>\n' +
    '                  </div> -->\n' +
    '                  <!-- Address field  -->\n' +
    '                  <label>\n' +
    '                    <span style="color:red">*</span> {{\'AddressLbl\' | translate}}\n' +
    '                    <br>\n' +
    '                    <textarea name="address" ng-model="newDistributorCtrl.address" required style="width: 250%;"\n' +
    '                      ng-minlength="11" placeholder="{{\'addyouraddresshere\' | translate}}" required>\n' +
    '                      </textarea>\n' +
    '                  </label>\n' +
    '                  <!-- length validation -->\n' +
    '                  <div ng-messages="newdistributorsForm.address.$error" class="error">\n' +
    '                    <div ng-show="newdistributorsForm.address.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                    <div ng-if="newdistributorsForm.address.$error.required && !newdistributorsForm.address.$pristine">\n' +
    '                      {{\'nameLengthError\' | translate}}</div>\n' +
    '                    <div\n' +
    '                      ng-if="(newdistributorsForm.address.$error.minlength || newdistributorsForm.address.$error.maxlength) ">\n' +
    '                      {{\'NameLengthError255\'\n' +
    '                      | translate}}</div>\n' +
    '                  </div>\n' +
    '                  <div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newdistributorsForm.address.$error.required && !newdistributorsForm.address.$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}}\n' +
    '                    </span>\n' +
    '                    <span class="error" ng-show="newdistributorsForm.address.$error.maxlength">\n' +
    '                      Too long!\n' +
    '                    </span>\n' +
    '                  </div>\n' +
    '                  <!-- email field  -->\n' +
    '                  <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                    <label>\n' +
    '                      {{\'EmailLbl\' | translate}}</label>\n' +
    '                    <input type="text" class="mat-input form-control" name="emailStepOne"\n' +
    '                      ng-model="newDistributorCtrl.emailStepOne"\n' +
    '                      ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                    <!-- email validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newdistributorsForm.emailStepOne.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                    </span>\n' +
    '                  </div>\n' +
    '                  <!-- website field  -->\n' +
    '                  <!-- <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                    <label>\n' +
    '                      {{\'websiteLbl\' | translate}} </label>\n' +
    '                    <br>\n' +
    '                    <input type="url" name="newDistributorCtrl.url" ng-model="newDistributorCtrl.url" class="mat-input form-control ng-pristine ng-untouched\n' +
    '                        ng-empty ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength">\n' +
    '                    <label>\n' +
    '                  </div> -->\n' +
    '                </div>\n' +
    '                <!-- right side  -->\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                  <!-- country --- drop down  -->\n' +
    '                  <div\n' +
    '                    class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'Country\' | translate}}</label>\n' +
    '                    <select class="select-tags form-control pmd-select2-tags" name="countryId"\n' +
    '                      ng-change="newDistributorCtrl.countryChange()" ng-model="newDistributorCtrl.selectedCountryId"\n' +
    '                      ng-options="group.countryId  as group.titles[selectedLanguage] for group in newDistributorCtrl.countries">\n' +
    '                    </select>\n' +
    '                    <div>\n' +
    '                      <!-- required validation -->\n' +
    '                      <span class="error"\n' +
    '                        ng-show="newdistributorsForm.results[countryId].$error.required && !newdistributorsForm.results[countryId].$pristine">\n' +
    '                        {{\'RequiredLbl\' | translate}} </span>\n' +
    '                      <span class="error" ng-show="newdistributorsForm.results[countryId].$error.results[countryId]">\n' +
    '                        {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                  <!-- governrate based on country id  -->\n' +
    '                  <div  \n' +
    '                    class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'Governrate\' | translate}}</label>\n' +
    '                    <select class="select-tags form-control pmd-select2-tags" name="governrateId"\n' +
    '                      ng-change="newDistributorCtrl.GovernrateChange()" ng-model="newDistributorCtrl.selectedGovernrateId"\n' +
    '                      ng-options="group.governrateId as group.titles[selectedLanguage] for group in newDistributorCtrl.Governrates">\n' +
    '                    </select>\n' +
    '                    <div>\n' +
    '                      <span class="error"\n' +
    '                        ng-show="newdistributorsForm.governrateId.$error.required && !newdistributorsForm.governrateId.$pristine">\n' +
    '                        {{\'RequiredLbl\' | translate}} </span>\n' +
    '                      <span class="error" ng-show="newdistributorsForm.governrateId.$error.governrateId">\n' +
    '                        {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                  <!-- city based on governrate -->\n' +
    '                  <div \n' +
    '                    class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'City\' | translate}}</label>\n' +
    '                    <select class="select-tags form-control pmd-select2-tags" name="cityId"\n' +
    '                     ng-change="newDistributorCtrl.cityChange()"\n' +
    '                      ng-model="newDistributorCtrl.selectedCityId" name="cityId"\n' +
    '                      ng-options="group.cityId as group.titles[selectedLanguage] for group in newDistributorCtrl.cities">\n' +
    '                    </select>\n' +
    '                  </div>\n' +
    '  \n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </form>\n' +
    '    </div>\n' +
    '  \n' +
    '  ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/step2.html',
    '<div class="modal-content container">\n' +
    '    <h2>{{\'ContactInformation\' | translate}} </h2>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newManufactureForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newCategoryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content table-responsive">\n' +
    '                            <!-- name -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="name" style="display: inline-block; "\n' +
    '                                    ng-model="newDistributorCtrl.name" required />\n' +
    '                                <div class="error" ng-messages="newManufactureForm.name.$error">\n' +
    '                                    <div ng-if="newManufactureForm.name.$error.required && \n' +
    '                                    !newManufactureForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- title -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'Title\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="title" style="display: inline-block;"\n' +
    '                                    ng-model="newDistributorCtrl.title" required />\n' +
    '                            </div>\n' +
    '                            <!-- Mobile number -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label> <span style="color:red">*</span> {{\'MobileNo\' | translate}}</label>\n' +
    '                                <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only  style="display: inline-block;" ng-minlength="11" ng-maxlength="11"\n' +
    '                                    ng-model="newDistributorCtrl.mobileNumber" required />\n' +
    '                                <!-- required validation  -->\n' +
    '                                <div ng-messages="newManufactureForm.mobileNumber.$error">\n' +
    '                                    <div class="error" ng-if="newManufactureForm.mobileNumber.$error.required && \n' +
    '                                        !newManufactureForm.mobileNumber.$pristine">\n' +
    '                                        {{\'requiredErr\' |  translate}}\n' +
    '                                    </div>\n' +
    '                                    <!-- length validation -->\n' +
    '                                    <div class="error" ng-if="(newManufactureForm.mobileNumber.$error.minlength ||\n' +
    '                                            newManufactureForm.mobileNumber.$error.maxlength) \n' +
    '                                             && !newManufactureForm.mobileNumber.newmobileNumber.$error.required">\n' +
    '                                        {{\'PhoneLengthError\' |  translate}}\n' +
    '\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- email -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'EMail\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="email" style="display: inline-block;"\n' +
    '                                    ng-model="newDistributorCtrl.email" required />\n' +
    '                            </div>\n' +
    '                            <!-- contact Type -->\n' +
    '                            <!-- contact Type -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'ContactType\' | translate}}</label>\n' +
    '                                <!-- required validation -->\n' +
    '                                <select class="form-control select-tags pmd-select2-tags"\n' +
    '                                    ng-model="newDistributorCtrl.contactType" name="contactType">\n' +
    '                                    <option ng-repeat="contact in newDistributorCtrl.ContactTypeList">\n' +
    '                                        {{contact.titles[selectedLanguage]}}\n' +
    '                                    </option>\n' +
    '                                </select>\n' +
    '\n' +
    '                            </div>\n' +
    '                            <!-- {{size.sizeNameDictionary[selectedLanguage]}} -->\n' +
    '\n' +
    '                            <!-- add button -->\n' +
    '                            <div class="col-lg-2">\n' +
    '                                <label>{{\'Addtotable\' | translate}}</label>\n' +
    '                                <input type="button" ng-click="newDistributorCtrl.AddContact()" class="btn btn-primary"\n' +
    '                                    value="add" style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <!-- binding data from inputs to table -->\n' +
    '                            <table class="table pmd-table table-hover">\n' +
    '                                <!-- heads -->\n' +
    '                                <thead>\n' +
    '                                    <tr>\n' +
    '                                        <th>{{\'Name\' | translate}}</th>\n' +
    '                                        <th>{{\'Title\' | translate}}</th>\n' +
    '                                        <th>{{\'mobileNumber\' | translate}}</th>\n' +
    '                                        <th>{{\'EMail\' | translate}}</th>\n' +
    '                                        <th>{{\'ContactType\' | translate}}</th>\n' +
    '                                        <th>{{\'Action\' | translate}}</th>\n' +
    '                                    </tr>\n' +
    '                                </thead>\n' +
    '                                <!-- binding data -->\n' +
    '                                <tbody>\n' +
    '                                    <tr ng-repeat="(index,Contact) in newDistributorCtrl.ContactList">\n' +
    '                                        <td data-title="Name">{{Contact.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{newDistributorCtrl.contactType}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox"\n' +
    '                                                ng-change="newDistributorCtrl.setContactMain(Contact)"\n' +
    '                                                ng-model="Contact.checkbox">\n' +
    '                                        </td>\n' +
    '                                        <td width="30%">\n' +
    '                                            <i class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                                ng-click="newDistributorCtrl.openDeleteContactTypeDialog(index)"\n' +
    '                                                title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                </tbody>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Distributors/templates/step3.html',
    '<div class="modal-content container">\n' +
    '  <h2>  {{\'commercialInformation\' | translate}} </h2>\n' +
    '\n' +
    '  <div class="modal-body">\n' +
    '    <form class="form-horizontal" name="newDistributorForm">\n' +
    '      <div>\n' +
    '            <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '              <span style="color:red">*</span>\n' +
    '              <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                  Photo</label>\n' +
    '              <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                  name="imageName">\n' +
    '              <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '\n' +
    '              <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                  {{\'RecommendedDistributorImage\' | translate}}</span>\n' +
    '\n' +
    '          </div>\n' +
    '</div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Governrate/templates/Governrate.html',
    '<div ncy-breadcrumb></div>\n' +
    '\n' +
    '<!-- <div>\n' +
    '        {{\'viewGovernrates\' | translate}}\n' +
    '</div> -->\n' +
    '\n' +
    '<div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="$state.go(\'newGovernrate\',{ countryId: $stateParams.countryId});"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '        <div class="table-responsive">\n' +
    '                <form class="RetailerForm" name="RetailerForm">\n' +
    '                        <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                <div>\n' +
    '                        <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                            id="pmd-textfield">\n' +
    '                            <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '                                placeholder="  {{\'searchbyGovernrateName\' | translate}}    "\n' +
    '                                ng-model="GovernrateCtrl.name" ng-minlength="3" ng-maxlength="255"\n' +
    '                                id="searchInput">\n' +
    '                        </div>\n' +
    '                        <!-- <div ng-messages="RetailerForm.searchInput.$error">\n' +
    '                            <div class="error"\n' +
    '                                ng-show="(RetailerForm.searchInput.$error.minlength || RetailerForm.searchInput.$error.maxlength) && !RetailerForm.searchInput.$error.required">\n' +
    '                                {{\'NameLengthError3\' | translate}}</div>\n' +
    '                        </div> -->\n' +
    '                        <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                            id="pmd-textfield-verse">\n' +
    '                            <button id="searchBtb" ng-disabled="RetailerForm.$invalid"\n' +
    '                                class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                ng-click="GovernrateCtrl.filterGovernrate(GovernrateCtrl.name)">\n' +
    '                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                    width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                    class="kt-svg-icon">\n' +
    '                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                        <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                        <path\n' +
    '                                            d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                            id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                        <path\n' +
    '                                            d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                            id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                                    </g>\n' +
    '                                </svg>\n' +
    '                                {{\'search\' | translate}}\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                        <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtb"\n' +
    '                                ng-click="GovernrateCtrl.filterGovernrate()">{{\'All\' | translate}}</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    </div>\n' +
    '                    </form>\n' +
    '            </div>\n' +
    '    </div>\n' +
    '    <div ng-if="Governrates.length == 0">\n' +
    '        <span>{{\'NoGovernratesAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="Governrates.length > 0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Name\' | translate}}</th>\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="Governrate in Governrates">\n' +
    '                    <td data-title="Name">{{Governrate.titles[selectedLanguage]}}</td>\n' +
    '                    <td>\n' +
    '                        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                            ng-click="$state.go(\'Cities\',{governrateId: Governrate.governrateId});"\n' +
    '                            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '                            {{\'viewCities\' | translate}}\n' +
    '                        </button>\n' +
    '                    </td>\n' +
    '                    <td>\n' +
    '                        <div class="btn-switch" ng-class="{\'btn-switch--on\':Governrate.isActive}"\n' +
    '                            ng-model="Governrate.isActive" ng-click="GovernrateCtrl.ChangeGovernrateStatus(Governrate)">\n' +
    '\n' +
    '                            <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Governrate.isActive}"\n' +
    '                                ng-model="Governrate.isActive"\n' +
    '                                ng-click="GovernrateCtrl.ChangeGovernrateStatus(Governrate)">\n' +
    '                            </div>\n' +
    '\n' +
    '                    </td>\n' +
    '                    <td width="30%">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                            ng-click="$state.go(\'editGovernrate\',{countryId: $stateParams.countryId ,governrateId: Governrate.governrateId});"\n' +
    '                            title="Edit"> mode_edit</i>\n' +
    '                    </td>\n' +
    '\n' +
    '                </tr>\n' +
    '\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div>\n' +
    '        <a onclick="goBack()">\n' +
    '            <div class="col-xs-12">\n' +
    '                <button type="button"\n' +
    '                class="btn btn-primary" \n' +
    '                style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                {{\'goBack\' | translate}}\n' +
    '                </button>\n' +
    '            </div>\n' +
    '            </a>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Governrate/templates/edit.html',
    '<div>\n' +
    '        {{\'EditGovernrate\' | translate}}\n' +
    '</div>      \n' +
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Governrate\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editGovernrateCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                    <span style="color:red">*</span>  {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editGovernrateCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titles{{lang.value+\'Name\'}}" ng-model="editGovernrateCtrl.Governrate.titles[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div class="error" ng-messages="editTypeForm.titles{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div class="error" ng-show="editTypeForm.titles{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titles{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div class="error" ng-show="(editTypeForm.titles{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titles{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editGovernrateCtrl.UpdateGovernrate()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editGovernrateCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Governrate/templates/new.html',
    '<div>\n' +
    '        {{\'NewGovernrate\' | translate}}\n' +
    '</div>              \n' +
    '<div class="modal-content">\n' +
    '        \n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewGovernrate\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newAreaForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newGovernrateCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newGovernrateCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control" name="titles{{lang.value+\'Name\'}}" ng-model="newGovernrateCtrl.titles[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newAreaForm.titles{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newAreaForm.titles{{lang.value+\'Name\'}}.$error.required && !newAreaForm.titles{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newAreaForm.titles{{lang.value+\'Name\'}}.$error.minlength || newAreaForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !newAreaForm.titles{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newAreaForm.$invalid" class="btn pmd-ripple-effect btn-primary" Area="button" ng-click="newGovernrateCtrl.AddNewGovernrate()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Area="button" ng-click="$state.go(\'Governrates\',{countryId: $stateParams.countryId });">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/Manufacture.html',
    '<div>\n' +
    '    {{Manufacture.code}}\n' +
    '\n' +
    '    <div id="bold">\n' +
    '        {{\'ManufactureLbl\' | translate}}\n' +
    '    </div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.permessionModules[\'Manufacturer\'].includes(54)">\n' +
    '        <button ng-click="$state.go(\'newManufacture\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '            style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            type="button">{{\'AddNew\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <!--end  add button -->\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '    <div class="table-responsive">\n' +
    '            <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <form class="ManufactureForm" name="ManufactureForm">\n' +
    '                            <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <div>\n' +
    '                            <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield">\n' +
    '                                <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '                                    placeholder="   search by Manufacture Name   "\n' +
    '                                    ng-model="ManufactureCtrl.name" ng-minlength="3" ng-maxlength="255"\n' +
    '                                    id="searchInput">\n' +
    '                            </div>\n' +
    '                            <!-- <div ng-messages="ManufactureForm.searchInput.$error">\n' +
    '                                <div class="error"\n' +
    '                                    ng-show="(ManufactureForm.searchInput.$error.minlength || ManufactureForm.searchInput.$error.maxlength) && !ManufactureForm.searchInput.$error.required">\n' +
    '                                    {{\'NameLengthError255\' | translate}}</div>\n' +
    '                            </div> -->\n' +
    '                            <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield-verse">\n' +
    '                                <button id="searchBtb" ng-disabled="ManufactureForm.$invalid"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                    ng-click="ManufactureCtrl.filterManfacture(ManufactureCtrl.name)">\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                        width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                        class="kt-svg-icon">\n' +
    '                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                            <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                            <path\n' +
    '                                                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                id="Path-2" fill="#494b74c4" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                            <path\n' +
    '                                                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                id="Path" fill="#494b74c4" fill-rule="nonzero" />\n' +
    '                                        </g>\n' +
    '                                    </svg>\n' +
    '                                    {{\'search\' | translate}}\n' +
    '                                </button>\n' +
    '                            </div>\n' +
    '                            <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtb"\n' +
    '                                    ng-click="ManufactureCtrl.filterManfacture()">{{\'All\' | translate}}</button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        </div>\n' +
    '                        </form>\n' +
    '                </div>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div ng-if="ManufactureCtrl.ManufactureList.results.length == 0">\n' +
    '        <span>{{\'NoManufacturesAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="ManufactureCtrl.ManufactureList.results.length > 0">\n' +
    '        <!-- binding data from api to Manufacture list  -->\n' +
    '        <div>\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr>\n' +
    '                            <th> {{\'CompanyLogo\' | translate}}</th>\n' +
    '                            <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                            <th>{{\'Name\' | translate}}</th>\n' +
    '                            <th>{{\'AddressLbl\' | translate}}</th>\n' +
    '                            <th>{{\'CityLbl\' | translate}}</th>\n' +
    '                            <th>{{\'GovernateLbl\' | translate}}</th>\n' +
    '                            <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                            <th></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <!-- data mandatory  -->\n' +
    '                        <tr ng-repeat="Manufacture in ManufactureCtrl.ManufactureList.results">\n' +
    '                            <td>\n' +
    '                                <img width="100px" height="100px"\n' +
    '                                    data-ng-src="{{ManufactureCtrl.appCONSTANTS.Image_URL_ACTOR}}{{Manufacture.companyLogo}}" />\n' +
    '                            </td>\n' +
    '                            <td data-title="code">{{Manufacture.code}}</td>\n' +
    '                            <td data-title="Name">\n' +
    '                                {{Manufacture.name | limitTo : 20}}\n' +
    '                                {{Manufacture.name.length > 20 ? \'...\' : \'\'}}\n' +
    '                            </td>\n' +
    '                            <td data-title="address">{{Manufacture.address}}</td>\n' +
    '                            <td data-title="city">{{Manufacture.city.titles[selectedLanguage]}}</td>\n' +
    '                            <td data-title="governrate">{{Manufacture.governrate.titles[selectedLanguage]}}</td>\n' +
    '                            <td  width="15%">\n' +
    '                                <div ng-show="user.permessionModules[\'Manufacturer\'].includes(52)" class="btn-switch"\n' +
    '                                    ng-class="{\'btn-switch--on\':Manufacture.isActive}" ng-model="Manufacture.isActive"\n' +
    '                                    ng-click="ManufactureCtrl.ChangeManufactureStatus(Manufacture)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle"\n' +
    '                                        ng-class="{\'btn-switch-circle--on\':Manufacture.isActive}"\n' +
    '                                        ng-model="Manufacture.isActive"\n' +
    '                                        ng-click="ManufactureCtrl.ChangeManufactureStatus(Manufacture)">\n' +
    '                                    </div>\n' +
    '\n' +
    '                            </td>\n' +
    '\n' +
    '                            <!-- action -->\n' +
    '                            <td width="30%">\n' +
    '                                <i ng-show="user.permessionModules[\'Manufacturer\'].includes(53)"\n' +
    '                                    class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                    ng-click="$state.go(\'editManufacture\',{manufactureId: Manufacture.manufactureId});" title="Edit">mode_edit</i>\n' +
    '                                <i ng-show="user.permessionModules[\'Manufacturer\'].includes(56)"\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="ManufactureCtrl.openDeleteDialog\n' +
    '                                (Manufacture,Manufacture.name,Manufacture.manufactureId)"title="Delete">delete</i>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="ManufactureCtrl.totalCount"\n' +
    '        paging-action="ManufactureCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/edit.html',
    '\n' +
    '<div class="container">\n' +
    '        <!-- header -->\n' +
    '        <div class="modal-header bordered" id="bold">\n' +
    '                {{\'EditManufactureL\' | translate}}\n' +
    '            </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-12">\n' +
    '                <div id="vm-container">\n' +
    '                    <!-- Manufacture form step -->\n' +
    '                    <div id="vm-step-container">\n' +
    '                        <ul class="nav nav-pills nav-justified">\n' +
    '                            <li ng-repeat="step in editManufactureCtrl.steps"\n' +
    '                                ng-class="{\'active\':step.step == editManufactureCtrl.currentStep}">\n' +
    '                                <a> {{step.step | translate }}. {{step.name | translate}}</a>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '    \n' +
    '                    <!-- function -- get pages  -->\n' +
    '                    <div id="vm-content-container">\n' +
    '                        <ng-include src="editManufactureCtrl.getStepTemplate()"></ng-include>\n' +
    '                    </div>\n' +
    '                    <!-- previous button  -->\n' +
    '                    <div id="vm-navigation-container" class="col-lg-12">\n' +
    '                        <div class="pull-right">\n' +
    '                            <span class="btn-group">\n' +
    '                                    <button class="btn btn-primary" name="next" type="button"\n' +
    '                                    onclick="goBack()"> {{\'goBack\' | translate}}</button>\n' +
    '                                <button ng-disabled="editManufactureCtrl.currentStep <= 1" class="btn btn-default"\n' +
    '                                    name="previous" type="button"\n' +
    '                                    ng-click="editManufactureCtrl.gotoStep(editManufactureCtrl.currentStep - 1)">\n' +
    '                                    <i\n' +
    '                                        class="fa fa-arrow-left"></i> {{\'PreviousStep\' | translate}}\n' +
    '                                </button>\n' +
    '                                <!-- next button  -->\n' +
    '                                <button ng-disabled="editManufactureCtrl.currentStep >=editManufactureCtrl.steps.length"\n' +
    '                                    class="btn btn-primary" name="next" type="button"\n' +
    '                                    ng-click="editManufactureCtrl.gotoStep(editManufactureCtrl.currentStep + 1)">\n' +
    '                                    {{\'Nextstep\' | translate}}\n' +
    '                                    <i class="fa fa-arrow-right"></i>\n' +
    '                                </button>\n' +
    '                       \n' +
    '                            </span>\n' +
    '                            <!-- save button  -->\n' +
    '                            <button\n' +
    '                                ng-disabled="editManufactureCtrl.currentStep !=editManufactureCtrl.steps.length || isValid == false"\n' +
    '                                class="btn btn-success" name="next" type="button"\n' +
    '                                ng-click="editManufactureCtrl.UpdateManufacture()">\n' +
    '                                <i class="fa fa-floppy-o"></i> {{\'Save\' | translate}}</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '    \n' +
    '                </div>\n' +
    '    \n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/editstep1.html',
    '<div class="modal-content container">\n' +
    '  <div class="modal-body">\n' +
    '    <form class="editManufactureForm" name="editManufactureForm">\n' +
    '      <div>\n' +
    '        <!-- Nav tabs -->\n' +
    '        <ul>\n' +
    '          <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editManufactureCtrl.Manufacture.language">\n' +
    '            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '              data-toggle="tab">\n' +
    '              {{lang.value | translate}}\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '        <div>\n' +
    '          <div>\n' +
    '            <!-- Tab panes -->\n' +
    '            <div class="tab-content table-responsive">\n' +
    '              <h2> <label for="readonly">{{\'infoLbl\' | translate}} </label></h2>\n' +
    '              <!-- left side -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- input name  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                  <input required type="text" class="mat-input form-control" name="name"\n' +
    '                    ng-model="editManufactureCtrl.Manufacture.name" ng-minlength="3" ng-maxlength="255">\n' +
    '                  <!-- length validation  -->\n' +
    '                  <div ng-messages="editManufactureForm.name.$error" class="error">\n' +
    '                    <div ng-show="editManufactureForm.name.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                    <div\n' +
    '                      ng-if="editManufactureForm.name.$error.required && !editManufactureForm.name.$pristine">\n' +
    '                      {{\'NameError\' | translate}}</div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <div\n' +
    '                      ng-if="(editManufactureForm.name.$error.minlength || editManufactureForm.name.$error.maxlength) ">\n' +
    '                      {{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- code field -->\n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                  </label>\n' +
    '                  <input type="text" name="code" ng-readonly="true" ng-model="editManufactureCtrl.Manufacture.code"\n' +
    '                    aria-label="readonly" class="mat-input form-control">\n' +
    '                  <br>\n' +
    '                </div> -->\n' +
    '                <!-- Address field  -->\n' +
    '                <label>\n' +
    '                  <span style="color:red">*</span> {{\'AddressLbl\' | translate}}\n' +
    '                  <br>\n' +
    '                  <textarea name="address" ng-model="editManufactureCtrl.Manufacture.address" required style="width: 250%;"\n' +
    '                    ng-minlength="11" placeholder="add your address here ." required>\n' +
    '                    </textarea>\n' +
    '                </label>\n' +
    '                <!-- length validation -->\n' +
    '                <div ng-messages="editManufactureForm.address.$error" class="error">\n' +
    '                  <div ng-show="editManufactureForm.address.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                  <div ng-if="editManufactureForm.address.$error.required && !editManufactureForm.address.$pristine">\n' +
    '                    {{\'nameLengthError\' | translate}}</div>\n' +
    '                  <div\n' +
    '                    ng-if="(editManufactureForm.address.$error.minlength || editManufactureForm.address.$error.maxlength) ">\n' +
    '                    {{\'NameLengthError255\'\n' +
    '                    | translate}}</div>\n' +
    '                </div>\n' +
    '                <div>\n' +
    '                  <!-- required validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="editManufactureForm.address.$error.required && !editManufactureForm.address.$pristine">\n' +
    '                    {{\'RequiredLbl\' | translate}}\n' +
    '                  </span>\n' +
    '                  <span class="error" ng-show="editManufactureForm.address.$error.maxlength">\n' +
    '                    Too long!\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- email field  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'EmailLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="mat-input form-control" name="email"\n' +
    '                    ng-model="editManufactureCtrl.Manufacture.email"\n' +
    '                    ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                  <!-- email validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="editManufactureForm.email.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- website field  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'websiteLbl\' | translate}} </label>\n' +
    '                  <br>\n' +
    '                  <input type="webSite" name="editManufactureCtrl.Manufacture.webSite" ng-model="editManufactureCtrl.Manufacture.webSite" class="mat-input form-control ng-pristine ng-untouched\n' +
    '                      ng-empty ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength">\n' +
    '                  <label>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <!-- right side  -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- country --- drop down  -->\n' +
    '                <div\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Country\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="countryId"\n' +
    '                    ng-change="editManufactureCtrl.countryChange()" ng-model="editManufactureCtrl.selectedCountryId"\n' +
    '                    ng-options="group.countryId  as group.titles[selectedLanguage] for group in editManufactureCtrl.countries">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="editManufactureForm.results[countryId].$error.required && !editManufactureForm.results[countryId].$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="editManufactureForm.results[countryId].$error.results[countryId]">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- governrate based on country id  -->\n' +
    '                <div ng-show=" editManufactureCtrl.selectedCountryId > 0"\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Governrate\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="governrateId"\n' +
    '                    ng-change="editManufactureCtrl.GovernrateChange()" ng-model="editManufactureCtrl.selectedGovernrateId"\n' +
    '                    ng-options="group.governrateId as group.titles[selectedLanguage] for group in editManufactureCtrl.Governrates">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <span class="error"\n' +
    '                      ng-show="editManufactureForm.governrateId.$error.required && !editManufactureForm.governrateId.$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="editManufactureForm.governrateId.$error.governrateId">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- city based on governrate -->\n' +
    '                <div ng-show=" editManufactureCtrl.selectedGovernrateId > 0"\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'City\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="cityId"\n' +
    '                   ng-change="editManufactureCtrl.cityChange()"\n' +
    '                    ng-model="editManufactureCtrl.selectedCityId" name="cityId"\n' +
    '                    ng-options="group.cityId as group.titles[selectedLanguage] for group in editManufactureCtrl.cities">\n' +
    '                  </select>\n' +
    '                </div>\n' +
    '\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/editstep2.html',
    '<div class="modal-content container">\n' +
    '    <h2>{{ContactInformation | translate}}</h2>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editManufactureForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newCategoryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content table-responsive">\n' +
    '                            <!-- name -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="name" style="display: inline-block; "\n' +
    '                                    ng-model="editManufactureCtrl.name" required />\n' +
    '                                <div class="error" ng-messages="editManufactureForm.name.$error">\n' +
    '                                    <div ng-if="editManufactureForm.name.$error.required && \n' +
    '                                    !editManufactureForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- title -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'Title\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="title" style="display: inline-block;"\n' +
    '                                    ng-model="editManufactureCtrl.title" required />\n' +
    '                            </div>\n' +
    '                            <!-- Mobile number -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label> <span style="color:red">*</span> {{\'MobileNo\' | translate}}</label>\n' +
    '                                <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only style="display: inline-block;" ng-minlength="11" ng-maxlength="11"\n' +
    '                                    ng-model="editManufactureCtrl.mobileNumber" required />\n' +
    '                                <!-- required validation  -->\n' +
    '                                <div ng-messages="editManufactureForm.mobileNumber.$error">\n' +
    '                                    <div class="error" ng-if="editManufactureForm.mobileNumber.$error.required && \n' +
    '                                        !editManufactureForm.mobileNumber.$pristine">\n' +
    '                                        {{\'requiredErr\' |  translate}}\n' +
    '                                    </div>\n' +
    '                                    <!-- length validation -->\n' +
    '                                    <div class="error" ng-if="(editManufactureForm.mobileNumber.$error.minlength ||\n' +
    '                                            editManufactureForm.mobileNumber.$error.maxlength) \n' +
    '                                             && !editManufactureForm.mobileNumber.newmobileNumber.$error.required">\n' +
    '                                        {{\'PhoneLengthError\' |  translate}}\n' +
    '\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- email -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'EmailLbl\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="email" style="display: inline-block;"\n' +
    '                                    ng-model="editManufactureCtrl.email" required />\n' +
    '                            </div>\n' +
    '                            <!-- contact Type -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'ContactType\' | translate}}</label>\n' +
    '                                <!-- required validation -->\n' +
    '                                <select class="form-control select-tags pmd-select2-tags"\n' +
    '                                    ng-model="editManufactureCtrl.contactType" name="contactType">\n' +
    '                                    <option ng-repeat="contact in editManufactureCtrl.ContactTypeList">\n' +
    '                                        {{contact.titles[selectedLanguage]}}\n' +
    '                                    </option>\n' +
    '                                </select>\n' +
    '\n' +
    '                            </div>\n' +
    '                            <!-- {{size.sizeNameDictionary[selectedLanguage]}} -->\n' +
    '\n' +
    '                            <!-- add button -->\n' +
    '                            <div class="col-lg-2">\n' +
    '                                <label>{{\'Addtotable\' | translate}}</label>\n' +
    '                                <input type="button" ng-click="editManufactureCtrl.AddContact()"\n' +
    '                                class="btn btn-primary" value="{{\'AddBtn\' | translate}}"\n' +
    '                                    style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <!-- binding data from inputs to table -->\n' +
    '                            <table class="table pmd-table table-hover">\n' +
    '                                <!-- heads -->\n' +
    '                                <thead>\n' +
    '                                    <tr>\n' +
    '                                        <th>{{\'Name\' | translate}}</th>\n' +
    '                                        <th>{{\'Title\' | translate}}</th>\n' +
    '                                        <th>{{\'MobileNo\' | translate}}</th>\n' +
    '                                        <th>{{\'EmailLbl\' | translate}}</th>\n' +
    '                                        <th>{{\'ContactType\' | translate}}</th>\n' +
    '                                        <th>{{\'Action\' | translate}}</th>\n' +
    '                                    </tr>\n' +
    '                                </thead>\n' +
    '                                <!-- binding data -->\n' +
    '                                <tbody>\n' +
    '                                    <tr\n' +
    '                                        ng-repeat="(index,Contact) in editManufactureCtrl.Manufacture.manufactureContactInformation">\n' +
    '                                        <td data-title="Name">{{Contact.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{Contact.title}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox"\n' +
    '                                                ng-change="editManufactureCtrl.setContactMain(Contact)"\n' +
    '                                                ng-model="Contact.main">\n' +
    '                                        </td>\n' +
    '                                        <td width="30%">\n' +
    '                                            <i\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="editManufactureCtrl.openDeleteContactTypeDialog(index)"title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                    <tr ng-repeat="(index,Contact1) in editManufactureCtrl.ContactList">\n' +
    '                                        <td data-title="Name">{{Contact1.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact1.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact1.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact1.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{editManufactureCtrl.contactType}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox"\n' +
    '                                                ng-change="editManufactureCtrl.setContactMain(Contact1)"\n' +
    '                                                ng-model="Contact1.checkbox">\n' +
    '                                        </td>\n' +
    '                                        <td width="30%">\n' +
    '                                            <i\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="editManufactureCtrl.openDeleteContactTypeDialogContactList(index)"title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                </tbody>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/editstep3.html',
    '<div class="modal-content container">\n' +
    '  <h2>  {{\'commercialInformation\' | translate}} </h2>\n' +
    '\n' +
    '  <div class="modal-body">\n' +
    '    <form class="form-horizontal" name="editManufactureForm">\n' +
    '      <div>\n' +
    '        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '          <span style="color:red">*</span>\n' +
    '          <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">\n' +
    '              {{\'UploadPhoto\' | translate}}</label>\n' +
    '          <input id="image" class="hidden" type="file" img-upload ng-model="imageName" name="imageName">\n' +
    '          <img height="100" width="100" ng-src="{{image}}" />\n' +
    '          <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '            {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '        </div>\n' +
    '      </div>\n' +
    '  </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/new.html',
    '\n' +
    '<div class="container">\n' +
    '    <!-- header -->\n' +
    '    <div class="modal-header bordered" id="bold">\n' +
    '            {{\'ManufactureLbl\' | translate}}\n' +
    '        </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '            <div id="vm-container">\n' +
    '                <!-- Manufacture form step -->\n' +
    '                <div id="vm-step-container">\n' +
    '                    <ul class="nav nav-pills nav-justified">\n' +
    '                        <li ng-repeat="step in newManufactureCtrl.steps"\n' +
    '                            ng-class="{\'active\':step.step == newManufactureCtrl.currentStep}">\n' +
    '                            <a> {{step.step | translate }}. {{step.name | translate}}</a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- function -- get pages  -->\n' +
    '                <div id="vm-content-container">\n' +
    '                    <ng-include src="newManufactureCtrl.getStepTemplate()"></ng-include>\n' +
    '                </div>\n' +
    '                <!-- previous button  -->\n' +
    '                <div id="vm-navigation-container" class="col-lg-12">\n' +
    '                    <div class="pull-right">\n' +
    '                        <span class="btn-group">\n' +
    '                                <button class="btn btn-primary" name="next" type="button"\n' +
    '                                onclick="goBack()"> {{\'goBack\' | translate}}</button>\n' +
    '                            <button ng-disabled="newManufactureCtrl.currentStep <= 1" class="btn btn-default"\n' +
    '                                name="previous" type="button"\n' +
    '                                ng-click="newManufactureCtrl.gotoStep(newManufactureCtrl.currentStep - 1)"><i\n' +
    '                                    class="fa fa-arrow-left"></i> {{\'PreviousStep\' | translate}}\n' +
    '\n' +
    '                            </button>\n' +
    '                            <!-- next button  -->\n' +
    '                            <button ng-disabled="newManufactureCtrl.currentStep >=newManufactureCtrl.steps.length"\n' +
    '                                class="btn btn-primary" name="next" type="button"\n' +
    '                                ng-click="newManufactureCtrl.gotoStep(newManufactureCtrl.currentStep + 1)">\n' +
    '                                {{\'Nextstep\' | translate}}\n' +
    '                                <i class="fa fa-arrow-right"></i>\n' +
    '                            </button>\n' +
    '                        </span>\n' +
    '                        <!-- save button  -->\n' +
    '                        <button\n' +
    '                            ng-disabled="newManufactureCtrl.currentStep !=newManufactureCtrl.steps.length || image == null"\n' +
    '                            class="btn btn-success" name="next" type="button"\n' +
    '                            ng-click="newManufactureCtrl.addNewManufacture()">\n' +
    '                            <i class="fa fa-floppy-o"></i> {{\'Save\' | translate}}</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/step1.html',
    '<div class="modal-content container">\n' +
    '  <div class="modal-body">\n' +
    '    <form class="newmanufactureForm" name="newmanufactureForm">\n' +
    '      <div>\n' +
    '        <!-- Nav tabs -->\n' +
    '        <ul>\n' +
    '          <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newmangactureCtrl.language">\n' +
    '            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '              data-toggle="tab">\n' +
    '              {{lang.value | translate}}\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '        <div>\n' +
    '          <div>\n' +
    '            <!-- Tab panes -->\n' +
    '            <div class="tab-content table-responsive">\n' +
    '              <h2> <label for="readonly">{{\'infoLbl\' | translate}} </label></h2>\n' +
    '              <!-- left side -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- input name  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                  <input required type="text" class="mat-input form-control" name="nameStepOne"\n' +
    '                    ng-model="newManufactureCtrl.nameStepOne" ng-minlength="3" ng-maxlength="255">\n' +
    '                  <!-- length validation  -->\n' +
    '                  <div ng-messages="newmanufactureForm.nameStepOne.$error" class="error">\n' +
    '                    <div ng-show="newmanufactureForm.nameStepOne.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                    <div\n' +
    '                      ng-if="newmanufactureForm.nameStepOne.$error.required && !newmanufactureForm.nameStepOne.$pristine">\n' +
    '                      {{\'NameError\' | translate}}</div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <div\n' +
    '                      ng-if="(newmanufactureForm.nameStepOne.$error.minlength || newmanufactureForm.nameStepOne.$error.maxlength) ">\n' +
    '                      {{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- code field -->\n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                  </label>\n' +
    '                  <input type="text" name="code" ng-readonly="true" ng-model="newManufactureCtrl.code"\n' +
    '                    aria-label="readonly" class="mat-input form-control">\n' +
    '                  <br>\n' +
    '                </div> -->\n' +
    '                <!-- Address field  -->\n' +
    '                <label>\n' +
    '                  <span style="color:red">*</span> {{\'AddressLbl\' | translate}}\n' +
    '                  <br>\n' +
    '                  <textarea name="address" ng-model="newManufactureCtrl.address" required style="width: 250%;"\n' +
    '                    ng-minlength="11" placeholder="{{\'addyouraddresshere\' | translate}}" required>\n' +
    '                    </textarea>\n' +
    '                </label>\n' +
    '                <!-- length validation -->\n' +
    '                <div ng-messages="newmanufactureForm.address.$error" class="error">\n' +
    '                  <div ng-show="newmanufactureForm.address.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                  <div ng-if="newmanufactureForm.address.$error.required && !newmanufactureForm.address.$pristine">\n' +
    '                    {{\'nameLengthError\' | translate}}</div>\n' +
    '                  <div\n' +
    '                    ng-if="(newmanufactureForm.address.$error.minlength || newmanufactureForm.address.$error.maxlength) ">\n' +
    '                    {{\'NameLengthError255\'\n' +
    '                    | translate}}</div>\n' +
    '                </div>\n' +
    '                <div>\n' +
    '                  <!-- required validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="newmanufactureForm.address.$error.required && !newmanufactureForm.address.$pristine">\n' +
    '                    {{\'RequiredLbl\' | translate}}\n' +
    '                  </span>\n' +
    '                  <span class="error" ng-show="newmanufactureForm.address.$error.maxlength">\n' +
    '                    Too long!\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- email field  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'EmailLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="mat-input form-control" name="emailStepOne"\n' +
    '                    ng-model="newManufactureCtrl.emailStepOne"\n' +
    '                    ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                  <!-- email validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="newmanufactureForm.emailStepOne.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- website field  -->\n' +
    '                <div class="form-group pmd-textfield floating-label-pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'websiteLbl\' | translate}} </label>\n' +
    '                  <br>\n' +
    '                  <input type="url" name="newManufactureCtrl.url" ng-model="newManufactureCtrl.url" class="mat-input form-control ng-pristine ng-untouched\n' +
    '                      ng-empty ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength">\n' +
    '                  <label>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '              <!-- right side  -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- country --- drop down  -->\n' +
    '                <div\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Country\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="countryId"\n' +
    '                    ng-change="newManufactureCtrl.countryChange()" ng-model="newManufactureCtrl.selectedCountryId"\n' +
    '                    ng-options="group.countryId  as group.titles[selectedLanguage] for group in newManufactureCtrl.countries">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newmanufactureFormcountryChange.results[countryId].$error.required && !newmanufactureForm.results[countryId].$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="newmanufactureForm.results[countryId].$error.results[countryId]">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- governrate based on country id  -->\n' +
    '                <div  \n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Governrate\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="governrateId"\n' +
    '                    ng-change="newManufactureCtrl.GovernrateChange()" ng-model="newManufactureCtrl.selectedGovernrateId"\n' +
    '                    ng-options="group.governrateId as group.titles[selectedLanguage] for group in newManufactureCtrl.Governrates">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newmanufactureForm.governrateId.$error.required && !newmanufactureForm.governrateId.$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="newmanufactureForm.governrateId.$error.governrateId">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- city based on governrate -->\n' +
    '                <div  \n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'City\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="cityId"\n' +
    '                   ng-change="newManufactureCtrl.cityChange()"\n' +
    '                    ng-model="newManufactureCtrl.selectedCityId" name="cityId"\n' +
    '                    ng-options="group.cityId as group.titles[selectedLanguage] for group in newManufactureCtrl.cities">\n' +
    '                  </select>\n' +
    '                </div>\n' +
    '\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/step2.html',
    '<div class="modal-content container">\n' +
    '    <h2>{{\'ContactInformation\' | translate}} </h2>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newManufactureForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newCategoryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content table-responsive">\n' +
    '                            <!-- name -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="name" style="display: inline-block; "\n' +
    '                                    ng-model="newManufactureCtrl.name" required />\n' +
    '                                <div class="error" ng-messages="newManufactureForm.name.$error">\n' +
    '                                    <div ng-if="newManufactureForm.name.$error.required && \n' +
    '                                    !newManufactureForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- title -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'Title\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="title" style="display: inline-block;"\n' +
    '                                    ng-model="newManufactureCtrl.title" required />\n' +
    '                            </div>\n' +
    '                            <!-- Mobile number -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label> <span style="color:red">*</span> {{\'MobileNo\' | translate}}</label>\n' +
    '                                <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only  style="display: inline-block;" ng-minlength="11" ng-maxlength="11"\n' +
    '                                    ng-model="newManufactureCtrl.mobileNumber" required />\n' +
    '                                <!-- required validation  -->\n' +
    '                                <div ng-messages="newManufactureForm.mobileNumber.$error">\n' +
    '                                    <div class="error" ng-if="newManufactureForm.mobileNumber.$error.required && \n' +
    '                                        !newManufactureForm.mobileNumber.$pristine">\n' +
    '                                        {{\'requiredErr\' |  translate}}\n' +
    '                                    </div>\n' +
    '                                    <!-- length validation -->\n' +
    '                                    <div class="error" ng-if="(newManufactureForm.mobileNumber.$error.minlength ||\n' +
    '                                            newManufactureForm.mobileNumber.$error.maxlength) \n' +
    '                                             && !newManufactureForm.mobileNumber.newmobileNumber.$error.required">\n' +
    '                                        {{\'PhoneLengthError\' |  translate}}\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <!-- email -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'EMail\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="email" style="display: inline-block;"\n' +
    '                                    ng-model="newManufactureCtrl.email" required />\n' +
    '                            </div>\n' +
    '                            <!-- contact Type -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'ContactType\' | translate}}</label>\n' +
    '                                <!-- required validation -->\n' +
    '                                <select class="form-control select-tags pmd-select2-tags"\n' +
    '                                    ng-model="newManufactureCtrl.contactType" name="contactType">\n' +
    '                                    <option ng-repeat="contact in newManufactureCtrl.ContactTypeList">\n' +
    '                                        {{contact.titles[selectedLanguage]}}\n' +
    '                                    </option>\n' +
    '                                </select>\n' +
    '\n' +
    '                            </div>\n' +
    '\n' +
    '                            <!-- add button -->\n' +
    '                            <div class="col-lg-2">\n' +
    '                                <label>{{\'Addtotable\' | translate}}</label>\n' +
    '                                <input type="button" ng-click="newManufactureCtrl.AddContact()"\n' +
    '                                     class="btn btn-primary" value="add"\n' +
    '                                    style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '                            <!-- binding data from inputs to table -->\n' +
    '                            <table class="table pmd-table table-hover">\n' +
    '                                <!-- heads -->\n' +
    '                                <thead>\n' +
    '                                    <tr>\n' +
    '                                        <th>{{\'Name\' | translate}}</th>\n' +
    '                                        <th>{{\'Title\' | translate}}</th>\n' +
    '                                        <th>{{\'mobileNumber\' | translate}}</th>\n' +
    '                                        <th>{{\'EMail\' | translate}}</th>\n' +
    '                                        <th>{{\'ContactType\' | translate}}</th>\n' +
    '                                        <th>{{\'Action\' | translate}}</th>\n' +
    '                                    </tr>\n' +
    '                                </thead>\n' +
    '                                <!-- binding data -->\n' +
    '                                <tbody>\n' +
    '                                    <tr ng-repeat="(index,Contact) in newManufactureCtrl.ContactList">\n' +
    '                                        <td data-title="Name">{{Contact.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{newManufactureCtrl.contactType}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox"\n' +
    '                                                ng-change="newManufactureCtrl.setContactMain(Contact)"\n' +
    '                                                ng-model="Contact.checkbox">\n' +
    '                                        </td>\n' +
    '                                        <td width="30%">\n' +
    '                                            <i\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="newManufactureCtrl.openDeleteContactTypeDialog(index)"title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                </tbody>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Manufacture/templates/step3.html',
    '<div class="modal-content container">\n' +
    '  <h2>{{\'commercialInformation\' | translate}}</h2>\n' +
    '\n' +
    '  <div class="modal-body">\n' +
    '    <form class="form-horizontal" name="newManufactureForm">\n' +
    '      <div>\n' +
    '          <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '              <input id="companyLogo" name="companyLogo" style="display: none;" onchange="angular.element(this).scope().AddcompanyLogo(this.files)"\n' +
    '               type="file" required>\n' +
    '              <button ng-click="newManufactureCtrl.LoadUploadLogo()">{{\'UploadImageBtn\' | translate}}</button>\n' +
    '              <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedcompanyLogo1\' | translate}}</span>\n' +
    '              <img ng-src="{{newManufactureCtrl.companyLogo}}" style="max-height: 139px;max-width: 423px;">\n' +
    '              {{imageType}}\n' +
    '              <div ng-messages="newManufactureForm.companyLogo.$error">\n' +
    '                <div ng-if="newManufactureForm.companyLogo.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                  </div>\n' +
    '            </div> -->\n' +
    '\n' +
    '            <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '              <span style="color:red">*</span>\n' +
    '              <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                  Photo</label>\n' +
    '              <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                  name="imageName">\n' +
    '              <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '\n' +
    '              <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                  {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '                  \n' +
    '          </div>\n' +
    '</div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/News/templates/News.html',
    '<div>\n' +
    '    {{user.PermessionModules  }}\n' +
    '    <!-- ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')" -->\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <!-- <div id="bold"> {{\'AddNewNewsBtn\'| translate}} </div> -->\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newNews\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '    <div ng-if="NewsList.length == 0">\n' +
    '        <span>{{\'NoNewssAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="NewsList.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'image\' | translate}}</th>\n' +
    '                        <th>{{\'title\' | translate}}</th>\n' +
    '                        <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="News in NewsList">\n' +
    '                        <td>\n' +
    '                            <img style="width: 70px;height: 70px;"\n' +
    '                                data-ng-src="{{NewsCtrl.appCONSTANTS.Image_URL_ORDER}}{{News.image}}" />\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{News.title  | limitTo : 20}}\n' +
    '                            {{News.title.length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td ng-show="!News.isActive">\n' +
    '                            <div ng-if="user.permessionModules[\'News\'].includes(15)==true">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':News.isActive}"\n' +
    '                                    ng-model="News.isActive" ng-click="NewsCtrl.ChangeStatus(News)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':News.isActive}"\n' +
    '                                        ng-model="News.isActive" ng-click="NewsCtrl.ChangeStatus(News)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div ng-if="user.permessionModules[\'News\'].includes(15)==false"\n' +
    '                                title="You don\'t have permssion">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':News.isActive}"\n' +
    '                                    ng-model="News.isActive">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':News.isActive}"\n' +
    '                                        ng-model="News.isActive">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td ng-show="News.isActive">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':News.isActive}"\n' +
    '                                ng-model="News.isActive">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':News.isActive}"\n' +
    '                                    ng-model="News.isActive">\n' +
    '                                </div>\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.permessionModules[\'News\'].includes(14)"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editNews\',{id: News.id});" title="Edit">mode_edit</i>\n' +
    '                            <i ng-show="user.permessionModules[\'News\'].includes(3)"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="NewsCtrl.openDeleteDialog(News,News.titles[selectedLanguage],News.id)"\n' +
    '                                title="Delete">delete</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="NewsCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/News/templates/edit.html',
    '<div id="bold">\n' +
    '        {{\'EditCategory\' | translate}}        \n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'CategoryLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editTypeForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCategoryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span>  {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editCategoryCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control" name="titles{{lang.value+\'Name\'}}" ng-model="editCategoryCtrl.Category.titles[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="editTypeForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding" ng-show="editTypeForm.titles{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titles{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding" ng-show="(editTypeForm.titles{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titles{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                                    <span style="color:red">*</span>\n' +
    '                                    <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                                        Photo</label>\n' +
    '                                    <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                                        name="imageName">\n' +
    '                                    <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '        \n' +
    '                                    <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                        {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '        \n' +
    '                                </div>\n' +
    ' \n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCategoryCtrl.UpdateCategory()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCategoryCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-add-tags").select2({\n' +
    '            tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '            insertTag: function (data, tag) {\n' +
    '                // Insert the tag at the end of the results\n' +
    '                data.push(tag);\n' +
    '                // console.log(data);\n' +
    '            }\n' +
    '        });\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/News/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewNewsBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newNewsForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newNewsCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span>{{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newNewsCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required News="text" class="mat-input form-control"\n' +
    '                                        name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newNewsCtrl.titleDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newNewsForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                            <span style="color:red">*</span>\n' +
    '                            <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                                Photo</label>\n' +
    '                            <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                                name="imageName">\n' +
    '                            <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '                            <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newNewsForm.$invalid" class="btn pmd-ripple-effect btn-primary" News="button"\n' +
    '            ng-click="newNewsCtrl.AddNewNews()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" News="button"\n' +
    '            ng-click="newNewsCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-add-tags").select2({\n' +
    '            tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '            insertTag: function (data, tag) {\n' +
    '                data.push(tag);\n' +
    '            }\n' +
    '        });\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Order/templates/IooOrder.html',
    '<div id="bold">\n' +
    '    {{\'Order\' | translate}}\n' +
    '</div>\n' +
    '<div>\n' +
    '    <form name="orderForm">\n' +
    '        <div class="col-xs-4  form-group pmd-textfield pmd-textfield-floating-label-completed" id="pmd-textfield">\n' +
    '            <input required type="text" class="mat-input form-control" id="searchInputOrder" name="searchInput"\n' +
    '                placeholder="{{\'searchbyRetailerName\' | translate}}" ng-model="OrderIooCtrl.searchRetailer">\n' +
    '        </div>\n' +
    '        <div class="col-xs-2  form-group pmd-textfield pmd-textfield-floating-label-completed" id="pmd-textfield">\n' +
    '            <input required type="text" class="mat-input form-control" id="searchInputOrder" name="searchBasketInput"\n' +
    '                placeholder="{{\' SearchbyBasketNo \' | translate}}" ng-model="OrderIooCtrl.searchBasket">\n' +
    '\n' +
    '        </div>\n' +
    '        <div class="col-xs-2  form-group pmd-textfield pmd-textfield-floating-label-completed" id="pmd-textfield">\n' +
    '            <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '                placeholder="  {{\'SearchbyOrderNo\' | translate}}" ng-model="OrderIooCtrl.searchOrder" id="searchInputOrder">\n' +
    '\n' +
    '        </div>\n' +
    '        <div class="col-xs-2  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <label for="readonly"> {{\'fromLbl\' | translate}}\n' +
    '            </label>\n' +
    '            <input name="itemDatetime" ng-model="OrderIooCtrl.from" type="text" id="startdate" class="form-control"\n' +
    '                ng-change="OrderIooCtrl.dateFromChange();" /> \n' +
    '        </div>\n' +
    '\n' +
    '        <div class="col-xs-2  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <label for="readonly"> {{\'toLbl\' | translate}}\n' +
    '            </label>\n' +
    '            <input name="itemDatetime" ng-model="OrderIooCtrl.to" type="text" id="enddate" class="form-control"\n' +
    '                ng-change="dateToChange();" /> \n' +
    '        </div>\n' +
    '        <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '            <button id="searchBtbOrder" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                ng-click="OrderIooCtrl.filterOrder(false)">\n' +
    '                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px"\n' +
    '                    height="14px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">\n' +
    '                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                        <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                        <path\n' +
    '                            d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                            id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                        <path\n' +
    '                            d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                            id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                    </g>\n' +
    '                </svg>\n' +
    '                {{\'search\' | translate}}\n' +
    '            </button>\n' +
    '        </div>\n' +
    '        <div class="col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtbOrder"\n' +
    '                ng-click="OrderIooCtrl.filterOrder(true)">{{\'All\' | translate}}</button>\n' +
    '        </div>\n' +
    '\n' +
    '    </form>\n' +
    '</div>\n' +
    '<div class="table-responsive">\n' +
    '    <div ng-if="OrderIooCtrl.Orders.length == 0">\n' +
    '        <span>{{\'NoOrderAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="OrderIooCtrl.Orders.length > 0">\n' +
    '    <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'BasketNo\' | translate}}</th>\n' +
    '                    <th>{{\'Retailer\' | translate}}</th>\n' +
    '                    <th style="width: 20%">{{\'Date\' | translate}}</th>\n' +
    '                    <th>{{\'price\' | translate}}</th>\n' +
    '                    <th>{{\'DetailsBtn\' | translate}}</th>\n' +
    '\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat-start="Order in OrderIooCtrl.Orders">\n' +
    '                    <td>{{Order.basketNo}}</td>\n' +
    '                    <td>{{Order.retailer.name}}-{{Order.retailer.code}}</td>\n' +
    '                    <td>{{Order.orders[0].createDate  }}</td>\n' +
    '                    <td>{{Order.totalPrice}} <sub> {{\'EGP\' | translate}}</sub></td>\n' +
    '                    <td class="pmd-table-row-action">\n' +
    '                        <span href="javascript:void(0);" ng-if="Order.orders.length >0 "\n' +
    '                            ng-click="Order.show=!Order.show;OrderIooCtrl.showMore($event)"\n' +
    '                            class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm child-table-expand direct-expand"><i\n' +
    '                                class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                    </td>\n' +
    '\n' +
    '                    <td></td>\n' +
    '\n' +
    '\n' +
    '                </tr>\n' +
    '\n' +
    '                <tr ng-repeat-end ng-repeat="basketRow in Order.orders" ng-show="Order.show" id="collapse">\n' +
    '                    <td style="width: 10px">{{basketRow.orderNo}}</td>\n' +
    '                    <td style="width: 10px">{{basketRow.retailer.name}}-{{basketRow.retailer.code}}</td>\n' +
    '                    <td style="width: 10px">{{basketRow.tenant.name}}-{{basketRow.tenant.code}}</td>\n' +
    '                    <td style="width: 10px">{{basketRow.createDate | date : "d/MMM/yy h:mm a" }}</td>\n' +
    '                    <td style="width: 10px">{{basketRow.totalPrice}} <sub>EGP</sub></td>\n' +
    '                    <td style="width: 15%">\n' +
    '                        <a style="cursor: pointer;" class="pmd-ripple-effect "\n' +
    '                            ng-click="$state.go(\'OrderDetails\',{orderId: basketRow.orderId});">\n' +
    '                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">\n' +
    '                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                    <rect id="bound" x="0" y="0" width="24" height="24" />\n' +
    '                                    <path\n' +
    '                                        d="M3,12 C3,12 5.45454545,6 12,6 C16.9090909,6 21,12 21,12 C21,12 16.9090909,18 12,18 C5.45454545,18 3,12 3,12 Z"\n' +
    '                                        id="Shape" fill="#494b74" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                    <path\n' +
    '                                        d="M12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 Z"\n' +
    '                                        id="Path" fill="#494b74" opacity="0.3" />\n' +
    '                                </g>\n' +
    '                            </svg>\n' +
    '                        </a>\n' +
    '                        <!-- <i class="fa fa-eye" title="Click Here to view Order Details"\n' +
    '                        class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                        ng-click="$state.go(\'OrderDetails\',{orderId: basketRow.orderId});"></i> -->\n' +
    '                    </td>\n' +
    '\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="OrderIooCtrl.totalCount"\n' +
    '    paging-action="OrderIooCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '    hide-if-empty="true" disabled-class="hide">\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<script>\n' +
    '    $(function () {\n' +
    '        var today = new Date();\n' +
    '        // today.setDate(today.getDate() + 1)\n' +
    '\n' +
    '        $(\'#startdate\').datetimepicker({\n' +
    '            widgetPositioning: { vertical: "bottom" },\n' +
    '            format: \'YYYY-MM-DD\'\n' +
    '            //minDate: today,\n' +
    '\n' +
    '        })\n' +
    '        // .on(\'dp.change\', function (e) {\n' +
    '        //     \n' +
    '        //     angular.element(document.getElementById(\'startdate\')).scope().dateChange();\n' +
    '        // });\n' +
    '\n' +
    '\n' +
    '        $(\'#enddate\').datetimepicker({\n' +
    '            widgetPositioning: { vertical: "bottom" },\n' +
    '            format: \'YYYY-MM-DD\'\n' +
    '            // minDate: today,\n' +
    '\n' +
    '        })\n' +
    '        // .on(\'dp.change\', function (e) {\n' +
    '        //     \n' +
    '        //     angular.element(document.getElementById(\'enddate\')).scope().dateChange();\n' +
    '        // });\n' +
    '\n' +
    '        $("#startdate").on("dp.change", function (e) {\n' +
    '            $(\'#enddate\').data("DateTimePicker").minDate(e.date);\n' +
    '            angular.element(document.getElementById(\'startdate\')).scope().dateFromChange();\n' +
    '        });\n' +
    '        // Start date picke on chagne event [select maxmimum date for start date datepicker]\n' +
    '        $("#enddate").on("dp.change", function (e) {\n' +
    '            $(\'#startdate\').data("DateTimePicker").maxDate(e.date);\n' +
    '            angular.element(document.getElementById(\'enddate\')).scope().dateToChange();\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Order/templates/OrderDetails.html',
    '<div>\n' +
    '    <div id="bold">\n' +
    '        {{\'OrderDetails\' | translate}}\n' +
    '    </div>\n' +
    '    <h1 class="text-center">\n' +
    '        <kbd style="background-color: #494b74c4;">\n' +
    '            {{OrderDetailsCtrl.order.orderNo}} /\n' +
    '            {{OrderDetailsCtrl.order.retailer.name}} /\n' +
    '            {{OrderDetailsCtrl.order.createDate}}\n' +
    '        </kbd>\n' +
    '    </h1>\n' +
    '\n' +
    '    <div ng-if="OrderDetailsCtrl.OrderDetails.results.length == 0">\n' +
    '        <span>{{\'NoOrderAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="OrderDetailsCtrl.OrderDetails.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <!-- <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <button ng-disabled="OrderDetailsCtrl.listSelected.length==0" class="btn pmd-ripple-effect btn-primary "\n' +
    '                    type="button" id="Selected"\n' +
    '                    ng-click="OrderDetailsCtrl.forwardSelected()">{{\'ForwordSelected\' | translate}}</button>\n' +
    '            </div>\n' +
    '            <div class="col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <button ng-disabled="OrderDetailsCtrl.listSelected.length==0" class="btn pmd-ripple-effect btn-primary "\n' +
    '                    type="button" id="Selected"\n' +
    '                    ng-click="OrderDetailsCtrl.cancelSelected()">{{\'CancelSelected\' | translate}}</button>\n' +
    '            </div> -->\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <!-- <th>\n' +
    '                        </th> -->\n' +
    '                        <th style="width: 30%">{{\'Name\' | translate}}</th>\n' +
    '                        <th style="width: 20%">{{\'SKU\' | translate}}</th>\n' +
    '                        <th style="width: 6%">{{\'price\' | translate}}</th>\n' +
    '                        <th style="width: 4%">{{\'Quantity\' | translate}}</th>\n' +
    '                        <th style="width: 6%">{{\'ManufactureLbl\' | translate}} {{\'Status\' | translate}}</th>\n' +
    '                        <th style="width: 6%">{{\'DistributorLbl\' | translate}} {{\'Status\' | translate}}</th>\n' +
    '                        <th style="width: 6%">{{\'RetailerLbl\' | translate}} {{\'Status\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="Order in OrderDetailsCtrl.OrderDetails.results">\n' +
    '                        <!-- <td>\n' +
    '                            <input ng-disabled="Order.distributorStatus.statusCode != 255" id="{{Order.orderItemId}}"\n' +
    '                                type="checkbox" value="{{Order.orderItemId}}"\n' +
    '                                ng-checked="OrderDetailsCtrl.listSelected.indexOf(Order.orderItemId) > -1"\n' +
    '                                ng-click="OrderDetailsCtrl.toggleSelection(Order.orderItemId)" />\n' +
    '                        </td> -->\n' +
    '\n' +
    '                        <td>{{Order.productTitle[selectedLanguage] | limitTo : 20}}</td>\n' +
    '                        <td data-title="Name">{{Order.skuTitle[selectedLanguage]}}</td>\n' +
    '                        <td data-title="Name">{{Order.price}}<sub> {{\'EGP\' | translate}} </sub></td>\n' +
    '                        <td data-title="Name">{{Order.quantity}}</td>\n' +
    '                        <td>\n' +
    '                            <span class="label label-success">\n' +
    '                                {{Order.manufactureStatus.title[selectedLanguage]}}</span>\n' +
    '\n' +
    '                        </td>\n' +
    '\n' +
    '                        <td>\n' +
    '                            <span class="label label-default">\n' +
    '                                {{Order.distributorStatus.title[selectedLanguage]}}</span>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <span class="label label-warning">\n' +
    '                                {{Order.retailerStatus.title[selectedLanguage]}}</span>\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            <i ng-show="user.permessionModules[\'Order\'].includes(8)"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="OrderDetailsCtrl.openOrderDetails(Order)">mode_edit</i>\n' +
    '                        </td>\n' +
    '\n' +
    '\n' +
    '                    </tr>\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="OrderDetailsCtrl.totalCount"\n' +
    '        paging-action="OrderDetailsCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Order/templates/OrderDetailsByTenant.html',
    '<div>\n' +
    '    <div id="bold">\n' +
    '        {{\'OrderDetails\' | translate}}\n' +
    '    </div>\n' +
    '\n' +
    '    <h1 class="text-center">\n' +
    '        <kbd style="background-color: #494b74c4;">\n' +
    '            {{OrderDetailsByTenantCtrl.order.orderNo}} /\n' +
    '            {{OrderDetailsByTenantCtrl.order.retailer.name}} /\n' +
    '            {{OrderDetailsByTenantCtrl.order.createDate}}\n' +
    '        </kbd>\n' +
    '    </h1>\n' +
    '\n' +
    '    <div ng-if="OrderDetailsByTenantCtrl.OrderDetails.length == 0">\n' +
    '        <span>{{\'NoOrderAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <button class="btn pmd-ripple-effect btn-primary " type="button" id="Selected"\n' +
    '            ng-click="OrderDetailsByTenantCtrl.refreshDetails()">{{\'refresh\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="OrderDetailsByTenantCtrl.OrderDetails.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <button ng-disabled="OrderDetailsByTenantCtrl.listSelected.length==0"\n' +
    '                    class="btn pmd-ripple-effect btn-primary " type="button" id="Selected"\n' +
    '                    ng-click="OrderDetailsByTenantCtrl.forwardSelected()">{{\'ForwordSelected\' | translate}}</button>\n' +
    '            </div>\n' +
    '            <div class="col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <button ng-disabled="OrderDetailsByTenantCtrl.listSelected.length==0"\n' +
    '                    class="btn pmd-ripple-effect btn-primary " type="button" id="Selected"\n' +
    '                    ng-click="OrderDetailsByTenantCtrl.cancelSelected()">{{\'CancelSelected\' | translate}}</button>\n' +
    '            </div>\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>\n' +
    '                            <!-- <input type="checkbox" ng-model="selectedAll" ng-click="checkAll()" /> -->\n' +
    '                        </th>\n' +
    '                        <th style="width: 30%">{{\'Name\' | translate}}</th>\n' +
    '                        <th style="width: 20%">{{\'SKU\' | translate}}</th>\n' +
    '                        <th style="width: 6%">{{\'price\' | translate}}</th>\n' +
    '                        <th style="width: 4%">{{\'Quantity\' | translate}}</th>\n' +
    '                        <th style="width: 6%"> {{\'Status\' | translate}}</th>\n' +
    '                        <th style="width: 6%">{{\'DistributorLbl\' | translate}} {{\'Status\' | translate}}</th>\n' +
    '                        <th style="width: 6%">{{\'RetailerLbl\' | translate}} {{\'Status\' | translate}}</th>\n' +
    '                        <!-- <th></th> -->\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '\n' +
    '                    <tr ng-repeat="Order in OrderDetailsByTenantCtrl.OrderDetails">\n' +
    '                        <td>\n' +
    '                            <input ng-disabled="Order.distributorStatus.statusCode != 255" id="{{Order.orderItemId}}"\n' +
    '                                type="checkbox" value="{{Order.orderItemId}}"\n' +
    '                                ng-checked="OrderDetailsByTenantCtrl.listSelected.indexOf(Order.orderItemId) > -1"\n' +
    '                                ng-click="OrderDetailsByTenantCtrl.toggleSelection(Order.orderItemId)" />\n' +
    '\n' +
    '                            <!-- <input type="checkbox" ng-model="Order.isChecked" ng-checked="selectedAll"\n' +
    '                                ng-change="editZoneRelationCtrl.selectRetailer(Retailer)"> -->\n' +
    '                        </td>\n' +
    '\n' +
    '                        <td>{{Order.productTitle[selectedLanguage] | limitTo : 20}}</td>\n' +
    '                        <td data-title="Name">{{Order.skuTitle[selectedLanguage]}}</td>\n' +
    '                        <td data-title="Name">{{Order.price}}<sub> {{\'EGP\' | translate}}</sub></td>\n' +
    '                        <td data-title="Name">{{Order.quantity}}</td>\n' +
    '                        <td> <span class="label label-success">\n' +
    '                                {{Order.manufactureStatus.title[selectedLanguage]}}</span></td>\n' +
    '\n' +
    '\n' +
    '                        <td>\n' +
    '                            <span class="label label-default">\n' +
    '                                {{Order.distributorStatus.title[selectedLanguage]}}</span>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <span class="label label-warning">\n' +
    '                                {{Order.retailerStatus.title[selectedLanguage]}}</span>\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            <i ng-show="user.permessionModules[\'Order\'].includes(8)"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="OrderDetailsByTenantCtrl.openOrderDetails(Order)">mode_edit</i>\n' +
    '                        </td>\n' +
    '\n' +
    '\n' +
    '                    </tr>\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '            <!-- <pre>{{OrderDetailsByTenantCtrl.listSelected}}</pre> -->\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '        total="OrderDetailsByTenantCtrl.totalCount" paging-action="OrderDetailsByTenantCtrl.changePage(page)"\n' +
    '        flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Order/templates/ProductDetailsDialog.html',
    '<div id="bold">\n' +
    '		{{\'editProductDetails\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'ProductDetails\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editProductDetailsForm">\n' +
    '			{{\'Product\' | translate}} :\n' +
    '			<strong>{{ProductDetailsDialoglCtrl.model.description[selectedLanguage]}}</strong>\n' +
    '			<div class="row">\n' +
    '				<!-- <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'barCode\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="text" name="code" ng-model="ProductDetailsDialoglCtrl.model.barCode"\n' +
    '						aria-label="readonly" class="mat-input form-control">\n' +
    '\n' +
    '				</div> -->\n' +
    '\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"><span style="color:red">*</span> {{\'SKU\' | translate}}\n' +
    '					</label>\n' +
    '\n' +
    '					<select style="width:100% !important" class="form-control select-with-search pmd-select2-tags"\n' +
    '						ng-model="ProductDetailsDialoglCtrl.selectedskuId">\n' +
    '						<option ng-repeat="sku in ProductDetailsDialoglCtrl.SKUConversion" ng-value="{{sku.skuId}}">\n' +
    '							{{sku.titles[selectedLanguage]}}</option>\n' +
    '\n' +
    '					</select>\n' +
    '\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"><span style="color:red">*</span> {{\'price\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="text" name="price" ng-model="ProductDetailsDialoglCtrl.model.priceList[0].price"\n' +
    '						required ng-minlength="0" ng-maxlength="5" class="mat-input form-control">\n' +
    '					<div ng-messages="editProductDetailsForm.price.$error">\n' +
    '						<div class="error"\n' +
    '							ng-show="editProductDetailsForm.price.$error.required && !editProductDetailsForm.price.$pristine">\n' +
    '							{{\'requiredErr\' | translate}}</div>\n' +
    '\n' +
    '\n' +
    '						<div class="error" ng-if="(editProductDetailsForm.price.$error.minlength ||\n' +
    '						editProductDetailsForm.price.$error.maxlength) \n' +
    '						 && !editProductDetailsForm.price.$error.required">\n' +
    '							price length must be 0-5 char.\n' +
    '						</div>\n' +
    '					</div>\n' +
    '\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label> {{\'minQty\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="number" name="minQty" ng-model="ProductDetailsDialoglCtrl.model.minorderQty"\n' +
    '						ng-minlength="0" ng-maxlength="5" class="mat-input form-control">\n' +
    '					<div ng-messages="editProductDetailsForm.minQty.$error">\n' +
    '						<div class="error" ng-if="(editProductDetailsForm.minQty.$error.minlength ||\n' +
    '							editProductDetailsForm.minQty.$error.maxlength) \n' +
    '							 && !editProductDetailsForm.minQty.$error.required">\n' +
    '							minQty length must be 0-5 char.\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			<div class="row">\n' +
    '				<div class="col-md-4  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'IsPromoteProduct\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="checkbox" ng-model="ProductDetailsDialoglCtrl.model.isPormotedAllow">\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'status\' | translate}}\n' +
    '					</label>\n' +
    '					\n' +
    '					<input type="checkbox" ng-model="ProductDetailsDialoglCtrl.model.isActive">\n' +
    '				</div>\n' +
    '				<div class="col-md-4  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'blockOnDate\' | translate}}\n' +
    '					</label>\n' +
    '					<input name="itemDatetime" ng-model="ProductDetailsDialoglCtrl.model.blockOnDate" type="text"\n' +
    '						id="startdate" class="form-control" ng-change="dateChange();" />\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editProductDetailsForm.$invalid  || \n' +
    '		ProductDetailsDialoglCtrl.selectedskuId <= 0 " style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '			class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '			ng-click="ProductDetailsDialoglCtrl.UpdateSKUConversion()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button"\n' +
    '			ng-click="ProductDetailsDialoglCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<script>\n' +
    '	$(function () {\n' +
    '		var today = new Date();\n' +
    '		today.setDate(today.getDate() + 1)\n' +
    '\n' +
    '		$(\'#startdate\').datetimepicker({\n' +
    '			widgetPositioning: { vertical: "bottom" },\n' +
    '			minDate: today,\n' +
    '\n' +
    '		})\n' +
    '			.on(\'dp.change\', function (e) {\n' +
    '				\n' +
    '				angular.element(document.getElementById(\'startdate\')).scope().dateChange();\n' +
    '			});\n' +
    '	});\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Order/templates/mOrder.html',
    '<style>\n' +
    '    .open {\n' +
    '        background-color: #3d3de875;\n' +
    '    }\n' +
    '\n' +
    '    .new {\n' +
    '        background-color: white;\n' +
    '    }\n' +
    '</style>\n' +
    '<div id="bold">\n' +
    '    {{\'Order\' | translate}}\n' +
    '</div>\n' +
    '<div ng-if="OrderMCtrl.Orders.length == 0">\n' +
    '    <span>{{\'NoOrderAvailable\' | translate}}</span>\n' +
    '</div>\n' +
    '<div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="OrderMCtrl.Orders.length > 0">\n' +
    '    <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'OrderNo\' | translate}}</th>\n' +
    '                    <th>{{\'Retailer\' | translate}}</th>\n' +
    '                    <th>{{\'Date\' | translate}}</th>\n' +
    '                    <th>{{\'price\' | translate}}</th>\n' +
    '                    <th>{{\'DetailsBtn\' | translate}}</th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-class="{new: Order.m_IsOpen == true, open: Order.m_IsOpen != true}"\n' +
    '                    ng-repeat="Order in OrderMCtrl.Orders">\n' +
    '                    <td style="width: 10px">{{Order.orderNo}} </td>\n' +
    '                    <td style="width: 10px">{{Order.retailer.name}}-{{Order.retailer.code}}</td>\n' +
    '                    <td style="width: 10px">{{Order.createDate  }}</td>\n' +
    '                    <td style="width: 10px">{{Order.totalPrice}}<sub> {{\'EGP\' | translate}}</sub></td>\n' +
    '                    <td style="width: 15%">\n' +
    '                        <a style="cursor: pointer;" class="pmd-ripple-effect " ng-click="openOrder(Order.orderId);">\n' +
    '                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">\n' +
    '                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                    <rect id="bound" x="0" y="0" width="24" height="24" />\n' +
    '                                    <path\n' +
    '                                        d="M3,12 C3,12 5.45454545,6 12,6 C16.9090909,6 21,12 21,12 C21,12 16.9090909,18 12,18 C5.45454545,18 3,12 3,12 Z"\n' +
    '                                        id="Shape" fill="#494b74" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                    <path\n' +
    '                                        d="M12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 Z"\n' +
    '                                        id="Path" fill="#494b74" opacity="0.3" />\n' +
    '                                </g>\n' +
    '                            </svg>\n' +
    '                        </a>\n' +
    '                        <!--                                 \n' +
    '                                <i class="fa fa-eye" title="Click Here to view Order Details"\n' +
    '                            class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                            ng-click="$state.go(\'OrderDetailsByTenant\',{orderId: Order.orderId});"></i> -->\n' +
    '                    </td>\n' +
    '\n' +
    '\n' +
    '                </tr>\n' +
    '\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="OrderMCtrl.totalCount"\n' +
    '    paging-action="OrderMCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '    hide-if-empty="true" disabled-class="hide">\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Product/templates/NewProductDetailsDialog.html',
    '<div id="bold">\n' +
    '	{{\'NewProductDetails\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'ProductDetails\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="addProductDetailsForm">\n' +
    '\n' +
    '			<div class="row">\n' +
    '				<!-- <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'barCode\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="text" name="code" ng-model="createProductDetailsDialoglCtrl.barCode"\n' +
    '						aria-label="readonly" class="mat-input form-control">\n' +
    '\n' +
    '				</div> -->\n' +
    '\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"><span style="color:red">*</span> {{\'SKU\' | translate}}\n' +
    '					</label>\n' +
    '\n' +
    '					<select style="width:100% !important" class="form-control select-with-search pmd-select2-tags"\n' +
    '						ng-model="createProductDetailsDialoglCtrl.selectedskuId">\n' +
    '						<option ng-repeat="sku in createProductDetailsDialoglCtrl.SKUConversion"\n' +
    '							ng-value="{{sku.skuId}}">\n' +
    '							{{sku.titles[selectedLanguage]}}</option>\n' +
    '					</select>\n' +
    '\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"><span style="color:red">*</span> {{\'Pricelbl\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="number" name="price" ng-model="createProductDetailsDialoglCtrl.price" required\n' +
    '						ng-minlength="1" ng-maxlength="7" class="mat-input form-control">\n' +
    '					<div ng-messages="addProductDetailsForm.price.$error">\n' +
    '						<div class="error"\n' +
    '							ng-show="addProductDetailsForm.price.$error.required && !addProductDetailsForm.price.$pristine">\n' +
    '							{{\'requiredErr\' | translate}}</div>\n' +
    '\n' +
    '\n' +
    '						<div class="error" ng-if="(addProductDetailsForm.price.$error.minlength ||\n' +
    '							addProductDetailsForm.price.$error.maxlength) \n' +
    '							 && !addProductDetailsForm.price.$error.required">\n' +
    '							price length must be 1-7 char.\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label> {{\'minQty\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="number" name="minQty" ng-model="createProductDetailsDialoglCtrl.minQty"\n' +
    '						ng-minlength="0" ng-maxlength="5" class="mat-input form-control">\n' +
    '					<div ng-messages="addProductDetailsForm.minQty.$error">\n' +
    '						<div class="error" ng-if="(addProductDetailsForm.minQty.$error.minlength ||\n' +
    '							addProductDetailsForm.minQty.$error.maxlength) \n' +
    '							 && !addProductDetailsForm.minQty.$error.required">\n' +
    '							minQty length must be 0-5 char.\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			<div class="row">\n' +
    '				<div class="col-md-4  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'IsPromoteProduct\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="checkbox" ng-model="createProductDetailsDialoglCtrl.isPormotedAllow">\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'status\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="checkbox" ng-model="createProductDetailsDialoglCtrl.status">\n' +
    '				</div>\n' +
    '				<div class="col-md-4  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'blockOnDate\' | translate}}\n' +
    '					</label>\n' +
    '					<input name="itemDatetime" ng-model="createProductDetailsDialoglCtrl.blockOnDate" type="text"\n' +
    '						id="startdate" class="form-control" ng-change="dateChange();" />\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="addProductDetailsForm.$invalid  || \n' +
    '		createProductDetailsDialoglCtrl.selectedskuId <= 0 "\n' +
    '			style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '			class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '			ng-click="createProductDetailsDialoglCtrl.AddSKUConversion()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button"\n' +
    '			ng-click="createProductDetailsDialoglCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<script>\n' +
    '	$(function () {\n' +
    '		var today = new Date();\n' +
    '		today.setDate(today.getDate() + 1)\n' +
    '\n' +
    '		$(\'#startdate\').datetimepicker({\n' +
    '			widgetPositioning: { vertical: "bottom" },\n' +
    '			minDate: today,\n' +
    '\n' +
    '		})\n' +
    '			.on(\'dp.change\', function (e) {\n' +
    '				\n' +
    '				angular.element(document.getElementById(\'startdate\')).scope().dateChange();\n' +
    '			});\n' +
    '	});\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Product/templates/Product.html',
    '<div>\n' +
    '    <div id="bold">\n' +
    '        {{\'Product\' | translate}}\n' +
    '    </div>\n' +
    '    <h1 class="text-center">\n' +
    '        <kbd style="background-color: #494b74c4;">\n' +
    '            {{selectedManufacture.name}} :\n' +
    '            {{selectedManufacture.code}}\n' +
    '        </kbd>\n' +
    '    </h1>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.permessionModules[\'Product\'].includes(9)">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="selectedManufacture.manufactureId==0" ng-click="$state.go(\'newProduct\');"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '        <div class="error" ng-show="selectedManufacture.manufactureId==0">\n' +
    '            {{\'selectedManufacture\' | translate}}</div>\n' +
    '\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '        <div class="table-responsive">\n' +
    '            <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                <form class="ProductForm" name="ProductForm">\n' +
    '                    <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                        <div>\n' +
    '                            <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield">\n' +
    '                                <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '                                    placeholder="{{\'searchbyProductName\' | translate}}"\n' +
    '                                    ng-model="Products.description[selectedLanguage]" id="searchInput">\n' +
    '                            </div>\n' +
    '                            <!-- <div ng-messages="ProductForm.searchInput.$error">\n' +
    '                                <div class="error"\n' +
    '                                    ng-show="(ProductForm.searchInput.$error.minlength || ProductForm.searchInput.$error.maxlength) && !ProductForm.searchInput.$error.required">\n' +
    '                                    {{\'NameLengthError255\' | translate}}</div>\n' +
    '                            </div> -->\n' +
    '                            <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield-verse">\n' +
    '                                <button id="searchBtb" ng-disabled="ProductForm.$invalid"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                    ng-click="ProductCtrl.filterProduct(Products.description[selectedLanguage])">\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                        width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                        class="kt-svg-icon">\n' +
    '                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                            <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                            <path\n' +
    '                                                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                            <path\n' +
    '                                                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                                        </g>\n' +
    '                                    </svg>\n' +
    '                                    {{\'search\' | translate}}\n' +
    '                                </button>\n' +
    '                            </div>\n' +
    '                            <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtb"\n' +
    '                                    ng-click="ProductCtrl.filterProduct()">{{\'All\' | translate}}</button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-if="Products.results.length == 0">\n' +
    '        <span>{{\'NoProductAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="Products.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'image\' | translate}}</th>\n' +
    '                        <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                        <th>{{\'ManufactureLbl\' | translate}}</th>\n' +
    '                        <th>{{\'Name\' | translate}}</th>\n' +
    '                        <th>{{\'CategoryLbl\' | translate}}</th>\n' +
    '                        <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                        <th>{{\'ProductDetails\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="Product in Products.results">\n' +
    '                        <td>\n' +
    '                            <img style="width: 70px;height: 70px;"\n' +
    '                                data-ng-src="{{ProductCtrl.appCONSTANTS.Image_URL_ORDER}}{{Product.image}}" />\n' +
    '                        </td>\n' +
    '                        <td style="width: 10px">{{Product.code}}</td>\n' +
    '                        <td style="width: 10px">{{Product.mCode}}</td>\n' +
    '                        <td data-title="Name">\n' +
    '                            <span title="{{Product.description[selectedLanguage]}}">\n' +
    '                                {{Product.description[selectedLanguage] | limitTo : 20}}\n' +
    '                                {{Product.description[selectedLanguage].length > 20 ? \'...\' : \'\'}}</span>\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{Product.category.titles[selectedLanguage]}}\n' +
    '                        </td>\n' +
    '\n' +
    '                        <td ng-show="!Product.isActive">\n' +
    '                            <div ng-if="user.permessionModules[\'Product\'].includes(12)==true">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':Product.isActive}"\n' +
    '                                    ng-model="Product.isActive" ng-click="ProductCtrl.ChangeStatus(Product)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Product.isActive}"\n' +
    '                                        ng-model="Product.isActive" ng-click="ProductCtrl.ChangeStatus(Product)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div ng-if="user.permessionModules[\'Product\'].includes(12)==false"\n' +
    '                                title="You don\'t have permssion">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':Product.isActive}"\n' +
    '                                    ng-model="Product.isActive">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Product.isActive}"\n' +
    '                                        ng-model="Product.isActive">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td ng-show="Product.isActive">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':Product.isActive}"\n' +
    '                                ng-model="Product.isActive">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Product.isActive}"\n' +
    '                                    ng-model="Product.isActive">\n' +
    '                                </div>\n' +
    '                        </td>\n' +
    '\n' +
    '                        <td>\n' +
    '                            <button\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'ProductDetails\',{produdctId : Product.productId});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'ProductDetails\' | translate}}</button>\n' +
    '                        </td>\n' +
    '\n' +
    '                        <td>\n' +
    '                            {{Product.hasProductDetails}}\n' +
    '                        </td>\n' +
    '                        <td style="width: 15%">\n' +
    '                            <i ng-show="user.permessionModules[\'Product\'].includes(10)"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editProduct\',{id: Product.productId});" title="Edit">mode_edit</i>\n' +
    '                            <i ng-show="user.permessionModules[\'Product\'].includes(11)"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="ProductCtrl.openDeleteDialog(Product,Product.description[selectedLanguage],Product.productId)"\n' +
    '                                title="Delete">delete</i>\n' +
    '                        </td>\n' +
    '\n' +
    '                    </tr>\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Product/templates/ProductDetails.html',
    '<div>\n' +
    '    <div id="bold">\n' +
    '        {{\'ProductDetails\' | translate}}\n' +
    '    </div>\n' +
    '    <h1 class="text-center">\n' +
    '        <kbd style="background-color: #494b74c4;">\n' +
    '            {{selectedManufacture.name}} :\n' +
    '            {{selectedManufacture.code}}\n' +
    '        </kbd>\n' +
    '        <br>\n' +
    '        <kbd style="background-color: #494b74c4;">\n' +
    '            {{Product.description[selectedLanguage]}} :\n' +
    '            {{Product.code}}\n' +
    '        </kbd>\n' +
    '    </h1>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.permessionModules[\'ProductDetails\'].includes(24)">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newProductDetails\',{produdctId:$stateParams.produdctId});"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div>\n' +
    '    <div ng-if="ProductDetails.results.length == 0">\n' +
    '        <span>{{\'NoProductAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="ProductDetails.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'barCode\' | translate}}</th>\n' +
    '                        <th>{{\'SKU\' | translate}}</th>\n' +
    '                        <th>{{\'price\' | translate}}</th>\n' +
    '                        <th>{{\'minQty\' | translate}}</th>\n' +
    '                        <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                        <th>{{\'IsPromoteProduct\' | translate}}</th>\n' +
    '                        <th>{{\'blockOnDate\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="Product in ProductDetails.results">\n' +
    '\n' +
    '                        <td data-title="Name">{{Product.barCode}}</td>\n' +
    '                        <td data-title="Name">{{Product.priceList[0].sku[selectedLanguage]}}</td>\n' +
    '                        <td data-title="Name">{{Product.priceList[0].price}}</td>\n' +
    '                        <td data-title="Name">{{Product.minorderQty}}</td>\n' +
    '\n' +
    '                        <td data-title="Name">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':Product.isActive}"\n' +
    '                                ng-model="Product.isActive">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Product.isActive}"\n' +
    '                                    ng-model="Product.isActive">\n' +
    '                                </div>\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':Product.isPormotedAllow}"\n' +
    '                                ng-model="Product.isPormotedAllow">\n' +
    '\n' +
    '                                <div class="btn-switch-circle"\n' +
    '                                    ng-class="{\'btn-switch-circle--on\':Product.isPormotedAllow}"\n' +
    '                                    ng-model="Product.isPormotedAllow">\n' +
    '                                </div>\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">{{Product.blockOnDate | date : "d/MMM/yy h:mm a" }}</td>\n' +
    '\n' +
    '                        <td data-title="Name">\n' +
    '                            <i ng-show="user.permessionModules[\'ProductDetails\'].includes(26)"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="ProductDetailsCtrl.openProductDetails(Product)" title="Edit">mode_edit</i>\n' +
    '                        </td>\n' +
    '\n' +
    '\n' +
    '                    </tr>\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div>\n' +
    '        <a onclick="goBack()">\n' +
    '            <div class="col-xs-12">\n' +
    '                <button type="button"\n' +
    '                class="btn btn-primary" \n' +
    '                style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                {{\'goBack\' | translate}}\n' +
    '                </button>\n' +
    '            </div>\n' +
    '            </a>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Product/templates/ProductDetailsDialog.html',
    ' \n' +
    '<div class="modal-content">\n' +
    '\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'editProductDetails\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editProductDetailsForm">\n' +
    '			{{\'Product\' | translate}} :\n' +
    '			<strong>{{ProductDetailsDialoglCtrl.model.description[selectedLanguage]}}</strong>\n' +
    '			<div class="row">\n' +
    '				<!-- <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'barCode\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="text" name="code" ng-model="ProductDetailsDialoglCtrl.model.barCode"\n' +
    '						aria-label="readonly" class="mat-input form-control">\n' +
    '\n' +
    '				</div> -->\n' +
    '\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"><span style="color:red">*</span> {{\'SKU\' | translate}}\n' +
    '					</label>\n' +
    '\n' +
    '					<select style="width:100% !important" class="form-control select-with-search pmd-select2-tags"\n' +
    '						ng-model="ProductDetailsDialoglCtrl.selectedskuId">\n' +
    '						<option ng-repeat="sku in ProductDetailsDialoglCtrl.SKUConversion" ng-value="{{sku.skuId}}">\n' +
    '							{{sku.titles[selectedLanguage]}}</option>\n' +
    '\n' +
    '					</select>\n' +
    '\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"><span style="color:red">*</span> {{\'price\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="text" name="price" ng-model="ProductDetailsDialoglCtrl.model.priceList[0].price"\n' +
    '						required ng-minlength="1" ng-maxlength="7" class="mat-input form-control">\n' +
    '					<div ng-messages="editProductDetailsForm.price.$error">\n' +
    '						<div class="error"\n' +
    '							ng-show="editProductDetailsForm.price.$error.required && !editProductDetailsForm.price.$pristine">\n' +
    '							{{\'requiredErr\' | translate}}</div>\n' +
    '\n' +
    '\n' +
    '						<div class="error" ng-if="(editProductDetailsForm.price.$error.minlength ||\n' +
    '						editProductDetailsForm.price.$error.maxlength) \n' +
    '						 && !editProductDetailsForm.price.$error.required">\n' +
    '							price length must be 1-7 char.\n' +
    '						</div>\n' +
    '					</div>\n' +
    '\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label> {{\'minQty\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="number" name="minQty" ng-model="ProductDetailsDialoglCtrl.model.minorderQty"\n' +
    '						ng-minlength="0" ng-maxlength="5" class="mat-input form-control">\n' +
    '					<div ng-messages="editProductDetailsForm.minQty.$error">\n' +
    '						<div class="error" ng-if="(editProductDetailsForm.minQty.$error.minlength ||\n' +
    '							editProductDetailsForm.minQty.$error.maxlength) \n' +
    '							 && !editProductDetailsForm.minQty.$error.required">\n' +
    '							minQty length must be 0-5 char.\n' +
    '						</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			<div class="row">\n' +
    '				<div class="col-md-4  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'IsPromoteProduct\' | translate}}\n' +
    '					</label>\n' +
    '					<input type="checkbox" ng-model="ProductDetailsDialoglCtrl.model.isPormotedAllow">\n' +
    '				</div>\n' +
    '				<div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'status\' | translate}}\n' +
    '					</label>\n' +
    '					\n' +
    '					<input type="checkbox" ng-model="ProductDetailsDialoglCtrl.model.isActive">\n' +
    '				</div>\n' +
    '				<div class="col-md-4  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '					<label for="readonly"> {{\'blockOnDate\' | translate}}\n' +
    '					</label>\n' +
    '					<input name="itemDatetime" ng-model="ProductDetailsDialoglCtrl.model.blockOnDate" type="text"\n' +
    '						id="startdate" class="form-control" ng-change="dateChange();" />\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editProductDetailsForm.$invalid  || \n' +
    '		ProductDetailsDialoglCtrl.selectedskuId <= 0 " style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '			class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '			ng-click="ProductDetailsDialoglCtrl.UpdateSKUConversion()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button"\n' +
    '			ng-click="ProductDetailsDialoglCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<script>\n' +
    '	$(function () {\n' +
    '		var today = new Date();\n' +
    '		today.setDate(today.getDate() + 1)\n' +
    '\n' +
    '		$(\'#startdate\').datetimepicker({\n' +
    '			widgetPositioning: { vertical: "bottom" },\n' +
    '			minDate: today,\n' +
    '\n' +
    '		})\n' +
    '			.on(\'dp.change\', function (e) {\n' +
    '				\n' +
    '				angular.element(document.getElementById(\'startdate\')).scope().dateChange();\n' +
    '			});\n' +
    '	});\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Product/templates/edit.html',
    '\n' +
    '<div id="bold">\n' +
    '        {{\'UpdateProductLbl\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'Product\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editProductForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in editProductCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span>{{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editProductCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <textarea required type="text" class="mat-input form-control"\n' +
    '                                        name="description{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editProductCtrl.Product.description[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255"> \n' +
    '                                        </textarea>\n' +
    '                                    <div ng-messages="editProductForm.description{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="editProductForm.description{{lang.value+\'Name\'}}.$error.required && !editProductForm.description{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(editProductForm.description{{lang.value+\'Name\'}}.$error.minlength || editProductForm.description{{lang.value+\'Name\'}}.$error.maxlength) && !editProductForm.description{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="row">\n' +
    '                            <!-- <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                                </label>\n' +
    '                                <input type="text" name="code" ng-readonly="true"\n' +
    '                                    ng-model="editProductCtrl.Product.code" aria-label="readonly"\n' +
    '                                    class="mat-input form-control">\n' +
    '\n' +
    '                            </div> -->\n' +
    '                            <div\n' +
    '                                class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                <label for="first-name"><span style="color:red">*</span>\n' +
    '                                    {{\'SelectCategory\' | translate}}</label>\n' +
    '                                <select style="width:100% !important"\n' +
    '                                    class="form-control select-with-search pmd-select2-tags"\n' +
    '                                    ng-model="editProductCtrl.selectedCategoryId">\n' +
    '                                    <option ng-repeat="category in editProductCtrl.categories"\n' +
    '                                        ng-value="{{category.id}}">\n' +
    '                                        {{category.titles[selectedLanguage]}}</option>\n' +
    '                                </select>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                            <span style="color:red">*</span>\n' +
    '                            <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                                Photo</label>\n' +
    '                            <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                                name="imageName">\n' +
    '                            <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '\n' +
    '                            <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editProductForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editProductCtrl.UpdateProduct()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editProductCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Product/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewProduct\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newProductForm">\n' +
    '\n' +
    '\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newProductCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newProductCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">\n' +
    '                                        {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <textarea required Area="text" class="mat-input form-control"\n' +
    '                                        name="description{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newProductCtrl.description[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                        </textarea>\n' +
    '                                        \n' +
    '                                    <div ng-messages="newProductForm.description{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="newProductForm.description{{lang.value+\'Name\'}}.$error.required && !newProductForm.description{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(newProductForm.description{{lang.value+\'Name\'}}.$error.minlength || newProductForm.description{{lang.value+\'Name\'}}.$error.maxlength) && !newProductForm.description{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="row">\n' +
    '                            <!-- <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                                </label>\n' +
    '                                <input type="text" name="code" ng-readonly="true" ng-model="newProductCtrl.code"\n' +
    '                                    aria-label="readonly" class="mat-input form-control">\n' +
    '\n' +
    '                            </div> -->\n' +
    '                            <div\n' +
    '                                class="col-md-3 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                <label for="first-name"><span style="color:red">*</span>\n' +
    '                                    {{\'SelectCategory\' | translate}}</label>\n' +
    '                                <select style="width:100% !important"\n' +
    '                                    class="form-control select-with-search pmd-select2-tags"\n' +
    '                                    ng-model="newProductCtrl.selectedCategoryId">\n' +
    '                                    <option ng-repeat="category in newProductCtrl.categories"\n' +
    '                                        ng-value="{{category.id}}">\n' +
    '                                        {{category.titles[selectedLanguage]}}</option>\n' +
    '                                </select>\n' +
    '                            </div>\n' +
    '\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                            <span style="color:red">*</span>\n' +
    '                            <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                                Photo</label>\n' +
    '                            <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                                name="imageName">\n' +
    '                            <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '\n' +
    '                            <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '                        </div>\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newProductForm.$invalid || newProductCtrl.selectedCategoryId <= 0 || image == null"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="newProductCtrl.AddNewProduct()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="$state.go(\'Products\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Region/templates/Regions.html',
    '<div>\n' +
    '        <div>\n' +
    '                {{\'Regions\' | translate}}\n' +
    '        </div> \n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="$state.go(\'newRegion\',{ countryId: $stateParams.countryId });" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '            type="button">{{\'AddNew\' | translate}}</button>\n' +
    '\n' +
    '    </div>\n' +
    '    <div ng-if="Regions.results.length == 0">\n' +
    '        <span>{{\'NoRegionsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="Regions.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'Name\' | translate}}</th> \n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="region in Regions.results">\n' +
    '                    <td data-title="Name">{{region.titleDictionary[selectedLanguage]}}</td>\n' +
    ' \n' +
    '                    <td>\n' +
    '                        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="$state.go(\'Cities\',{countryId: $stateParams.countryId,regionId: region.regionId});"\n' +
    '                            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'viewCities\' |\n' +
    '                            translate}}</button>\n' +
    '                      </td>\n' +
    '\n' +
    '                    <td width="30%">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editRegion\',{countryId: $stateParams.countryId ,regionId: region.regionId});"title="Edit">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount" paging-action="changePage(page)"\n' +
    '        flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Region/templates/edit.html',
    '<div>\n' +
    '        {{\'EditRegion\' | translate}}\n' +
    '</div>        \n' +
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'Region\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm"> \n' +
    '                <div> \n' +
    '                    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editRegionCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                    <span style="color:red">*</span>  {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li> \n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editRegionCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <input required type="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="editRegionCtrl.Region.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                        <div ng-messages="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '                                            \n' +
    '                                            <div ng-show="editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div ng-show="(editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div> \n' +
    '                        </div>\n' +
    '\n' +
    '                   \n' +
    '                    </div>\n' +
    '                </div> \n' +
    ' \n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editRegionCtrl.UpdateRegion()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editRegionCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Region/templates/new.html',
    '<div>\n' +
    '        {{\'NewRegion\' | translate}}\n' +
    '</div>          \n' +
    '<div class="modal-content">\n' +
    '        \n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewRegion\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newAreaForm"> \n' +
    '            <div> \n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newRegionCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li> \n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newRegionCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control" name="titleDictionary{{lang.value+\'Name\'}}" ng-model="newRegionCtrl.titleDictionary[lang.key]" ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error" >\n' +
    '										\n' +
    '                                        <div ng-show="newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div ng-show="(newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newAreaForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">{{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div> \n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newAreaForm.$invalid" class="btn pmd-ripple-effect btn-primary" Area="button" ng-click="newRegionCtrl.AddNewRegion()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Area="button" ng-click="$state.go(\'Regions\',{countryId: $stateParams.countryId });">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Role/templates/Role.html',
    '<div id="bold">\n' +
    '    {{\'Role\' | translate}}\n' +
    '</div>\n' +
    '<div>\n' +
    '    <!-- <div style="margin-bottom:10px">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="$state.go(\'newRole\');"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddBtn\'\n' +
    '            | translate}}</button>\n' +
    '\n' +
    '    </div>   -->\n' +
    '\n' +
    '    <div ng-if="RoleList.results.length == 0">\n' +
    '        <span>{{\'NoRolesAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="RoleList.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th style="width: 50%">{{\'Name\' | translate}}</th>\n' +
    '                    <!-- <th>{{\'Status\' | translate}}</th> -->\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="role in RoleList.results">\n' +
    '                    <td >{{role.titles[selectedLanguage]}}</td>\n' +
    '                    <!-- <td ng-show="!role.isDefault">\n' +
    '                        <div class="btn-switch" ng-class="{\'btn-switch--on\':role.isActive}" ng-model="role.isActive"\n' +
    '                            ng-click="RoleCtrl.ChangeStatus(role)">\n' +
    '\n' +
    '                            <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':role.isActive}"\n' +
    '                                ng-model="role.isActive" ng-click="RoleCtrl.ChangeStatus(role)">\n' +
    '                            </div>\n' +
    '                    </td> -->\n' +
    '\n' +
    '                    <td >\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                            ng-click="$state.go(\'editRole\',{roleId: role.userGroupId});"title="Edit">mode_edit</i>\n' +
    '                        <!-- <i class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                            ng-click="RoleCtrl.openDeleteDialog(role,role.titles[selectedLanguage],role.userGroupId)">delete</i> -->\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Role/templates/edit.html',
    '<style>\n' +
    '::-webkit-scrollbar {\n' +
    '  width: 12px;\n' +
    '}\n' +
    '\n' +
    '/* Track */\n' +
    '::-webkit-scrollbar-track {\n' +
    '  background: #f1f1f1; \n' +
    '}\n' +
    '\n' +
    '/* Handle */\n' +
    '::-webkit-scrollbar-thumb {\n' +
    '  background: #888; \n' +
    '}\n' +
    '\n' +
    '/* Handle on hover */\n' +
    '::-webkit-scrollbar-thumb:hover {\n' +
    '  background: #555; \n' +
    '}\n' +
    '</style>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">        {{\'EditRoleLbl\' | translate}}\n' +
    '            </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editRoleForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editRoleCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editRoleCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}" ng-model="editRoleCtrl.Role.titles[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="editRoleForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="editRoleForm.titles{{lang.value+\'Name\'}}.$error.required && !editRoleForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(editRoleForm.titles{{lang.value+\'Name\'}}.$error.minlength || editRoleForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !editRoleForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                            </div> \n' +
    '                            \n' +
    '                            <div class="table-responsive">\n' +
    '                            <table class="table table-striped table-bordered">\n' +
    '                                <tr ng-repeat-start="module in editRoleCtrl.Role.permessionTree">\n' +
    '                                    <td><strong>{{module.module.title[selectedLanguage]}}</strong></td>\n' +
    '                                </tr>\n' +
    '                                <tr ng-repeat-end ng-repeat="per in module.permessions">\n' +
    '                                    <td> <input type="checkbox" ng-change="editRoleCtrl.checkPermission(per)"\n' +
    '                                            ng-model="per.seclected"> </td>\n' +
    '                                    <td>{{ per.title[selectedLanguage]}}</td>\n' +
    '                                </tr>\n' +
    '                            </table> \n' +
    '                            </div>\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editRoleForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editRoleCtrl.UpdateRole()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editRoleCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '    $(".select-tags").select2({\n' +
    '        tags: false,\n' +
    '        theme: "bootstrap",\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Role/templates/new.html',
    '\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewRoleLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newRoleForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newRoleCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newRoleCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newRoleCtrl.titles[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newRoleForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div\n' +
    '                                            ng-show="newRoleForm.titles{{lang.value+\'Name\'}}.$error.required && !newRoleForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div\n' +
    '                                            ng-show="(newRoleForm.titles{{lang.value+\'Name\'}}.$error.minlength || newRoleForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !newRoleForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '\n' +
    '                            </div>\n' +
    '                            <div\n' +
    '                                class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                <label for="first-name">{{\'Module\' | translate}}</label>\n' +
    '                                <select required style="width:100% !important"\n' +
    '                                    class="form-control select-with-search pmd-select2-tags" multiple\n' +
    '                                    ng-model="newRoleCtrl.selectedModule"\n' +
    '                                    ng-change="newRoleCtrl.ChangeSelectedModule()"\n' +
    '                                    ng-options="group as group.module.title[selectedLanguage] for group in permissionList">\n' +
    '                                </select>\n' +
    '                            </div>\n' +
    '                            <div\n' +
    '                                class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                <label for="first-name">{{\'Permission\' | translate}}</label>\n' +
    '                                <select required style="width:100% !important"\n' +
    '                                    class="form-control select-with-search pmd-select2-tags" multiple\n' +
    '                                    ng-model="newRoleCtrl.selectedPermissions" ng-options="group.permessionId as group.title[selectedLanguage]\n' +
    '                                     for group in newRoleCtrl.selectedModuleList">\n' +
    '                                </select>\n' +
    '                            </div>\n' +
    '                          \n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newRoleForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="newRoleCtrl.AddNewRole()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="$state.go(\'Role\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '    $(".select-tags").select2({\n' +
    '        tags: false,\n' +
    '        theme: "bootstrap",\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/Retailer.html',
    '<div>\n' +
    '    <div  id="bold">\n' +
    '        {{\'RetailerLbl\' | translate}}\n' +
    '    </div>\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button ng-click="$state.go(\'newRetailer\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '            style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            type="button">{{\'AddNew\' | translate}}</button>\n' +
    '    </div>\n' +
    '    <!--end  add button -->\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '    <div class="table-responsive">\n' +
    '            <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <form class="RetailerForm" name="RetailerForm">\n' +
    '                            <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <div>\n' +
    '                            <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield">\n' +
    '                                <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '                                    placeholder="{{\'searchbyRetailerName\' | translate}}"\n' +
    '                                    ng-model="RetailerCtrl.name" ng-minlength="3" ng-maxlength="255"\n' +
    '                                    id="searchInput">\n' +
    '                            </div>\n' +
    '                            <!-- <div ng-messages="RetailerForm.searchInput.$error">\n' +
    '                                <div class="error"\n' +
    '                                    ng-show="(RetailerForm.searchInput.$error.minlength || RetailerForm.searchInput.$error.maxlength) && !RetailerForm.searchInput.$error.required">\n' +
    '                                    {{\'NameLengthError3\' | translate}}</div>\n' +
    '                            </div> -->\n' +
    '                            <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield-verse">\n' +
    '                                <button id="searchBtb" ng-disabled="RetailerForm.$invalid"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                    ng-click="RetailerCtrl.filterRetailer(RetailerCtrl.name)">\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                        width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                        class="kt-svg-icon">\n' +
    '                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                            <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                            <path\n' +
    '                                                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                            <path\n' +
    '                                                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                                        </g>\n' +
    '                                    </svg>\n' +
    '                                    {{\'search\' | translate}}\n' +
    '                                </button>\n' +
    '                            </div>\n' +
    '                            <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtb"\n' +
    '                                    ng-click="RetailerCtrl.filterRetailer()">{{\'All\' | translate}}</button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        </div>\n' +
    '                        </form>\n' +
    '            </div>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div ng-if="RetailerCtrl.RetailerList.results.length == 0">\n' +
    '        <span>{{\'NoRetailersAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="RetailerCtrl.RetailerList.results.length > 0">\n' +
    '        <!-- binding data from api to Retailer list  -->\n' +
    '        <div>\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr>\n' +
    '                            <th>{{\'CompanyLogo\' | translate}} </th>\n' +
    '                            <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                            <th>{{\'Name\' | translate}}</th>\n' +
    '                            <th>{{\'AddressLbl\' | translate}}</th>\n' +
    '                            <th>{{\'CityLbl\' | translate}}</th>\n' +
    '                            <th>{{\'GovernateLbl\' | translate}}</th>\n' +
    '                            <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                            <th></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <!-- data mandatory  -->\n' +
    '                        <tr ng-repeat="Retailer in RetailerCtrl.RetailerList.results"\n' +
    '                        ng-class="{selected: Retailer.isChecked}">\n' +
    '                            <!-- <td data-title="CompanyLogo">{{Retailer.companyLogo}}</td> -->\n' +
    '                            <td>\n' +
    '                                <img width="100px" height="100px"\n' +
    '                                    data-ng-src="{{RetailerCtrl.appCONSTANTS.Image_URL_ACTOR}}{{Retailer.companyLogo}}" />\n' +
    '                            </td>\n' +
    '                            <td data-title="code">{{Retailer.code}}</td>\n' +
    '                            <td data-title="Name">\n' +
    '                                {{Retailer.name | limitTo : 20}}\n' +
    '                                {{Retailer.name.length > 20 ? \'...\' : \'\'}}\n' +
    '                            </td>\n' +
    '                            <td data-title="address">{{Retailer.address}}</td>\n' +
    '                            <td data-title="city">{{Retailer.city.titles[selectedLanguage]}}</td>\n' +
    '                            <td data-title="governrate">{{Retailer.governrate.titles[selectedLanguage]}}</td>\n' +
    '                            <td width="8%">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':Retailer.isActive}"\n' +
    '                                    ng-model="Retailer.isActive" ng-click="RetailerCtrl.ChangeRetailerStatus(Retailer)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle"\n' +
    '                                        ng-class="{\'btn-switch-circle--on\':Retailer.isActive}"\n' +
    '                                        ng-model="Retailer.isActive"\n' +
    '                                        ng-click="RetailerCtrl.ChangeRetailerStatus(Retailer)">\n' +
    '                                    </div>\n' +
    '\n' +
    '                            </td>\n' +
    '\n' +
    '                            <!-- action -->\n' +
    '                            <td width="12%">\n' +
    '                                <i ng-show="user.permessionModules[\'Retailer\'].includes(48)"\n' +
    '                                    class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                    ng-click="$state.go(\'editRetailer\',{retailerId: Retailer.retailerId});"title="Edit">mode_edit</i>\n' +
    '                                <i ng-show="user.permessionModules[\'Retailer\'].includes(51)"\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="RetailerCtrl.openDeleteDialog\n' +
    '                                    (Retailer,Retailer.name,Retailer.retailerId)"title="Delete">delete</i>\n' +
    '                            </td>\n' +
    '                            <td width="15%">\n' +
    '                                    <a style="cursor: pointer" ng-click="$state.go(\'RetailerMap\',{retailerId: Retailer.retailerId});"\n' +
    '                                    ng-show="Retailer.lng == 0">\n' +
    '                                            <img src="/assets/img/GoogleMaps.svg.png"\n' +
    '                                            title="set location" class="devsite-site-logo" alt="Google Maps Platform">\n' +
    '                                    </a>    \n' +
    '                                    </td>\n' +
    '                        </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '        </div> \n' +
    '        <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '            paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '            hide-if-empty="true" disabled-class="hide">\n' +
    '        </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/edit.html',
    '<div class="container">\n' +
    '    <!-- header -->\n' +
    '    <div class="modal-header bordered" id="bold">\n' +
    '            {{\'EditRetailer\' | translate}}\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '            <div id="vm-container">\n' +
    '                <!-- Retailer form step -->\n' +
    '                <div id="vm-step-container">\n' +
    '                    <ul class="nav nav-pills nav-justified">\n' +
    '                        <li ng-repeat="step in editRetailerCtrl.steps"\n' +
    '                            ng-class="{\'active\':step.step == editRetailerCtrl.currentStep}">\n' +
    '                            <a> {{step.step | translate }}. {{step.name | translate}}</a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- function -- get pages  -->\n' +
    '                <div id="vm-content-container">\n' +
    '                    <ng-include src="editRetailerCtrl.getStepTemplate()"></ng-include>\n' +
    '                </div>\n' +
    '                <!-- previous button  -->\n' +
    '                <div id="vm-navigation-container" class="col-lg-12">\n' +
    '                    <div class="pull-right">\n' +
    '                        <span class="btn-group">\n' +
    '                                <button class="btn btn-primary" name="next" type="button"\n' +
    '                                onclick="goBack()"> {{\'goBack\' | translate}}</button>\n' +
    '                            <button ng-disabled="editRetailerCtrl.currentStep <= 1" class="btn btn-default"\n' +
    '                                name="previous" type="button"\n' +
    '                                ng-click="editRetailerCtrl.gotoStep(editRetailerCtrl.currentStep - 1)"><i\n' +
    '                                    class="fa fa-arrow-left"></i> {{\'PreviousStep\' | translate}}\n' +
    '                            </button>\n' +
    '                            <!-- next button  -->\n' +
    '                            <button ng-disabled="editRetailerCtrl.currentStep >=editRetailerCtrl.steps.length"\n' +
    '                                class="btn btn-primary" name="next" type="button"\n' +
    '                                ng-click="editRetailerCtrl.gotoStep(editRetailerCtrl.currentStep + 1)">\n' +
    '                                {{\'Nextstep\' | translate}}\n' +
    '                                <i class="fa fa-arrow-right"></i>\n' +
    '                            </button>\n' +
    '                   \n' +
    '                        </span>\n' +
    '                        <!-- save button  -->\n' +
    '                        <button\n' +
    '                            ng-disabled="editRetailerCtrl.currentStep !=editRetailerCtrl.steps.length || image == null"\n' +
    '                            class="btn btn-default" name="next" type="button"\n' +
    '                            ng-click="editRetailerCtrl.UpdateRetailer()">\n' +
    '                            {{\'Save\' | translate}}</button>\n' +
    '                            \n' +
    '                            \n' +
    '                            \n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/editstep1.html',
    '<div class="modal-content container">\n' +
    '  <div class="modal-body">\n' +
    '    <form class="editRetailerForm" name="editRetailerForm">\n' +
    '      <div>\n' +
    '        <!-- Nav tabs -->\n' +
    '        <ul>\n' +
    '          <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editRetailerCtrl.Retailer.language">\n' +
    '            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '              data-toggle="tab">\n' +
    '              {{lang.value | translate}}\n' +
    '            </a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '        <div>\n' +
    '          <div>\n' +
    '            <!-- Tab panes -->\n' +
    '            <div class="tab-content table-responsive">\n' +
    '              <h2> <label for="readonly">{{\'infoLbl\' | translate}} </label></h2>\n' +
    '              <!-- left side -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- input name  -->\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name" ><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                  <input required type="text" class="mat-input form-control" name="name"\n' +
    '                    ng-model="editRetailerCtrl.Retailer.name" ng-minlength="3" ng-maxlength="255">\n' +
    '                  <!-- length validation  -->\n' +
    '                  <div ng-messages="editRetailerForm.name.$error" class="error">\n' +
    '                    <div ng-show="editRetailerForm.name.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                    <div\n' +
    '                      ng-if="editRetailerForm.name.$error.required && !editRetailerForm.name.$pristine">\n' +
    '                      {{\'NameError\' | translate}}</div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <div\n' +
    '                      ng-if="(editRetailerForm.name.$error.minlength || editRetailerForm.name.$error.maxlength) ">\n' +
    '                      {{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- code field -->\n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                  </label>\n' +
    '                  <input type="text" name="code" ng-readonly="true" ng-model="editRetailerCtrl.Retailer.code"\n' +
    '                    aria-label="readonly" class="mat-input form-control">\n' +
    '                  <br>\n' +
    '                </div> -->\n' +
    '                <!-- Address field  -->\n' +
    '                <label>\n' +
    '                  <span style="color:red">*</span> {{\'AddressLbl\' | translate}}\n' +
    '                  <br>\n' +
    '                  <textarea name="address" ng-model="editRetailerCtrl.Retailer.address" required style="width: 250%;"\n' +
    '                    ng-minlength="11" placeholder="add your address here ." required>\n' +
    '                    </textarea>\n' +
    '                </label>\n' +
    '                <!-- length validation -->\n' +
    '                <div ng-messages="editRetailerForm.address.$error" class="error">\n' +
    '                  <div ng-show="editRetailerForm.address.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                  <div ng-if="editRetailerForm.address.$error.required && !editRetailerForm.address.$pristine">\n' +
    '                    {{\'nameLengthError\' | translate}}</div>\n' +
    '                  <div\n' +
    '                    ng-if="(editRetailerForm.address.$error.minlength || editRetailerForm.address.$error.maxlength) ">\n' +
    '                    {{\'NameLengthError255\'\n' +
    '                    | translate}}</div>\n' +
    '                </div>\n' +
    '                <div>\n' +
    '                  <!-- required validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="editRetailerForm.address.$error.required && !editRetailerForm.address.$pristine">\n' +
    '                    {{\'RequiredLbl\' | translate}}\n' +
    '                  </span>\n' +
    '                  <span class="error" ng-show="editRetailerForm.address.$error.maxlength">\n' +
    '                    Too long!\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- email field  -->\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'EmailLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="mat-input form-control" name="email"\n' +
    '                    ng-model="editRetailerCtrl.Retailer.email"\n' +
    '                    ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                  <!-- email validation -->\n' +
    '                  <span class="error"\n' +
    '                    ng-show="editRetailerForm.email.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                  </span>\n' +
    '                </div>\n' +
    '                <!-- website field  -->\n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label>\n' +
    '                    {{\'websiteLbl\' | translate}} </label>\n' +
    '                  <br>\n' +
    '                  <input type="webSite" name="editRetailerCtrl.Retailer.webSite" ng-model="editRetailerCtrl.Retailer.webSite" class="mat-input form-control ng-pristine ng-untouched\n' +
    '                      ng-empty ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength">\n' +
    '                  <label>\n' +
    '                </div> -->\n' +
    '              </div>\n' +
    '              <!-- right side  -->\n' +
    '              <div class="form-group col-lg-6">\n' +
    '                <!-- country --- drop down  -->\n' +
    '                <div\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Country\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="countryId"\n' +
    '                    ng-change="editRetailerCtrl.countryChange()" ng-model="editRetailerCtrl.selectedCountryId"\n' +
    '                    ng-options="group.countryId  as group.titles[selectedLanguage] for group in editRetailerCtrl.countries">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="editRetailerForm.results[countryId].$error.required && !editRetailerForm.results[countryId].$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="editRetailerForm.results[countryId].$error.results[countryId]">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- governrate based on country id  -->\n' +
    '                <div ng-show=" editRetailerCtrl.selectedCountryId > 0"\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Governrate\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="governrateId"\n' +
    '                    ng-change="editRetailerCtrl.GovernrateChange()" ng-model="editRetailerCtrl.selectedGovernrateId"\n' +
    '                    ng-options="group.governrateId as group.titles[selectedLanguage] for group in editRetailerCtrl.Governrates">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <span class="error"\n' +
    '                      ng-show="editRetailerForm.governrateId.$error.required && !editRetailerForm.governrateId.$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="editRetailerForm.governrateId.$error.governrateId">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- city based on governrate -->\n' +
    '                <div ng-show=" editRetailerCtrl.selectedGovernrateId > 0"\n' +
    '                  class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'City\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="cityId"\n' +
    '                   ng-change="editRetailerCtrl.cityChange()"\n' +
    '                    ng-model="editRetailerCtrl.selectedCityId" name="cityId"\n' +
    '                    ng-options="group.cityId as group.titles[selectedLanguage] for group in editRetailerCtrl.cities">\n' +
    '                  </select>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label>{{\'DistrictLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="form-control" name="district" \n' +
    '                  ng-model="editRetailerCtrlCtrl.Retailer.district" >\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label> {{\'PoliceStationLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="form-control" name="pStation" \n' +
    '                  ng-model="editRetailerCtrlCtrl.Retailer.pStation" >\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label>{{\'LblCenter\' | translate}}</label>\n' +
    '                  <input type="text" class="form-control" name="center" \n' +
    '                  ng-model="editRetailerCtrlCtrl.Retailer.center"> \n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label>{{\'AreaLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="form-control" name="area" \n' +
    '                  ng-model="editRetailerCtrlCtrl.Retailer.area ">\n' +
    '                </div>\n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label>{{\'VillageLbl\' | translate}}</label>\n' +
    '                  <input type="text" class="form-control" name="village" \n' +
    '                  ng-model="editRetailerCtrlCtrl.Retailer.village"   > \n' +
    '                 \n' +
    '                    </div> -->\n' +
    '\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </div>\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/editstep2.html',
    '<div class="modal-content container">\n' +
    '    <h2>{{ContactInformation | translate}} </h2>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editRetailerForm">\n' +
    '            <div>\n' +
    '<!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newCategoryCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '<!-- Tab panes -->\n' +
    '                        <div class="tab-content table-responsive">\n' +
    '<!-- name -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label><span style="color:red" >*</span>  {{\'Name\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="name" style="display: inline-block; "\n' +
    '                                    ng-model="editRetailerCtrl.name" required />\n' +
    '                                <div class="error" ng-messages="editRetailerForm.name.$error">\n' +
    '                                    <div ng-if="editRetailerForm.name.$error.required && \n' +
    '                                    !editRetailerForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '<!-- title -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'Title\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="title" style="display: inline-block;"\n' +
    '                                    ng-model="editRetailerCtrl.title" required />\n' +
    '                            </div>\n' +
    '<!-- Mobile number -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label> <span style="color:red" >*</span> {{\'MobileNo\' | translate}}</label>\n' +
    '                                <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only style="display: inline-block;"\n' +
    '                                  ng-minlength="11" ng-maxlength="20" \n' +
    '                                 ng-model="editRetailerCtrl.mobileNumber"\n' +
    '                                 required />\n' +
    '<!-- required validation  -->\n' +
    '                                <div  ng-messages="editRetailerForm.mobileNumber.$error">\n' +
    '                                        <div class="error" ng-if="editRetailerForm.mobileNumber.$error.required && \n' +
    '                                        !editRetailerForm.mobileNumber.$pristine">\n' +
    '                                        {{\'requiredErr\' |  translate}}\n' +
    '                                        </div>\n' +
    '<!-- length validation -->\n' +
    '                                        <div class="error"\n' +
    '                                            ng-if="(editRetailerForm.mobileNumber.$error.minlength ||\n' +
    '                                            editRetailerForm.mobileNumber.$error.maxlength) \n' +
    '                                             && !editRetailerForm.mobileNumber.newmobileNumber.$error.required">\n' +
    '                                        {{\'PhoneLengthError\' | translate }}\n' +
    '                                        </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '<!-- email -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                <label>{{\'EmailLbl\' | translate}}</label>\n' +
    '                                <input type="text" class="form-control" name="email" style="display: inline-block;"\n' +
    '                                    ng-model="editRetailerCtrl.email" required />\n' +
    '                            </div>\n' +
    '<!-- contact Type -->\n' +
    '                            <!-- contact Type -->\n' +
    '                            <div class="form-group col-lg-2">\n' +
    '                                    <label>{{\'ContactType\' | translate}}</label>\n' +
    '                            <!-- required validation -->\n' +
    '                                    <select class="form-control select-tags pmd-select2-tags"\n' +
    '                                        ng-model="editRetailerCtrl.contactType" name="contactType">\n' +
    '                                        <option ng-repeat="contact in editRetailerCtrl.ContactTypeList" > \n' +
    '                                            {{contact.titles[selectedLanguage]}}\n' +
    '                                        </option>\n' +
    '                                    </select>\n' +
    '                                \n' +
    '                            </div> \n' +
    '                            <!-- {{size.sizeNameDictionary[selectedLanguage]}} -->\n' +
    '\n' +
    '<!-- add button -->\n' +
    '                            <div class="col-lg-2">\n' +
    '                                <label>{{\'Addtotable\' | translate}}</label>\n' +
    '                                <input type="button" ng-click="editRetailerCtrl.AddContact()"\n' +
    '                                class="btn btn-primary" value="add"\n' +
    '                                style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                            </div>\n' +
    '                            <hr>\n' +
    '<!-- binding data from inputs to table -->\n' +
    '                            <table class="table pmd-table table-hover">\n' +
    '<!-- heads -->\n' +
    '                                <thead>\n' +
    '                                    <tr>\n' +
    '                                        <th>{{\'Name\' | translate}}</th>\n' +
    '                                        <th>{{\'Title\' | translate}}</th>\n' +
    '                                        <th>{{\'MobileNo\' | translate}}</th>\n' +
    '                                        <th>{{\'EmailLbl\' | translate}}</th>\n' +
    '                                        <th>{{\'ContactType\' | translate}}</th>\n' +
    '                                        <th>{{\'Action\' | translate}}</th>\n' +
    '                                    </tr>\n' +
    '                                </thead>\n' +
    '<!-- binding data -->\n' +
    '                                <tbody>\n' +
    '                                    <tr ng-repeat="(index,Contact) in editRetailerCtrl.Retailer.retailerContactInformation">\n' +
    '                                        <td data-title="Name">{{Contact.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{Contact.title}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox" ng-change="editRetailerCtrl.setContactMain(Contact)"\n' +
    '                                                ng-model="Contact.main">\n' +
    '                                        </td> \n' +
    '                                        <td width="30%">\n' +
    '                                            <i\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="editRetailerCtrl.openDeleteContactTypeDialog(index)"title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                    <tr ng-repeat="(index,Contact1) in editRetailerCtrl.ContactList">\n' +
    '                                        <td data-title="Name">{{Contact1.name}}</td>\n' +
    '                                        <td data-title="Title">{{Contact1.title}}</td>\n' +
    '                                        <td data-title="mobileNumber"> {{Contact1.mobileNumber}}</td>\n' +
    '                                        <td data-title="email">{{Contact1.email}}</td>\n' +
    '                                        <td data-title="ContactType">{{editRetailerCtrl.contactType}}</td>\n' +
    '                                        <td data-title="Action">\n' +
    '                                            <input type="checkbox" ng-change="editRetailerCtrl.setContactMain(Contact1)"\n' +
    '                                                ng-model="Contact1.checkbox">\n' +
    '                                        </td>\n' +
    '                                        <td width="30%">\n' +
    '                                            <i\n' +
    '                                    class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="editRetailerCtrl.openDeleteContactTypeDialogContactList(index)"title="Delete">delete</i>\n' +
    '                                        </td>\n' +
    '                                    </tr>\n' +
    '                                </tbody>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/editstep3.html',
    '<style>\n' +
    '  /* Always set the map height explicitly to define the size of the div\n' +
    '     * element that contains the map. */\n' +
    '  #map {\n' +
    '    height: 18%;\n' +
    '    width: 50%;\n' +
    '    position: static !important;\n' +
    '    overflow: visible !important;\n' +
    '  }\n' +
    '</style>\n' +
    '<div class="modal-content container">\n' +
    '  <h2>{{\'commercialInformation\' | translate}} </h2>\n' +
    '\n' +
    '  <div class="modal-body">\n' +
    '    <form class="form-horizontal" name="editRetailerForm">\n' +
    '      <div class="pmd-card">\n' +
    '        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '          <span style="color:red">*</span>\n' +
    '          <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value=""> {{\'UploadPhoto\' | translate}}</label>\n' +
    '          <input id="image" class="hidden" type="file" img-upload ng-model="imageName" name="imageName">\n' +
    '          <img height="100" width="100" ng-src="{{image}}" />\n' +
    '          <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '            {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '        </div>\n' +
    '       \n' +
    '    </form>\n' +
    '  </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/new.html',
    '\n' +
    '<div class="container">\n' +
    '        <!-- header -->\n' +
    '        <div class="modal-header bordered"  id="bold">\n' +
    '                {{\'NewRetailer\' | translate}}\n' +
    '            </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-12">\n' +
    '                <div id="vm-container">\n' +
    '                    <!-- Retailer form step -->\n' +
    '                    <div id="vm-step-container">\n' +
    '                        <ul class="nav nav-pills nav-justified">\n' +
    '                            <li ng-repeat="step in newRetailerCtrl.steps"\n' +
    '                                ng-class="{\'active\':step.step == newRetailerCtrl.currentStep}">\n' +
    '                                <a> {{step.step | translate }}. {{step.name | translate}}</a>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '    \n' +
    '                    <!-- function -- get pages  -->\n' +
    '                    <div id="vm-content-container">\n' +
    '                        <ng-include src="newRetailerCtrl.getStepTemplate()"></ng-include>\n' +
    '                    </div>\n' +
    '                  \n' +
    '                    <!-- previous button  -->\n' +
    '                    <div id="vm-navigation-container" class="col-lg-12">\n' +
    '                        <div class="pull-right">\n' +
    '                            <span class="btn-group">\n' +
    '                                    <button class="btn btn-primary" name="next" type="button"\n' +
    '                                    onclick="goBack()"> {{\'goBack\' | translate}}</button>\n' +
    '                                <button ng-disabled="newRetailerCtrl.currentStep <= 1" class="btn btn-default"\n' +
    '                                    name="previous" type="button"\n' +
    '                                    ng-click="newRetailerCtrl.gotoStep(newRetailerCtrl.currentStep - 1)"><i\n' +
    '                                        class="fa fa-arrow-left"></i> {{\'PreviousStep\' | translate}}\n' +
    '                                </button>\n' +
    '                                <!-- next button  -->\n' +
    '                                <button ng-disabled="newRetailerCtrl.currentStep >=newRetailerCtrl.steps.length"\n' +
    '                                    class="btn btn-primary" name="next" type="button"\n' +
    '                                    ng-click="newRetailerCtrl.gotoStep(newRetailerCtrl.currentStep + 1)">\n' +
    '                                     {{\'Nextstep\' | translate}}\n' +
    '                                    <i class="fa fa-arrow-right"></i>\n' +
    '                                </button>\n' +
    '                            </span>\n' +
    '                            <!-- save button  -->\n' +
    '                            <button\n' +
    '                                ng-disabled="newRetailerCtrl.currentStep !=newRetailerCtrl.steps.length || image == null"\n' +
    '                                class="btn btn-success" name="next" type="button"\n' +
    '                                ng-click="newRetailerCtrl.addNewRetailer()">\n' +
    '                                <i class="fa fa-floppy-o"></i> {{\'Save\' | translate}}</button>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '    \n' +
    '                </div>\n' +
    '    \n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/newMap.html',
    '<style>\n' +
    '    /* Always set the map height explicitly to define the size of the div\n' +
    ' * element that contains the map. */\n' +
    '  \n' +
    '    #map {\n' +
    '        height: 100%;\n' +
    '        margin-top: 20%;\n' +
    '\n' +
    '        margin-left: 50%;\n' +
    '        position: initial !important;\n' +
    '        overflow: initial !important;\n' +
    '    }\n' +
    '\n' +
    '    #description {\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 15px;\n' +
    '        font-weight: 300;\n' +
    '    }\n' +
    '\n' +
    '    #infowindow-content .title {\n' +
    '        font-weight: bold;\n' +
    '    }\n' +
    '\n' +
    '    #infowindow-content {\n' +
    '        display: none;\n' +
    '    }\n' +
    '\n' +
    '    #map #infowindow-content {\n' +
    '        display: inline;\n' +
    '    }\n' +
    '\n' +
    '    .pac-card {\n' +
    '        margin: 10px 10px 0 0;\n' +
    '        border-radius: 2px 0 0 2px;\n' +
    '        box-sizing: border-box;\n' +
    '        -moz-box-sizing: border-box;\n' +
    '        outline: none;\n' +
    '        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n' +
    '        background-color: #fff;\n' +
    '        font-family: Roboto;\n' +
    '    }\n' +
    '\n' +
    '    #pac-container {\n' +
    '        padding-bottom: 12px;\n' +
    '        margin-right: 12px;\n' +
    '    }\n' +
    '\n' +
    '    .pac-controls {\n' +
    '        display: inline-block;\n' +
    '        padding: 5px 11px;\n' +
    '    }\n' +
    '\n' +
    '    .pac-controls label {\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 13px;\n' +
    '        font-weight: 300;\n' +
    '    }\n' +
    '\n' +
    '    #pac-input {\n' +
    '        background-color: #fff;\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 15px;\n' +
    '        font-weight: 300;\n' +
    '        margin-left: 12px;\n' +
    '        padding: 0 11px 0 13px;\n' +
    '        text-overflow: ellipsis;\n' +
    '        width: 400px;\n' +
    '    }\n' +
    '\n' +
    '    #pac-input:focus {\n' +
    '        border-color: #4d90fe;\n' +
    '    }\n' +
    '\n' +
    '    #title {\n' +
    '        color: #fff;\n' +
    '        background-color: #4d90fe;\n' +
    '        font-size: 25px;\n' +
    '        font-weight: 500;\n' +
    '        padding: 6px 12px;\n' +
    '    }\n' +
    '    #footer {\n' +
    '  position: fixed;\n' +
    '  left: 0;\n' +
    '  bottom: 0;\n' +
    '  width: 100%;\n' +
    '  background-color: transparent;\n' +
    '    color: #494b74;\n' +
    '   }\n' +
    '</style>\n' +
    '<div>\n' +
    '    {{\'NewRetailer\' | translate}}\n' +
    '</div>\n' +
    '<div class="row  pmd-card pmd-z-depth" style="margin-bottom: 0;">\n' +
    '    <div class="col-md-12 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <div class="col-md-12 col-sm-12 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <h1 class="text-center">\n' +
    '                <kbd style="background-color: #494b74c4;">\n' +
    '                    {{RetailerMapCtrl.Retailer.code}} -\n' +
    '                    {{RetailerMapCtrl.Retailer.name}}\n' +
    '                </kbd>\n' +
    '            </h1>\n' +
    '        </div>\n' +
    '        <form class="form-horizontal" name="newZoneForm">\n' +
    '\n' +
    '            <div class="row" style="    padding-bottom: 8%;">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row" style=" padding-left: 18%; padding-bottom: 10%">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <div id="map"></div>\n' +
    '                </div>\n' +
    '        \n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="pmd-modal-action text-right" id="footer">\n' +
    '    <!-- {{RetailerMapCtrl.CordinatesOfPoly}} -->\n' +
    '    <button style="border: #494b74 solid 1px;border-radius: 6px;"\n' +
    '         class="btn pmd-ripple-effect btn-primary" Area="button"\n' +
    '        ng-click="RetailerMapCtrl.updateRetailer()">\n' +
    '        {{\'saveChangesBtn\' | translate}}</button> \n' +
    '    <button class="btn pmd-ripple-effect btn-default" Area="button"\n' +
    '        ng-click="$state.go(\'Retailer\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        <!-- ng-disabled="RetailerMapCtrl.CordinatesOfPoly.length==0" -->\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/step1.html',
    '<div class="modal-content container">\n' +
    '    <div class="modal-body">\n' +
    '      <form class="newretailerForm" name="newretailerForm">\n' +
    '        <div>\n' +
    '          <!-- Nav tabs -->\n' +
    '          <ul>\n' +
    '            <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newmangactureCtrl.language">\n' +
    '              <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                data-toggle="tab">\n' +
    '                {{lang.value | translate}}\n' +
    '              </a>\n' +
    '            </li>\n' +
    '          </ul>\n' +
    '          <div>\n' +
    '            <div>\n' +
    '              <!-- Tab panes -->\n' +
    '              <div class="tab-content table-responsive">\n' +
    '                <h2> <label for="readonly">{{\'infoLbl\' | translate}} </label></h2>\n' +
    '                <!-- left side -->\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                  <!-- input name  -->\n' +
    '                  <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="nameStepOne"\n' +
    '                      ng-model="newRetailerCtrl.nameStepOne" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <!-- length validation  -->\n' +
    '                    <div ng-messages="newretailerForm.nameStepOne.$error" class="error">\n' +
    '                      <div ng-show="newretailerForm.nameStepOne.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                      <div\n' +
    '                        ng-if="newretailerForm.nameStepOne.$error.required && !newretailerForm.nameStepOne.$pristine">\n' +
    '                        {{\'NameError\' | translate}}</div>\n' +
    '                      <!-- required validation -->\n' +
    '                      <div\n' +
    '                        ng-if="(newretailerForm.nameStepOne.$error.minlength || newretailerForm.nameStepOne.$error.maxlength) ">\n' +
    '                        {{\'NameLengthError3\'\n' +
    '                      | translate}}</div>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                  <!-- code field -->\n' +
    '                  <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                    </label>\n' +
    '                    <input type="text" name="code" ng-readonly="true" ng-model="newRetailerCtrl.code"\n' +
    '                      aria-label="readonly" class="mat-input form-control">\n' +
    '                    <br>\n' +
    '                  </div> -->\n' +
    '                  <!-- Address field  -->\n' +
    '                  <label>\n' +
    '                    <span style="color:red">*</span> {{\'AddressLbl\' | translate}}\n' +
    '                    <br>\n' +
    '                    <textarea name="address" ng-model="newRetailerCtrl.address" required style="width: 250%;"\n' +
    '                      ng-minlength="11" placeholder="{{\'addyouraddresshere\' | translate}}" required>\n' +
    '                      </textarea>\n' +
    '                  </label>\n' +
    '                  <!-- length validation -->\n' +
    '                  <div ng-messages="newretailerForm.address.$error" class="error">\n' +
    '                    <div ng-show="newretailerForm.address.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                    <div ng-if="newretailerForm.address.$error.required && !newretailerForm.address.$pristine">\n' +
    '                      {{\'nameLengthError\' | translate}}</div>\n' +
    '                    <div\n' +
    '                      ng-if="(newretailerForm.address.$error.minlength || newretailerForm.address.$error.maxlength) ">\n' +
    '                      {{\'NameLengthError255\'\n' +
    '                      | translate}}</div>\n' +
    '                  </div>\n' +
    '                  <div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newretailerForm.address.$error.required && !newretailerForm.address.$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}}\n' +
    '                    </span>\n' +
    '                    <span class="error" ng-show="newretailerForm.address.$error.maxlength">\n' +
    '                      Too long!\n' +
    '                    </span>\n' +
    '                  </div>\n' +
    '                  <!-- email field  -->\n' +
    '                  <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label>\n' +
    '                      {{\'EmailLbl\' | translate}}</label>\n' +
    '                    <input type="text" class="mat-input form-control" name="emailStepOne"\n' +
    '                      ng-model="newRetailerCtrl.emailStepOne"\n' +
    '                      ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                    <!-- email validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newretailerForm.emailStepOne.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                    </span>\n' +
    '                  </div>\n' +
    '                  <!-- website field  -->\n' +
    '                  <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label>\n' +
    '                      {{\'websiteLbl\' | translate}} </label>\n' +
    '                    <br>\n' +
    '                    <input type="url" name="newRetailerCtrl.url" ng-model="newRetailerCtrl.url" class="mat-input form-control ng-pristine ng-untouched\n' +
    '                        ng-empty ng-invalid ng-invalid-required ng-valid-minlength ng-valid-maxlength">\n' +
    '                    <label>\n' +
    '                  </div> -->\n' +
    '                </div>\n' +
    '                <!-- right side  -->\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                  <!-- country --- drop down  -->\n' +
    '                  <div\n' +
    '                    class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'Country\' | translate}}</label>\n' +
    '                    <select class="select-tags form-control pmd-select2-tags" name="countryId"\n' +
    '                      ng-change="newRetailerCtrl.countryChange()" ng-model="newRetailerCtrl.selectedCountryId"\n' +
    '                      ng-options="group.countryId  as group.titles[selectedLanguage] for group in newRetailerCtrl.countries">\n' +
    '                    </select>\n' +
    '                    <div>\n' +
    '                      <!-- required validation -->\n' +
    '                      <span class="error"\n' +
    '                        ng-show="newretailerForm.results[countryId].$error.required && !newretailerForm.results[countryId].$pristine">\n' +
    '                        {{\'RequiredLbl\' | translate}} </span>\n' +
    '                      <span class="error" ng-show="newretailerForm.results[countryId].$error.results[countryId]">\n' +
    '                        {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                  <!-- governrate based on country id  -->\n' +
    '                  <div \n' +
    '                    class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'Governrate\' | translate}}</label>\n' +
    '                    <select class="select-tags form-control pmd-select2-tags" name="governrateId"\n' +
    '                      ng-change="newRetailerCtrl.GovernrateChange()" ng-model="newRetailerCtrl.selectedGovernrateId"\n' +
    '                      ng-options="group.governrateId as group.titles[selectedLanguage] for group in newRetailerCtrl.Governrates">\n' +
    '                    </select>\n' +
    '                    <div>\n' +
    '                      <span class="error"\n' +
    '                        ng-show="newretailerForm.governrateId.$error.required && !newretailerForm.governrateId.$pristine">\n' +
    '                        {{\'RequiredLbl\' | translate}} </span>\n' +
    '                      <span class="error" ng-show="newretailerForm.governrateId.$error.governrateId">\n' +
    '                        {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                  <!-- city based on governrate -->\n' +
    '                  <div \n' +
    '                    class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span> {{\'City\' | translate}}</label>\n' +
    '                    <select class="select-tags form-control pmd-select2-tags" name="cityId"\n' +
    '                     ng-change="newRetailerCtrl.cityChange()"\n' +
    '                      ng-model="newRetailerCtrl.selectedCityId" name="cityId"\n' +
    '                      ng-options="group.cityId as group.titles[selectedLanguage] for group in newRetailerCtrl.cities">\n' +
    '                    </select>\n' +
    '                  </div>\n' +
    '                  <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'DistrictLbl\' | translate}}</label>\n' +
    '                    <input type="text" class="form-control" name="district" \n' +
    '                    ng-model="newRetailerCtrl.district" >\n' +
    '                  </div>\n' +
    '                  <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label> {{\'PoliceStationLbl\' | translate}}</label>\n' +
    '                    <input type="text" class="form-control" name="pStation" \n' +
    '                    ng-model="newRetailerCtrl.pStation" >\n' +
    '                  </div>\n' +
    '                  <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'LblCenter\' | translate}}</label>\n' +
    '                    <input type="text" class="form-control" name="center" \n' +
    '                    ng-model="newRetailerCtrl.center"> \n' +
    '                  </div>\n' +
    '                  <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'AreaLbl\' | translate}}</label>\n' +
    '                    <input type="text" class="form-control" name="area" \n' +
    '                    ng-model="newRetailerCtrl.area ">\n' +
    '                  </div>\n' +
    '                  <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label>{{\'VillageLbl\' | translate}}</label>\n' +
    '                    <input type="text" class="form-control" name="village" \n' +
    '                    ng-model="newRetailerCtrl.village"   > \n' +
    '                   \n' +
    '                      </div>\n' +
    '  \n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </form>\n' +
    '    </div>\n' +
    '  \n' +
    '  ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/step2.html',
    '<div class="modal-content container">\n' +
    '        <h2> {{\'ContactInformation\' | translate}}</h2>\n' +
    '    \n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="newRetailerForm">\n' +
    '                <div>\n' +
    '    <!-- Nav tabs -->\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                            ng-repeat="lang in newCategoryCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                                data-toggle="tab">\n' +
    '                                {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '    <!-- Tab panes -->\n' +
    '                            <div class="tab-content table-responsive">\n' +
    '    <!-- name -->\n' +
    '                                <div class="form-group col-lg-2">\n' +
    '                                    <label><span style="color:red" >*</span>  {{\'Name\' | translate}}</label>\n' +
    '                                    <input type="text" class="form-control" name="name" style="display: inline-block; "\n' +
    '                                        ng-model="newRetailerCtrl.name" required />\n' +
    '                                    <div class="error" ng-messages="newRetailerForm.name.$error">\n' +
    '                                        <div ng-if="newRetailerForm.name.$error.required && \n' +
    '                                        !newRetailerForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '    <!-- title -->\n' +
    '                                <div class="form-group col-lg-2">\n' +
    '                                    <label>{{\'Title\' | translate}}</label>\n' +
    '                                    <input type="text" class="form-control" name="title" style="display: inline-block;"\n' +
    '                                        ng-model="newRetailerCtrl.title" required />\n' +
    '                                </div>\n' +
    '    <!-- Mobile number -->\n' +
    '                                <div class="form-group col-lg-2">\n' +
    '                                    <label> <span style="color:red" >*</span> {{\'mobileNumber\' | translate}}</label>\n' +
    '                                    <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only  style="display: inline-block;"\n' +
    '                                      ng-minlength="11" ng-maxlength="20" \n' +
    '                                     ng-model="newRetailerCtrl.mobileNumber"\n' +
    '                                     required />\n' +
    '    <!-- required validation  -->\n' +
    '                                    <div  ng-messages="newRetailerForm.mobileNumber.$error">\n' +
    '                                            <div class="error" ng-if="newRetailerForm.mobileNumber.$error.required && \n' +
    '                                            !newRetailerForm.mobileNumber.$pristine">\n' +
    '                                            {{\'requiredErr\' |  translate}}\n' +
    '                                            </div>\n' +
    '    <!-- length validation -->\n' +
    '                                            <div class="error"\n' +
    '                                                ng-if="(newRetailerForm.mobileNumber.$error.minlength ||\n' +
    '                                                newRetailerForm.mobileNumber.$error.maxlength) \n' +
    '                                                 && !newRetailerForm.mobileNumber.newmobileNumber.$error.required">\n' +
    '                                                 {{\'PhoneLengthError\' | translate }}                                            </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '    <!-- email -->\n' +
    '                                <div class="form-group col-lg-2">\n' +
    '                                    <label>{{\'EMail\' | translate}}</label>\n' +
    '                                    <input type="text" class="form-control" name="email" style="display: inline-block;"\n' +
    '                                        ng-model="newRetailerCtrl.email" required />\n' +
    '                                </div>\n' +
    '    <!-- contact Type -->\n' +
    '    <div class="form-group col-lg-2">\n' +
    '            <label>{{\'ContactType\' | translate}}</label>\n' +
    '<!-- required validation -->\n' +
    '            <select class="form-control select-tags pmd-select2-tags"\n' +
    '                ng-model="newRetailerCtrl.contactType" name="contactType">\n' +
    '                <option ng-repeat="contact in newRetailerCtrl.ContactTypeList" > \n' +
    '                    {{contact.titles[selectedLanguage]}}\n' +
    '                </option>\n' +
    '            </select>\n' +
    '         \n' +
    '        </div>\n' +
    '\n' +
    '                                <!-- {{size.sizeNameDictionary[selectedLanguage]}} -->\n' +
    '    \n' +
    '    <!-- add button -->\n' +
    '                                <div class="col-lg-2">\n' +
    '                                    <label>{{\'Addtotable\' | translate}}</label>\n' +
    '                                    <input type="button" ng-click="newRetailerCtrl.AddContact()"\n' +
    '                                    class="btn btn-primary" value="add"\n' +
    '                                    style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                            </div>\n' +
    '                                <hr>\n' +
    '    <!-- binding data from inputs to table -->\n' +
    '                                <table class="table pmd-table table-hover">\n' +
    '    <!-- heads -->\n' +
    '                                    <thead>\n' +
    '                                        <tr>\n' +
    '                                            <th>{{\'Name\' | translate}}</th>\n' +
    '                                            <th>{{\'Title\' | translate}}</th>\n' +
    '                                            <th>{{\'mobileNumber\' | translate}}</th>\n' +
    '                                            <th>{{\'EMail\' | translate}}</th>\n' +
    '                                            <th>{{\'ContactType\' | translate}}</th>\n' +
    '                                            <th>{{\'Action\' | translate}}</th>\n' +
    '                                        </tr>\n' +
    '                                    </thead>\n' +
    '    <!-- binding data -->\n' +
    '                                    <tbody>\n' +
    '                                        <tr ng-repeat="(index,Contact) in newRetailerCtrl.ContactList">\n' +
    '                                            <td data-title="Name">{{Contact.name}}</td>\n' +
    '                                            <td data-title="Title">{{Contact.title}}</td>\n' +
    '                                            <td data-title="mobileNumber"> {{Contact.mobileNumber}}</td>\n' +
    '                                            <td data-title="email">{{Contact.email}}</td>\n' +
    '                                            <td data-title="ContactType">{{newRetailerCtrl.contactType}}</td>\n' +
    '                                            <td data-title="Action">\n' +
    '                                                <input type="checkbox" ng-change="newRetailerCtrl.setContactMain(Contact)"\n' +
    '                                                    ng-model="Contact.checkbox">\n' +
    '                                            </td>\n' +
    '                                            <td width="30%">\n' +
    '                                                <i class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                                    ng-click="newRetailerCtrl.openDeleteContactTypeDialog(index)"\n' +
    '                                                    title="Delete">delete</i>\n' +
    '                                            </td>\n' +
    '                                        </tr>\n' +
    '                                    </tbody>\n' +
    '                                </table>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/step3.html',
    '<style>\n' +
    '    /* Always set the map height explicitly to define the size of the div\n' +
    '     * element that contains the map. */\n' +
    '    #map {\n' +
    '        height: 50%;\n' +
    '        width: 50%;\n' +
    '        position: unset !important;\n' +
    '        overflow: initial !important;\n' +
    '    }\n' +
    '\n' +
    '    /* Optional: Makes the sample page fill the window. */\n' +
    '    html,\n' +
    '    body {\n' +
    '        height: 100%;\n' +
    '        margin: 0;\n' +
    '        padding: 0;\n' +
    '    }\n' +
    '\n' +
    '    #floating-panel {\n' +
    '        position: absolute;\n' +
    '        top: 10px;\n' +
    '        left: 25%;\n' +
    '        z-index: 5;\n' +
    '        background-color: #fff;\n' +
    '        padding: 5px;\n' +
    '        border: 1px solid #999;\n' +
    '        text-align: center;\n' +
    '        font-family: \'Roboto\', \'sans-serif\';\n' +
    '        line-height: 30px;\n' +
    '        padding-left: 10px;\n' +
    '    }\n' +
    '</style>\n' +
    '<div class="modal-content container">\n' +
    '    <h2>{{\'commercialInformation\' | translate}}</h2>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newRetailerForm">\n' +
    '            <div>\n' +
    '                <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                    <span style="color:red">*</span>\n' +
    '                    <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                        Photo</label>\n' +
    '                    <input id="image" class="hidden" type="file" img-upload ng-model="imageName" name="imageName">\n' +
    '                    <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '\n' +
    '                    <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                        {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '                </div>\n' +
    '<!-- \n' +
    '                <div class="row" style="margin: 25%;">\n' +
    '                    <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                        <label for="readonly"><span style="color:red">*</span> {{\'map\' | translate}}\n' +
    '                        </label>\n' +
    '                        <div id="map"></div>\n' +
    '\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '            </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Retailer/templates/step4.html',
    '<style>\n' +
    '    /* Always set the map height explicitly to define the size of the div\n' +
    '     * element that contains the map. */\n' +
    '    #map {\n' +
    '        height: 50%;\n' +
    '        width: 50%;\n' +
    '        position: unset !important;\n' +
    '        overflow: initial !important;\n' +
    '    }\n' +
    '\n' +
    '    /* Optional: Makes the sample page fill the window. */\n' +
    '    html,\n' +
    '    body {\n' +
    '        height: 100%;\n' +
    '        margin: 0;\n' +
    '        padding: 0;\n' +
    '    }\n' +
    '\n' +
    '    #floating-panel {\n' +
    '        position: absolute;\n' +
    '        top: 10px;\n' +
    '        left: 25%;\n' +
    '        z-index: 5;\n' +
    '        background-color: #fff;\n' +
    '        padding: 5px;\n' +
    '        border: 1px solid #999;\n' +
    '        text-align: center;\n' +
    '        font-family: \'Roboto\', \'sans-serif\';\n' +
    '        line-height: 30px;\n' +
    '        padding-left: 10px;\n' +
    '    }\n' +
    '</style>\n' +
    '<div class="modal-content container">\n' +
    '    <h2>{{\'Map\' | translate}}</h2>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <div class="row" style="    padding-bottom: 8%;">\n' +
    '            <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="row" style="    padding-left: 18%;">\n' +
    '            <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <div id="map"></div>\n' +
    '                <div id="infowindow-content">\n' +
    '                    <img src="" width="16" height="16" id="place-icon">\n' +
    '                    <span id="place-name" class="title"></span><br>\n' +
    '                    <span id="place-address"></span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Sku/templates/SKU.html',
    '<div>\n' +
    '    <h1 class="text-center">\n' +
    '        <kbd style="background-color: #494b74c4;">\n' +
    '            {{selectedManufacture.name}} :\n' +
    '            {{selectedManufacture.code}}\n' +
    '        </kbd>\n' +
    '    </h1>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.permessionModules[\'SKU\'].includes(18)">\n' +
    '            <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                ng-disabled="selectedManufacture.manufactureId==0" ng-click="$state.go(\'newSKU\');"\n' +
    '                class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '                <div class="error"\n' +
    '                ng-show="selectedManufacture.manufactureId==0">\n' +
    '                {{\'selectedManufacture\' | translate}}</div>\n' +
    '        </div>\n' +
    '\n' +
    '    <div ng-if="SKUs.length == 0">\n' +
    '        <span>{{\'NoSKUsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="SKUs.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                    <th> {{\'Title\' | translate}}</th>\n' +
    '                    <th>{{\'basic\' | translate}}</th>\n' +
    '                    <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="sku in SKUs">\n' +
    '                    <td data-title="code">{{sku.code}}</td>\n' +
    '                    <td data-title="titles">\n' +
    '                        {{sku.titles[selectedLanguage]}}\n' +
    '                    </td>\n' +
    '                    <td>\n' +
    '                        <div ng-show="user.permessionModules[\'SKU\'].includes(21)" class="btn-switch"\n' +
    '                            ng-class="{\'btn-switch--on\':sku.isBasic }" ng-model="sku.isBasic">\n' +
    '\n' +
    '                            <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':sku.isBasic }"\n' +
    '                                ng-model="sku.isBasic">\n' +
    '                            </div>\n' +
    '\n' +
    '                    </td>\n' +
    '                    <td>\n' +
    '                        <div class="btn-switch" ng-class="{\'btn-switch--on\':sku.isActive }" ng-model="sku.isActive "\n' +
    '                            ng-click="SKUCtrl.ChangeSKYStatus(sku)">\n' +
    '\n' +
    '                            <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':sku.isActive }"\n' +
    '                                ng-model="sku.isActive " ng-click="SKUCtrl.ChangeSKYStatus(sku)">\n' +
    '                            </div>\n' +
    '\n' +
    '                    </td>\n' +
    '                    <td width="30%">\n' +
    '                        <i ng-show="user.permessionModules[\'SKU\'].includes(20)" class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                            ng-click="$state.go(\'editSKU\',{skuId: sku.skuId});" title="Edit">mode_edit</i>\n' +
    '                        <i ng-show="user.permessionModules[\'SKU\'].includes(19)" class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="SKUCtrl.openDeleteDialog\n' +
    '                            (sku,sku.titles[selectedLanguage],sku.skuId)" title="Delete">delete</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Sku/templates/edit.html',
    '<div  id="bold">\n' +
    '        {{\'EditSKU\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'SKU\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editTypeForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editSKUCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editSKUCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name"> {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}" ng-model="editSKUCtrl.sku.titles[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div class="error" ng-messages="editTypeForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="editTypeForm.titles{{lang.value+\'Name\'}}.$error.required && !editTypeForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(editTypeForm.titles{{lang.value+\'Name\'}}.$error.minlength || editTypeForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !editTypeForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <!-- code field -->\n' +
    '                        <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                            </label>\n' +
    '                            <input type="text" name="code" ng-readonly="true" ng-model="editSKUCtrl.sku.code"\n' +
    '                                aria-label="readonly" class="mat-input form-control">\n' +
    '                            <br>\n' +
    '\n' +
    '                        </div> -->\n' +
    '\n' +
    '                        <div data-title="Action">\n' +
    '                                <input type="checkbox" ng-change="newSKUCtrl.isBasic"\n' +
    '                                    ng-model="editSKUCtrl.sku.isBasic">  {{\'isBasic\' | translate}}\n' +
    '                          </div>\n' +
    '\n' +
    '\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="editTypeForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editSKUCtrl.UpdateSKU()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editSKUCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Sku/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewSKU\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newSKUForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newSKUCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newSKUCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">\n' +
    '                                        {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}" ng-model="newSKUCtrl.titles[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newSKUForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="newSKUForm.titles{{lang.value+\'Name\'}}.$error.required && !newSKUForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(newSKUForm.titles{{lang.value+\'Name\'}}.$error.minlength || newSKUForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !newSKUForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                \n' +
    '                                <!-- code field -->\n' +
    '                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                        <label for="readonly"> \n' +
    '                                <span style="color:red">*</span>{{\'codeLbl\' | translate}}\n' +
    '                        </label>\n' +
    '                        <input  type="text" name="code" ng-readonly="true" ng-model="newSKUCtrl.code"\n' +
    '                          aria-label="readonly" class="mat-input form-control">\n' +
    '                        <br>\n' +
    '\n' +
    '                </div> -->\n' +
    '\n' +
    '                      <div data-title="Action">\n' +
    '                            <input type="checkbox" ng-change="newSKUCtrl.isBasic"\n' +
    '                                ng-model="newSKUCtrl.isBasic"> isBasic\n' +
    '                      </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-disabled="newSKUForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" Area="button"\n' +
    '            ng-click="newSKUCtrl.AddNewSKU()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Area="button"\n' +
    '            ng-click="$state.go(\'SKU\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Zone/templates/DistributorZone.html',
    '<div>\n' +
    '        <div  id="bold"> \n' +
    '                {{\'DistributorZones\' | translate}}\n' +
    '        </div>\n' +
    '    <h1 class="text-center">\n' +
    '         <kbd style="background-color: #494b74c4;"> \n' +
    '             {{selectedManufacture.name}} :\n' +
    '                {{selectedManufacture.code}}\n' +
    '            </kbd>\n' +
    '    </h1>\n' +
    '    \n' +
    '    <div ng-if="DistributorZones.results.length == 0">\n' +
    '        <span>{{\'NoDistributorZoneAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="DistributorZones.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                        <th> {{\'CompanyLogo\' | translate}}</th>\n' +
    '                        <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                        <th>{{\'Name\' | translate}}</th>\n' +
    '                        <th>{{\'AddressLbl\' | translate}}</th>\n' +
    '                        <th>{{\'Title\' | translate}}</th>\n' +
    '                        <th>{{\'mobileNumber\' | translate}}</th>\n' +
    '                        <th>{{\'EmailLbl\' | translate}}</th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                    <tr ng-repeat="DistributorZone in createDistributorZoneCtrl.DistributorZoneList">\n' +
    '                            <td> \n' +
    '                                <img width="100px" height="100px" data-ng-src="http://172.21.22.222/actor/{{DistributorZone.companyLogo}}" />\n' +
    '                            </td>\n' +
    '                            <td data-title="code">{{DistributorZone.code}}</td>\n' +
    '                            <td data-title="Name">\n' +
    '                                {{DistributorZone.name | limitTo : 20}} \n' +
    '                                {{DistributorZone.name.length > 20 ? \'...\' : \'\'}}\n' +
    '                            </td>\n' +
    '                            <td data-title="code">{{DistributorZone.address}}</td>\n' +
    '                            <td data-title="city">{{DistributorZone.distributorContactInformation[0].title}}</td>\n' +
    '                            <td data-title="governrate">{{DistributorZone.distributorContactInformation[0].mobileNumber}}</td>\n' +
    '                            <td data-title="address">{{DistributorZone.distributorContactInformation[0].email}}</td>\n' +
    '                        </tr>\n' +
    '\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '                paging-action="createDistributorZoneCtrl.changePage(page)" flex="nogrow"\n' +
    '                ] show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '                disabled-class="hide">\n' +
    '                </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Zone/templates/RetailerZone.html',
    '<div>\n' +
    '        <div  id="bold">\n' +
    '                {{\'RetailerZones\' | translate}}\n' +
    '        </div>\n' +
    '        <h1 class="text-center">\n' +
    '             <kbd style="background-color: #383a53;"> \n' +
    '                 {{selectedManufacture.name}} :\n' +
    '                    {{selectedManufacture.code}}\n' +
    '                </kbd>\n' +
    '        </h1>\n' +
    '     \n' +
    '        <div ng-if="RetailerZones.results.length == 0">\n' +
    '            <span>{{\'NoRetailerZonesAvailable\' | translate}}</span>\n' +
    '        </div>\n' +
    '        <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="RetailerZones.results.length > 0">\n' +
    '            <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th> {{\'CompanyLogo\' | translate}}</th>\n' +
    '                        <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                        <th>{{\'Name\' | translate}}</th>\n' +
    '                        <th>{{\'AddressLbl\' | translate}}</th>\n' +
    '                        <th>{{\'Title\' | translate}}</th>\n' +
    '                        <th>{{\'mobileNumber\' | translate}}</th>\n' +
    '                        <th>{{\'EmailLbl\' | translate}}</th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                        <tr ng-repeat="RetailerZones in createRetailerZoneCtrl.RetailerZoneList">\n' +
    '                                <td> \n' +
    '                                    <img width="100px" height="100px" data-ng-src="http://172.21.22.222/actor/{{RetailerZones.companyLogo}}" />\n' +
    '                                </td>\n' +
    '                                <td data-title="code">{{RetailerZones.code}}</td>\n' +
    '                                <td data-title="Name">\n' +
    '                                    {{RetailerZones.name | limitTo : 20}} \n' +
    '                                    {{RetailerZones.name.length > 20 ? \'...\' : \'\'}}\n' +
    '                                </td>\n' +
    '                                <td data-title="code">{{RetailerZones.address}}</td>\n' +
    '                                <td data-title="city">{{RetailerZones.retailerContactInformation[0].title}}</td>\n' +
    '                                <td data-title="governrate">{{RetailerZones.retailerContactInformation[0].mobileNumber}}</td>\n' +
    '                                <td data-title="address">{{RetailerZones.retailerContactInformation[0].email}}</td>\n' +
    '                            </tr>\n' +
    '    \n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '        </div>\n' +
    '        <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="createRetailerZoneCtrl.changePage(page)" flex="nogrow"\n' +
    '        ] show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '        </div>\n' +
    '    </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Zone/templates/Zone.html',
    '<div>\n' +
    '    <div id="bold">\n' +
    '        {{\'Zone\' | translate}}\n' +
    '    </div>\n' +
    '    <h1 class="text-center">\n' +
    '        <kbd style="background-color: #494b74c4;">\n' +
    '            {{selectedManufacture.name}} :\n' +
    '            {{selectedManufacture.code}}\n' +
    '        </kbd>\n' +
    '    </h1>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.permessionModules[\'Zone\'].includes(63)">\n' +
    '            <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                ng-disabled="selectedManufacture.manufactureId==0" ng-click="$state.go(\'newZone\');"\n' +
    '                class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddNew\' | translate}}</button>\n' +
    '                <div class="error"\n' +
    '                ng-show="selectedManufacture.manufactureId==0">\n' +
    '                {{\'selectedManufacture\' | translate}}</div>\n' +
    '        </div>\n' +
    '    <div ng-if="Zones.results.length == 0">\n' +
    '        <span>{{\'NoZoneAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="Zones.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'codeLbl\' | translate}}</th>\n' +
    '                        <!-- <th>{{\'ManufactureLbl\' | translate}}</th> -->\n' +
    '                        <th>{{\'Name\' | translate}}</th>\n' +
    '\n' +
    '                        <th>{{\'CreateZoneRelation\' | translate}}</th>\n' +
    '                        <th>{{\'EditZoneRelation\' | translate}}</th>\n' +
    '                        <th>{{\'ZoneDetails\' | translate}}</th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="Zone in Zones.results">\n' +
    '\n' +
    '                        <td>{{Zone.zoneCode}}</td>\n' +
    '                        <!-- <td>{{Zone.manufactureCode}}</td> -->\n' +
    '                        <td>{{Zone.titles[selectedLanguage]}}</td>\n' +
    '                        <!-- <td ng-show="!Zone.isActive">\n' +
    '                        <div ng-if="user.permessionModules[\'zone\'].includes(12)==true">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':Zone.isActive}" ng-model="Zone.isActive"\n' +
    '                                ng-click="ZoneCtrl.ChangeStatus(Zone)">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Zone.isActive}"\n' +
    '                                    ng-model="Zone.isActive" ng-click="ZoneCtrl.ChangeStatus(Zone)">\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div ng-if="user.permessionModules[\'zone\'].includes(12)==false"\n' +
    '                            title="You don\'t have permssion">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':Zone.isActive}"\n' +
    '                                ng-model="Zone.isActive">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Zone.isActive}"\n' +
    '                                    ng-model="Zone.isActive">\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '                    </td>\n' +
    '                    <td ng-show="Zone.isActive">\n' +
    '                        <div class="btn-switch" ng-class="{\'btn-switch--on\':Zone.isActive}" ng-model="Zone.isActive">\n' +
    '\n' +
    '                            <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':Zone.isActive}"\n' +
    '                                ng-model="Zone.isActive">\n' +
    '                            </div>\n' +
    '                    </td> -->\n' +
    '\n' +
    '                        <td>\n' +
    '                            <button ng-disabled="Zone.hasRetailer && Zone.hasDistribuitor"\n' +
    '                                ng-show="user.permessionModules[\'Zone\'].includes(85)"\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'CreateMap\',{zoneId : Zone.zoneId});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'CreateMap\' | translate}}</button>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <button ng-disabled="Zone.hasRetailer && Zone.hasDistribuitor"\n' +
    '                                ng-show="user.permessionModules[\'Zone\'].includes(64)"\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'newZoneRelation\',{zoneId : Zone.zoneId});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'CreateZoneRelation\' | translate}}</button>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <button ng-disabled="!Zone.hasRetailer || !Zone.hasDistribuitor"\n' +
    '                                ng-show="user.permessionModules[\'Zone\'].includes(66)"\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'editZoneRelation\',{zoneId : Zone.zoneId});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'EditZoneRelation\' | translate}}</button>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <button ng-disabled="!Zone.hasRetailer || !Zone.hasDistribuitor"\n' +
    '                                ng-show="user.permessionModules[\'Zone\'].includes(65)"\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'zoneRelationDetails\',{zoneId : Zone.zoneId});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'ZoneDetails\' | translate}}</button>\n' +
    '                        </td>\n' +
    '\n' +
    '\n' +
    '\n' +
    '                    </tr>\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Zone/templates/new.html',
    '<style>\n' +
    '    /* Always set the map height explicitly to define the size of the div\n' +
    ' * element that contains the map. */\n' +
    '    #map {\n' +
    '        height: 100%;\n' +
    '        margin-top: 20%;\n' +
    '\n' +
    '        margin-left: 50%;\n' +
    '        position: initial !important;\n' +
    '        overflow: initial !important;\n' +
    '    }\n' +
    '\n' +
    '    /* Optional: Makes the sample page fill the window. */\n' +
    '    html,\n' +
    '    body {\n' +
    '        height: 100%;\n' +
    '        margin: 0;\n' +
    '        padding: 0;\n' +
    '    }\n' +
    '\n' +
    '    #description {\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 15px;\n' +
    '        font-weight: 300;\n' +
    '    }\n' +
    '\n' +
    '    #infowindow-content .title {\n' +
    '        font-weight: bold;\n' +
    '    }\n' +
    '\n' +
    '    #infowindow-content {\n' +
    '        display: none;\n' +
    '    }\n' +
    '\n' +
    '    #map #infowindow-content {\n' +
    '        display: inline;\n' +
    '    }\n' +
    '\n' +
    '    .pac-card {\n' +
    '        margin: 10px 10px 0 0;\n' +
    '        border-radius: 2px 0 0 2px;\n' +
    '        box-sizing: border-box;\n' +
    '        -moz-box-sizing: border-box;\n' +
    '        outline: none;\n' +
    '        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n' +
    '        background-color: #fff;\n' +
    '        font-family: Roboto;\n' +
    '    }\n' +
    '\n' +
    '    #pac-container {\n' +
    '        padding-bottom: 12px;\n' +
    '        margin-right: 12px;\n' +
    '    }\n' +
    '\n' +
    '    .pac-controls {\n' +
    '        display: inline-block;\n' +
    '        padding: 5px 11px;\n' +
    '    }\n' +
    '\n' +
    '    .pac-controls label {\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 13px;\n' +
    '        font-weight: 300;\n' +
    '    }\n' +
    '\n' +
    '    #pac-input {\n' +
    '        background-color: #fff;\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 15px;\n' +
    '        font-weight: 300;\n' +
    '        margin-left: 12px;\n' +
    '        padding: 0 11px 0 13px;\n' +
    '        text-overflow: ellipsis;\n' +
    '        width: 400px;\n' +
    '    }\n' +
    '\n' +
    '    #pac-input:focus {\n' +
    '        border-color: #4d90fe;\n' +
    '    }\n' +
    '\n' +
    '    #title {\n' +
    '        color: #fff;\n' +
    '        background-color: #4d90fe;\n' +
    '        font-size: 25px;\n' +
    '        font-weight: 500;\n' +
    '        padding: 6px 12px;\n' +
    '    }\n' +
    '</style>\n' +
    '<div id="bold">\n' +
    '    {{\'NewZone\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'NewZone\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newZoneForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newZoneCtrl.language">\n' +
    '                        <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home" role="tab"\n' +
    '                            data-toggle="tab">\n' +
    '                            <span style="color:red">*</span>  {{lang.value | translate}}\n' +
    '                        </a>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '                <div class="pmd-card">\n' +
    '                    <div class="pmd-card-body">\n' +
    '                        <!-- Tab panes -->\n' +
    '                        <div class="tab-content">\n' +
    '                            <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newZoneCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">\n' +
    '                                        {{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required Area="text" class="mat-input form-control"\n' +
    '                                        name="titles{{lang.value+\'Name\'}}" ng-model="newZoneCtrl.titles[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newZoneForm.titles{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="newZoneForm.titles{{lang.value+\'Name\'}}.$error.required && !newZoneForm.titles{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error"\n' +
    '                                            ng-show="(newZoneForm.titles{{lang.value+\'Name\'}}.$error.minlength || newZoneForm.titles{{lang.value+\'Name\'}}.$error.maxlength) && !newZoneForm.titles{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <!-- <div class="row">\n' +
    '                            <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <label for="readonly"><span style="color:red">*</span> {{\'codeLbl\' | translate}}\n' +
    '                                </label>\n' +
    '                                <input type="text" name="zoneCode" ng-readonly="true" ng-model="newZoneCtrl.zoneCode"\n' +
    '                                    aria-label="readonly" class="mat-input form-control">\n' +
    '\n' +
    '                            </div>\n' +
    '                        </div> -->\n' +
    '\n' +
    '                        <div class="row">\n' +
    '                        <!-- country --- drop down  -->\n' +
    '                  <div \n' +
    '                  class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Country\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="countryId"\n' +
    '                    ng-change="newZoneCtrl.countryChange()" ng-model="newZoneCtrl.selectedCountryId"\n' +
    '                    ng-options="group.countryId  as group.titles[selectedLanguage] for group in newZoneCtrl.countries">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <!-- required validation -->\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newretailerForm.results[countryId].$error.required && !newretailerForm.results[countryId].$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="newretailerForm.results[countryId].$error.results[countryId]">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                <!-- governrate based on country id  -->\n' +
    '                <div \n' +
    '                class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                  <label for="first-name"><span style="color:red">*</span> {{\'Governrate\' | translate}}</label>\n' +
    '                  <select class="select-tags form-control pmd-select2-tags" name="governrateId"\n' +
    '                    ng-change="newZoneCtrl.GovernrateChange()" ng-model="newZoneCtrl.selectedGovernrateId"\n' +
    '                    ng-options="group.governrateId as group.titles[selectedLanguage] for group in newZoneCtrl.Governrates">\n' +
    '                  </select>\n' +
    '                  <div>\n' +
    '                    <span class="error"\n' +
    '                      ng-show="newretailerForm.governrateId.$error.required && !newretailerForm.governrateId.$pristine">\n' +
    '                      {{\'RequiredLbl\' | translate}} </span>\n' +
    '                    <span class="error" ng-show="newretailerForm.governrateId.$error.governrateId">\n' +
    '                      {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <!-- <div class="row" style="    padding-bottom: 8%;">\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                          \n' +
    '                            <input id="pac-input" class="controls" type="text" placeholder="Search Box">\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="row" style="    padding-left: 18%;">\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            <div id="map"></div>\n' +
    '                            <div id="infowindow-content">\n' +
    '                                <img src="" width="16" height="16" id="place-icon">\n' +
    '                                <span id="place-name" class="title"></span><br>\n' +
    '                                <span id="place-address"></span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                    </div> -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '    </div>\n' +
    '    </form>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newZoneForm.$invalid || newZoneCtrl.selectedCityId <= 0"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="newZoneCtrl.AddNewZone()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="$state.go(\'Zone\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Zone/templates/newMap.html',
    '<style>\n' +
    '    /* Always set the map height explicitly to define the size of the div\n' +
    ' * element that contains the map. */\n' +
    '    #map {\n' +
    '        height: 100%;\n' +
    '        margin-top: 20%;\n' +
    '\n' +
    '        margin-left: 50%;\n' +
    '        position: initial !important;\n' +
    '        overflow: initial !important;\n' +
    '    }\n' +
    '\n' +
    '    #description {\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 15px;\n' +
    '        font-weight: 300;\n' +
    '    }\n' +
    '\n' +
    '    #infowindow-content .title {\n' +
    '        font-weight: bold;\n' +
    '    }\n' +
    '\n' +
    '    #infowindow-content {\n' +
    '        display: none;\n' +
    '    }\n' +
    '\n' +
    '    #map #infowindow-content {\n' +
    '        display: inline;\n' +
    '    }\n' +
    '\n' +
    '    .pac-card {\n' +
    '        margin: 10px 10px 0 0;\n' +
    '        border-radius: 2px 0 0 2px;\n' +
    '        box-sizing: border-box;\n' +
    '        -moz-box-sizing: border-box;\n' +
    '        outline: none;\n' +
    '        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n' +
    '        background-color: #fff;\n' +
    '        font-family: Roboto;\n' +
    '    }\n' +
    '\n' +
    '    #pac-container {\n' +
    '        padding-bottom: 12px;\n' +
    '        margin-right: 12px;\n' +
    '    }\n' +
    '\n' +
    '    .pac-controls {\n' +
    '        display: inline-block;\n' +
    '        padding: 5px 11px;\n' +
    '    }\n' +
    '\n' +
    '    .pac-controls label {\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 13px;\n' +
    '        font-weight: 300;\n' +
    '    }\n' +
    '\n' +
    '    #pac-input {\n' +
    '        background-color: #fff;\n' +
    '        font-family: Roboto;\n' +
    '        font-size: 15px;\n' +
    '        font-weight: 300;\n' +
    '        margin-left: 12px;\n' +
    '        padding: 0 11px 0 13px;\n' +
    '        text-overflow: ellipsis;\n' +
    '        width: 400px;\n' +
    '    }\n' +
    '\n' +
    '    #pac-input:focus {\n' +
    '        border-color: #4d90fe;\n' +
    '    }\n' +
    '\n' +
    '    #title {\n' +
    '        color: #fff;\n' +
    '        background-color: #4d90fe;\n' +
    '        font-size: 25px;\n' +
    '        font-weight: 500;\n' +
    '        padding: 6px 12px;\n' +
    '    }\n' +
    '\n' +
    '    #footer {\n' +
    '        position: fixed;\n' +
    '        left: 0;\n' +
    '        bottom: 0;\n' +
    '        width: 100%;\n' +
    '        background-color: transparent;\n' +
    '        color: #494b74;\n' +
    '    }\n' +
    '</style>\n' +
    '<div>\n' +
    '    {{\'NewZone\' | translate}}\n' +
    '</div>\n' +
    '<div class="row  pmd-card pmd-z-depth" style="margin-bottom: 0;">\n' +
    '    <div class="col-md-12 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '        <div class="col-md-6 col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <h1 class="text-center">\n' +
    '                <kbd style="background-color: #494b74c4;">\n' +
    '                    {{\'ManufactureLbl\' | translate}}:\n' +
    '                    {{zoneMapCtrl.zone.manufacture.code}} -\n' +
    '                    {{zoneMapCtrl.zone.manufacture.name}}\n' +
    '                </kbd>\n' +
    '            </h1>\n' +
    '        </div>\n' +
    '        <div class="col-md-6 col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <h1>\n' +
    '                <kbd style="background-color: #494b74c4;">\n' +
    '                    {{\'Zone\' | translate}}:\n' +
    '                    {{zoneMapCtrl.zone.zoneCode}} -\n' +
    '                    {{zoneMapCtrl.zone.titles[selectedLanguage]}}\n' +
    '                </kbd>\n' +
    '            </h1>\n' +
    '        </div>\n' +
    '        <form class="form-horizontal" name="newZoneForm">\n' +
    '\n' +
    '            <div class="row" style="    padding-bottom: 8%;">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <!-- <label for="readonly"><span style="color:red">*</span> {{\'map\' | translate}}\n' +
    '                                        </label> -->\n' +
    '                    <!-- <input id="pac-input" class="controls" type="text" placeholder="Search Box"> -->\n' +
    '\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row" style=" padding-left: 18%; padding-bottom: 10%">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <div id="map"></div>\n' +
    '                    <!-- <div id="infowindow-content">\n' +
    '                            <img src="" width="16" height="16" id="place-icon">\n' +
    '                            <span id="place-name" class="title"></span><br>\n' +
    '                            <span id="place-address"></span>\n' +
    '                        </div> -->\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="pmd-modal-action text-right" id="footer">\n' +
    '    <!-- {{zoneMapCtrl.CordinatesOfPoly}} -->\n' +
    '    <button style="border: #494b74 solid 1px;border-radius: 6px;"  \n' +
    '        class="btn pmd-ripple-effect btn-primary" Area="button"\n' +
    '        ng-click="zoneMapCtrl.AddNewZone()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '    <button class="btn pmd-ripple-effect btn-default" Area="button"\n' +
    '        ng-click="$state.go(\'Zone\');">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    <!-- ng-disabled="zoneMapCtrl.CordinatesOfPoly.length==0" -->\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ZoneRelation/templates/ZoneDetails.html',
    '<div>\n' +
    '    {{\'ZoneDetails\' | translate}}\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'ZoneDetails\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <div class="row  pmd-card pmd-z-depth" style="margin-bottom: 0;">\n' +
    '            <div class="col-md-12 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <div class="col-md-6 col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <h1 class="text-center">\n' +
    '                        <kbd style="background-color: #494b74c4;">\n' +
    '                            {{\'ManufactureLbl\' | translate}}:\n' +
    '                            {{zoneRelationDetailsCtrl.manufacture.code}} -\n' +
    '                            {{zoneRelationDetailsCtrl.manufacture.name}}\n' +
    '                        </kbd>\n' +
    '                    </h1>\n' +
    '                </div>\n' +
    '                <div class="col-md-6 col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <h1>\n' +
    '                        <kbd style="background-color: #494b74c4;">\n' +
    '                            {{\'Zone\' | translate}}:\n' +
    '                            {{zoneRelationDetailsCtrl.zone.zoneCode}} -\n' +
    '                            {{zoneRelationDetailsCtrl.zone.titles[selectedLanguage]}}\n' +
    '                        </kbd>\n' +
    '                    </h1>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="col-md-12 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <div class="form-group col-lg-12">\n' +
    '                    <div>\n' +
    '                        <label for="first-name"><span style="color:red">*</span>\n' +
    '                            {{\'DistributorLbl\' | translate}}</label>\n' +
    '                        <select class="form-control select-with-search pmd-select2-tags" name="distributerId"\n' +
    '                            ng-model="zoneRelationDetailsCtrl.selectedDistributerId" disabled\n' +
    '                            ng-change="zoneRelationDetailsCtrl.addNewZoneRelation()"\n' +
    '                            ng-options="group.distributorId  as group.name for group in zoneRelationDetailsCtrl.distributers">\n' +
    '                        </select>\n' +
    '                        <div>\n' +
    '                            <!-- required validation -->\n' +
    '                            <span class="error"\n' +
    '                                ng-show="newZoneRelationForm.results[distributerId].$error.required && !newZoneRelationForm.results[distributerId].$pristine">\n' +
    '                                {{\'RequiredLbl\' | translate}} </span>\n' +
    '                            <span class="error"\n' +
    '                                ng-show="newZoneRelationForm.results[distributerId].$error.results[distributerId]">\n' +
    '                                {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            \n' +
    '        </div>\n' +
    '\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <h2> {{\'ListOfRetailer\' | translate}} </h2>\n' +
    '                <form class="newZoneRelationForm" name="newZoneRelationForm">\n' +
    '                    <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                        <div>\n' +
    '                            <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield">\n' +
    '                                <input required type="text" class="mat-input form-control" name="searchInputRetailer"\n' +
    '                                    placeholder="   search by Retailer Name   "\n' +
    '                                    ng-model="zoneRelationDetailsCtrl.searchRetailer" ng-minlength="3"\n' +
    '                                    ng-maxlength="255" id="searchInput">\n' +
    '                            </div>\n' +
    '                            <div ng-messages="newZoneRelationForm.searchInputRetailer.$error">\n' +
    '                                <div class="error"\n' +
    '                                    ng-show="(newZoneRelationForm.searchInputRetailer.$error.minlength || newZoneRelationForm.searchInputRetailer.$error.maxlength) && !newZoneRelationForm.searchInputRetailer.$error.required">\n' +
    '                                    {{\'NameLengthError3\' | translate}}</div>\n' +
    '                            </div>\n' +
    '                            <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield-verse">\n' +
    '                                <button id="searchBtb" ng-disabled="newZoneRelationForm.$invalid"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                    ng-click="zoneRelationDetailsCtrl.filterRetailer(zoneRelationDetailsCtrl.searchRetailer)">\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                        width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                        class="kt-svg-icon">\n' +
    '                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                            <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                            <path\n' +
    '                                                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                            <path\n' +
    '                                                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                                        </g>\n' +
    '                                    </svg>\n' +
    '                                    {{\'search\' | translate}}\n' +
    '                                </button>\n' +
    '                            </div>\n' +
    '                            <div class="col-sm-3 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtb"\n' +
    '                                    ng-click="zoneRelationDetailsCtrl.filterRetailer()">{{\'All\' | translate}}</button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '                <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <div class="table-responsive">\n' +
    '\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            {{\'Total\' | translate}}: {{zoneRelationDetailsCtrl.retailerTotalCount}}\n' +
    '                        </div>\n' +
    '                        <table class="table pmd-table table-hover">\n' +
    '                            <thead>\n' +
    '                                <tr>\n' +
    '                                    <th>{{\'image\' | translate}}</th>\n' +
    '                                    <th>{{\'RetailerLbl\' | translate}}</th>\n' +
    '                                    <th>{{\'GovernateLbl\' | translate}}</th>\n' +
    '                                    <th>{{\'CityLbl\' | translate}}</th>\n' +
    '                                </tr>\n' +
    '                            </thead>\n' +
    '                            <tbody>\n' +
    '                                <tr ng-repeat="Retailer in zoneRelationDetailsCtrl.retailers.entities"\n' +
    '                                    ng-class="{selected: Retailer.isChecked}">\n' +
    '                                    <td>\n' +
    '                                        <img style="width: 57px;"\n' +
    '                                            data-ng-src="{{zoneRelationDetailsCtrl.appCONSTANTS.Image_URL_ACTOR}}{{Retailer.companyLogo}}" />\n' +
    '                                    </td>\n' +
    '                                    <td style="width:  40% !important;">{{Retailer.code}} - {{Retailer.name }}</td>\n' +
    '                                    <td style="width:  30% !important;">{{Retailer.city.titles[selectedLanguage]}}\n' +
    '                                    </td>\n' +
    '                                    <td>{{Retailer.governrate.titles[selectedLanguage]}}</td>\n' +
    '                                </tr>\n' +
    '                            </tbody>\n' +
    '                        </table>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '                        total="zoneRelationDetailsCtrl.retailerTotalCount"\n' +
    '                        paging-action="zoneRelationDetailsCtrl.changeRetailerPage(page)" flex="nogrow"\n' +
    '                        show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="col-md-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <h2> {{\'ListOfProduct\' | translate}} </h2>\n' +
    '\n' +
    '                <form class="form-horizontal" name="newZoneProductForm">\n' +
    '                    <div class="md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                        <div>\n' +
    '                            <div class="col-xs-6 form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield">\n' +
    '\n' +
    '                                <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '                                    placeholder="  search by Product Name  "\n' +
    '                                    ng-model="zoneRelationDetailsCtrl.searchText" ng-minlength="3" ng-maxlength="255"\n' +
    '                                    id="searchInput">\n' +
    '                            </div>\n' +
    '                            <div ng-messages="newZoneProductForm.searchInput.$error">\n' +
    '                                <div class="error"\n' +
    '                                    ng-show="(newZoneProductForm.searchInput.$error.minlength || newZoneProductForm.searchInput.$error.maxlength) && !newZoneProductForm.searchInput.$error.required">\n' +
    '                                    {{\'NameLengthError3\' | translate}}</div>\n' +
    '                            </div>\n' +
    '                            <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield-verse">\n' +
    '                                <button id="searchBtb" ng-disabled="newZoneProductForm.$invalid"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                    ng-click="zoneRelationDetailsCtrl.filterProduct(zoneRelationDetailsCtrl.searchText)">\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                        width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                        class="kt-svg-icon">\n' +
    '                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                            <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                            <path\n' +
    '                                                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                            <path\n' +
    '                                                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                                        </g>\n' +
    '                                    </svg>\n' +
    '                                    {{\'search\' | translate}}</button>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="col-sm-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <button class="btn pmd-ripple-effect btn-primary" type="button" id="searchBtb"\n' +
    '                                    ng-click="zoneRelationDetailsCtrl.filterProduct()">{{\'All\' | translate}}</button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '                <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <div class="table-responsive">\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            {{\'Total\' | translate}}: {{zoneRelationDetailsCtrl.productTotalCount}}\n' +
    '                        </div>\n' +
    '                        <table class="table pmd-table table-hover">\n' +
    '                            <thead>\n' +
    '                                <tr>\n' +
    '                                    <th>{{\'image\' | translate}}</th>\n' +
    '                                    <th>{{\'ProductDescLbl\' | translate}}</th>\n' +
    '                                    <th>{{\'Category\' | translate}}</th>\n' +
    '                                </tr>\n' +
    '                            </thead>\n' +
    '                            <tbody>\n' +
    '                                <tr ng-repeat="product in zoneRelationDetailsCtrl.products.entities"\n' +
    '                                    ng-class="{selected: product.isChecked}">\n' +
    '\n' +
    '                                    <td>\n' +
    '                                        <img style="width: 34px;"\n' +
    '                                            data-ng-src="{{zoneRelationDetailsCtrl.appCONSTANTS.Image_URL_ORDER}}{{product.image}}" />\n' +
    '                                    </td>\n' +
    '                                    <td style="width:  40% !important;">{{product.code}} -\n' +
    '                                        {{product.description[selectedLanguage] | limitTo: 15}}</td>\n' +
    '                                    <td style="width:  30% !important;">\n' +
    '                                        {{product.category.titles[selectedLanguage]}}</td>\n' +
    '                                </tr>\n' +
    '                            </tbody>\n' +
    '                        </table>\n' +
    '                    </div>\n' +
    '                    <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '                        total="zoneRelationDetailsCtrl.productTotalCount"\n' +
    '                        paging-action="zoneRelationDetailsCtrl.changeProductPage(page)" flex="nogrow"\n' +
    '                        show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div>\n' +
    '    <a onclick="goBack()">\n' +
    '        <div class="col-xs-12">\n' +
    '            <button type="button"\n' +
    '            class="btn btn-primary" \n' +
    '            style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '            {{\'goBack\' | translate}}\n' +
    '            </button>\n' +
    '        </div>\n' +
    '        </a>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ZoneRelation/templates/editZone.html',
    '<div>\n' +
    '    {{\'editZoneDetails\' | translate}}\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'ZoneDetails\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <div class="row  pmd-card pmd-z-depth" style="margin-bottom: 0;">\n' +
    '            <div class="col-md-12 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <div class="col-md-6 col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed ">\n' +
    '                    <h1 class="text-center">\n' +
    '                        <kbd style="background-color: #494b74c4;">\n' +
    '                            {{\'ManufactureLbl\' | translate}}:\n' +
    '                            {{editZoneRelationCtrl.manufacture.code}} -\n' +
    '                            {{editZoneRelationCtrl.manufacture.name}}\n' +
    '                        </kbd>\n' +
    '                    </h1>\n' +
    '                </div>\n' +
    '                <div class="col-md-6 col-sm-6 form-group pmd-textfield pmd-textfield-floating-label-completed ">\n' +
    '                    <h1>\n' +
    '                        <kbd style="background-color: #494b74c4;">\n' +
    '                            {{\'Zone\' | translate}}:\n' +
    '                            {{editZoneRelationCtrl.zone.zoneCode}} -\n' +
    '                            {{editZoneRelationCtrl.zone.titles[selectedLanguage]}}\n' +
    '                        </kbd>\n' +
    '                    </h1>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="col-md-12 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <div class="form-group col-lg-12">\n' +
    '                    <div>\n' +
    '                        <label for="first-name"><span style="color:red">*</span>\n' +
    '                            {{\'DistributorLbl\' | translate}}</label>\n' +
    '                        <select class="form-control select-with-search pmd-select2-tags" name="distributerId"\n' +
    '                            ng-model="editZoneRelationCtrl.selectedDistributerId"\n' +
    '                            ng-change="editZoneRelationCtrl.addNewZoneRelation()"\n' +
    '                            ng-options="group.distributorId  as group.name for group in editZoneRelationCtrl.distributers">\n' +
    '                        </select>\n' +
    '                        <div>\n' +
    '                            <!-- required validation -->\n' +
    '                            <span class="error"\n' +
    '                                ng-show="newZoneRelationForm.results[distributerId].$error.required && !newZoneRelationForm.results[distributerId].$pristine">\n' +
    '                                {{\'RequiredLbl\' | translate}} </span>\n' +
    '                            <span class="error"\n' +
    '                                ng-show="newZoneRelationForm.results[distributerId].$error.results[distributerId]">\n' +
    '                                {{\' NotvalidLbl\' | translate}}</span>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="row ">\n' +
    '            <div class="col-md-6 form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                <h2> {{\'ListOfRetailer\' | translate}} </h2>\n' +
    '                <form class="newZoneRelationForm " name="newZoneRelationForm">\n' +
    '                    <div class=" md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                        <div> \n' +
    '                            <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield">\n' +
    '                                <input required class="form-control my-0 py-1 amber-border" type="text"\n' +
    '                                    aria-label="Search" name="searchInput" placeholder="   search by Retailer Name  "\n' +
    '                                    ng-model="editZoneRelationCtrl.searchRetailer" ng-minlength="3" ng-maxlength="255"\n' +
    '                                    id="searchInput">\n' +
    '                            </div>\n' +
    '                            <div ng-messages="newZoneRelationForm.searchInput.$error">\n' +
    '                                <div class="error"\n' +
    '                                    ng-show="(newZoneRelationForm.searchInput.$error.minlength || newZoneRelationForm.searchInput.$error.maxlength) && !newZoneRelationForm.searchInput.$error.required">\n' +
    '                                    {{\'NameLengthError3\' | translate}}</div>\n' +
    '                            </div>\n' +
    '                            <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield-verse">\n' +
    '                                <button id="searchBtb" ng-disabled="newZoneRelationForm.$invalid"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                    ng-click="editZoneRelationCtrl.filterRetailer(editZoneRelationCtrl.searchRetailer)">\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                        width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                        class="kt-svg-icon">\n' +
    '                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                            <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                            <path\n' +
    '                                                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                            <path\n' +
    '                                                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                                        </g>\n' +
    '                                    </svg>\n' +
    '                                    {{\'search\' | translate}}\n' +
    '                                </button>\n' +
    '                            </div>\n' +
    '                            <div class="col-sm-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <button class="btn pmd-ripple-effect btn-primary " type="button" id="searchBtb"\n' +
    '                                    ng-click="editZoneRelationCtrl.filterRetailer()">{{\'All\' | translate}}</button>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '                <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <div class="table-responsive">\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            {{\'Total\' | translate}}: {{editZoneRelationCtrl.retailerTotalCount}}\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            <input type="radio" ng-change="editZoneRelationCtrl.filterRetailer(\'\',\'\',true)"\n' +
    '                                ng-model="editZoneRelationCtrl.isChecked" ng-value="true"> {{\'Selcted\' | translate}}\n' +
    '                            <input type="radio" ng-change="editZoneRelationCtrl.filterRetailer(\'\',\'\',false)"\n' +
    '                                ng-model="editZoneRelationCtrl.isChecked" ng-value="false"> {{\'UnSelcted\' | translate}}\n' +
    '                        </div>\n' +
    '                        <table class="table pmd-table table-hover">\n' +
    '                            <thead>\n' +
    '                                <tr>\n' +
    '                                    <th style="width: 10px">\n' +
    '                                    </th>\n' +
    '                                    <th>{{\'image\' | translate}}</th>\n' +
    '                                    <th>{{\'RetailerLbl\' | translate}}</th>\n' +
    '                                    <th>{{\'GovernateLbl\' | translate}}</th>\n' +
    '                                    <th>{{\'CityLbl\' | translate}}</th>\n' +
    '                                </tr>\n' +
    '                            </thead>\n' +
    '                            <tbody>\n' +
    '                                <tr ng-repeat="Retailer in editZoneRelationCtrl.retailers.entities"\n' +
    '                                    ng-class="{selected: Retailer.isChecked}">\n' +
    '                                    <td><input type="checkbox" ng-model="Retailer.isChecked"\n' +
    '                                            ng-change="editZoneRelationCtrl.selectRetailer(Retailer)"></td>\n' +
    '                                    <td>\n' +
    '                                        <img style="width: 57px;"\n' +
    '                                            data-ng-src="{{editZoneRelationCtrl.appCONSTANTS.Image_URL_ACTOR}}{{Retailer.companyLogo}}" />\n' +
    '                                    </td>\n' +
    '                                    <td style="width:  40% !important;">{{Retailer.code}} - {{Retailer.name }}</td>\n' +
    '                                    <td style="width: 30% !important;">{{Retailer.city.titles[selectedLanguage]}}</td>\n' +
    '                                    <td>{{Retailer.governrate.titles[selectedLanguage]}}</td>\n' +
    '                                </tr>\n' +
    '                            </tbody>\n' +
    '                        </table>\n' +
    '                    </div>\n' +
    '                    <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '                        total="editZoneRelationCtrl.retailerTotalCount"\n' +
    '                        paging-action="editZoneRelationCtrl.changeRetailerPage(page)" flex="nogrow"\n' +
    '                        show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                </form>\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="col-md-6 form-group pmd-textfield pmd-textfield-floating-label-completed ">\n' +
    '                <h2>\n' +
    '                    {{\'ListOfProduct\' | translate}}\n' +
    '                </h2>\n' +
    '                <form class="form-horizontal" name="ZoneProductForm">\n' +
    '                    <div class="md-card pmd-z-depth pmd-card-custom-view">\n' +
    '                        <div>\n' +
    '                            <div class="col-xs-6  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield">\n' +
    '                                <input required type="text" class="form-control" name="searchInput"\n' +
    '                                    placeholder="  search by Product Name   " ng-model="editZoneRelationCtrl.searchText"\n' +
    '                                    id="searchInput" ng-minlength="3" ng-maxlength="255">\n' +
    '                            </div>\n' +
    '                            <div ng-messages="ZoneProductForm.searchInput.$error">\n' +
    '                                <!-- \n' +
    '                                  <div class="error"\n' +
    '                                    ng-show="ZoneProductForm.searchInput.$error.required && !ZoneProductForm.searchInput.$pristine">\n' +
    '                                    {{\'requiredErr\' | translate}}</div> -->\n' +
    '                                <div class="error"\n' +
    '                                    ng-show="(ZoneProductForm.searchInput.$error.minlength || ZoneProductForm.searchInput.$error.maxlength) && !ZoneProductForm.searchInput.$error.required">\n' +
    '                                    {{\'NameLengthError255\' | translate}}</div>\n' +
    '                            </div>\n' +
    '                            <div class="col-xs-3  form-group pmd-textfield pmd-textfield-floating-label-completed"\n' +
    '                                id="pmd-textfield-verse">\n' +
    '                                <button id="searchBtb" ng-disabled="ZoneProductForm.$invalid"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '                                    ng-click="editZoneRelationCtrl.filterProduct(editZoneRelationCtrl.searchText)">\n' +
    '                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '                                        width="15px" height="14px" viewBox="0 0 24 24" version="1.1"\n' +
    '                                        class="kt-svg-icon">\n' +
    '                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                            <rect id="bound" x="0" y="0" width="15px" height="15px" />\n' +
    '                                            <path\n' +
    '                                                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"\n' +
    '                                                id="Path-2" fill="#383a53" fill-rule="nonzero" opacity="0.3" />\n' +
    '                                            <path\n' +
    '                                                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"\n' +
    '                                                id="Path" fill="#383a53" fill-rule="nonzero" />\n' +
    '                                        </g>\n' +
    '                                    </svg>\n' +
    '                                    {{\'search\' | translate}}</button>\n' +
    '                            </div>\n' +
    '                            <div class="col-sm-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                <button class="btn pmd-ripple-effect btn-primary" type="button" id="searchBtb"\n' +
    '                                    ng-click="editZoneRelationCtrl.filterProduct()">{{\'All\' | translate}}</button>\n' +
    '                            </div>\n' +
    '\n' +
    '                        </div>\n' +
    '\n' +
    '\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '                <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '                    <div class="table-responsive">\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            {{\'Total\' | translate}}: {{editZoneRelationCtrl.productTotalCount}}\n' +
    '                        </div>\n' +
    '                        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                            <input type="radio" ng-change="editZoneRelationCtrl.filterProduct(\'\',\'\',true)"\n' +
    '                                ng-model="editZoneRelationCtrl.isChecked" ng-value="true"> {{\'Selcted\' | translate}}\n' +
    '                            <input type="radio" ng-change="editZoneRelationCtrl.filterProduct(\'\',\'\',false)"\n' +
    '                                ng-model="editZoneRelationCtrl.isChecked" ng-value="false">\n' +
    '                            {{\'UnSelcted\' | translate}}\n' +
    '                        </div>\n' +
    '                        <table class="table pmd-table table-hover">\n' +
    '                            <thead>\n' +
    '                                <tr>\n' +
    '                                    <th> </th>\n' +
    '                                    <th>{{\'image\' | translate}}</th>\n' +
    '                                    <th>{{\'ProductDescLbl\' | translate}}</th>\n' +
    '                                    <th>{{\'Category\' | translate}}</th>\n' +
    '                                </tr>\n' +
    '                            </thead>\n' +
    '                            <tbody>\n' +
    '                                <tr ng-repeat="product in editZoneRelationCtrl.products.entities"\n' +
    '                                    ng-class="{selected: product.isChecked}">\n' +
    '\n' +
    '                                    <td><input type="checkbox" ng-model="product.isChecked"\n' +
    '                                            ng-change="editZoneRelationCtrl.selectProduct(product)"></td>\n' +
    '                                    <td>\n' +
    '                                        <img style="width: 34px;"\n' +
    '                                            data-ng-src="{{editZoneRelationCtrl.appCONSTANTS.Image_URL_ORDER}}{{product.image}}" />\n' +
    '                                    </td>\n' +
    '                                    <td style="width:  40% !important;">{{product.code}} -\n' +
    '                                        {{product.description[selectedLanguage] | limitTo: 15}}</td>\n' +
    '                                    <td style="width: 30% !important;">{{product.category.titles[selectedLanguage]}}\n' +
    '                                    </td>\n' +
    '                                </tr>\n' +
    '                            </tbody>\n' +
    '                        </table>\n' +
    '                    </div>\n' +
    '                    <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '                        total="editZoneRelationCtrl.productTotalCount"\n' +
    '                        paging-action="editZoneRelationCtrl.changeProductPage(page)" flex="nogrow" show-prev-next="true"\n' +
    '                        show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div>\n' +
    '            <a onclick="goBack()">\n' +
    '                <div class="col-xs-12">\n' +
    '                    <button type="button"\n' +
    '                    class="btn btn-primary" \n' +
    '                    style="height: 36px;border: #494b74 solid 1px;border-radius: 6px;">\n' +
    '                    {{\'goBack\' | translate}}\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                </a>\n' +
    '        </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ZoneRelation/templates/new.html',
    '<div>\n' +
    '        {{\'NewZoneDetails\' | translate}}\n' +
    '</div>\n' +
    '<div class="container">\n' +
    '    <!-- header -->\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'ZoneRelationLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-12">\n' +
    '            <div id="vm-container">\n' +
    '                <!-- ZoneRelation form step -->\n' +
    '                <div id="vm-step-container">\n' +
    '                    <ul class="nav nav-pills nav-justified">\n' +
    '                        <li ng-repeat="step in newZoneRelationCtrl.steps"\n' +
    '                            ng-class="{\'active\':step.step == newZoneRelationCtrl.currentStep}">\n' +
    '                            <a> {{step.step | translate }}. {{step.name | translate}}</a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '                <!-- function -- get pages  -->\n' +
    '                <div id="vm-content-container">\n' +
    '                    <ng-include src="newZoneRelationCtrl.getStepTemplate()"></ng-include>\n' +
    '                </div>\n' +
    '                <!-- previous button  -->\n' +
    '                <div id="vm-navigation-container" class="col-lg-12">\n' +
    '                    <div class="pull-right">\n' +
    '                        <span class="btn-group">\n' +
    '                                <button class="btn btn-primary" name="next" type="button"\n' +
    '                                onclick="goBack()"> {{\'goBack\' | translate}}</button>\n' +
    '                            <button ng-disabled="newZoneRelationCtrl.currentStep <= 1" class="btn btn-default"\n' +
    '                                name="previous" type="button"\n' +
    '                                ng-click="newZoneRelationCtrl.gotoStep(newZoneRelationCtrl.currentStep - 1)"><i\n' +
    '                                    class="fa fa-arrow-left"></i> {{\'PreviousStep\' | translate}}\n' +
    '                            </button>\n' +
    '                            <!-- next button  -->\n' +
    '                            <button ng-disabled="newZoneRelationCtrl.currentStep >=newZoneRelationCtrl.steps.length"\n' +
    '                                class="btn btn-primary" name="next" type="button"\n' +
    '                                ng-click="newZoneRelationCtrl.gotoStep(newZoneRelationCtrl.currentStep + 1)">{{\'Nextstep\' | translate}}\n' +
    '                                <i class="fa fa-arrow-right"></i>\n' +
    '                            </button>\n' +
    '                        </span>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ZoneRelation/templates/step1.html',
    '<div class="modal-content container">\n' +
    '  <div class="modal-body">\n' +
    '    <form class="newZoneRelationForm" name="newZoneRelationForm">\n' +
    '      <div>\n' +
    '        <div class="tab-content table-responsive">\n' +
    '          <h2> <label for="readonly">{{\'DistributorLbl\' | translate}} </label></h2>\n' +
    '\n' +
    '          <div class="form-group col-lg-6">\n' +
    '            <div>\n' +
    '              <label for="first-name"><span style="color:red">*</span> {{\'DistributorLbl\' | translate}}</label>\n' +
    '              <select class="form-control select-with-search pmd-select2-tags" name="distributerId"\n' +
    '                ng-model="newZoneRelationCtrl.selectedDistributerId"\n' +
    '                ng-options="group.distributorId  as group.name for group in newZoneRelationCtrl.distributers">\n' +
    '              </select>\n' +
    '              <div>\n' +
    '                <!-- required validation -->\n' +
    '                <span class="error"\n' +
    '                  ng-show="newZoneRelationForm.results[distributerId].$error.required && !newZoneRelationForm.results[distributerId].$pristine">\n' +
    '                  {{\'RequiredLbl\' | translate}} </span>\n' +
    '                <span class="error" ng-show="newZoneRelationForm.results[distributerId].$error.results[distributerId]">\n' +
    '                  {{\' NotvalidLbl\' | translate}}</span>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- save button  -->\n' +
    '        <button ng-disabled="newZoneRelationCtrl.selectedDistributerId <= 0" class="btn btn-success"\n' +
    '          name="next" type="button" ng-click="newZoneRelationCtrl.addNewZoneRelation()">\n' +
    '          <i class="fa fa-floppy-o"></i>{{\'Save\' | translate}}</button>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '  </div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ZoneRelation/templates/step2.html',
    '<div class="modal-content container">\n' +
    '  <h2> {{\'ListOfRetailer\' | translate}} </h2>\n' +
    '\n' +
    '  <div class="modal-body">\n' +
    '    <form class="newZoneRelationForm" name="newZoneRelationForm">\n' +
    '      <div class="row">\n' +
    '        <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '          <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '            placeholder="search by Retailer Name" ng-model="newZoneRelationCtrl.searchText" ng-minlength="3"\n' +
    '            ng-maxlength="255">\n' +
    '          <div ng-messages="newZoneRelationForm.searchInput.$error">\n' +
    '            <!-- \n' +
    '            <div class="error"\n' +
    '              ng-show="newZoneRelationForm.searchInput.$error.required && !newZoneRelationForm.searchInput.$pristine">\n' +
    '              {{\'requiredErr\' | translate}}</div> -->\n' +
    '            <div class="error"\n' +
    '              ng-show="(newZoneRelationForm.searchInput.$error.minlength || newZoneRelationForm.searchInput.$error.maxlength) && !newZoneRelationForm.searchInput.$error.required">\n' +
    '              {{\'NameLengthError3\' | translate}}</div>\n' +
    '          </div>\n' +
    '          <div class="col-md-5  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '              ng-disabled="newZoneRelationForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '              ng-click="newZoneRelationCtrl.filterRetailer(newZoneRelationCtrl.searchText)">{{\'search\' | translate}}</button>\n' +
    '          </div>\n' +
    '\n' +
    '          <div class="col-md-5  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '              ng-click="newZoneRelationCtrl.filterRetailer()">{{\'All\' | translate}}</button>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        \n' +
    '        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '          <input type="radio" ng-change="newZoneRelationCtrl.filterRetailer(\'\',\'\',true)"\n' +
    '              ng-model="newZoneRelationCtrl.isChecked" ng-value="true"> {{\'Selcted\' | translate}}\n' +
    '          <input type="radio" ng-change="newZoneRelationCtrl.filterRetailer(\'\',\'\',false)"\n' +
    '              ng-model="newZoneRelationCtrl.isChecked" ng-value="false"> {{\'UnSelcted\' | translate}}\n' +
    '      </div>\n' +
    '      </div>\n' +
    '      <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '        <div class="table-responsive">\n' +
    '        {{\'Total\' | translate}}: {{newZoneRelationCtrl.retailerTotalCount}}\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '          <thead>\n' +
    '            <tr>\n' +
    '              <th>\n' +
    '                <!-- <input type="checkbox" ng-model="newZoneRelationCtrl.retailers.allRetailerSelected"\n' +
    '                  ng-change="newZoneRelationCtrl.selectAllRetailer()"> -->\n' +
    '              </th>\n' +
    '              <th>{{\'RetailerLbl\' | translate}}</th>\n' +
    '              <th>{{\'GovernateLbl\' | translate}}</th>\n' +
    '              <th>{{\'CityLbl\' | translate}}</th>\n' +
    '            </tr>\n' +
    '          </thead>\n' +
    '          <tbody>\n' +
    '            <tr ng-repeat="Retailer in newZoneRelationCtrl.retailers.entities"\n' +
    '              ng-class="{selected: Retailer.isChecked}">\n' +
    '              <td><input type="checkbox" ng-model="Retailer.isChecked"\n' +
    '                  ng-change="newZoneRelationCtrl.selectRetailer(Retailer)"></td>\n' +
    '              <td style="width:  40% !important;">{{Retailer.code}} - {{Retailer.name}}</td>\n' +
    '              <td style="width:  30% !important;">{{Retailer.city.titles[selectedLanguage]}}</td>\n' +
    '              <td style="width:  30% !important;">{{Retailer.governrate.titles[selectedLanguage]}}</td>\n' +
    '            </tr>\n' +
    '          </tbody>\n' +
    '        </table>\n' +
    '      </div>\n' +
    '        <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '          total="newZoneRelationCtrl.retailerTotalCount" paging-action="newZoneRelationCtrl.changeRetailerPage(page)"\n' +
    '          flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <!-- <pre>{{newZoneRelationCtrl.selectedRetailer}}</pre> -->\n' +
    '    </form>\n' +
    '  </div>\n' +
    '\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ZoneRelation/templates/step3.html',
    '<div class="modal-content container">\n' +
    '  <h2> {{\'ListOfProduct\' | translate}} </h2>\n' +
    '\n' +
    '  <div class="modal-body">\n' +
    '    <form class="form-horizontal" name="newZoneRelationForm">\n' +
    '      <div class="row">\n' +
    '        <div class="col-md-3  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '\n' +
    '          <input required type="text" class="mat-input form-control" name="searchInput"\n' +
    '            placeholder="search by Product Name" ng-model="newZoneRelationCtrl.searchText" ng-minlength="3"\n' +
    '            ng-maxlength="255">\n' +
    '          <div ng-messages="newZoneRelationForm.searchInput.$error">\n' +
    '            <!-- \n' +
    '                <div class="error"\n' +
    '                  ng-show="newZoneRelationForm.searchInput.$error.required && !newZoneRelationForm.searchInput.$pristine">\n' +
    '                  {{\'requiredErr\' | translate}}</div> -->\n' +
    '            <div class="error"\n' +
    '              ng-show="(newZoneRelationForm.searchInput.$error.minlength || newZoneRelationForm.searchInput.$error.maxlength) && !newZoneRelationForm.searchInput.$error.required">\n' +
    '              {{\'NameLengthError3\' | translate}}</div>\n' +
    '          </div>\n' +
    '          <div class="col-md-5  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '              ng-disabled="newZoneRelationForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '              ng-click="newZoneRelationCtrl.filterProduct(newZoneRelationCtrl.searchText)">{{\'search\' | translate}}</button>\n' +
    '          </div>\n' +
    '\n' +
    '          <div class="col-md-5  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '              ng-click="newZoneRelationCtrl.filterProduct()">{{\'All\' | translate}}</button>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '          <input type="radio" ng-change="newZoneRelationCtrl.filterProduct(\'\',\'\',true)"\n' +
    '            ng-model="newZoneRelationCtrl.isChecked" ng-value="true"> {{\'Selcted\' | translate}}\n' +
    '          <input type="radio" ng-change="newZoneRelationCtrl.filterProduct(\'\',\'\',false)"\n' +
    '            ng-model="newZoneRelationCtrl.isChecked" ng-value="false">\n' +
    '          {{\'UnSelcted\' | translate}}\n' +
    '\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="pmd-card pmd-z-depth pmd-card-custom-view">\n' +
    '        <div class="table-responsive">\n' +
    '        {{\'Total\' | translate}}: {{newZoneRelationCtrl.productTotalCount}}\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '          <thead>\n' +
    '            <tr>\n' +
    '              <th> </th>\n' +
    '              <th>{{\'image\' | translate}}</th>\n' +
    '\n' +
    '              <th>{{\'ProductDescLbl\' | translate}}</th>\n' +
    '              <th>{{\'Category\' | translate}}</th>\n' +
    '            </tr>\n' +
    '          </thead>\n' +
    '          <tbody>\n' +
    '            <tr ng-repeat="product in newZoneRelationCtrl.products.entities" ng-class="{selected: product.isChecked}">\n' +
    '\n' +
    '              <td><input type="checkbox" ng-model="product.isChecked"\n' +
    '                  ng-change="newZoneRelationCtrl.selectProduct(product)"></td>\n' +
    '              <td>\n' +
    '                <img style="width: 70px;height: 70px;"\n' +
    '                  data-ng-src="{{newZoneRelationCtrl.appCONSTANTS.Image_URL_ORDER}}{{product.image}}" />\n' +
    '              </td>\n' +
    '              <td style="width:  40% !important;">{{product.code}} - {{product.description[selectedLanguage]| limitTo: 20}}</td>\n' +
    '              <td style="width:  30% !important;">{{product.category.titles[selectedLanguage]}}</td>\n' +
    '            </tr>\n' +
    '          </tbody>\n' +
    '        </table>\n' +
    '      </div>\n' +
    '\n' +
    '        <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '          total="newZoneRelationCtrl.productTotalCount" paging-action="newZoneRelationCtrl.changeProductPage(page,\'\')"\n' +
    '          flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '      <!-- <pre>  {{newZoneRelationCtrl.selectedProduct}}</pre> -->\n' +
    '  </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/dashboard/templates/dashboard.html',
    '<style>\n' +
    '    .my-custom-stars .button .material-icons {\n' +
    '        font-size: 20px;\n' +
    '    }\n' +
    '\n' +
    '    .my-custom-stars .star-button.star-on .material-icons {\n' +
    '        color: #003399;\n' +
    '    }\n' +
    '\n' +
    '    .my-custom-stars .star-button.star-off .material-icons {\n' +
    '        color: #99ccff;\n' +
    '    }\n' +
    '\n' +
    '    .my-custom-stars .button .material-icons a:focus,\n' +
    '    a:hover {\n' +
    '        text-decoration: none;\n' +
    '    }\n' +
    '</style>\n' +
    '<script type="text/javascript">\n' +
    '    $(function () {\n' +
    '        $(\'#fromdate\').datetimepicker(\n' +
    '            {\n' +
    '                format: \'DD/MM/YYYY\',\n' +
    '                // minDate: new Date()\n' +
    '            }\n' +
    '        );\n' +
    '        $(\'#todate\').datetimepicker(\n' +
    '            {\n' +
    '                format: \'DD/MM/YYYY\',\n' +
    '                // minDate: new Date(),\n' +
    '                useCurrent: false\n' +
    '            }\n' +
    '        );\n' +
    '        $("#fromdate").on("dp.change", function (e) {\n' +
    '            $(\'#todate\').data("DateTimePicker").minDate(e.date);\n' +
    '        });\n' +
    '        // Start date picke on chagne event [select maxmimum date for start date datepicker]\n' +
    '        $("#todate").on("dp.change", function (e) {\n' +
    '            $(\'#fromdate\').data("DateTimePicker").maxDate(e.date);\n' +
    '        });\n' +
    '\n' +
    '        \n' +
    '\n' +
    '        \n' +
    '        $(\'#fromdateSurvey\').datetimepicker(\n' +
    '            {\n' +
    '                format: \'DD/MM/YYYY\',\n' +
    '                // minDate: new Date()\n' +
    '            }\n' +
    '        );\n' +
    '        $(\'#todateSurvey\').datetimepicker(\n' +
    '            {\n' +
    '                format: \'DD/MM/YYYY\',\n' +
    '                // minDate: new Date(),\n' +
    '                useCurrent: false\n' +
    '            }\n' +
    '        );\n' +
    '        $("#fromdateSurvey").on("dp.change", function (e) {\n' +
    '            $(\'#todateSurvey\').data("DateTimePicker").minDate(e.date);\n' +
    '        });\n' +
    '        // Start date picke on chagne event [select maxmimum date for start date datepicker]\n' +
    '        $("#todateSurvey").on("dp.change", function (e) {\n' +
    '            $(\'#fromdateSurvey\').data("DateTimePicker").maxDate(e.date);\n' +
    '        });\n' +
    '    });\n' +
    '\n' +
    '</script>\n' +
    '<div class="container-fluid" ng-init="showMoreFilter = false">\n' +
    '        <div class="row" id="card-masonry">\n' +
    '            <!-- Today\'s Site Activity -->\n' +
    '            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\n' +
    '                <div class="pmd-card pmd-z-depth">      \n' +
    '                    <div class="pmd-card-title">\n' +
    '                        <div class="media-left"> \n' +
    '                            <div style="cursor: pointer;  background-color: #ccc;">\n' +
    '                                <h1 style="padding: 4px" ng-init="showTicket = false" ng-click="showTicket=!showTicket">\n' +
    '                                    {{\'Tickets\' | translate}}\n' +
    '                                </h1>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="pmd-card-body" ng-show="showTicket" ng-init="showMoreFilter = false">\n' +
    '                            <div class="row">\n' +
    '                        \n' +
    '                                <div style="direction: ltr;" class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label>{{\'fromLbl\' | translate}}</label>\n' +
    '                                    <input type="text" id="fromdate" class="form-control" required />\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div style="direction: ltr;" class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label>{{\'toLbl\' | translate}}</label>\n' +
    '                                    <input type="text" id="todate" class="form-control" required />\n' +
    '                                </div>\n' +
    '                                <!-- <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" <label\n' +
    '                                    for="first-name">{{\'StatusLbl\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedStatus">\n' +
    '                                        <option value="">{{\'AllLbl\' | translate}}</option>\n' +
    '                                        <option value="Pending">{{\'Pending\'|translate}}</option>\n' +
    '                                        <option value="Assigned">{{\'Assigned\'|translate}}</option>\n' +
    '                                        <option value="InProgress">{{\'InProgress\'|translate}}</option>\n' +
    '                                        <option value="Closed">{{\'Closed\'|translate}}</option>\n' +
    '                                        <option value="Rejected">{{\'Rejected\'|translate}}</option>\n' +
    '                                    </select>\n' +
    '                                </div> -->\n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{\'branchManager\' | translate}}</label>\n' +
    '                            \n' +
    '                                        <select required class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedBranchManager"\n' +
    '                                            ng-options="a as a.userName for a in dashboardCtrl.BranchManagers"></select>\n' +
    '                                    </div>\n' +
    '                            \n' +
    '                                    <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{\'Tech\' | translate}}</label>\n' +
    '                            \n' +
    '                                        <select required class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedTechnician" ng-options="a as a.userName for a in dashboardCtrl.Technicians"></select>\n' +
    '                                    </div>\n' +
    '                            </div>\n' +
    '                            <div class="row" ng-show="showMoreFilter">\n' +
    '                                <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" <label\n' +
    '                                    for="first-name">{{\'Country\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.countryChange()" ng-model="dashboardCtrl.selectedCountry"\n' +
    '                                        ng-options="group as group.titleDictionary[selectedLanguage] for group in dashboardCtrl.counties">\n' +
    '                                    </select>\n' +
    '                                </div>\n' +
    '                                <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" <label\n' +
    '                                    for="first-name">{{\'Governrate\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.GovernrateChange()" ng-model="dashboardCtrl.selectedGovernrate"\n' +
    '                                        ng-options="group as group.titleDictionary[selectedLanguage] for group in dashboardCtrl.Governrates">\n' +
    '                                    </select>\n' +
    '                                </div>\n' +
    '                                <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" <label\n' +
    '                                    for="first-name">{{\'City\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.cityChange()" ng-model="dashboardCtrl.selectedCity"\n' +
    '                                        ng-options="group as group.titleDictionary[selectedLanguage] for group in dashboardCtrl.cities">\n' +
    '                                    </select>\n' +
    '                                </div>\n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'Area\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.areaChange()" ng-model="dashboardCtrl.selectedArea"\n' +
    '                                        ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.areaList"></select>\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'Branch\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedBranch" ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.branchList"></select>\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'Department\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.departmentChange()" ng-model="dashboardCtrl.selectedDepartment"\n' +
    '                                        ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.departments"></select>\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'CategoryLbl\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedCategory" ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.categories"></select>\n' +
    '                                </div>\n' +
    '                                \n' +
    '                            </div>\n' +
    '                            <div class="row" style="padding-bottom: 5px;">\n' +
    '                                <div class="col-md-2 ">\n' +
    '                                    <button ng-click="dashboardCtrl.applyFilter()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'filterBtn\' | translate}}</button>\n' +
    '                                </div>\n' +
    '                                <span ng-show="!showMoreFilter" ng-click="showMoreFilter = !showMoreFilter" style="cursor: pointer">{{\'moreFilter\'|translate}}</span>\n' +
    '                                <span ng-show="showMoreFilter" ng-click="showMoreFilter = !showMoreFilter" style="cursor: pointer">{{\'lessFilter\'|translate}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                <label for="first-name">{{\'ViewBy\' | translate}}</label>\n' +
    '                                <select style="width:15% !important" class="select-tags form-control pmd-select2-tags" ng-change="dashboardCtrl.ticketFilterChange()"\n' +
    '                                    ng-model="dashboardCtrl.selectedTicketFilter" ng-options="f.value as f.name for f  in dashboardCtrl.ticketsFilter">\n' +
    '                                </select>\n' +
    '                            </div>\n' +
    '                            <nvd3 style="direction: ltr" options="dashboardCtrl.options" data="dashboardCtrl.data"></nvd3>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="media-left">\n' +
    '                            <div style="cursor: pointer; background-color: #ccc;">\n' +
    '                                <h1 style="padding: 4px" ng-init="showSurvey = false" ng-click="showSurvey=!showSurvey">\n' +
    '                                    {{\'Survey\' | translate}}\n' +
    '                                </h1>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <div class="pmd-card-body" ng-show="showSurvey" ng-init="showMoreFilterSurvey = false">\n' +
    '\n' +
    '                            <div class="row">\n' +
    '                                <div style="direction: ltr;" class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label>{{\'fromLbl\' | translate}}</label>\n' +
    '                                    <input type="text" id="fromdateSurvey" class="form-control" required />\n' +
    '                                </div>\n' +
    '                        \n' +
    '                        \n' +
    '                                <div style="direction: ltr;" class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label>{{\'toLbl\' | translate}}</label>\n' +
    '                                    <input type="text" id="todateSurvey" class="form-control" required />\n' +
    '                                </div>\n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'AnswererdBy\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedAnswersUser"\n' +
    '                                        ng-options="a as a.userName for a in dashboardCtrl.AnswersUsers"></select>\n' +
    '                                </div>\n' +
    '                                <!-- <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" <label\n' +
    '                                    for="first-name">{{\'StatusLbl\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedStatus">\n' +
    '                                        <option value="">{{\'AllLbl\' | translate}}</option>\n' +
    '                                        <option value="Pending">{{\'Pending\'|translate}}</option>\n' +
    '                                        <option value="Assigned">{{\'Assigned\'|translate}}</option>\n' +
    '                                        <option value="InProgress">{{\'InProgress\'|translate}}</option>\n' +
    '                                        <option value="Closed">{{\'Closed\'|translate}}</option>\n' +
    '                                        <option value="Rejected">{{\'Rejected\'|translate}}</option>\n' +
    '                                    </select>\n' +
    '                                </div> -->\n' +
    '                        \n' +
    '                            </div>\n' +
    '                            <div class="row" ng-show="showMoreFilterSurvey">\n' +
    '                                <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{\'Country\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.countrySurveyChange()" ng-model="dashboardCtrl.selectedCountrySurvey"\n' +
    '                                        ng-options="group as group.titleDictionary[selectedLanguage] for group in dashboardCtrl.countiesSurvey">\n' +
    '                                    </select>\n' +
    '                                </div>\n' +
    '                                <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'Governrate\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.GovernrateSurveyChange()" ng-model="dashboardCtrl.selectedGovernrateSurvey"\n' +
    '                                        ng-options="group as group.titleDictionary[selectedLanguage] for group in dashboardCtrl.GovernratesSurvey">\n' +
    '                                    </select>\n' +
    '                                </div>\n' +
    '                                <div class="col-md-4 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'City\' | translate}}</label>\n' +
    '                                    <select class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.citySurveyChange()" ng-model="dashboardCtrl.selectedCitySurvey"\n' +
    '                                        ng-options="group as group.titleDictionary[selectedLanguage] for group in dashboardCtrl.citiesSurvey">\n' +
    '                                    </select>\n' +
    '                                </div>\n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'Area\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.areaSurveyChange()" ng-model="dashboardCtrl.selectedAreaSurvey"\n' +
    '                                        ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.areaListSurvey"></select>\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'Branch\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedBranchSurvey" ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.branchListSurvey"></select>\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'Department\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.departmentSurveyChange()" ng-model="dashboardCtrl.selectedDepartmentSurvey"\n' +
    '                                        ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.departmentsSurvey"></select>\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'CategoryLbl\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required class="form-control select-with-search pmd-select2-tags" ng-model="dashboardCtrl.selectedCategorySurvey" ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.categoriesSurvey"></select>\n' +
    '                                </div>\n' +
    '                        \n' +
    '                                <div class="col-md-2 form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{\'categoryType\' | translate}}</label>\n' +
    '                        \n' +
    '                                    <select required style="width:50% !important" class="form-control select-with-search pmd-select2-tags" ng-change="dashboardCtrl.categoryTypeChange()"\n' +
    '                                        ng-model="dashboardCtrl.selectedCategoryType" ng-options="a as a.titleDictionary[selectedLanguage] for a in dashboardCtrl.categoryTypes"></select>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="row" style="padding-bottom: 5px;">\n' +
    '                                <div class="col-md-2 ">\n' +
    '                                    <button ng-click="dashboardCtrl.applySurveyFilter()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'filterBtn\' | translate}}</button>\n' +
    '                                    <!-- <button ng-click="dashboardCtrl.exportPDF()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'exportPDFBtn\' | translate}}</button> -->\n' +
    '                                </div>\n' +
    '                                <span ng-show="!showMoreFilterSurvey" ng-click="showMoreFilterSurvey = !showMoreFilterSurvey" style="cursor: pointer">{{\'moreFilter\'|translate}}</span>\n' +
    '                                <span ng-show="showMoreFilterSurvey" ng-click="showMoreFilterSurvey = !showMoreFilterSurvey" style="cursor: pointer">{{\'lessFilter\'|translate}}</span>\n' +
    '                            </div>\n' +
    '                        \n' +
    '                            <div class="total-sales" ng-show="dashboardCtrl.questionList.length<=0">\n' +
    '                                <br>\n' +
    '                                <span>{{\'NoQuestionsAvailable\' | translate}}</span>\n' +
    '                            </div>\n' +
    '                        \n' +
    '                            <ul id="surveyDiv">\n' +
    '                        \n' +
    '                                <li ng-repeat="(k,v) in dashboardCtrl.questionList| groupBy: \'categoryId\'">\n' +
    '                                    <div style="cursor: pointer; background-color: #ccc;">\n' +
    '                        \n' +
    '                                        <h2 style="padding: 7px" ng-init="t = false" ng-click="t=!t">\n' +
    '                                            {{v[0].category.titleDictionary[selectedLanguage]}}\n' +
    '                                        </h2>\n' +
    '                                    </div>\n' +
    '                                    <ul ng-show="t">\n' +
    '                                        <li ng-repeat="ques in v">\n' +
    '                                            <!-- <button class="accordion">{{ques.titleDictionary[selectedLanguage]}}</button> -->\n' +
    '                                            <div style="cursor: pointer;    background-color: #ccc;">\n' +
    '                        \n' +
    '                                                <h3 style="padding: 4px" ng-click="ques.showAnswer=!ques.showAnswer;ques.showAnswer?dashboardCtrl.getQuestionDashbard(ques):ques.showAnswer=ques.showAnswer">\n' +
    '                                                    {{ques.titleDictionary[selectedLanguage]}}\n' +
    '                                                </h3>\n' +
    '                                            </div>\n' +
    '                                            <div ng-show="ques.showAnswer">\n' +
    '                                                <div style="text-align: center;">\n' +
    '                                                    <img ng-show="ques.isloading" src="assets/img/loading.gif" style="height: 80px;">\n' +
    '                                                </div>\n' +
    '                                                <span ng-if="!ques.isloading" ng-show="(ques.data.length == 0 && ques.questionTypeId ==0) \n' +
    '                                                    || (ques.questionTypeId == 1 && ques.dashboard.oneStartCount == 0 && ques.dashboard.twoStartCount == 0 && ques.dashboard.threeStartCount == 0 && ques.dashboard.fourStartCount == 0 && ques.dashboard.fiveStartCount == 0)\n' +
    '                                                    || (ques.questionTypeId == 2 && ques.dashboard.likeCount == 0 && ques.dashboard.disLikeCount == 0 )\n' +
    '                                                    ">{{\'noAnswersLbl\'|translate}}</span>\n' +
    '                                                <div ng-if="!ques.isloading &&  \n' +
    '                                                ((ques.questionTypeId == 1 && (ques.dashboard.oneStartCount != 0 || ques.dashboard.twoStartCount != 0 || ques.dashboard.threeStartCount != 0 || ques.dashboard.fourStartCount != 0 || ques.dashboard.fiveStartCount != 0))\n' +
    '                                                ||(ques.questionTypeId == 2 && (ques.dashboard.likeCount != 0 || ques.dashboard.disLikeCount != 0 ))\n' +
    '                                                || (ques.data.length > 0 && ques.questionTypeId ==0))">\n' +
    '                                                    <nvd3 style="direction: ltr" options="ques.options" data="ques.data"></nvd3>\n' +
    '                                                </div>\n' +
    '                                                <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-show="!ques.isloading  && \n' +
    '                                                (ques.questionTypeId == 1 && (ques.dashboard.oneStartCount != 0 || ques.dashboard.twoStartCount != 0 || ques.dashboard.threeStartCount != 0 || ques.dashboard.fourStartCount != 0 || ques.dashboard.fiveStartCount != 0))"\n' +
    '                                                    ng-if="ques.questionTypeId == 1">\n' +
    '                                                    <div class="table-responsive">\n' +
    '                                                        <table class="table pmd-table table-hover">\n' +
    '                                                            <thead>\n' +
    '                                                                <tr>\n' +
    '                                                                    <th>\n' +
    '                                                                        <jk-rating-stars rating="1" max-rating="5" read-only="true" class="my-custom-stars "></jk-rating-stars>\n' +
    '                                                                    </th>\n' +
    '                                                                    <th>\n' +
    '                                                                        <jk-rating-stars rating="2" max-rating="5" read-only="true" class="my-custom-stars "></jk-rating-stars>\n' +
    '                                                                    </th>\n' +
    '                                                                    <th>\n' +
    '                                                                        <jk-rating-stars rating="3" max-rating="5" read-only="true" class="my-custom-stars "></jk-rating-stars>\n' +
    '                                                                    </th>\n' +
    '                                                                    <th>\n' +
    '                                                                        <jk-rating-stars rating="4" max-rating="5" read-only="true" class="my-custom-stars "></jk-rating-stars>\n' +
    '                                                                    </th>\n' +
    '                                                                    <th>\n' +
    '                                                                        <jk-rating-stars rating="5" max-rating="5" read-only="true" class="my-custom-stars "></jk-rating-stars>\n' +
    '                                                                    </th>\n' +
    '                                                                    <th>{{\'averageLbl\' | translate}}</th>\n' +
    '                                                                    <th></th>\n' +
    '                                                                </tr>\n' +
    '                                                            </thead>\n' +
    '                                                            <tbody>\n' +
    '                                                                <tr>\n' +
    '                                                                    <td>{{ques.dashboard.oneStartCount}}</td>\n' +
    '                                                                    <td>{{ques.dashboard.twoStartCount}}</td>\n' +
    '                                                                    <td>{{ques.dashboard.threeStartCount}}</td>\n' +
    '                                                                    <td>{{ques.dashboard.fourStartCount}}</td>\n' +
    '                                                                    <td>{{ques.dashboard.fiveStartCount}}</td>\n' +
    '                                                                    <td>{{ques.dashboard.average | number:2}}</td>\n' +
    '                                                                </tr>\n' +
    '                                                            </tbody>\n' +
    '                                                        </table>\n' +
    '                                                    </div>\n' +
    '                                                </div>\n' +
    '                                            </div>\n' +
    '                        \n' +
    '                                        </li>\n' +
    '                        \n' +
    '                                    </ul>\n' +
    '                                </li>\n' +
    '                            </ul>\n' +
    '                            <canvas id="cc"></canvas>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/setting/templates/editBranchFees.html',
    '<div>\n' +
    '        {{\'EditRoleLbl\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <button class="close" type="button" ng-click="editBranchFeesCtrl.close()">×</button>\n' +
    '        <h2 class="pmd-card-title-text">{{\'DeliveryPrice\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editFeesForm" autocomplete="off">\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'DeliveryCost\' | translate}}</label>\n' +
    '                <input required type="number" class="mat-input form-control" name="minDays"\n' +
    '                    ng-pattern="/^[1-9]+[0-9]*$/" ng-model="branch.deliveryCost" ng-minlength="1" ng-maxlength="2">\n' +
    '                <div ng-messages="editFeesForm.minDays.$error" class="error">\n' +
    '                    <div ng-if="editFeesForm.minDays.$error.required && !editFeesForm.minDays.$pristine">\n' +
    '                        {{\'minDaysReqError\' | translate}}</div>\n' +
    '                    <div ng-if="(editFeesForm.minDays.$error.minlength || editFeesForm.minDays.$error.maxlength)">\n' +
    '                        {{\'minDaysLengthError\' | translate}}</div>\n' +
    '                    <div ng-if="editFeesForm.minDays.$error.pattern && !editFeesForm.minDays.$pristine">\n' +
    '                        {{\'wrongpattern\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'DeliveryPrice\' | translate}}</label>\n' +
    '                <input required type="number" class="mat-input form-control" name="price"\n' +
    '                    ng-model="branch.deliveryPrice" min="{{branch.deliveryCost}}" ng-minlength="1" ng-maxlength="2">\n' +
    '                <div ng-messages="editFeesForm.price.$error" class="error">\n' +
    '                    <div ng-if="editFeesForm.price.$error.required && !editFeesForm.price.$pristine">\n' +
    '                        {{\'priceReqError\' | translate}}</div>\n' +
    '                    <div ng-if="(editFeesForm.price.$error.minlength || editFeesForm.price.$error.maxlength)">\n' +
    '                        {{\'priceLengthError\' | translate}}</div>\n' +
    '                    <div ng-if="editFeesForm.price.$error.min">{{\'PriceShouldbeMoreThanCost\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="editFeesForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"   ng-click="editBranchFeesCtrl.UpdateFees()">{{\'Edit\' | translate}}</button>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/setting/templates/setting.html',
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-add-tags").select2({\n' +
    '            tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '            insertTag: function (data, tag) {\n' +
    '                // Insert the tag at the end of the results\n' +
    '                data.push(tag);\n' +
    '                // console.log(data);\n' +
    '            }\n' +
    '        });\n' +
    '\n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        });\n' +
    '\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>\n' +
    '<form class="form-horizontal" name="settingForm">\n' +
    '    <div ng-if="settingsPrepService.isActive == undefined">\n' +
    '        <!-- <div>\n' +
    '            {{\'SendVer\' | translate}}\n' +
    '            <br>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="none"> {{\'None\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="sms"> {{\'SMS\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="mail"> {{\'Mail\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="both"> {{\'Both\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '        </div> -->\n' +
    '\n' +
    '        <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '        <label for="first-name">{{\'Currency\' | translate}}</label>\n' +
    '        <select style="width:100% !important" class="form-control select-add-tags pmd-select2-tags" multiple ng-model="settingCtrl.currency"\n' +
    '            ng-options="curr as curr.currencyCode for curr in currencyPrepService">\n' +
    '        </select>\n' +
    '    </div> -->\n' +
    '\n' +
    '        <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '            <label for="first-name">{{\'MinDaysPerProg\' | translate}}</label>\n' +
    '            <input required type="number" class="mat-input form-control" name="minDays" ng-model="settingCtrl.minDays"\n' +
    '                ng-pattern="/^[1-9]+[0-9]*$/" ng-minlength="1" ng-maxlength="2">\n' +
    '            <div ng-messages="settingForm.minDays.$error" class="error">\n' +
    '                <div ng-if="settingForm.minDays.$error.required && !settingForm.minDays.$pristine">\n' +
    '                    {{\'minDaysReqError\' | translate}}</div>\n' +
    '                <div ng-if="(settingForm.minDays.$error.minlength || settingForm.minDays.$error.maxlength)">\n' +
    '                    {{\'minDaysLengthError\' | translate}}</div>\n' +
    '                <div ng-if="settingForm.minDays.$error.pattern && !settingForm.minDays.$pristine">\n' +
    '                    {{\'wrongpattern\' | translate}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '            <!-- <label for="first-name">{{\'AllowPause\' | translate}}\n' +
    '                <input type="checkbox" ng-model="settingCtrl.allowPause">\n' +
    '            </label>\n' +
    '            <div ng-if="settingCtrl.allowPause == true" class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'MaxPauseDays\' | translate}}</label>\n' +
    '                <input required type="number" class="mat-input form-control" name="maxPause" ng-model="settingCtrl.maxPause" ng-minlength="1"\n' +
    '                    ng-maxlength="2">\n' +
    '                <div ng-messages="settingForm.maxPause.$error" class="error">\n' +
    '                    <div ng-if="settingForm.maxPause.$error.required && !settingForm.maxPause.$pristine">{{\'minDaysReqError\' | translate}}</div>\n' +
    '                    <div ng-if="(settingForm.maxPause.$error.minlength || settingForm.maxPause.$error.maxlength)">{{\'minDaysLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <br> -->\n' +
    '\n' +
    '            <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'ProgramDiscount\' | translate}}</label>\n' +
    '                <input required type="number" class="mat-input form-control" name="programDiscount"\n' +
    '                    ng-model="settingCtrl.programDiscount" minlength="1" maxlength="2">\n' +
    '                <div ng-messages="settingForm.programDiscount.$error" class="error">\n' +
    '                    <div ng-if="settingForm.programDiscount.$error.required && !settingForm.programDiscount.$pristine">\n' +
    '                        {{\'minDaysReqError\' | translate}}</div>\n' +
    '                    <div\n' +
    '                        ng-if="(settingForm.programDiscount.$error.minlength || settingForm.programDiscount.$error.maxlength)">\n' +
    '                        {{\'minDaysLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div> -->\n' +
    '            <br>\n' +
    '            <!-- <label for="first-name">{{\'AllowHistory\' | translate}}\n' +
    '                <input type="checkbox" ng-model="settingCtrl.allowHistory">\n' +
    '            </label> -->\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'ProgramDiscount\' | translate}}</label>ييي\n' +
    '                <input required type="number" class="mat-input form-control" name="programDiscount"\n' +
    '                ng-pattern="/^[1-9]+[0-9]*$/"   ng-model="settingCtrl.programDiscount" minlength="1" maxlength="2">\n' +
    '                <div ng-messages="settingForm.programDiscount.$error" class="error">\n' +
    '                    <div ng-if="settingForm.programDiscount.$error.required && !settingForm.programDiscount.$pristine">\n' +
    '                        {{\'minDaysReqError\' | translate}}</div>\n' +
    '                    <div\n' +
    '                        ng-if="(settingForm.programDiscount.$error.minlength || settingForm.programDiscount.$error.maxlength)">\n' +
    '                        {{\'minDaysLengthError\' | translate}}</div>\n' +
    '\n' +
    '                    <div ng-if="settingForm.programDiscount.$error.pattern && !settingForm.programDiscount.$pristine">\n' +
    '                        {{\'wrongpattern\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div> -->\n' +
    '\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="settingCtrl.AddSetting()"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth ng-binding" type="button">Add</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="settingsPrepService.isActive != undefined">\n' +
    '        <!-- <div>\n' +
    '            {{\'SendVer\' | translate}}\n' +
    '            <br>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="none"> {{\'None\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="sms"> {{\'SMS\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="mail"> {{\'Mail\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '            <label>\n' +
    '                <input type="radio" ng-model="settingCtrl.orderType.type" value="both"> {{\'Both\' | translate}}\n' +
    '            </label>\n' +
    '            <br/>\n' +
    '        </div> -->\n' +
    '\n' +
    '        <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '            <label for="first-name">{{\'Currency\' | translate}}</label>\n' +
    '            <select style="width:100% !important" class="form-control select-add-tags pmd-select2-tags" multiple ng-model="settingsPrepService.currencyCode"\n' +
    '                ng-options="curr as curr.currencyCode for curr in currencyPrepService">\n' +
    '            </select>\n' +
    '        </div> -->\n' +
    '\n' +
    '        <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '            <label for="first-name">{{\'MinDaysPerProg\' | translate}}</label>\n' +
    '            <input required type="number" class="mat-input form-control" name="minDays" ng-pattern="/^[1-9]+[0-9]*$/"\n' +
    '                ng-model="settingsPrepService.minNoDaysPerProgram" ng-minlength="1" ng-maxlength="2">\n' +
    '            <div ng-messages="settingForm.minDays.$error" class="error">\n' +
    '                <div ng-if="settingForm.minDays.$error.required && !settingForm.minDays.$pristine">\n' +
    '                    {{\'requiredErr\' | translate}}</div>\n' +
    '                <div ng-if="(settingForm.minDays.$error.minlength || settingForm.minDays.$error.maxlength)">\n' +
    '                    {{\'maxlength\' | translate}}</div>\n' +
    '                <div ng-if="settingForm.minDays.$error.pattern && !settingForm.minDays.$pristine">\n' +
    '                    {{\'wrongpattern\' | translate}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '\n' +
    '        <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '            <label for="first-name">{{\'AllowPause\' | translate}}\n' +
    '                <input type="checkbox" ng-model="settingsPrepService.isPause">\n' +
    '            </label>\n' +
    '            <div ng-if="settingsPrepService.isPause == true" class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'MaxPauseDays\' | translate}}</label>\n' +
    '                <input required type="number" class="mat-input form-control" name="maxPause" ng-model="settingsPrepService.maxPauseDays"\n' +
    '                    ng-minlength="1" ng-maxlength="2">\n' +
    '                <div ng-messages="settingForm.maxPause.$error" class="error">\n' +
    '                    <div ng-if="settingForm.maxPause.$error.required && !settingForm.maxPause.$pristine">{{\'minDaysReqError\' | translate}}</div>\n' +
    '                    <div ng-if="(settingForm.maxPause.$error.minlength || settingForm.maxPause.$error.maxlength)">{{\'minDaysLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <br>\n' +
    '\n' +
    '            <label for="first-name">{{\'AllowHistory\' | translate}}\n' +
    '                <input type="checkbox" ng-model="settingsPrepService.allowHistory">\n' +
    '            </label>\n' +
    '        </div> -->\n' +
    '\n' +
    '        <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                <label for="first-name">{{\'ProgramDiscount\' | translate}}</label>\n' +
    '                <input required type="number" class="mat-input form-control" name="programDiscount"\n' +
    '                    ng-pattern="/^[1-9]+[0-9]*$/" ng-model="settingCtrl.programDiscount" minlength="1"\n' +
    '                    maxlength="2">\n' +
    '                <div ng-messages="settingForm.programDiscount.$error" class="error">\n' +
    '                    <div ng-if="settingForm.programDiscount.$error.required && !settingForm.programDiscount.$pristine">\n' +
    '                        {{\'requiredErr\' | translate}}</div>\n' +
    '                    <div\n' +
    '                        ng-if="(settingForm.programDiscount.$error.minlength || settingForm.programDiscount.$error.maxlength)">\n' +
    '                        {{\'maxlength\' | translate}}</div>\n' +
    '\n' +
    '                    <div ng-if="settingForm.programDiscount.$error.pattern && !settingForm.programDiscount.$pristine">\n' +
    '                        {{\'wrongpattern\' | translate}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;" ng-click="settingCtrl.UpdateSetting()"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth ng-binding" ng-disabled="settingForm.$invalid  " type="button">{{\'Save\' | translate}} </button>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <br>\n' +
    '\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="BranchPrepService.results.length > 0">\n' +
    '        <h2 style="margin-left: 50%">{{\'DeliveryFees\' | translate}}</h2>\n' +
    '        <div class="table-responsive">\n' +
    '        <table class="table pmd-table table-hover">\n' +
    '            <thead>\n' +
    '                <tr>\n' +
    '                    <th>{{\'branchName\' | translate}}</th>\n' +
    '                    <th>{{\'DeliveryCost\' | translate}}</th>\n' +
    '                    <th>{{\'DeliveryPrice\' | translate}}</th>\n' +
    '                    <th></th>\n' +
    '                </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '                <tr ng-repeat="branch in BranchPrepService.results">\n' +
    '                    <td data-title="Name">{{branch.titleDictionary[selectedLanguage]}}</td>\n' +
    '                    <td data-title="Name">{{branch.deliveryCost}}</td>\n' +
    '                    <td data-title="Name">{{branch.deliveryPrice}}</td>\n' +
    '                    <td width="30%" ng-show="!branch.isStatic">\n' +
    '                        <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                            ng-click="EditBranchDialog(branch.branchId)"title="Edit">mode_edit</i>\n' +
    '                    </td>\n' +
    '                </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '    </div>\n' +
    '    </div>\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true"\n' +
    '        disabled-class="hide">\n' +
    '    </div>\n' +
    '</form>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/addOperationUser.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'BasicInfoLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newUserForm">\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'FullName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="fullName"\n' +
    '                        ng-model="addOperationUserCtrl.fullName" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newUserForm.fullName.$error" class="error">\n' +
    '                        <div ng-show="newUserForm.fullName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                        <div class="error" ng-if="newUserForm.fullName.$error.required && !newUserForm.fullName.$pristine">{{\'NameLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                        <div  class="error" ng-if="(newUserForm.fullName.$error.minlength || newUserForm.fullName.$error.maxlength) ">{{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'userName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userName"\n' +
    '                        ng-model="addOperationUserCtrl.userName" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newUserForm.userName.$error">\n' +
    '                        <div  class="error" ng-show="newUserForm.userName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                        <div  class="error" ng-if="newUserForm.userName.$error.required && !newUserForm.userName.$pristine">{{\'userName\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div  class="error" ng-if="(newUserForm.userName.$error.minlength || newUserForm.userName.$error.maxlength)">{{\'NameLengthError255\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label><span style="color:red">*</span>{{\'EmailLbl\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userEmail"\n' +
    '                        ng-model="addOperationUserCtrl.email"\n' +
    '                        ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                    <span class="error" ng-show="newUserForm.userEmail.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                    </span>\n' +
    '\n' +
    '                    <div ng-messages="newUserForm.userEmail.$error">\n' +
    '                        <div  class="error" ng-if="newUserForm.userEmail.$error.required && !newUserForm.userEmail.$pristine">{{\'EmailLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'phoneLbl\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="phone" numbers-only\n' +
    '                        ng-model="addOperationUserCtrl.mobileNumber" ng-minlength="11" ng-maxlength="11">\n' +
    '                    <div ng-messages="newUserForm.phone.$error">\n' +
    '                        <div  class="error" ng-if="newUserForm.phone.$error.required && !newUserForm.phone.$pristine">{{\'PhoneReqError\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div  class="error" ng-if="(newUserForm.phone.$error.minlength || newUserForm.phone.$error.maxlength)">{{\'PhoneLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'UserPasswordLbl\' | translate}}</label>\n' +
    '                    <input required type="password" class="mat-input form-control" name="password"\n' +
    '                        ng-model="addOperationUserCtrl.password" ng-minlength="8" ng-maxlength="25">\n' +
    '                    <div ng-messages="newUserForm.password.$error">\n' +
    '                        <div  class="error" ng-if="newUserForm.password.$error.required && !newUserForm.password.$pristine">{{\'requiredErr\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div\n' +
    '                        class="error" ng-if="(newUserForm.password.$error.minlength || newUserForm.password.$error.maxlength) && !newUserForm.password.newPassword.$error.required">\n' +
    '                            Password\n' +
    '                            length must be 8-25 char.</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '                    <input required type="password" class="mat-input form-control" name="confirmPassword"\n' +
    '                        ng-model="confirmPassword" equalto="newUserForm.password">\n' +
    '                    <div ng-messages="newUserForm.confirmPassword.$error">\n' +
    '                        <div\n' +
    '                        class="error" ng-if="newUserForm.confirmPassword.$error.required && !newUserForm.confirmPassword.$pristine">{{\'requiredErr\'\n' +
    '    | translate}}</div>\n' +
    '                        <div\n' +
    '                        class="error"  ng-if="newUserForm.confirmPassword.$error.equalto && !newUserForm.confirmPassword.$error.required">{{\'passworddontmatch\'\n' +
    '    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    ' <div class="table-responsive">\n' +
    '                        <table class="table table-striped table-bordered">\n' +
    '                            <tr ng-repeat-start="module in addOperationUserCtrl.Role.permessionTree">\n' +
    '                                <td><strong>{{module.module.title[selectedLanguage]}}</strong></td>\n' +
    '                            </tr>\n' +
    '                            <tr ng-repeat-end ng-repeat="per in module.permessions">\n' +
    '                                <td> <input type="checkbox" ng-change="addOperationUserCtrl.checkPermission(per)"\n' +
    '                                        ng-model="per.seclected"> </td>\n' +
    '                                <td>{{ per.title[selectedLanguage]}}</td>\n' +
    '                            </tr>\n' +
    '                        </table> \n' +
    '                        </div>\n' +
    '            <!-- \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label> {{ \'Role\' | translate}} </label>\n' +
    '                    <select required style="width:100% !important" class="form-control select-with-search pmd-select2-tags"\n' +
    '                        multiple ng-model="addOperationUserCtrl.selectedUserRoles"\n' +
    '                        ng-options="role as role.titleDictionary[selectedLanguage] for role in roleList"></select>\n' +
    '    \n' +
    '                </div> -->\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newUserForm.$invalid " class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="addOperationUserCtrl.AddNewUser()">{{\'saveChangesBtn\' |\n' +
    '            translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="addOperationUserCtrl.close()">{{\'DiscardBtn\' |\n' +
    '            translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-tags").select2({\n' +
    '            tags: false,\n' +
    '            theme: "bootstrap",\n' +
    '        })\n' +
    '\n' +
    '        $(".select-with-search").select2({\n' +
    '            theme: "bootstrap"\n' +
    '        });\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/addUser.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'NewUser\' | translate}}</h2>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newUserForm">\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'FullName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="fullName"\n' +
    '                        ng-model="addUserCtrl.fullName" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newUserForm.fullName.$error" class="error">\n' +
    '                        <div class="error" ng-show="newUserForm.fullName.$error.pattern">{{\'TextOnly\' | translate}}\n' +
    '                        </div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="newUserForm.fullName.$error.required && !newUserForm.fullName.$pristine">{{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="(newUserForm.fullName.$error.minlength || newUserForm.fullName.$error.maxlength) ">{{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'userName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userName"\n' +
    '                        ng-model="addUserCtrl.userName" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="newUserForm.userName.$error">\n' +
    '                        <div ng-show="newUserForm.userName.$error.pattern">{{\'TextOnly\' | translate}}</div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="newUserForm.userName.$error.required && !newUserForm.userName.$pristine">{{\'userName\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="(newUserForm.userName.$error.minlength || newUserForm.userName.$error.maxlength)">{{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label> <span style="color:red">*</span>{{\'EmailLbl\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userEmail"\n' +
    '                        ng-model="addUserCtrl.email" ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                    <span class="error" ng-show="newUserForm.userEmail.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                    </span>\n' +
    '\n' +
    '                    <div ng-messages="newUserForm.userEmail.$error">\n' +
    '                        <div class="error"\n' +
    '                            ng-if="newUserForm.userEmail.$error.required && !newUserForm.userEmail.$pristine">{{\'EmailLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'phoneLbl\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="mobileNumber" numbers-only\n' +
    '                        ng-model="addUserCtrl.mobileNumber" ng-minlength="11" ng-maxlength="11">\n' +
    '                    <div ng-messages="newUserForm.mobileNumber.$error">\n' +
    '                        <div class="error"\n' +
    '                            ng-if="newUserForm.mobileNumber.$error.required && !newUserForm.mobileNumber.$pristine">{{\'PhoneReqError\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="(newUserForm.mobileNumber.$error.minlength || newUserForm.mobileNumber.$error.maxlength)">{{\'PhoneLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'UserPasswordLbl\' | translate}}</label>\n' +
    '                    <input required type="password" class="mat-input form-control" name="password"\n' +
    '                        ng-model="addUserCtrl.password" ng-minlength="8" ng-maxlength="25">\n' +
    '                    <div ng-messages="newUserForm.password.$error">\n' +
    '                        <div class="error"\n' +
    '                            ng-if="newUserForm.password.$error.required && !newUserForm.password.$pristine">{{\'requiredErr\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="(newUserForm.password.$error.minlength || newUserForm.password.$error.maxlength) && !newUserForm.password.newPassword.$error.required">\n' +
    '                            Password\n' +
    '                            length must be 8-25 char.</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '                    <input required type="password" class="mat-input form-control" name="confirmPassword"\n' +
    '                        ng-model="confirmPassword" equalto="newUserForm.password">\n' +
    '                    <div ng-messages="newUserForm.confirmPassword.$error">\n' +
    '                        <div class="error"\n' +
    '                            ng-if="newUserForm.confirmPassword.$error.required && !newUserForm.confirmPassword.$pristine">{{\'requiredErr\'\n' +
    '    | translate}}</div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="newUserForm.confirmPassword.$error.equalto && !newUserForm.confirmPassword.$error.required">{{\'passworddontmatch\'\n' +
    '    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="col-md-12  form-group pmd-textfield pmd-textfield-floating-label-completed"></div>\n' +
    '                <div class="table-responsive">\n' +
    '                        <table class="table table-striped table-bordered">\n' +
    '                            <tr ng-repeat-start="module in addUserCtrl.Role.permessionTree">\n' +
    '                                <td><strong>{{module.module.title[selectedLanguage]}}</strong></td>\n' +
    '                            </tr>\n' +
    '                            <tr ng-repeat-end ng-repeat="per in module.permessions">\n' +
    '                                <td> <input type="checkbox" ng-change="addUserCtrl.checkPermission(per)"\n' +
    '                                        ng-model="per.seclected"> </td>\n' +
    '                                <td>{{ per.title[selectedLanguage]}}</td>\n' +
    '                            </tr>\n' +
    '                        </table> \n' +
    '                        </div>\n' +
    '                        </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newUserForm.$invalid " class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="addUserCtrl.AddNewUser()">{{\'saveChangesBtn\' |\n' +
    '            translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="addUserCtrl.close()">{{\'DiscardBtn\' |\n' +
    '            translate}}</button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/editUser.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'EditUser\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="updateUserForm">\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"> <span style="color:red">*</span>{{\'FullName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="fullName"\n' +
    '                        ng-model="editUserCtrl.userObj.fullName" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="updateUserForm.fullName.$error" class="error">\n' +
    '                        <div class="error" ng-show="updateUserForm.fullName.$error.pattern">{{\'TextOnly\' | translate}}\n' +
    '                        </div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="updateUserForm.fullName.$error.required && !updateUserForm.fullName.$pristine">{{\'NameLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="(updateUserForm.fullName.$error.minlength || updateUserForm.fullName.$error.maxlength) ">{{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'userName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userName" readonly\n' +
    '                        ng-model="editUserCtrl.userObj.userName" ng-minlength="3" ng-maxlength="255">\n' +
    '                    <div ng-messages="updateUserForm.userName.$error">\n' +
    '                        <div class="error" ng-show="updateUserForm.userName.$error.pattern">{{\'TextOnly\' | translate}}\n' +
    '                        </div>\n' +
    '                        <div class="error"\n' +
    '                            ng-if="updateUserForm.userName.$error.required && !updateUserForm.userName.$pristine">{{\'userName\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div\n' +
    '                            ng-if="(updateUserForm.userName.$error.minlength || updateUserForm.userName.$error.maxlength)">{{\'NameLengthError3\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label><span style="color:red">*</span>{{\'EmailLbl\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userEmail"\n' +
    '                        ng-model="editUserCtrl.userObj.email"\n' +
    '                        ng-pattern="/^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/">\n' +
    '                    <span class="error" ng-show="updateUserForm.userEmail.$error.pattern">{{\'WrongMail\' | translate}}\n' +
    '                    </span>\n' +
    '\n' +
    '                    <div ng-messages="updateUserForm.userEmail.$error">\n' +
    '                        <div  class="error" ng-if="updateUserForm.userEmail.$error.required && !updateUserForm.userEmail.$pristine">{{\'EmailLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'phoneLbl\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="phone" numbers-only\n' +
    '                        ng-model="editUserCtrl.userObj.mobileNumber" ng-minlength="10" ng-maxlength="11">\n' +
    '                    <div ng-messages="updateUserForm.phone.$error">\n' +
    '                        <div  class="error" ng-if="updateUserForm.phone.$error.required && !updateUserForm.phone.$pristine">{{\'PhoneReqError\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div  class="error" ng-if="(updateUserForm.phone.$error.minlength || updateUserForm.phone.$error.maxlength)">{{\'PhoneLengthError\'\n' +
    '                    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="row">\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'UserPasswordLbl\' | translate}}</label>\n' +
    '                    <input type="password" class="mat-input form-control" name="password"\n' +
    '                        ng-model="editUserCtrl.userObj.password" ng-minlength="8" ng-maxlength="25">\n' +
    '                    <div ng-messages="updateUserForm.password.$error">\n' +
    '                        <div  class="error" ng-if="updateUserForm.password.$error.required && !updateUserForm.password.$pristine">{{\'requiredErr\' |\n' +
    '                    translate}}</div>\n' +
    '                        <div\n' +
    '                        class="error" ng-if="(updateUserForm.password.$error.minlength || updateUserForm.password.$error.maxlength) && !updateUserForm.password.newPassword.$error.required">\n' +
    '                            Password\n' +
    '                            length must be 8-25 char.</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name"><span style="color:red">*</span>{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '                    <input type="password" class="mat-input form-control" name="confirmPassword"\n' +
    '                        ng-model="editUserCtrl.userObj.confirmPassword" equalto="updateUserForm.password">\n' +
    '                    <div ng-messages="updateUserForm.confirmPassword.$error">\n' +
    '                        <div class="error" \n' +
    '                            ng-if="updateUserForm.confirmPassword.$error.required && !updateUserForm.confirmPassword.$pristine">{{\'requiredErr\'\n' +
    '    | translate}}</div>\n' +
    '                        <div\n' +
    '                        class="error"   ng-if="updateUserForm.confirmPassword.$error.equalto && !updateUserForm.confirmPassword.$error.required">{{\'passworddontmatch\'\n' +
    '    | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="table-responsive">\n' +
    '                        <table class="table table-striped table-bordered">\n' +
    '                            <tr ng-repeat-start="module in editUserCtrl.Role.permessionTree">\n' +
    '                                <td><strong>{{module.module.title[selectedLanguage]}}</strong></td>\n' +
    '                            </tr>\n' +
    '                            <tr ng-repeat-end ng-repeat="per in module.permessions">\n' +
    '                                <td> <input type="checkbox" ng-change="editUserCtrl.checkPermission(per)"\n' +
    '                                        ng-model="per.seclected"> </td>\n' +
    '                                <td>{{ per.title[selectedLanguage]}}</td>\n' +
    '                            </tr>\n' +
    '                        </table> \n' +
    '                        </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="updateUserForm.$invalid " class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editUserCtrl.EditUser()">{{\'saveChangesBtn\' |\n' +
    '            translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editUserCtrl.close()">{{\'DiscardBtn\' |\n' +
    '            translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/user.html',
    '<div  id="bold">\n' +
    '    {{\'user\' | translate}}\n' +
    '</div>\n' +
    '<div>\n' +
    '    <!-- <div style="margin-bottom:10px">\n' +
    '            <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                ng-click="$state.go(\'addUser\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                type="button">{{\'AddUserBtn\' | translate}}</button>\n' +
    '    \n' +
    '        </div> -->\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-6  form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '            <input type="radio" ng-change="userCtrl.changeUserType(1)" ng-model="userCtrl.isChecked" ng-value="1">\n' +
    '            {{\'Retailer\' | translate}}\n' +
    '            <input type="radio" ng-change="userCtrl.changeUserType(2)" ng-model="userCtrl.isChecked" ng-value="2">\n' +
    '            {{\'ManufactureLbl\' | translate}}\n' +
    '            <input type="radio" ng-change="userCtrl.changeUserType(3)" ng-model="userCtrl.isChecked" ng-value="3">\n' +
    '            {{\'DistributorLbl\' | translate}}\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div ng-if="userCtrl.userList.length == 0">\n' +
    '        <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userCtrl.userList.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'image\' | translate}}</th>\n' +
    '                        <th>{{\'Account\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat-start="userObj in userCtrl.userList">\n' +
    '                        <td width="20%">\n' +
    '                            <img ng-src="{{appCONSTANTS.Image_URL_ACTOR}}{{userObj.image}}" width="50px" class="avatar">\n' +
    '                        </td>\n' +
    '                        <td width="20%">{{userObj.title}}</td>\n' +
    '\n' +
    '                        <td width="30%">\n' +
    '                            <button\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'addUser\',{tenantId : userObj.tenantId,userType:userCtrl.currentTenantType});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'AddUserBtn\' | translate}}</button>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td class="pmd-table-row-action">\n' +
    '                            <span href="javascript:void(0);" ng-if="userObj.users.length >0 "\n' +
    '                                ng-click="userObj.show=!userObj.show;userCtrl.showMore($event)"\n' +
    '                                class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm child-table-expand direct-expand"><i\n' +
    '                                    class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                        </td>\n' +
    '                        <td></td>\n' +
    '                        <td></td>\n' +
    '                    </tr>\n' +
    '\n' +
    '                    <tr ng-repeat-end ng-repeat="userRow in userObj.users" ng-show="userObj.show" id="collapse">\n' +
    '                        <td>{{ userRow.userName}}</td>\n' +
    '                        <td>{{ userRow.email}}</td>\n' +
    '                        <td>{{ userRow.mobileNumber}}</td>\n' +
    '                        <td>\n' +
    '                            <span ng-show="userRow.isMaster">\n' +
    '                                <img ng-click="userCtrl.ChangeRole(userRow)"\n' +
    '                                    src="../../../../assets/img/admin.png" alt="admin">\n' +
    '                            </span>\n' +
    '                            <span ng-show="!userRow.isMaster">\n' +
    '                                <img ng-click="userCtrl.ChangeRole(userRow)"\n' +
    '                                    src="../../../../assets/img/user.png" alt="User">\n' +
    '                            </span>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <div>\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive" ng-click="userCtrl.ChangeStatus(userRow)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive" ng-click="userCtrl.ChangeStatus(userRow)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div ng-if="user.permessionModules[\'Product\'].includes(12)==false"\n' +
    '                                title="You don\'t have permssion">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editUser\', {userId: userRow.userId,userType:userCtrl.currentTenantType});"title="Edit">mode_edit</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="userCtrl.totalCount"\n' +
    '        paging-action="userCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/userDistributer.html',
    '<div  id="bold">\n' +
    '        {{\'userDistributer\' | translate}}\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div ng-if="userDistributerCtrl.userList.length == 0">\n' +
    '        <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userDistributerCtrl.userList.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'image\' | translate}}</th>\n' +
    '                        <th>{{\'Account\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat-start="userObj in userDistributerCtrl.userList">\n' +
    '                        <td width="20%">\n' +
    '                            <img ng-src="{{appCONSTANTS.Image_URL_ACTOR}}{{userObj.image}}" width="50px" class="avatar">\n' +
    '                        </td>\n' +
    '                        <td width="20%">{{userObj.title}}</td>\n' +
    '\n' +
    '                        <td width="30%">\n' +
    '                            <button\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'addUser\',{tenantId : userObj.tenantId,userType:3 ,userId :user.id});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'AddUserBtn\' | translate}}</button>\n' +
    '\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td class="pmd-table-row-action">\n' +
    '                             <span href="javascript:void(0);" ng-if="userObj.users.length >0 "\n' +
    '                                ng-click="userObj.show=!userObj.show;userDistributerCtrl.showMore($event)"\n' +
    '                                class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm child-table-expand direct-expand"><i\n' +
    '                                    class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                        </td>\n' +
    '                        <td></td>\n' +
    '                        <td></td>\n' +
    '                    </tr>\n' +
    '\n' +
    '                    <tr ng-repeat-end ng-repeat="userRow in userObj.users" ng-show="userObj.show" id="collapse">\n' +
    '                        <td>{{ userRow.userName}}</td>\n' +
    '                        <td>{{ userRow.email}}</td>\n' +
    '                        <td>{{ userRow.mobileNumber}}</td>\n' +
    '                        <td><span ng-show="userRow.isMaster">\n' +
    '                                <img ng-click="userDistributerCtrl.ChangeRole(userRow)"\n' +
    '                                    src="../../../../assets/img/admin.png" alt="admin">\n' +
    '                            </span>\n' +
    '                            <span ng-show="!userRow.isMaster">\n' +
    '                                <img ng-click="userDistributerCtrl.ChangeRole(userRow)"\n' +
    '                                    src="../../../../assets/img/user.png" alt="User">\n' +
    '                            </span>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <div>\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive" ng-click="userDistributerCtrl.ChangeStatus(userRow)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive"\n' +
    '                                        ng-click="userDistributerCtrl.ChangeStatus(userRow)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div ng-if="user.permessionModules[\'Product\'].includes(12)==false"\n' +
    '                                title="You don\'t have permssion">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editUser\', {userId: userRow.userId,userType:3});"title="Edit">mode_edit</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="userDistributerCtrl.totalCount"\n' +
    '        paging-action="userDistributerCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/userIoa.html',
    '<div style="margin-bottom:10px">\n' +
    '    <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '        ng-click="$state.go(\'addOperationUser\',{userType:5});" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '        type="button">{{\'AddBtn\'\n' +
    '            | translate}}</button>\n' +
    '\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div ng-if="userIoaCtrl.userList.length == 0">\n' +
    '        <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userIoaCtrl.userList.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'fullname\' | translate}}</th>\n' +
    '                        <th>{{\'username\' | translate}}</th>\n' +
    '                        <th>{{\'mail\' | translate}}</th>\n' +
    '                        <th>{{\'phone\' | translate}}</th>\n' +
    '                        <th>{{\'Status\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="userRow in userIoaCtrl.userList">\n' +
    '                        <td>{{ userRow.fullName}}</td>\n' +
    '                        <td>{{ userRow.userName}}</td>\n' +
    '                        <td>{{ userRow.email}}</td>\n' +
    '                        <td>{{ userRow.mobileNumber}}</td>\n' +
    '                        <!-- <td> <span ng-show="userRow.isMaster">\n' +
    '                                        <img ng-click="userIoaCtrl.ChangeRole(userRow)"\n' +
    '                                            src="../../../../assets/img/admin.png" alt="admin">\n' +
    '                                    </span> <span ng-show="!userRow.isMaster">\n' +
    '                                        <img ng-click="userIoaCtrl.ChangeRole(userRow)"\n' +
    '                                            src="../../../../assets/img/user.png" alt="User">\n' +
    '                                    </span>\n' +
    '        \n' +
    '        \n' +
    '                                </td> -->\n' +
    '                        <td>\n' +
    '                            <div>\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive" ng-click="userIoaCtrl.ChangeStatus(userRow)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive" ng-click="userIoaCtrl.ChangeStatus(userRow)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div ng-if="user.permessionModules[\'Product\'].includes(12)==false"\n' +
    '                                title="You don\'t have permssion">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editUser\', {userId: userRow.userId,userType:2});">mode_edit</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="userIoaCtrl.totalCount"\n' +
    '        paging-action="userIoaCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/userIoo.html',
    '<div style="margin-bottom:10px">\n' +
    '    <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '        ng-click="$state.go(\'addOperationUser\',{userType:4,userId:user.id});" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '        type="button">{{\'AddBtn\'\n' +
    '            | translate}}</button>\n' +
    '\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div ng-if="userIooCtrl.userList.length == 0">\n' +
    '        <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userIooCtrl.userList.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'fullname\' | translate}}</th>\n' +
    '                        <th>{{\'username\' | translate}}</th>\n' +
    '                        <th>{{\'mail\' | translate}}</th>\n' +
    '                        <th>{{\'phone\' | translate}}</th>\n' +
    '                        <th>{{\'Status\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="userRow in userIooCtrl.userList">\n' +
    '                        <td>{{ userRow.fullName}}</td>\n' +
    '                        <td>{{ userRow.userName}}</td>\n' +
    '                        <td>{{ userRow.email}}</td>\n' +
    '                        <td>{{ userRow.mobileNumber}}</td>\n' +
    '                        <!-- <td> <span ng-show="userRow.isMaster">\n' +
    '                                        <img ng-click="userIooCtrl.ChangeRole(userRow)"\n' +
    '                                            src="../../../../assets/img/admin.png" alt="admin">\n' +
    '                                    </span> <span ng-show="!userRow.isMaster">\n' +
    '                                        <img ng-click="userIooCtrl.ChangeRole(userRow)"\n' +
    '                                            src="../../../../assets/img/user.png" alt="User">\n' +
    '                                    </span>\n' +
    '        \n' +
    '        \n' +
    '                                </td> -->\n' +
    '                        <td>\n' +
    '                            <div>\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive" ng-click="userIooCtrl.ChangeStatus(userRow)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive" ng-click="userIooCtrl.ChangeStatus(userRow)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div ng-if="user.permessionModules[\'Product\'].includes(12)==false"\n' +
    '                                title="You don\'t have permssion">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editUser\', {userId: userRow.userId,userType:2});">mode_edit</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="userIooCtrl.totalCount"\n' +
    '        paging-action="userIooCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/userManufacture.html',
    '<div id="bold">\n' +
    '    {{\'userManufacture\' | translate}}\n' +
    '</div>\n' +
    '<div ng-show="user.userTypeId == 4 || user.userTypeId ==5">\n' +
    '\n' +
    '    <div>\n' +
    '        <div ng-if="userManufactureCtrl.userList.length == 0">\n' +
    '            <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '        </div>\n' +
    '        <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userManufactureCtrl.userList.length >0">\n' +
    '\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr>\n' +
    '                            <th>{{\'image\' | translate}}</th>\n' +
    '                            <th>{{\'Account\' | translate}}</th>\n' +
    '                            <th></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <tr ng-repeat-start="userObj in userManufactureCtrl.userList">\n' +
    '                            <td width="20%">\n' +
    '                                <img ng-src="{{appCONSTANTS.Image_URL_ACTOR}}{{userObj.image}}" width="50px"\n' +
    '                                    class="avatar">\n' +
    '                            </td>\n' +
    '                            <td width="20%">{{userObj.title}} </td>\n' +
    '\n' +
    '                            <td width="30%">\n' +
    '                                <button\n' +
    '                                    style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                    ng-click="$state.go(\'addUser\',{tenantId : userObj.tenantId,userType:2,userId:user.id});"\n' +
    '                                    class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                    type="button">{{\'AddUserBtn\' | translate}}</button>\n' +
    '\n' +
    '\n' +
    '                            </td>\n' +
    '                            <td class="pmd-table-row-action">\n' +
    '                                <span href="javascript:void(0);" ng-if="userObj.users.length >0 "\n' +
    '                                    ng-click="userObj.show=!userObj.show;userManufactureCtrl.showMore($event)" class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect \n' +
    '                                    btn-default btn-sm child-table-expand direct-expand">\n' +
    '                                    <i class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                            </td>\n' +
    '                            <td></td>\n' +
    '                            <td></td>\n' +
    '                        </tr>\n' +
    '\n' +
    '                        <tr ng-repeat-end ng-repeat="userRow in userObj.users" ng-show="userObj.show" id="collapse">\n' +
    '                            <td>{{ userRow.userName}}</td>\n' +
    '                            <td>{{ userRow.email}}</td>\n' +
    '                            <td>{{ userRow.mobileNumber}}</td>\n' +
    '                            <td> <span ng-show="userRow.isMaster">\n' +
    '                                    <!-- {{user.permessionModules}} -->\n' +
    '                                    <img ng-click="userManufactureCtrl.ChangeRole(userRow)"\n' +
    '                                        src="../../../../assets/img/admin.png" alt="admin">\n' +
    '                                </span> <span ng-show="!userRow.isMaster">\n' +
    '                                    <img ng-click="userManufactureCtrl.ChangeRole(userRow)"\n' +
    '                                        src="../../../../assets/img/user.png" alt="User">\n' +
    '                                </span>\n' +
    '\n' +
    '\n' +
    '                            </td>\n' +
    '                            <td>\n' +
    '                                <div>\n' +
    '                                    <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive"\n' +
    '                                        ng-click="userManufactureCtrl.ChangeStatus(userRow)">\n' +
    '\n' +
    '                                        <div class="btn-switch-circle"\n' +
    '                                            ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                            ng-model="userRow.isActive"\n' +
    '                                            ng-click="userManufactureCtrl.ChangeStatus(userRow)">\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div ng-if="user.permessionModules[\'Product\'].includes(12)==false"\n' +
    '                                    title="You don\'t have permssion">\n' +
    '                                    <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive">\n' +
    '\n' +
    '                                        <div class="btn-switch-circle"\n' +
    '                                            ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                            ng-model="userRow.isActive">\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '\n' +
    '                            </td>\n' +
    '                            <td>\n' +
    '                                <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                    ng-click="$state.go(\'editUser\', {userId: userRow.userId,userType:2});"\n' +
    '                                    title="Edit">mode_edit</i>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                        <!-- <tr ng-repeat-end class="child-table" ng-show="userObj.show">\n' +
    '                        {{userObj}}\n' +
    '                        <div class="direct-child-table">\n' +
    '                            <table class="table pmd-table table-striped table-sm">\n' +
    '                                <thead>\n' +
    '                                    <tr>\n' +
    '\n' +
    '                                        <th>{{\'username\' | translate}}</th>\n' +
    '                                        <th>{{\'email\' |translate}}</th>\n' +
    '                                        <th>{{\'phone\'|translate}}</th>\n' +
    '                                    </tr>\n' +
    '                                </thead>\n' +
    '                                <tbody>\n' +
    '                                    <tr ng-repeat="userDetail in userObj.tenant.users">\n' +
    '\n' +
    '                                        <td>{{userDetail.username}}</td>\n' +
    '\n' +
    '\n' +
    '                                        <td>{{userDetail.users.email}}</td>\n' +
    '                                        <td>{{userDetail.users.email}}</td>\n' +
    '\n' +
    '                                    </tr>\n' +
    '\n' +
    '                                </tbody>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </tr> -->\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '        <div style="text-align:center;direction: ltr" paging page="1" page-size="10"\n' +
    '            total="userManufactureCtrl.totalCount" paging-action="userManufactureCtrl.changePage(page)" flex="nogrow"\n' +
    '            show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div ng-show="user.userTypeId == 2 || user.userTypeId ==7"> \n' +
    '    <button ng-show="user.permessionModules[\'ManufactureUser\'].includes(94)"\n' +
    '    style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '        ng-click="$state.go(\'addUser\',{tenantId : user.tenantId,userType:2});"\n' +
    '        class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddUserBtn\' | translate}}</button>\n' +
    '\n' +
    '    <div ng-if="userManufactureCtrl.userList.length == 0">\n' +
    '        <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userManufactureCtrl.userList.length >0">\n' +
    '\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'fullname\' | translate}}</th>\n' +
    '                        <th>{{\'username\' | translate}}</th>\n' +
    '                        <th>{{\'mail\' | translate}}</th>\n' +
    '                        <th>{{\'phone\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="userRow in userManufactureCtrl.userList">\n' +
    '                        <td>{{ userRow.userName}}</td>\n' +
    '                        <td>{{ userRow.fullName}}</td>\n' +
    '                        <td>{{ userRow.email}}</td>\n' +
    '                        <td>{{ userRow.mobileNumber}}</td>\n' +
    '\n' +
    '                        <td>\n' +
    '                            <i ng-show="user.permessionModules[\'ManufactureUser\'].includes(97)" class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editUser\', {userId: userRow.userId,userType:2 ,userId :user.id});"\n' +
    '                                title="Edit">mode_edit</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '\n' +
    '\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="userManufactureCtrl.totalCount"\n' +
    '        paging-action="userManufactureCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/user/templates/userRetailer.html',
    '<div  id="bold">\n' +
    '        {{\'userRetailer\' | translate}}\n' +
    '</div><div>\n' +
    '    <div ng-if="userRetailerCtrl.userList.length == 0">\n' +
    '        <span>{{\'NouserAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="userRetailerCtrl.userList.length >0">\n' +
    ' \n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'image\' | translate}}</th>\n' +
    '                        <th>{{\'Account\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat-start="userObj in userRetailerCtrl.userList">\n' +
    '                        <td width="20%">\n' +
    '                            <img ng-src="{{appCONSTANTS.Image_URL_ACTOR}}{{userObj.image}}" width="50px" class="avatar">\n' +
    '                        </td>\n' +
    '                        <td width="20%">{{userObj.title}}</td>\n' +
    '\n' +
    '                        <td width="30%">\n' +
    '                            <button\n' +
    '                                style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                                ng-click="$state.go(\'addUser\',{tenantId : userObj.tenantId,userType:1,userId:user.id});"\n' +
    '                                class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '                                type="button">{{\'AddUserBtn\' | translate}}</button>\n' +
    '\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td class="pmd-table-row-action">\n' +
    '                            <span href="javascript:void(0);" ng-if="userObj.users.length >0 "\n' +
    '                                ng-click="userObj.show=!userObj.show;userRetailerCtrl.showMore($event)"\n' +
    '                                class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm child-table-expand direct-expand"><i\n' +
    '                                    class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                        </td>\n' +
    '                        <td></td>\n' +
    '                        <td></td>\n' +
    '                    </tr>\n' +
    '\n' +
    '                    <tr ng-repeat-end ng-repeat="userRow in userObj.users" ng-show="userObj.show" id="collapse">\n' +
    '                        <td>{{ userRow.userName}}</td>\n' +
    '                        <td>{{ userRow.email}}</td>\n' +
    '                        <td>{{ userRow.mobileNumber}}</td>\n' +
    '                        <td> <span ng-show="userRow.isMaster">\n' +
    '                                <img ng-click="userRetailerCtrl.ChangeRole(userRow)"\n' +
    '                                    src="../../../../assets/img/admin.png" alt="admin">\n' +
    '                            </span>\n' +
    '                            <span ng-show="!userRow.isMaster">\n' +
    '                                <img ng-click="userRetailerCtrl.ChangeRole(userRow)"\n' +
    '                                    src="../../../../assets/img/user.png" alt="User">\n' +
    '                            </span>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <div>\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive" ng-click="userRetailerCtrl.ChangeStatus(userRow)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive" ng-click="userRetailerCtrl.ChangeStatus(userRow)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div ng-if="userRow.permessionModules[\'Product\'].includes(12)==false"\n' +
    '                                title="You don\'t have permssion">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':userRow.isActive}"\n' +
    '                                    ng-model="userRow.isActive">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':userRow.isActive}"\n' +
    '                                        ng-model="userRow.isActive">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editUser\', {userId: userRow.userId,userType:1});"title="Edit">mode_edit</i></td>\n' +
    '                    </tr>\n' +
    '                    <!-- <tr ng-repeat-end class="child-table" ng-show="userObj.show">\n' +
    '                        {{userObj}}\n' +
    '                        <div class="direct-child-table">\n' +
    '                            <table class="table pmd-table table-striped table-sm">\n' +
    '                                <thead>\n' +
    '                                    <tr>\n' +
    '\n' +
    '                                        <th>{{\'username\' | translate}}</th>\n' +
    '                                        <th>{{\'email\' |translate}}</th>\n' +
    '                                        <th>{{\'phone\'|translate}}</th>\n' +
    '                                    </tr>\n' +
    '                                </thead>\n' +
    '                                <tbody>\n' +
    '                                    <tr ng-repeat="userDetail in userObj.tenant.users">\n' +
    '\n' +
    '                                        <td>{{userDetail.username}}</td>\n' +
    '\n' +
    '\n' +
    '                                        <td>{{userDetail.users.email}}</td>\n' +
    '                                        <td>{{userDetail.users.email}}</td>\n' +
    '\n' +
    '                                    </tr>\n' +
    '\n' +
    '                                </tbody>\n' +
    '                            </table>\n' +
    '                        </div>\n' +
    '                    </tr> -->\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="userRetailerCtrl.totalCount"\n' +
    '        paging-action="userRetailerCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/Delete/templates/ConfirmDeleteDialog.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-body">{{\'deleteConfirmationLbl\' | translate}}<strong>{{deleteDlCtrl.itemName}}</strong> {{deleteDlCtrl.message}}? </div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button class="btn pmd-ripple-effect btn-primary pmd-btn-flat" type="button" ng-click="deleteDlCtrl.Confirm()">{{\'deleteBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button" ng-click="deleteDlCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/login/templates/login.html',
    '<div class="logincard" ng-if="!isLoggedIn()">\n' +
    '    <div class="pmd-card card-default pmd-z-depth">\n' +
    '        <div class="login-card">\n' +
    '            <form ng-submit="submit(username,password)" name="loginForm">\n' +
    '                <div class="pmd-card-body">\n' +
    '                    <div class="alert alert-success"> Oh snap! Change a few things up and try submitting again. </div>\n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">User Name</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">perm_identity</i>\n' +
    '                            </div>\n' +
    '                            <input type="text" class="form-control" id="exampleInputAmount" required name="username"\n' +
    '                                ng-model="username" ng-change="reset()">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">Password</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">lock_outline</i>\n' +
    '                            </div>\n' +
    '                            <input required type="password" name="password" ng-model="password" ng-change="reset()"\n' +
    '                                minlength="6" class="form-control">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="invalidLoginInfo" class="loginFailed">\n' +
    '                    <span>Incorrect username or password.</span>\n' +
    '                </div>\n' +
    '                <div ng-if="inActiveUser" class="loginFailed">\n' +
    '                    <span>{{errorMessage}}\n' +
    '                        <!-- / Your Account Is Disabled, Please contact to administrator. -->\n' +
    '                    </span>\n' +
    '                </div>\n' +
    '                <div class="pmd-card-footer card-footer-no-border card-footer-p16 text-center">\n' +
    '                    <button type="submit" style="\n' +
    '                      width: 65%;\n' +
    '    color: #ffffff!important;\n' +
    '   border-color: #202232;\n' +
    '    border-radius: 11px;\n' +
    '    letter-spacing: 1px;\n' +
    '    font-size: 15px;\n' +
    '    font-family: \'Montserrat\',Helvetica,Arial,Lucida,sans-serif!important;\n' +
    '    font-weight: 408!important;\n' +
    '    text-transform: uppercase!important;\n' +
    '    background-color: #2a2a30;" class="btn pmd-ripple-effect btn-primary btn-block">Login</button>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '    </div>\n' +
    '</div>');
}]);
