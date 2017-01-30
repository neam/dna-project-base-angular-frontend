(function(){
    angular.module('googlechart')
        .value('googleChartApiConfig', {
            version: '1.1',
            optionalSettings: {
                packages: ['corechart', 'sankey', 'calendar']
            }
        });
})();
