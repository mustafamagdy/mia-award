(function() {
  angular.module("home").factory("ArtWorkResource", ["$resource", "appCONSTANTS", ArtWorkResource]);

  function ArtWorkResource($resource, appCONSTANTS) {
    return $resource(
      appCONSTANTS.API_URL + "artWorks",
      {},
      {
        getAllArtWorks: { method: "POST", url: appCONSTANTS.API_URL + "artWorks/search", useToken: true, params: { lang: "@lang" } },
        getAllNominees: {
          method: "GET",
          url: appCONSTANTS.API_URL + "artWorks/nominees",
          useToken: true,
          isArray: true,
          params: { lang: "@lang" }
        },
        getAllAwards: { method: "POST", url: appCONSTANTS.API_URL + "Awards/search", useToken: true, params: { lang: "@lang" } },
        getAllCountries: {
          method: "GET",
          url: appCONSTANTS.API_URL + "artWorks/countries",
          useToken: true,
          isArray: true,
          params: { lang: "@lang" }
        },
        create: {
          method: "POST",
          useToken: true,
          transformRequest: function(data) {
            if (data === undefined) return data;
            var fd = new FormData();
            angular.forEach(data, function(value, key) {
              if (value instanceof FileList) {
                if (value.length == 1) {
                  fd.append(key, value[0]);
                } else {
                  angular.forEach(value, function(file, index) {
                    fd.append(key + "_" + index, file);
                  });
                }
              } else {
                if (typeof value == "object" && typeof value.size == "number") {
                  fd.append(key, value);
                } else if (typeof value == "object") {
                  Object.keys(value).forEach(v => {
                    fd.append(key, value[v]);
                  });
                } else fd.append(key, value);
              }
            });

            return fd;
          },
          headers: { "Content-Type": undefined }
        },
        update: {
          method: "PUT",
          useToken: true,
          transformRequest: function(data) {
            debugger;
            if (data === undefined) return data;

            var fd = new FormData();
            // angular.forEach(data, function (value, key) {
            //     if (value instanceof FileList) {
            //         if (value.length == 1) {
            //             fd.append(key, value[0]);
            //         } else {
            //             angular.forEach(value, function (file, index) {
            //                 fd.append(key + '_' + index, file);
            //             });
            //         }
            //     } else {
            //         fd.append(key, value);
            //     }
            // });
            angular.forEach(data, function(value, key) {
              if (value instanceof FileList) {
                if (value.length == 1) {
                  fd.append(key, value[0]);
                } else {
                  angular.forEach(value, function(file, index) {
                    fd.append(key + "_" + index, file);
                  });
                }
              } else {
                if (typeof value == "object" && typeof value.size == "number") fd.append(key, value);
                if (typeof value == "object") {
                  Object.keys(value).forEach(v => {
                    // fd.append(key, JSON.stringify({ [v]: value[v] }));
                    fd.append(key, value[v]);
                  });
                } else fd.append(key, value);
              }
            });
            return fd;
          },
          headers: { "Content-Type": undefined }
        },
        getArtWork: { method: "GET", useToken: true },
        delete: { method: "DELETE", useToken: true },
        changeStatus: { method: "POST", url: appCONSTANTS.API_URL + "artWorks/ChangeStatus/:id/:status", useToken: true }
      }
    );
  }
})();
