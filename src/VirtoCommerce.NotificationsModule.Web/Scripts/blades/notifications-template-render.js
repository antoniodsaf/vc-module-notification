angular.module('virtoCommerce.notificationsModule')
    .controller('virtoCommerce.notificationsModule.templateRenderController', ['$rootScope', '$scope', '$localStorage', 'platformWebApp.bladeNavigationService', 'platformWebApp.dialogService', 'virtoCommerce.notificationsModule.notificationsModuleApi', function ($rootScope, $scope, $localStorage, bladeNavigationService, dialogService, notifications) {
        var blade = $scope.blade;
        var keyTemplateLocalStorage;

        blade.dynamicProperties = '';
        blade.originHtml = '';

        $scope.setForm = function (form) {
            $scope.formScope = form;
        }

        function pluckAddress(address) {
            return address ? _(address).pluck('value') : address;
        }

        blade.initialize = function () {
            blade.isLoading = true;
            blade.isRender = false;

            var language = blade.languageCode ? blade.languageCode : 'default';

            var data = angular.copy(blade.notification);
            data.cc = pluckAddress(data.cc);
            data.bcc = pluckAddress(data.bcc);

            keyTemplateLocalStorage = blade.tenantType + '.' + blade.notification.type + '.' + language;
            var itemFromLocalStorage = $localStorage[keyTemplateLocalStorage];
            if (itemFromLocalStorage) {
                blade.notification.context = itemFromLocalStorage;
            }

            notifications.renderTemplate({
                type: blade.notification.type,
                language: language
            }, {
                text: blade.currentEntity.body,
                data
            }, function (response) {
                blade.originHtml = response.html;
            });

            blade.isLoading = false;
        };

        blade.headIcon = 'fa fa-eye';

        blade.initialize();
    }]);
