angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ArtWork/templates/ArtWork.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"> \n' +
    '        <button\n' +
    '         style="background: linear-gradient(90deg,#f7e483,#dbba5a 57%,#a36d31);\n' +
    '        border-radius: 17px;" \n' +
    '        ng-click="$state.go(\'newArtWork\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '            type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="ArtWorkList.length == null">\n' +
    '        <span>{{\'NoArtWorksAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="ArtWorkList.length > 0">\n' +
    '        <div class="table-responsive" style="border: 1px solid #21231e;\n' +
    '        border-radius: 20px;\n' +
    '        background-color: #0e0e0e;\n' +
    '        box-shadow: 0 0 10px 5px rgba(0,0,0,.35);\n' +
    '    ">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'poster\' | translate}}</th>\n' +
    '                        <th>{{\'title\' | translate}}</th>\n' +
    '                        <th>{{\'award\' | translate}}</th>\n' +
    '                        <th>{{\'fileCount\' | translate}}</th>\n' +
    '                        <th>{{\'Ready for review\' | translate}}</th>\n' +
    '                        <th>{{\'paymentStatus\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="ArtWork in ArtWorkList"\n' +
    '                        ng-class="{waiting:ArtWork.payment.paymentStatus == \'waiting\'}">\n' +
    '                        <td>\n' +
    '                            <img style="width: 70px;height: 70px;" data-ng-src="{{ArtWork.posterUrl}}" />\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{ArtWork.title[selectedLanguage]   | limitTo : 20}}\n' +
    '                            {{ArtWork.title[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{ArtWork.award.title[selectedLanguage]   | limitTo : 20}}\n' +
    '                            {{ArtWork.award.title.length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td data-title="uploadComplete">\n' +
    '                            {{ArtWork.fileCount}}\n' +
    '                        </td>\n' +
    '                        <td data-title="uploadComplete">\n' +
    '                            {{ArtWork.uploadComplete}}\n' +
    '                        </td>\n' +
    '                        <td data-title="paymentStatus">\n' +
    '                            {{ArtWork.payment.paymentStatus}}\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md perm_media font25"\n' +
    '                                ng-click="$state.go(\'editArtWork\',{id: ArtWork.id});" title="Edit">mode_edit</i>\n' +
    '\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md perm_media font25"\n' +
    '                                ng-click="$state.go(\'ArtWorkpayment\',{id: ArtWork.id});" title="payment">payment</i>\n' +
    '\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md perm_media font25"\n' +
    '                                ng-click="$state.go(\'newArtWorkMedia\',{id: ArtWork.id});" title="media">perm_media</i>\n' +
    '\n' +
    '                            <!-- <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'ArtWorkpayment\',{id: ArtWork.id});" title="payment"><img\n' +
    '                                    src="../../../../assets/img/payment.png"></img></i>\n' +
    '\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'newArtWorkMedia\',{id: ArtWork.id});" title="media"><img\n' +
    '                                    src="../../../../assets/img/media.png"></img></i> -->\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="ArtWorkCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ArtWork/templates/edit.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'EditArtWork\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editArtWorkForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in editArtWorkCtrl.language">\n' +
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
    '                                ng-repeat="lang in editArtWorkCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="title{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editArtWorkCtrl.ArtWork.title[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="editArtWorkForm.title{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editArtWorkForm.title{{lang.value+\'Name\'}}.$error.required && !editArtWorkForm.title{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editArtWorkForm.title{{lang.value+\'Name\'}}.$error.minlength || editArtWorkForm.title{{lang.value+\'Name\'}}.$error.maxlength) && !editArtWorkForm.title{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <!-- <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <textarea required class="mat-input form-control"\n' +
    '                                        name="showDescription{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editArtWorkCtrl.ArtWork.showDescription[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="955"></textarea>\n' +
    '                                    <div ng-messages="editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.required && !editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.minlength || editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.maxlength) && !editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div> -->\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ \'Body\' | translate}} </label>\n' +
    '                                    <textarea   class="mat-input form-control"\n' +
    '                                        name="showDescription{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editArtWorkCtrl.ArtWork.showDescription[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="955"></textarea>\n' +
    '                                    <div ng-messages="editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.required && !editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.minlength || editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.maxlength) && !editArtWorkForm.showDescription{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Award\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important"\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="editArtWorkCtrl.selectedAward"\n' +
    '                            ng-options="group as group.title[selectedLanguage]  for group in editArtWorkCtrl.awardList">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4"> <label for="first-name">{{\'Nominee\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important"\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="editArtWorkCtrl.selectedNominee"\n' +
    '                            ng-options="group as group.firstName  for group in editArtWorkCtrl.nomineeList">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'FilesCount\' | translate}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="fileCount" numbers-only\n' +
    '                            style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                            ng-model="editArtWorkCtrl.ArtWork.fileCount" />\n' +
    '                        <!-- required validation  -->\n' +
    '                        <div ng-messages="editArtWorkForm.fileCount.$error">\n' +
    '                            <div class="error" ng-if="editArtWorkForm.fileCount.$error.required && \n' +
    '                                        !editArtWorkForm.fileCount.$pristine">\n' +
    '                                {{\'requiredErr\' |  translate}}\n' +
    '                            </div>\n' +
    '                            <!-- length validation -->\n' +
    '                            <div class="error" ng-if="(editArtWorkForm.fileCount.$error.minlength ||\n' +
    '                                            editArtWorkForm.fileCount.$error.maxlength) \n' +
    '                                             && !editArtWorkForm.fileCount.newfileCount.$error.required">\n' +
    '                                {{\'PhoneLengthError\' |  translate}}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Production\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags"\n' +
    '                            ng-model="editArtWorkCtrl.ArtWork.production" > \n' +
    '\n' +
    '                        </select> \n' +
    '                            <!-- ng-options="group for group  in editArtWorkCtrl.productionList"> -->\n' +
    '\n' +
    '                        {{editArtWorkCtrl.ArtWork.production}}\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4"> <label for="first-name">{{\'Director\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="editArtWorkCtrl.ArtWork.director">\n' +
    '                        </select>\n' +
    '                        {{editArtWorkCtrl.ArtWork.director}}\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4"> <label for="first-name">{{\'Country\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important"\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="editArtWorkCtrl.selectedCountry"\n' +
    '                            ng-options="group as group.shortName  for group in editArtWorkCtrl.countryList">\n' +
    '                        </select> \n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Writers\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="editArtWorkCtrl.ArtWork.writers">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Story\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags"\n' +
    '                            ng-model="editArtWorkCtrl.ArtWork.story">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'DateOfRelease\' | translate}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="dateOfRelease" numbers-only\n' +
    '                            style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                            ng-model="editArtWorkCtrl.ArtWork.dateOfRelease" required />\n' +
    '                        <!-- required validation  -->\n' +
    '                        <div ng-messages="editArtWorkForm.dateOfRelease.$error">\n' +
    '                            <div class="error" ng-if="editArtWorkForm.dateOfRelease.$error.required && \n' +
    '                                        !editArtWorkForm.dateOfRelease.$pristine">\n' +
    '                                {{\'requiredErr\' |  translate}}\n' +
    '                            </div>\n' +
    '                            <!-- length validation -->\n' +
    '                            <div class="error" ng-if="(editArtWorkForm.dateOfRelease.$error.minlength ||\n' +
    '                                            editArtWorkForm.dateOfRelease.$error.maxlength) \n' +
    '                                             && !editArtWorkForm.dateOfRelease.dateOfRelease.$error.required">\n' +
    '                                {{\'PhoneLengthError\' |  translate}}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Crew\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="editArtWorkCtrl.ArtWork.crew">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <span style="color:red">*</span>\n' +
    '                        <input id="posterImage" name="posterImage" style="display: none;"\n' +
    '                            onchange="angular.element(this).scope().AddposterImage(this.files)" type="file" required>\n' +
    '                        <button class="btn btn-success btn-xs pull-center"\n' +
    '                            ng-click="editArtWorkCtrl.LoadUploadPoster()">{{\'Upload Cover\' | translate}}</button>\n' +
    '                        <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                            {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '                        <img ng-src="{{editArtWorkCtrl.posterImage}}" style="max-height: 139px;max-width: 423px;">\n' +
    '                        <div ng-messages="editArtWorkForm.posterImage.$error">\n' +
    '                            <div ng-if="editArtWorkForm.posterImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                        </div>\n' +
    '\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <span style="color:red">*</span>\n' +
    '                        <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                            Trailer</label>\n' +
    '                        <input id="image" class="hidden" type="file" img-upload ng-model="imageName" name="imageName">\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div> \n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="editArtWorkForm.$invalid "\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editArtWorkCtrl.UpdateArtWork()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editArtWorkCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/ArtWork/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewArtWorkBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newArtWorkForm">\n' +
    '            <div id="stepOne" ng-show="newArtWorkCtrl.showStepOne">\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newArtWorkCtrl.language">\n' +
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
    '                                ng-repeat="lang in newArtWorkCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ \'Title\' | translate}} </label>\n' +
    '                                    <input required News="text" class="mat-input form-control"\n' +
    '                                        name="title{{lang.value+\'Name\'}}" ng-model="newArtWorkCtrl.Title[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="newArtWorkForm.title{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="newArtWorkForm.title{{lang.value+\'Name\'}}.$error.required && !newArtWorkForm.title{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(newArtWorkForm.title{{lang.value+\'Name\'}}.$error.minlength || newArtWorkForm.title{{lang.value+\'Name\'}}.$error.maxlength) && !newArtWorkForm.title{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ \'ShowDescription\' | translate}} </label>\n' +
    '                                    <textarea required class="mat-input form-control"\n' +
    '                                        name="ShowDescription{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newArtWorkCtrl.ShowDescription[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="955"></textarea>\n' +
    '                                    <div ng-messages="newArtWorkForm.ShowDescription{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="newArtWorkForm.ShowDescription{{lang.value+\'Name\'}}.$error.required && !newArtWorkForm.ShowDescription{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(newArtWorkForm.ShowDescription{{lang.value+\'Name\'}}.$error.minlength || newArtWorkForm.ShowDescription{{lang.value+\'Name\'}}.$error.maxlength) && !newArtWorkForm.ShowDescription{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="row">\n' +
    '                    \n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Award\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important"\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="newArtWorkCtrl.selectedAward"\n' +
    '                            ng-options="group as group.title[selectedLanguage] for group in newArtWorkCtrl.awardList">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4"> <label for="first-name">{{\'Nominee\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important"\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="newArtWorkCtrl.selectedNominee"\n' +
    '                            ng-options="group as group.firstName  for group in newArtWorkCtrl.nomineeList">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'FilesCount\' | translate}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="fileCount" numbers-only\n' +
    '                            style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                            ng-model="newArtWorkCtrl.FileCount" />\n' +
    '                        <!-- required validation  -->\n' +
    '                        <div ng-messages="newArtWorkForm.fileCount.$error">\n' +
    '                            <div class="error" ng-if="newArtWorkForm.fileCount.$error.required && \n' +
    '                                        !newArtWorkForm.fileCount.$pristine">\n' +
    '                                {{\'requiredErr\' |  translate}}\n' +
    '                            </div>\n' +
    '                            <!-- length validation -->\n' +
    '                            <div class="error" ng-if="(newArtWorkForm.fileCount.$error.minlength ||\n' +
    '                                            newArtWorkForm.fileCount.$error.maxlength) \n' +
    '                                             && !newArtWorkForm.fileCount.newfileCount.$error.required">\n' +
    '                                {{\'PhoneLengthError\' |  translate}}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Production\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="newArtWorkCtrl.Production">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4"> <label for="first-name">{{\'Director\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="newArtWorkCtrl.Director">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4"> <label for="first-name">{{\'Country\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important"\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="newArtWorkCtrl.selectedCountry"\n' +
    '                            ng-options="group as group.shortName  for group in newArtWorkCtrl.countryList">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Writers\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="newArtWorkCtrl.Writers">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4"> <label for="first-name">{{\'Story\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="newArtWorkCtrl.Story">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'DateOfRelease\' | translate}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="dateOfRelease" numbers-only\n' +
    '                            style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                            ng-model="newArtWorkCtrl.DateOfRelease" required />\n' +
    '                        <!-- required validation  -->\n' +
    '                        <div ng-messages="newArtWorkForm.dateOfRelease.$error">\n' +
    '                            <div class="error" ng-if="newArtWorkForm.dateOfRelease.$error.required && \n' +
    '                                        !newArtWorkForm.dateOfRelease.$pristine">\n' +
    '                                {{\'requiredErr\' |  translate}}\n' +
    '                            </div>\n' +
    '                            <!-- length validation -->\n' +
    '                            <div class="error" ng-if="(newArtWorkForm.dateOfRelease.$error.minlength ||\n' +
    '                                            newArtWorkForm.dateOfRelease.$error.maxlength) \n' +
    '                                             && !newArtWorkForm.dateOfRelease.dateOfRelease.$error.required">\n' +
    '                                {{\'PhoneLengthError\' |  translate}}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <label for="first-name">{{\'Crew\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="select-add-tags form-control pmd-select2-tags" ng-model="newArtWorkCtrl.Crew">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <span style="color:red">*</span> \n' +
    '\n' +
    '                        <input id="posterImage" name="posterImage" style="display: none;"\n' +
    '                            onchange="angular.element(this).scope().AddposterImage(this.files)" type="file" required>\n' +
    '                        <button class="btn btn-success btn-xs pull-center"\n' +
    '                            ng-click="newArtWorkCtrl.LoadUploadPoster()">{{\'Upload Cover\' | translate}}</button>\n' +
    '                        <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                            {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '                        <img ng-src="{{newArtWorkCtrl.posterImage}}" style="max-height: 139px;max-width: 423px;">\n' +
    '                        <div ng-messages="newArtWorkForm.posterImage.$error">\n' +
    '                            <div ng-if="newArtWorkForm.posterImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                        </div>\n' +
    '\n' +
    '                    </div>\n' +
    '\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <span style="color:red">*</span>\n' +
    '                        <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                            Trailer</label>\n' +
    '                        <input id="image" class="hidden" type="file" img-upload ng-model="imageName" name="imageName">\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="pmd-modal-action text-right">\n' +
    '                    <button\n' +
    '                        style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                        ng-disabled="newArtWorkForm.$invalid ||  newArtWorkCtrl.selectedNominee ==null ||  newArtWorkCtrl.selectedAward ==null"\n' +
    '                        class="btn pmd-ripple-effect btn-primary" ArtWork="button"\n' +
    '                        ng-click="newArtWorkCtrl.AddNewArtWork()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '                    <button class="btn pmd-ripple-effect btn-default" ArtWork="button"\n' +
    '                        ng-click="newArtWorkCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '                </div>\n' +
    '                <!-- <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '                    ng-click="newArtWorkCtrl.nextStep()">{{\'Next\' | translate}}</button> -->\n' +
    '            </div>\n' +
    '          \n' +
    '        </form>\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-add-tags").select2({\n' +
    '            tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '            // insertTag: function (data, tag) {\n' +
    '            //     data.push(tag);\n' +
    '            // }\n' +
    '        });\n' +
    '        // $(".select-with-search").select2({\n' +
    '        //     theme: "bootstrap"\n' +
    '        // });\n' +
    '\n' +
    '        var today = new Date();\n' +
    '        today.setDate(today.getDate() + 1)\n' +
    '\n' +
    '        $(\'#paymentDate\').datetimepicker({\n' +
    '            widgetPositioning: { vertical: "bottom" },\n' +
    '            minDate: today,\n' +
    '        })\n' +
    '            .on(\'dp.change\', function (e) {\n' +
    '                debugger;\n' +
    '                angular.element(document.getElementById(\'paymentDate\')).scope().dateChange();\n' +
    '            });\n' +
    '\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ArtWork/templates/payment.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewArtWorkBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="artWorkPaymentForm">\n' +
    '\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-4">\n' +
    '                    <label for="first-name">{{\'Amount\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Amount" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                        ng-model="artWorkPaymentCtrl.artWorkPayment.amount" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="artWorkPaymentForm.Amount.$error">\n' +
    '                        <div class="error" ng-if="artWorkPaymentForm.Amount.$error.required && \n' +
    '                                        !artWorkPaymentForm.Amount.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(artWorkPaymentForm.Amount.$error.minlength ||\n' +
    '                                            artWorkPaymentForm.Amount.$error.maxlength) \n' +
    '                                             && !artWorkPaymentForm.Amount.newAmount.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="form-group col-lg-4">\n' +
    '                    <label><span style="color:red">*</span> {{\'TransactionNumber\' | translate}}</label>\n' +
    '                    <input type="text" class="form-control" name="TransactionNumber" style="display: inline-block; "\n' +
    '                        ng-model="artWorkPaymentCtrl.artWorkPayment.transactionNumber" required />\n' +
    '                    <div class="error" ng-messages="artWorkPaymentForm.TransactionNumber.$error">\n' +
    '                        <div ng-if="artWorkPaymentForm.TransactionNumber.$error.required && \n' +
    '                            !artWorkPaymentForm.TransactionNumber.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="form-group col-lg-4">\n' +
    '                    <label><span style="color:red">*</span> {{\'PaymentDate\' | translate}}</label>\n' +
    '\n' +
    '                    <input name="itemDatetime" ng-model="itemDatetime" type="text" id="paymentDate" class="form-control"\n' +
    '                        ng-change="dateChange();" />\n' +
    '                    <div ng-messages="artWorkPaymentForm.paymentDate.$error">\n' +
    '                        <div\n' +
    '                            ng-if="artWorkPaymentForm.paymentDate.$error.required && !artWorkPaymentForm.paymentDate.$pristine">\n' +
    '                            {{\'paymentDateReqError\' | translate}}</div>\n' +
    '                        <div\n' +
    '                            ng-if="(artWorkPaymentForm.paymentDate.$error.minlength || artWorkPaymentForm.paymentDate.$error.maxlength)">\n' +
    '                            {{\'paymentDateLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                    <!-- \n' +
    '                        <input type="text" class="form-control" name="PaymentDate" style="display: inline-block; "\n' +
    '                            ng-model="artWorkPaymentCtrl.PaymentDate" required /> -->\n' +
    '                    <div class="error" ng-messages="artWorkPaymentForm.PaymentDate.$error">\n' +
    '                        <div ng-if="artWorkPaymentForm.PaymentDate.$error.required && \n' +
    '                            !artWorkPaymentForm.PaymentDate.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    ' \n' +
    '                <div class="form-group col-lg-4">\n' +
    '                    <span style="color:red">*</span>\n' +
    '\n' +
    '                    <input id="receiptImage" name="receiptImage" style="display: none;"\n' +
    '                        onchange="angular.element(this).scope().AddreceiptImage(this.files)" type="file"  >\n' +
    '                    <button class="btn btn-success btn-xs pull-center"\n' +
    '                        ng-click="artWorkPaymentCtrl.LoadUploadreceipt()">{{\'Upload Receipt\' | translate}}</button>\n' +
    '                    <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                        {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '                    <img ng-src="{{artWorkPaymentCtrl.receiptImage}}" style="max-height: 139px;max-width: 423px;">\n' +
    '                    <div ng-messages="artWorkPaymentForm.receiptImage.$error">\n' +
    '                        <div ng-if="artWorkPaymentForm.receiptImage.$error.required">{{\'requiredErr\' | translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                                Receipt</label>\n' +
    '                            <input class="hidden" type="file"\n' +
    '                                onchange="angular.element(this).scope().uploadReceiptFile(this)" ng-model="receipt"\n' +
    '                                name="receiptName">\n' +
    '                            <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '                            <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                {{\'RecommendedProductImage\' | translate}}</span> -->\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-4">\n' +
    '                    <label for="first-name">{{\'Allow To upload Media\' | translate}}</label>\n' +
    '                    <input type="checkbox" ng-checked="artWorkPaymentCtrl.artWorkPayment.paymentStatus==\'confirmed\'"\n' +
    '                     ng-model="artWorkPaymentCtrl.artWorkPayment.paymentStatus">\n' +
    '                </div>\n' +
    '            </div> \n' +
    '            <div class="pmd-modal-action text-right">\n' +
    '                <button ng-show="artWorkPaymentCtrl.artWorkPayment == null"\n' +
    '                    style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                    ng-disabled="artWorkPaymentForm.$invalid" class="btn pmd-ripple-effect btn-primary" ArtWork="button"\n' +
    '                    ng-click="artWorkPaymentCtrl.AddNewArtWork()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '                <button ng-show="artWorkPaymentCtrl.artWorkPayment != null"\n' +
    '                    style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '                    ng-disabled="artWorkPaymentForm.$invalid" class="btn pmd-ripple-effect btn-primary" ArtWork="button"\n' +
    '                    ng-click="artWorkPaymentCtrl.UpdatePayment()">{{\'saveChangesBtnupdate\' | translate}}</button>\n' +
    '                <button class="btn pmd-ripple-effect btn-default" ArtWork="button"\n' +
    '                    ng-click="artWorkPaymentCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '\n' +
    '</div>\n' +
    '<script type="text/javascript">\n' +
    '    $(document).ready(function () {\n' +
    '        $(".select-add-tags").select2({\n' +
    '            tags: true,\n' +
    '            theme: "bootstrap",\n' +
    '            // insertTag: function (data, tag) {\n' +
    '            //     data.push(tag);\n' +
    '            // }\n' +
    '        });\n' +
    '        // $(".select-with-search").select2({\n' +
    '        //     theme: "bootstrap"\n' +
    '        // });\n' +
    '\n' +
    '        var today = new Date();\n' +
    '        today.setDate(today.getDate() + 1)\n' +
    '\n' +
    '        $(\'#paymentDate\').datetimepicker({\n' +
    '            widgetPositioning: { vertical: "bottom" },\n' +
    '            minDate: today,\n' +
    '        })\n' +
    '            .on(\'dp.change\', function (e) {\n' +
    '                debugger;\n' +
    '                angular.element(document.getElementById(\'paymentDate\')).scope().dateChange();\n' +
    '            });\n' +
    '\n' +
    '    });\n' +
    '</script>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ArtWorkMedia/templates/ArtWork.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '        <!-- <div id="bold"> {{\'AddNewArtWorkBtn\'| translate}} </div> -->\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newArtWork\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="ArtWorkList.length == null">\n' +
    '        <span>{{\'NoArtWorksAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="ArtWorkList.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'title\' | translate}}</th>\n' +
    '                        <th>{{\'StatusLbl\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="ArtWork in ArtWorkList">\n' +
    '                        <td data-title="Name">\n' +
    '                            {{ArtWork.title[selectedLanguage]   | limitTo : 20}}\n' +
    '                            {{ArtWork.title[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td ng-show="!ArtWork.outdated">\n' +
    '                            <div ng-if="user.PermessionModules[\'ArtWork\'].includes(\'view\')==true">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':ArtWork.outdated}"\n' +
    '                                    ng-model="ArtWork.outdated" ng-click="ArtWorkCtrl.ChangeStatus(ArtWork)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':ArtWork.outdated}"\n' +
    '                                        ng-model="ArtWork.outdated" ng-click="ArtWorkCtrl.ChangeStatus(ArtWork)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </td>\n' +
    '                        <td ng-show="ArtWork.outdated">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':ArtWork.outdated}"\n' +
    '                                ng-click="ArtWorkCtrl.ChangeStatus(ArtWork)" ng-model="ArtWork.outdated">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':ArtWork.outdated}"\n' +
    '                                    ng-click="ArtWorkCtrl.ChangeStatus(ArtWork)" ng-model="ArtWork.outdated">\n' +
    '                                </div>\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.PermessionModules[\'ArtWork\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editArtWork\',{id: ArtWork.id});" title="Edit">mode_edit</i>\n' +
    '                            <i ng-show="user.PermessionModules[\'ArtWork\'].includes(\'remove\')"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="ArtWorkCtrl.openDeleteDialog(ArtWork,ArtWork.title[selectedLanguage] ,ArtWork.id)"\n' +
    '                                title="Delete">delete</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="ArtWorkCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/ArtWorkMedia/templates/edit.html',
    '<div id="bold">\n' +
    '    {{\'EditArtWork\' | translate}}\n' +
    '</div>\n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'ArtWorkLbl\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editArtWorkForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editArtWorkCtrl.language">\n' +
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
    '                                ng-repeat="lang in editArtWorkCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="title{{lang.value+\'Name\'}}" ng-model="editArtWorkCtrl.ArtWork.title[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="editArtWorkForm.title{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editArtWorkForm.title{{lang.value+\'Name\'}}.$error.required && !editArtWorkForm.title{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editArtWorkForm.title{{lang.value+\'Name\'}}.$error.minlength || editArtWorkForm.title{{lang.value+\'Name\'}}.$error.maxlength) && !editArtWorkForm.title{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <textarea required type="text" class="mat-input form-control"\n' +
    '                                        name="body{{lang.value+\'Name\'}}" ng-model="editArtWorkCtrl.ArtWork.body[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="955"></textarea>\n' +
    '                                    <div ng-messages="editArtWorkForm.body{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editArtWorkForm.body{{lang.value+\'Name\'}}.$error.required && !editArtWorkForm.body{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editArtWorkForm.body{{lang.value+\'Name\'}}.$error.minlength || editArtWorkForm.body{{lang.value+\'Name\'}}.$error.maxlength) && !editArtWorkForm.body{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                                <span style="color:red">*</span>\n' +
    '                                <label for="image" class="btn btn-success btn-xs pull-center" name="upload"\n' +
    '                                    Value="">Upload\n' +
    '                                    Photo</label>\n' +
    '                                <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                                    name="imageName">\n' +
    '                                <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '\n' +
    '                                <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                    {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '\n' +
    '                            </div>\n' +
    '\n' +
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
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="editArtWorkForm.$invalid ||  file ==null" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editArtWorkCtrl.UpdateArtWork()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editArtWorkCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/ArtWorkMedia/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewArtWorkMediaBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newArtWorkMediaForm">\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-4">\n' +
    '                    <div ng-repeat="n in [] | range:newArtWorkMediaCtrl.filesCount">\n' +
    '                        <!-- \n' +
    '                        <div ">\n' +
    '                            <input type="file" file-model="{{\'myFile\' + $index}}"/>\n' +
    '                            <button ng-click="uploadFile(\'myFile\' + $index)">upload me</button>\n' +
    '                        </div> -->\n' +
    '                        <!-- Nav tabs -->\n' +
    '                        <ul class="nav nav-tabs" role="tablist">\n' +
    '                            <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in newArtWorkMediaCtrl.language">\n' +
    '                                <a href="javascript:void(0);" data-target="#{{lang.value}}-n-form" aria-controls="home"\n' +
    '                                    role="tab" data-toggle="tab">\n' +
    '                                    <span style="color:red">*</span>{{lang.value | translate}}\n' +
    '                                </a>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                        <div class="pmd-card">\n' +
    '                            <div class="pmd-card-body">\n' +
    '                                <!-- Tab panes -->\n' +
    '                                <div class="tab-content">\n' +
    '                                    <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                        ng-repeat="lang in newArtWorkMediaCtrl.language" id="{{lang.value}}-n-form">\n' +
    '                                        <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                            <label for="first-name">{{ \'Title\' | translate}} </label>\n' +
    '                                            <input required News="text" class="mat-input form-control"\n' +
    '                                                name="title{{lang.value+n+\'Name\'}}"\n' +
    '                                                ng-model="newArtWorkMediaCtrl.Title[lang.key]" ng-minlength="3"\n' +
    '                                                ng-maxlength="255">\n' +
    '                                            <div ng-messages="newArtWorkMediaForm.title{{lang.value+n+\'Name\'}}.$error">\n' +
    '\n' +
    '                                                <div class="error ng-binding"\n' +
    '                                                    ng-show="newArtWorkMediaForm.title{{lang.value+n+\'Name\'}}.$error.required && !newArtWorkMediaForm.title{{lang.value+n+\'Name\'}}.$pristine">\n' +
    '                                                    {{\'requiredErr\' | translate}}</div>\n' +
    '                                                <div class="error ng-binding"\n' +
    '                                                    ng-show="(newArtWorkMediaForm.title{{lang.value+n+\'Name\'}}.$error.minlength || newArtWorkMediaForm.title{{lang.value+n+\'Name\'}}.$error.maxlength) && !newArtWorkMediaForm.title{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                    {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <input id="{{mediaImage + $index}}" name="{{mediaImage + $index}}" style="display: none;"\n' +
    '                            onchange="angular.element(this).scope().AddmediaImage(this.files)" type="file" required\n' +
    '                            file-change handler="fileSelect(files)" ng-repeat="file in newArtWorkMediaCtrl.filesCount">\n' +
    '                        <button class="btn btn-success btn-xs pull-center"\n' +
    '                            ng-click="newArtWorkMediaCtrl.LoadUploadmedia()">{{\'Upload Video\' | translate}}</button>\n' +
    '\n' +
    '                        <div ng-messages="newArtWorkMediaForm.mediaImage.$error">\n' +
    '                            <div ng-if="newArtWorkMediaForm.mediaImage.$error.required">{{\'requiredErr\' | translate}}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newArtWorkMediaForm.$invalid"\n' +
    '            class="btn pmd-ripple-effect btn-primary" ArtWorkMedia="button"\n' +
    '            ng-click="newArtWorkMediaCtrl.AddNewArtWorkMedia()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" ArtWorkMedia="button"\n' +
    '            ng-click="newArtWorkMediaCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/Award/templates/Award.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '        <!-- <div id="bold"> {{\'AddNewAwardBtn\'| translate}} </div> -->\n' +
    '        <!-- <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newAward\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button> -->\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="AwardList.length == null">\n' +
    '        <span>{{\'NoAwardsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="AwardList.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'title\' | translate}}</th>\n' +
    '                        <th>{{\'description\' | translate}}</th>\n' +
    '                        <th>{{\'manager\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="Award in AwardList">\n' +
    '                        <td data-title="Name">\n' +
    '                            {{Award.title[selectedLanguage]  | limitTo : 20}}\n' +
    '                            {{Award.title[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            {{Award.description[selectedLanguage]  | limitTo : 60}}\n' +
    '                            {{Award.description[selectedLanguage].length > 60 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{Award.manager.firstName }} - {{Award.manager.lastName}}\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editAward\',{id: Award.id});" title="Edit">mode_edit</i>\n' +
    '\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="AwardCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Award/templates/edit.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-description-text">{{\'EditAward\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editAwardForm">\n' +
    '            <div>\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-6">\n' +
    '                        <!-- Nav tabs -->\n' +
    '                        <ul class="nav nav-tabs" role="tablist">\n' +
    '                            <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                                ng-repeat="lang in editAwardCtrl.language">\n' +
    '                                <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home"\n' +
    '                                    role="tab" data-toggle="tab">\n' +
    '                                    <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                                </a>\n' +
    '                            </li>\n' +
    '                        </ul>\n' +
    '                        <div class="pmd-card">\n' +
    '                            <div class="pmd-card-discription">\n' +
    '                                <!-- Tab panes -->\n' +
    '                                <div class="tab-content">\n' +
    '                                    <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                        ng-repeat="lang in editAwardCtrl.language" id="{{lang.value}}-form">\n' +
    '                                        <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                            <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                            <input required type="text" class="mat-input form-control"\n' +
    '                                                name="title{{lang.value+\'Name\'}}"\n' +
    '                                                ng-model="editAwardCtrl.Award.title[lang.key]" ng-minlength="3"\n' +
    '                                                ng-maxlength="255">\n' +
    '                                            <div ng-messages="editAwardForm.title{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                                <div class="error ng-binding"\n' +
    '                                                    ng-show="editAwardForm.title{{lang.value+\'Name\'}}.$error.required && !editAwardForm.title{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                                    {{\'requiredErr\' | translate}}</div>\n' +
    '                                                <div class="error ng-binding"\n' +
    '                                                    ng-show="(editAwardForm.title{{lang.value+\'Name\'}}.$error.minlength || editAwardForm.title{{lang.value+\'Name\'}}.$error.maxlength) && !editAwardForm.title{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                    {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                            <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                            <textarea required type="text" class="mat-input form-control"\n' +
    '                                                name="description{{lang.value+\'Name\'}}"\n' +
    '                                                ng-model="editAwardCtrl.Award.description[lang.key]" ng-minlength="3"\n' +
    '                                                ng-maxlength="955"></textarea>\n' +
    '                                            <div ng-messages="editAwardForm.description{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                                <div class="error ng-binding"\n' +
    '                                                    ng-show="editAwardForm.description{{lang.value+\'Name\'}}.$error.required && !editAwardForm.description{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                                    {{\'requiredErr\' | translate}}</div>\n' +
    '                                                <div class="error ng-binding"\n' +
    '                                                    ng-show="(editAwardForm.description{{lang.value+\'Name\'}}.$error.minlength || editAwardForm.description{{lang.value+\'Name\'}}.$error.maxlength) && !editAwardForm.description{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                    {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '\n' +
    '                                    </div>\n' +
    '\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '                <div class="row">\n' +
    '                    <div class="form-group col-lg-6">\n' +
    '                        <label for="first-name">{{\'Manager\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important"\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="editAwardCtrl.selectedManager"\n' +
    '                            ng-options="group as group.firstName +\' \'+ group.lastName for group in editAwardCtrl.ManagerList">\n' +
    '                        </select>\n' +
    '\n' +
    '                    </div>\n' +
    '                    <div class="form-group col-lg-6">\n' +
    '\n' +
    '                        <label for="first-name">{{\'Judges\' | translate}}</label>\n' +
    '                        <select required style="width:100% !important" multiple\n' +
    '                            class="form-control select-with-search pmd-select2-tags"\n' +
    '                            ng-model="editAwardCtrl.selectedJudges"\n' +
    '                            ng-options="group as group.firstName +\' \'+ group.lastName  for group in editAwardCtrl.judgesList">\n' +
    '                        </select>\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editAwardCtrl.UpdateAward()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editAwardCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/Award/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewBoothBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newBoothForm">\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-12">\n' +
    '                    <img src="../../../../assets/img/booth.jpg" style="height: 350px;\n' +
    '                    width: 80%;" />\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                            ng-repeat="lang in newBoothCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home"\n' +
    '                                role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span>{{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                    ng-repeat="lang in newBoothCtrl.language" id="{{lang.value}}-form">\n' +
    '\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                        <label for="first-name">{{ \'Description\' | translate}} </label>\n' +
    '                                        <textarea required class="mat-input form-control"\n' +
    '                                            name="Description{{lang.value+\'Name\'}}"\n' +
    '                                            ng-model="newBoothCtrl.Description[lang.key]" ng-minlength="3"\n' +
    '                                            ng-maxlength="955"></textarea>\n' +
    '                                        <div ng-messages="newBoothForm.Description{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="newBoothForm.Description{{lang.value+\'Name\'}}.$error.required && !newBoothForm.Description{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                                {{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="(newBoothForm.Description{{lang.value+\'Name\'}}.$error.minlength || newBoothForm.Description{{lang.value+\'Name\'}}.$error.maxlength) && !newBoothForm.Description{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Code\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Code" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                        ng-model="newBoothCtrl.Code" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="newBoothForm.Code.$error">\n' +
    '                        <div class="error" ng-if="newBoothForm.Code.$error.required && \n' +
    '                                    !newBoothForm.Code.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(newBoothForm.Code.$error.minlength ||\n' +
    '                                        newBoothForm.Code.$error.maxlength) \n' +
    '                                         && !newBoothForm.Code.newCode.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Price\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Price" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                        ng-model="newBoothCtrl.Price" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="newBoothForm.Price.$error">\n' +
    '                        <div class="error" ng-if="newBoothForm.Price.$error.required && \n' +
    '                                    !newBoothForm.Price.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(newBoothForm.Price.$error.minlength ||\n' +
    '                                        newBoothForm.Price.$error.maxlength) \n' +
    '                                         && !newBoothForm.Price.newPrice.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newBoothForm.$invalid" class="btn pmd-ripple-effect btn-primary" Booth="button"\n' +
    '            ng-click="newBoothCtrl.AddNewBooth()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Booth="button"\n' +
    '            ng-click="newBoothCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/Booth/templates/Booth.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '        <!-- <div id="bold"> {{\'AddNewBoothBtn\'| translate}} </div> -->\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newBooth\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="BoothList.length == null">\n' +
    '        <span>{{\'NoBoothsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="BoothList.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'code\' | translate}}</th>\n' +
    '                        <th>{{\'price\' | translate}}</th>\n' +
    '                        <th>{{\'description\' | translate}}</th>\n' +
    '                        <th>{{\'details\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat-start="Booth in BoothList">\n' +
    '\n' +
    '                        <td data-title="code">\n' +
    '                            {{Booth.code}}\n' +
    '                        </td>\n' +
    '                        <td data-title="code">\n' +
    '                            {{Booth.price}}\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{Booth.description[selectedLanguage]  | limitTo : 20}}\n' +
    '                            {{Booth.description[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td class="pmd-table-row-action">\n' +
    '                            <span href="javascript:void(0);" ng-if="Booth.boothPurchase.length >0 "\n' +
    '                                ng-click="Booth.show=!Booth.show;BoothCtrl.showMore($event)"\n' +
    '                                class="btn pmd-btn-fab pmd-btn-flat pmd-ripple-effect btn-default btn-sm child-table-expand direct-expand"><i\n' +
    '                                    class="material-icons md-dark pmd-sm"></i></span>\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editBooth\',{id: Booth.id});" title="Edit">mode_edit</i>\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'remove\')"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="BoothCtrl.openDeleteDialog(Booth,Booth.description ,Booth.id)"\n' +
    '                                title="Delete">delete</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr ng-repeat-end ng-repeat="purchase in Booth.boothPurchase" ng-show="Booth.show" id="collapse">\n' +
    '                        <td style="width: 10px">{{purchase.contactName}}</td>\n' +
    '                        <td style="width: 10px">{{purchase.phone1}}</td>\n' +
    '                        <td style="width: 10px">{{purchase.status}}</td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="BoothCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/Booth/templates/edit.html',
    ' \n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-description-text">{{\'EditBooth\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editBoothForm">\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-12">\n' +
    '                    <img src="../../../../assets/img/booth.jpg" style="height: 350px;\n' +
    '                    width: 99%;" />\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <!-- Nav tabs -->\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                            ng-repeat="lang in editBoothCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home"\n' +
    '                                role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                    ng-repeat="lang in editBoothCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <textarea required type="text" class="mat-input form-control"\n' +
    '                                            name="description{{lang.value+\'Name\'}}"\n' +
    '                                            ng-model="editBoothCtrl.Booth.description[lang.key]" ng-minlength="3"\n' +
    '                                            ng-maxlength="255"></textarea>\n' +
    '                                        <div ng-messages="editBoothForm.description{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="editBoothForm.description{{lang.value+\'Name\'}}.$error.required && !editBoothForm.description{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                                {{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="(editBoothForm.description{{lang.value+\'Name\'}}.$error.minlength || editBoothForm.description{{lang.value+\'Name\'}}.$error.maxlength) && !editBoothForm.description{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div> \n' +
    '                                </div>\n' +
    '\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Code\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Code" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                        ng-model="editBoothCtrl.Booth.code" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="editBoothForm.Code.$error">\n' +
    '                        <div class="error" ng-if="editBoothForm.Code.$error.required && \n' +
    '                                    !editBoothForm.Code.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(editBoothForm.Code.$error.minlength ||\n' +
    '                                        editBoothForm.Code.$error.maxlength) \n' +
    '                                         && !editBoothForm.Code.newCode.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Price\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Price" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                        ng-model="editBoothCtrl.Booth.price" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="editBoothForm.Price.$error">\n' +
    '                        <div class="error" ng-if="editBoothForm.Price.$error.required && \n' +
    '                                    !editBoothForm.Price.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(editBoothForm.Price.$error.minlength ||\n' +
    '                                        editBoothForm.Price.$error.maxlength) \n' +
    '                                         && !editBoothForm.Price.newPrice.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'area\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="area" \n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="100"\n' +
    '                        ng-model="editBoothCtrl.Booth.area" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="editBoothForm.area.$error">\n' +
    '                        <div class="error" ng-if="editBoothForm.area.$error.required && \n' +
    '                                    !editBoothForm.area.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(editBoothForm.area.$error.minlength ||\n' +
    '                                        editBoothForm.area.$error.maxlength) \n' +
    '                                         && !editBoothForm.area.newarea.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '             class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editBoothCtrl.UpdateBooth()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editBoothCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/Booth/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewBoothBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newBoothForm">\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-12">\n' +
    '                    <img src="../../../../assets/img/booth.jpg" style="height: 350px;\n' +
    '                    width: 99%;" />\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                            ng-repeat="lang in newBoothCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home"\n' +
    '                                role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span>{{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                    ng-repeat="lang in newBoothCtrl.language" id="{{lang.value}}-form">\n' +
    '\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                        <label for="first-name">{{ \'Description\' | translate}} </label>\n' +
    '                                        <textarea required class="mat-input form-control"\n' +
    '                                            name="Description{{lang.value+\'Name\'}}"\n' +
    '                                            ng-model="newBoothCtrl.Description[lang.key]" ng-minlength="3"\n' +
    '                                            ng-maxlength="955"></textarea>\n' +
    '                                        <div ng-messages="newBoothForm.Description{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="newBoothForm.Description{{lang.value+\'Name\'}}.$error.required && !newBoothForm.Description{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                                {{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="(newBoothForm.Description{{lang.value+\'Name\'}}.$error.minlength || newBoothForm.Description{{lang.value+\'Name\'}}.$error.maxlength) && !newBoothForm.Description{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Code\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Code" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4" ng-model="newBoothCtrl.Code"\n' +
    '                        required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="newBoothForm.Code.$error">\n' +
    '                        <div class="error" ng-if="newBoothForm.Code.$error.required && \n' +
    '                                    !newBoothForm.Code.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(newBoothForm.Code.$error.minlength ||\n' +
    '                                        newBoothForm.Code.$error.maxlength) \n' +
    '                                         && !newBoothForm.Code.newCode.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Price\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Price" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4" ng-model="newBoothCtrl.Price"\n' +
    '                        required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="newBoothForm.Price.$error">\n' +
    '                        <div class="error" ng-if="newBoothForm.Price.$error.required && \n' +
    '                                    !newBoothForm.Price.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(newBoothForm.Price.$error.minlength ||\n' +
    '                                        newBoothForm.Price.$error.maxlength) \n' +
    '                                         && !newBoothForm.Price.newPrice.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'area\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="area"\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="100" ng-model="newBoothCtrl.Area"\n' +
    '                        required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="newBoothForm.area.$error">\n' +
    '                        <div class="error" ng-if="newBoothForm.area.$error.required && \n' +
    '                                    !newBoothForm.area.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(newBoothForm.area.$error.minlength ||\n' +
    '                                        newBoothForm.area.$error.maxlength) \n' +
    '                                         && !newBoothForm.area.newarea.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newBoothForm.$invalid" class="btn pmd-ripple-effect btn-primary" Booth="button"\n' +
    '            ng-click="newBoothCtrl.AddNewBooth()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" Booth="button"\n' +
    '            ng-click="newBoothCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/JudgeArtWork/templates/JudgeArtWork.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '        <!-- <div id="bold"> {{\'AddNewJudgeArtWorkBtn\'| translate}} </div> -->\n' +
    '        <!-- <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newJudgeArtWork\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button> -->\n' +
    '    </div> \n' +
    '    <div ng-if="JudgeArtWorkList != []">\n' +
    '        <span>{{\'NoJudgeArtWorksAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="JudgeArtWorkList.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'poster\' | translate}}</th>\n' +
    '                        <th>{{\'title\' | translate}}</th>\n' +
    '                        <th>{{\'fileCount\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="JudgeArtWork in JudgeArtWorkList">\n' +
    '                        <td>\n' +
    '                            <img style="width: 70px;height: 70px;" data-ng-src="{{JudgeArtWork.posterUrl}}" />\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{JudgeArtWork.title[selectedLanguage]   | limitTo : 20}}\n' +
    '                            {{JudgeArtWork.title[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td data-title="uploadComplete">\n' +
    '                            {{JudgeArtWork.fileCount}}\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'viewJudgeArtWork\',{id: JudgeArtWork.id});"\n' +
    '                                title="review art work">rate_review</i>\n' +
    '\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="JudgeArtWorkCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/JudgeArtWork/templates/view.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-description-text">{{\'ViewJudgeArtWork\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="viewJudgeArtWorkForm">\n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-4">\n' +
    '                    <div ng-repeat="n in [] | range:viewJudgeArtWorkCtrl.totalCount">\n' +
    '                        <label for="first-name">{{viewJudgeArtWorkCtrl.votingCriteriaList[n].name[selectedLanguage]}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="Value" numbers-only\n' +
    '                            style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                            ng-model="viewJudgeArtWorkCtrl.votingCriteria[n]"\n' +
    '                            ng-change="viewJudgeArtWorkCtrl.changeValue(viewJudgeArtWorkCtrl.votingCriteria[n],n)" required />\n' +
    '                        <!-- required validation  -->\n' +
    '                        <div ng-messages="viewJudgeArtWorkForm.Value.$error">\n' +
    '                            <div class="error" ng-if="viewJudgeArtWorkForm.Value.$error.required && \n' +
    '                                        !viewJudgeArtWorkForm.Value.$pristine">\n' +
    '                                {{\'requiredErr\' |  translate}}\n' +
    '                            </div>\n' +
    '                            <!-- length validation -->\n' +
    '                            <div class="error" ng-if="(viewJudgeArtWorkForm.Value.$error.minlength ||\n' +
    '                                            viewJudgeArtWorkForm.Value.$error.maxlength) \n' +
    '                                             && !viewJudgeArtWorkForm.Value.newValue.$error.required">\n' +
    '                                {{\'PhoneLengthError\' |  translate}}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <!-- <input id="{{mediaImage + $index}}" name="{{mediaImage + $index}}" style="display: none;"\n' +
    '                            onchange="angular.element(this).scope().AddmediaImage(this.files)" type="file" required\n' +
    '                            file-change handler="fileSelect(files)" ng-repeat="file in viewJudgeArtWorkCtrl.filesCount">\n' +
    '                        <button class="btn btn-success btn-xs pull-center"\n' +
    '                            ng-click="viewJudgeArtWorkCtrl.LoadUploadmedia()">{{\'Upload Receipt\' | translate}}</button>\n' +
    '\n' +
    '                        <div ng-messages="viewJudgeArtWorkForm.mediaImage.$error">\n' +
    '                            <div ng-if="viewJudgeArtWorkForm.mediaImage.$error.required">{{\'requiredErr\' | translate}}\n' +
    '                            </div>\n' +
    '                        </div> -->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="viewJudgeArtWorkForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="viewJudgeArtWorkCtrl.UpdateJudgeArtWork()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="viewJudgeArtWorkCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="viewJudgeArtWorkCtrl.artWorkMedia.length == null">\n' +
    '        <span>{{\'NoMediasAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="viewJudgeArtWorkCtrl.artWorkMedia.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'description\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="Media in viewJudgeArtWorkCtrl.artWorkMedia">\n' +
    '\n' +
    '                        <td data-title="code">\n' +
    '                            {{Media.description}}\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editMedia\',{id: Media.id});" title="Edit">mode_edit</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="viewJudgeArtWorkCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/News/templates/News.html',
    '<div>\n' +
    '    <div style="background: linear-gradient(90deg,#f7e483,#dbba5a 57%,#a36d31);\n' +
    '    border: #494b74 solid 1px;\n' +
    '    background-color: transparent;\n' +
    '    color: #494b74;\n' +
    '    border-radius: 17px;" ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '        <!-- <div id="bold"> {{\'AddNewNewsBtn\'| translate}} </div> -->\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newNews\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="NewsList.length == null">\n' +
    '        <span>{{\'NoNewssAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="NewsList.length > 0">\n' +
    '        <div class="table-responsive" style="border: 1px solid #21231e;\n' +
    '        border-radius: 20px;\n' +
    '        background-color: #0e0e0e;\n' +
    '        box-shadow: 0 0 10px 5px rgba(0,0,0,.35);\n' +
    '    ">\n' +
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
    '                            <img style="width: 70px;height: 70px;" data-ng-src="{{News.posterUrl}}" />\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{News.title[selectedLanguage]   | limitTo : 20}}\n' +
    '                            {{News.title[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td ng-show="!News.outdated">\n' +
    '                            <div ng-if="user.PermessionModules[\'News\'].includes(\'view\')==true">\n' +
    '                                <div class="btn-switch" ng-class="{\'btn-switch--on\':News.outdated}"\n' +
    '                                    ng-model="News.outdated" ng-click="NewsCtrl.ChangeStatus(News)">\n' +
    '\n' +
    '                                    <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':News.outdated}"\n' +
    '                                        ng-model="News.outdated" ng-click="NewsCtrl.ChangeStatus(News)">\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </td>\n' +
    '                        <td ng-show="News.outdated">\n' +
    '                            <div class="btn-switch" ng-class="{\'btn-switch--on\':News.outdated}"\n' +
    '                                ng-click="NewsCtrl.ChangeStatus(News)" ng-model="News.outdated">\n' +
    '\n' +
    '                                <div class="btn-switch-circle" ng-class="{\'btn-switch-circle--on\':News.outdated}"\n' +
    '                                    ng-click="NewsCtrl.ChangeStatus(News)" ng-model="News.outdated">\n' +
    '                                </div>\n' +
    '                        </td>\n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editNews\',{id: News.id});" title="Edit">mode_edit</i>\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'remove\')"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="NewsCtrl.openDeleteDialog(News,News.title[selectedLanguage] ,News.id)"\n' +
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
    ' \n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'EditNews\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editNewsForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in editNewsCtrl.language">\n' +
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
    '                                ng-repeat="lang in editNewsCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="title{{lang.value+\'Name\'}}" ng-model="editNewsCtrl.News.title[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="255">\n' +
    '                                    <div ng-messages="editNewsForm.title{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editNewsForm.title{{lang.value+\'Name\'}}.$error.required && !editNewsForm.title{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editNewsForm.title{{lang.value+\'Name\'}}.$error.minlength || editNewsForm.title{{lang.value+\'Name\'}}.$error.maxlength) && !editNewsForm.title{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <textarea required type="text" class="mat-input form-control"\n' +
    '                                        name="body{{lang.value+\'Name\'}}" ng-model="editNewsCtrl.News.body[lang.key]"\n' +
    '                                        ng-minlength="3" ng-maxlength="955"></textarea>\n' +
    '                                    <div ng-messages="editNewsForm.body{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editNewsForm.body{{lang.value+\'Name\'}}.$error.required && !editNewsForm.body{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editNewsForm.body{{lang.value+\'Name\'}}.$error.minlength || editNewsForm.body{{lang.value+\'Name\'}}.$error.maxlength) && !editNewsForm.body{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                                <span style="color:red">*</span>\n' +
    '\n' +
    '\n' +
    '                                <input id="posterImage" name="posterImage" style="display: none;"\n' +
    '                                    onchange="angular.element(this).scope().AddposterImage(this.files)" type="file"\n' +
    '                                    required>\n' +
    '                                <button class="btn btn-success btn-xs pull-center"\n' +
    '                                    ng-click="editNewsCtrl.LoadUploadPoster()">{{\'Upload Poster\' | translate}}</button>\n' +
    '                                <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                    {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '                                <img ng-src="{{editNewsCtrl.posterImage}}" style="max-height: 139px;max-width: 423px;">\n' +
    '                                <div ng-messages="editNewsForm.posterImage.$error">\n' +
    '                                    <div ng-if="editNewsForm.posterImage.$error.required">{{\'requiredErr\' | translate}}\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '\n' +
    '\n' +
    '                                <!-- <label for="image" class="btn btn-success btn-xs pull-center" name="upload"\n' +
    '                                    Value="">Upload\n' +
    '                                    Photo</label>\n' +
    '                                <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                                    name="imageName">\n' +
    '                                <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '\n' +
    '                                <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                    {{\'RecommendedProductImage\' | translate}}</span> -->\n' +
    '\n' +
    '                            </div>\n' +
    '\n' +
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
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="editNewsForm.$invalid || editNewsCtrl.posterImage ==null"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editNewsCtrl.UpdateNews()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editNewsCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}" ng-repeat="lang in newNewsCtrl.language">\n' +
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
    '                                    <label for="first-name">{{ \'Title\' | translate}} </label>\n' +
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
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ \'Body\' | translate}} </label>\n' +
    '                                    <textarea required class="mat-input form-control"\n' +
    '                                        name="bodyDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newNewsCtrl.bodyDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="955"></textarea>\n' +
    '                                    <div ng-messages="newNewsForm.bodyDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="newNewsForm.bodyDictionary{{lang.value+\'Name\'}}.$error.required && !newNewsForm.bodyDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(newNewsForm.bodyDictionary{{lang.value+\'Name\'}}.$error.minlength || newNewsForm.bodyDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newNewsForm.bodyDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                    <span style="color:red">*</span>\n' +
    '\n' +
    '                    <input id="posterImage" name="posterImage" style="display: none;"\n' +
    '                        onchange="angular.element(this).scope().AddposterImage(this.files)" type="file" required>\n' +
    '                    <button class="btn btn-success btn-xs pull-center"\n' +
    '                        ng-click="newNewsCtrl.LoadUploadPoster()">{{\'Upload Poster\' | translate}}</button>\n' +
    '                    <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                        {{\'RecommendedProductImage\' | translate}}</span>\n' +
    '                    <img ng-src="{{newNewsCtrl.posterImage}}" style="max-height: 139px;max-width: 423px;">\n' +
    '                    <div ng-messages="newNewsForm.posterImage.$error">\n' +
    '                        <div ng-if="newNewsForm.posterImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- <label for="image" class="btn btn-success btn-xs pull-center" name="upload" Value="">Upload\n' +
    '                        Photo</label>\n' +
    '                    <input id="image" class="hidden" type="file" img-upload ng-model="imageName"\n' +
    '                        name="imageName">\n' +
    '                    <img ng-src="{{image}}" height="100" width="100" ng-show="image" />\n' +
    '                    <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                        {{\'RecommendedProductImage\' | translate}}</span> -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newNewsForm.$invalid || newNewsCtrl.posterImage ==null"\n' +
    '            class="btn pmd-ripple-effect btn-primary" News="button"\n' +
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
  $templateCache.put('./app/GlobalAdmin/PhotoAlbum/templates/MediaItems.html',
    '<div>\n' +
    '    <div ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '\n' +
    '        <button style="background: linear-gradient(90deg,#f7e483,#dbba5a 57%,#a36d31);\n' +
    '        border-radius: 17px;" ng-click="$state.go(\'newMediaItem\',{id: $stateParams.id});"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '    <div ng-if="mediaItemCtrl.mediaItemList.length == 0">\n' +
    '        <span>{{\'NoPhotoAlbumsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="mediaItemCtrl.mediaItemList.length > 0">\n' +
    '        <div class="table-responsive" style="border: 1px solid #21231e;\n' +
    '        border-radius: 20px;\n' +
    '        background-color: #0e0e0e;\n' +
    '        box-shadow: 0 0 10px 5px rgba(0,0,0,.35);\n' +
    '    ">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'image\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="mediaItems in mediaItemCtrl.mediaItemList">\n' +
    '\n' +
    '                        <td>\n' +
    '                            <img style="width: 70px;height: 70px;" data-ng-src="{{mediaItems.fileUrl}}" />\n' +
    '                        </td>\n' +
    '\n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'remove\')"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="mediaItemCtrl.openDeleteDialog(mediaItems,mediaItems.title[selectedLanguage] ,mediaItems.id)"\n' +
    '                                title="Delete">delete</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="mediaItemCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/PhotoAlbum/templates/PhotoAlbum.html',
    '<div>\n' +
    '    <div ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '\n' +
    '        <button style="background: linear-gradient(90deg,#f7e483,#dbba5a 57%,#a36d31);\n' +
    '        border-radius: 17px;" ng-click="$state.go(\'newPhotoAlbum\');"\n' +
    '            class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="PhotoAlbumList.length == null">\n' +
    '        <span>{{\'NoPhotoAlbumsAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="PhotoAlbumList.length > 0">\n' +
    '        <div class="table-responsive" style="border: 1px solid #21231e;\n' +
    '        border-radius: 20px;\n' +
    '        background-color: #0e0e0e;\n' +
    '        box-shadow: 0 0 10px 5px rgba(0,0,0,.35);\n' +
    '    ">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'title\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="PhotoAlbum in PhotoAlbumList">\n' +
    '\n' +
    '                        <td data-title="Name">\n' +
    '                            {{PhotoAlbum.title[selectedLanguage]   | limitTo : 20}}\n' +
    '                            {{PhotoAlbum.title[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '\n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editPhotoAlbum\',{id: PhotoAlbum.id});" title="Edit">mode_edit</i>\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'remove\') && !PhotoAlbum.mainGallery"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="PhotoAlbumCtrl.openDeleteDialog(PhotoAlbum,PhotoAlbum.title[selectedLanguage] ,PhotoAlbum.id)"\n' +
    '                                title="Delete">delete</i>\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md perm_media font25"\n' +
    '                                ng-click="$state.go(\'mediaItems\',{id: PhotoAlbum.id});" title="media">perm_media</i>\n' +
    '\n' +
    '                        </td>\n' +
    '\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="PhotoAlbumCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/PhotoAlbum/templates/edit.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text">{{\'EditPhotoAlbum\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editPhotoAlbumForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in editPhotoAlbumCtrl.language">\n' +
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
    '                                ng-repeat="lang in editPhotoAlbumCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                    <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                    <input required type="text" class="mat-input form-control"\n' +
    '                                        name="title{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="editPhotoAlbumCtrl.PhotoAlbum.title[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="editPhotoAlbumForm.title{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="editPhotoAlbumForm.title{{lang.value+\'Name\'}}.$error.required && !editPhotoAlbumForm.title{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(editPhotoAlbumForm.title{{lang.value+\'Name\'}}.$error.minlength || editPhotoAlbumForm.title{{lang.value+\'Name\'}}.$error.maxlength) && !editPhotoAlbumForm.title{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
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
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="editPhotoAlbumForm.$invalid " class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editPhotoAlbumCtrl.UpdatePhotoAlbum()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editPhotoAlbumCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/PhotoAlbum/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewPhotoAlbumBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newPhotoAlbumForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newPhotoAlbumCtrl.language">\n' +
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
    '                                ng-repeat="lang in newPhotoAlbumCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ \'Title\' | translate}} </label>\n' +
    '                                    <input required PhotoAlbum="text" class="mat-input form-control"\n' +
    '                                        name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newPhotoAlbumCtrl.titleDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- <div class="row">\n' +
    '                    <div class="form-group col-lg-4"> \n' +
    '                        <label>\n' +
    '                            <input type="radio" ng-model="newPhotoAlbumCtrl.selectedMediaType" value="Image">\n' +
    '                            Image\n' +
    '                        </label><br />\n' +
    '                        <label>\n' +
    '                            <input type="radio" ng-model="newPhotoAlbumCtrl.selectedMediaType" value="Video">\n' +
    '                            Video\n' +
    '                        </label><br />\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="row" ng-show="newPhotoAlbumCtrl.selectedMediaType== \'Image\'">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                            <span style="color:red">*</span>\n' +
    '\n' +
    '                            <input id="posterImage" name="posterImage" style="display: none;" multiple\n' +
    '                                onchange="angular.element(this).scope().AddposterImage(this.files)" type="file"\n' +
    '                                required>\n' +
    '                            <button class="btn btn-success btn-xs pull-center" type="button"\n' +
    '                                ng-click="newPhotoAlbumCtrl.LoadUploadPoster()">{{\'Upload Image\' | translate}}</button>\n' +
    '                            <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                {{\'RecommendedProductImage\' | translate}}</span> \n' +
    '                            <div ng-repeat=" image in newPhotoAlbumCtrl.posterImage">\n' +
    '                                <img ng-src="{{image}}" style="max-height: 139px;max-width: 423px;">\n' +
    '                            </div>\n' +
    '                            <div ng-messages="newPhotoAlbumForm.posterImage.$error">\n' +
    '                                <div ng-if="newPhotoAlbumForm.posterImage.$error.required">{{\'requiredErr\' | translate}}\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="row" ng-show="newPhotoAlbumCtrl.selectedMediaType== \'Video\'">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        Video\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newPhotoAlbumForm.$invalid || newPhotoAlbumCtrl.posterImage ==null"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="newPhotoAlbumCtrl.AddNewPhotoAlbum()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="newPhotoAlbumCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/PhotoAlbum/templates/newMediaItem.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewPhotoAlbumBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newPhotoAlbumForm">\n' +
    '            <div>\n' +
    '                <!-- Nav tabs -->\n' +
    '                <ul class="nav nav-tabs" role="tablist">\n' +
    '                    <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                        ng-repeat="lang in newPhotoAlbumCtrl.language">\n' +
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
    '                                ng-repeat="lang in newPhotoAlbumCtrl.language" id="{{lang.value}}-form">\n' +
    '                                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                    <label for="first-name">{{ \'Title\' | translate}} </label>\n' +
    '                                    <input required PhotoAlbum="text" class="mat-input form-control"\n' +
    '                                        name="titleDictionary{{lang.value+\'Name\'}}"\n' +
    '                                        ng-model="newPhotoAlbumCtrl.titleDictionary[lang.key]" ng-minlength="3"\n' +
    '                                        ng-maxlength="255">\n' +
    '                                    <div ng-messages="newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.required && !newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                            {{\'requiredErr\' | translate}}</div>\n' +
    '                                        <div class="error ng-binding"\n' +
    '                                            ng-show="(newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.minlength || newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.maxlength) && !newPhotoAlbumForm.titleDictionary{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                            {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '\n' +
    '\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <!-- <div class="row">\n' +
    '                    <div class="form-group col-lg-4"> \n' +
    '                        <label>\n' +
    '                            <input type="radio" ng-model="newPhotoAlbumCtrl.selectedMediaType" value="Image">\n' +
    '                            Image\n' +
    '                        </label><br />\n' +
    '                        <label>\n' +
    '                            <input type="radio" ng-model="newPhotoAlbumCtrl.selectedMediaType" value="Video">\n' +
    '                            Video\n' +
    '                        </label><br />\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="row" ng-show="newPhotoAlbumCtrl.selectedMediaType== \'Image\'">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        <div class="form-group pmd-textfield-floating-label-completed">\n' +
    '                            <span style="color:red">*</span>\n' +
    '\n' +
    '                            <input id="posterImage" name="posterImage" style="display: none;" multiple\n' +
    '                                onchange="angular.element(this).scope().AddposterImage(this.files)" type="file"\n' +
    '                                required>\n' +
    '                            <button class="btn btn-success btn-xs pull-center" type="button"\n' +
    '                                ng-click="newPhotoAlbumCtrl.LoadUploadPoster()">{{\'Upload Image\' | translate}}</button>\n' +
    '                            <span> <i class="material-icons md-dark pmd-md warrningIcon">warning</i>\n' +
    '                                {{\'RecommendedProductImage\' | translate}}</span> \n' +
    '                            <div ng-repeat=" image in newPhotoAlbumCtrl.posterImage">\n' +
    '                                <img ng-src="{{image}}" style="max-height: 139px;max-width: 423px;">\n' +
    '                            </div>\n' +
    '                            <div ng-messages="newPhotoAlbumForm.posterImage.$error">\n' +
    '                                <div ng-if="newPhotoAlbumForm.posterImage.$error.required">{{\'requiredErr\' | translate}}\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="row" ng-show="newPhotoAlbumCtrl.selectedMediaType== \'Video\'">\n' +
    '                    <div class="form-group col-lg-4">\n' +
    '                        Video\n' +
    '                    </div>\n' +
    '                </div> -->\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newPhotoAlbumForm.$invalid || newPhotoAlbumCtrl.posterImage ==null"\n' +
    '            class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="newPhotoAlbumCtrl.AddNewPhotoAlbum()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="newPhotoAlbumCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/VotingCriteria/templates/VotingCriteria.html',
    '<div>\n' +
    '    <div style="margin-bottom:10px" ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')">\n' +
    '        <!-- <div id="bold"> {{\'AddNewVotingCriteriaBtn\'| translate}} </div> -->\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-click="$state.go(\'newVotingCriteria\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth"\n' +
    '            type="button">\n' +
    '            {{\'AddNew\'| translate}}</button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-if="VotingCriteriaList.length == null">\n' +
    '        <span>{{\'NoVotingCriteriasAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="VotingCriteriaList.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th>{{\'code\' | translate}}</th>\n' +
    '                        <th>{{\'name\' | translate}}</th>\n' +
    '                        <th>{{\'weight\' | translate}}</th>\n' +
    '                        <th></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat ="VotingCriteria in VotingCriteriaList">\n' +
    '\n' +
    '                        <td data-title="code">\n' +
    '                            {{VotingCriteria.code}}\n' +
    '                        </td>\n' +
    '                        <td data-title="Name">\n' +
    '                            {{VotingCriteria.name[selectedLanguage]  | limitTo : 20}}\n' +
    '                            {{VotingCriteria.name[selectedLanguage].length > 20 ? \'...\' : \'\'}}\n' +
    '                        </td>\n' +
    '                        <td data-title="weight">\n' +
    '                            {{VotingCriteria.weight}}\n' +
    '                        </td> \n' +
    '                        <td width="30%">\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'add_new\')"\n' +
    '                                class="material-icons md-dark pmd-md cursorPointer font25"\n' +
    '                                ng-click="$state.go(\'editVotingCriteria\',{id: VotingCriteria.id});"\n' +
    '                                title="Edit">mode_edit</i>\n' +
    '                            <i ng-show="user.PermessionModules[\'News\'].includes(\'remove\')"\n' +
    '                                class="material-icons pmd-md deleteButton cursorPointer font25"\n' +
    '                                ng-click="VotingCriteriaCtrl.openDeleteDialog(VotingCriteria,VotingCriteria.description ,VotingCriteria.id)"\n' +
    '                                title="Delete">delete</i>\n' +
    '                        </td>\n' +
    '                    </tr> \n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div style="text-align:center;direction: ltr" paging page="1" page-size="10" total="totalCount"\n' +
    '        paging-action="VotingCriteriaCtrl.changePage(page)" flex="nogrow" show-prev-next="true" show-first-last="true"\n' +
    '        hide-if-empty="true" disabled-class="hide">\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/VotingCriteria/templates/edit.html',
    ' \n' +
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-description-text">{{\'EditVotingCriteria\' | translate}}</h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="editVotingCriteriaForm"> \n' +
    '            <div class="row">\n' +
    '                <!-- Nav tabs -->\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                            ng-repeat="lang in editVotingCriteriaCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home"\n' +
    '                                role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span> {{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                    ng-repeat="lang in editVotingCriteriaCtrl.language" id="{{lang.value}}-form">\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label-completed">\n' +
    '                                        <label for="first-name">{{ lang.value+\'Name\' | translate}} </label>\n' +
    '                                        <textarea required type="text" class="mat-input form-control"\n' +
    '                                            name="name{{lang.value+\'Name\'}}"\n' +
    '                                            ng-model="editVotingCriteriaCtrl.VotingCriteria.name[lang.key]" ng-minlength="3"\n' +
    '                                            ng-maxlength="255"></textarea>\n' +
    '                                        <div ng-messages="editVotingCriteriaForm.name{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="editVotingCriteriaForm.name{{lang.value+\'Name\'}}.$error.required && !editVotingCriteriaForm.name{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                                {{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="(editVotingCriteriaForm.name{{lang.value+\'Name\'}}.$error.minlength || editVotingCriteriaForm.name{{lang.value+\'Name\'}}.$error.maxlength) && !editVotingCriteriaForm.name{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div> \n' +
    '                                </div>\n' +
    '\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Code\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Code" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                        ng-model="editVotingCriteriaCtrl.VotingCriteria.code" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="editVotingCriteriaForm.Code.$error">\n' +
    '                        <div class="error" ng-if="editVotingCriteriaForm.Code.$error.required && \n' +
    '                                    !editVotingCriteriaForm.Code.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(editVotingCriteriaForm.Code.$error.minlength ||\n' +
    '                                        editVotingCriteriaForm.Code.$error.maxlength) \n' +
    '                                         && !editVotingCriteriaForm.Code.newCode.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Weight\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Weight" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4"\n' +
    '                        ng-model="editVotingCriteriaCtrl.VotingCriteria.weight" required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="editVotingCriteriaForm.Weight.$error">\n' +
    '                        <div class="error" ng-if="editVotingCriteriaForm.Weight.$error.required && \n' +
    '                                    !editVotingCriteriaForm.Weight.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(editVotingCriteriaForm.Weight.$error.minlength ||\n' +
    '                                        editVotingCriteriaForm.Weight.$error.maxlength) \n' +
    '                                         && !editVotingCriteriaForm.Weight.newPrice.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div> \n' +
    '            </div>\n' +
    '\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '             class="btn pmd-ripple-effect btn-primary" type="button"\n' +
    '            ng-click="editVotingCriteriaCtrl.UpdateVotingCriteria()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" type="button"\n' +
    '            ng-click="editVotingCriteriaCtrl.Close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
  $templateCache.put('./app/GlobalAdmin/VotingCriteria/templates/new.html',
    '<div class="modal-content">\n' +
    '    <div class="modal-header bordered">\n' +
    '        <h2 class="pmd-card-title-text"> {{\'AddNewVotingCriteriaBtn\' | translate}} </h2>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <form class="form-horizontal" name="newVotingCriteriaForm"> \n' +
    '            <div class="row">\n' +
    '                <div class="form-group col-lg-6">\n' +
    '                    <ul class="nav nav-tabs" role="tablist">\n' +
    '                        <li role="presentation" ng-class="{\'active\':$index == 0}"\n' +
    '                            ng-repeat="lang in newVotingCriteriaCtrl.language">\n' +
    '                            <a href="javascript:void(0);" data-target="#{{lang.value}}-form" aria-controls="home"\n' +
    '                                role="tab" data-toggle="tab">\n' +
    '                                <span style="color:red">*</span>{{lang.value | translate}}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="pmd-card">\n' +
    '                        <div class="pmd-card-body">\n' +
    '                            <!-- Tab panes -->\n' +
    '                            <div class="tab-content">\n' +
    '                                <div role="tablist" class="tab-pane" ng-class="{\'active\':$index == 0}"\n' +
    '                                    ng-repeat="lang in newVotingCriteriaCtrl.language" id="{{lang.value}}-form">\n' +
    '\n' +
    '                                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                                        <label for="first-name">{{ \'Name\' | translate}} </label>\n' +
    '                                        <textarea required class="mat-input form-control"\n' +
    '                                            name="Name{{lang.value+\'Name\'}}"\n' +
    '                                            ng-model="newVotingCriteriaCtrl.Name[lang.key]" ng-minlength="3"\n' +
    '                                            ng-maxlength="955"></textarea>\n' +
    '                                        <div ng-messages="newVotingCriteriaForm.Name{{lang.value+\'Name\'}}.$error">\n' +
    '\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="newVotingCriteriaForm.Name{{lang.value+\'Name\'}}.$error.required && !newVotingCriteriaForm.Name{{lang.value+\'Name\'}}.$pristine">\n' +
    '                                                {{\'requiredErr\' | translate}}</div>\n' +
    '                                            <div class="error ng-binding"\n' +
    '                                                ng-show="(newVotingCriteriaForm.Name{{lang.value+\'Name\'}}.$error.minlength || newVotingCriteriaForm.Name{{lang.value+\'Name\'}}.$error.maxlength) && !newVotingCriteriaForm.Name{{lang.value+\'Name\'}}.$error.required">\n' +
    '                                                {{\'NameLengthError3\' | translate}}</div>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Code\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Code" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4" ng-model="newVotingCriteriaCtrl.Code"\n' +
    '                        required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="newVotingCriteriaForm.Code.$error">\n' +
    '                        <div class="error" ng-if="newVotingCriteriaForm.Code.$error.required && \n' +
    '                                    !newVotingCriteriaForm.Code.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(newVotingCriteriaForm.Code.$error.minlength ||\n' +
    '                                        newVotingCriteriaForm.Code.$error.maxlength) \n' +
    '                                         && !newVotingCriteriaForm.Code.newCode.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group col-lg-3">\n' +
    '                    <label for="first-name">{{\'Weight\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="Weight" numbers-only\n' +
    '                        style="display: inline-block;" ng-minlength="1" ng-maxlength="4" ng-model="newVotingCriteriaCtrl.Weight"\n' +
    '                        required />\n' +
    '                    <!-- required validation  -->\n' +
    '                    <div ng-messages="newVotingCriteriaForm.Weight.$error">\n' +
    '                        <div class="error" ng-if="newVotingCriteriaForm.Weight.$error.required && \n' +
    '                                    !newVotingCriteriaForm.Weight.$pristine">\n' +
    '                            {{\'requiredErr\' |  translate}}\n' +
    '                        </div>\n' +
    '                        <!-- length validation -->\n' +
    '                        <div class="error" ng-if="(newVotingCriteriaForm.Weight.$error.minlength ||\n' +
    '                                        newVotingCriteriaForm.Weight.$error.maxlength) \n' +
    '                                         && !newVotingCriteriaForm.Weight.newWeight.$error.required">\n' +
    '                            {{\'PhoneLengthError\' |  translate}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    ' \n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '    <div class="pmd-modal-action text-right">\n' +
    '        <button style="border: #494b74 solid 1px;background-color: transparent;color: #494b74;border-radius: 6px;"\n' +
    '            ng-disabled="newVotingCriteriaForm.$invalid" class="btn pmd-ripple-effect btn-primary" VotingCriteria="button"\n' +
    '            ng-click="newVotingCriteriaCtrl.AddNewVotingCriteria()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '        <button class="btn pmd-ripple-effect btn-default" VotingCriteria="button"\n' +
    '            ng-click="newVotingCriteriaCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
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
