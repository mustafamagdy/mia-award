
angular.module('core')


    .directive('numberTest', function () {

        return {
            link: function (scope, element, attrs) {

                scope.validity = JSON.stringify(element[0].validity, null, '\t');

                element.on('keyup', function () {
                    scope.$apply(function () {
                        scope.validity = JSON.stringify(element[0].validity, null, '\t');
                    })
                })

            }
        }

    })

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
    .directive('positive', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;
                ctrl.$validators.positive = function (value) {
                    return value && value >= 0;
                };
            }
        };
    }]);
;
