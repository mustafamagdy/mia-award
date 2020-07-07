angular
  .module("core")

  .directive("numberTest", function () {
    return {
      link: function (scope, element, attrs) {
        scope.validity = JSON.stringify(element[0].validity, null, "\t");

        element.on("keyup", function () {
          scope.$apply(function () {
            scope.validity = JSON.stringify(element[0].validity, null, "\t");
          });
        });
      },
    };
  })

  .directive("decimalNumbers", function () {
    return {
      require: "?ngModel",
      scope: {
          decimalPoints:'='
      },
      link: function (scope, element, attrs, ngModelCtrl) {
        if (!ngModelCtrl) {
          return;
        }

        ngModelCtrl.$parsers.push(function (val) {
          if (angular.isUndefined(val)) {
            var val = "";
          }
          var clean = val.replace(/[^0-9\.]/g, "");
          var allowedDecimal = scope.decimalPoints || 2;
          var decimalCheck = clean.split(".");

          if (!angular.isUndefined(decimalCheck[1])) {
            decimalCheck[1] = decimalCheck[1].slice(0, allowedDecimal);
            clean = decimalCheck[0] + "." + decimalCheck[1];
          }

          if (val !== clean) {
            ngModelCtrl.$setViewValue(clean);
            ngModelCtrl.$render();
          }
          return clean;
        });

        element.bind("keypress", function (event) {
          if (event.keyCode === 32) {
            event.preventDefault();
          }
        });
      },
    };
  })
  .directive("numbersOnly", function () {
    return {
      require: "ngModel",
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[^0-9]/g, "");

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      },
    };
  })
  .directive("positive", [
    function () {
      return {
        require: "ngModel",
        link: function (scope, elem, attrs, ctrl) {
          if (!ctrl) return;
          ctrl.$validators.positive = function (value) {
            return value && value >= 0;
          };
        },
      };
    },
  ]);
