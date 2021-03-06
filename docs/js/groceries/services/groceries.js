(function() {
    'use strict';

    angular
        .module('groceries')
        .service('groceriesService', groceriesService);

    groceriesService.$inject = ['$location', '$http', '$q', 'localStorageService', 'CONFIG'];

    function groceriesService($location, $http, $q, localStorageService, CONFIG) {
        return {
            add: add,
            login: login,
            items: items,
            remove: remove,
            toggle: toggle,
            suggestions: suggestions
        };

        function add(name) {
            return $http({
                method: 'POST',
                url: CONFIG.api+'/item',
                headers: {'X-Auth-Token': localStorageService.get('token', '')},
                data: {name: name}
            })
            .then(addComplete)
            .catch(errorHandler);

            function addComplete(response) {
                return response.data;
            }
        }

        function errorHandler(response) {
            if (response.status == 403) {
                $location.path('/logout');
                return $q.reject('Forbidden');
            }
        }

        function login(username, password) {
            return $http({
                method: 'POST',
                url: CONFIG.api+'/login',
                data: {username: username, password: password}
            })
            .then(loginComplete);

            function loginComplete(response) {
                return response.data.token;
            }
        }

        function items() {
            return $http({
                method: 'GET',
                url: CONFIG.api+'/item',
                headers: {'X-Auth-Token': localStorageService.get('token', '')}
            })
            .then(itemsComplete)
            .catch(errorHandler);

            function itemsComplete(response) {
                return response.data.items;
            }
        }

        function remove(item) {
            return $http({
                method: 'DELETE',
                url: CONFIG.api+'/item/'+item.id,
                headers: {'X-Auth-Token': localStorageService.get('token', '')}
            })
            .then(removeComplete)
            .catch(errorHandler);

            function removeComplete(response) {
                return response.data.status === 'ok';
            }
        }

        function suggestions() {
            return $http({
                method: 'GET',
                url: CONFIG.api+'/suggest',
                headers: {'X-Auth-Token': localStorageService.get('token', '')}
            })
            .then(suggestionsComplete)
            .catch(errorHandler);

            function suggestionsComplete(response) {
                return response.data.suggestions;
            }
        }

        function toggle(item) {
            return $http({
                method: 'PUT',
                url: CONFIG.api+'/item/'+item.id,
                headers: {'X-Auth-Token': localStorageService.get('token', '')}
            })
            .then(toggleIsBoughtComplete)
            .catch(errorHandler);

            function toggleIsBoughtComplete(response) {
                return response.data;
            }
        }
    }
})();
