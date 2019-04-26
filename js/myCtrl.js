(function () {
    ('use strict');

    angular.module('myApp').controller('myCtrl', myCtrl);

    function myCtrl($scope) {
        var vm = this;
        angular.extend(vm, {
            $onInit: init,
            time: null,
            city: null,
            temperature: null,
            weatherIcon: null,
            getBackground: getBackground
        });

        function init() {
            getBackground();
        }

        function getBackground() {
            // get data from JSON
            fetch('js/locations.json').then(response => {
                return response.json()
            })
                .then(data => {
                    //json data
                    console.log(data.locations);
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }
})();