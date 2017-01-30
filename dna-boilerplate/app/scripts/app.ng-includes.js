'use strict';

angular.module('app')
    .component('ngIncludeViewsCommonTopNavigation', {template: require('views/common/top_navigation.html')})
    .component('ngIncludeViewsCommonTopMenu', {template: require('views/navigation/top-menu.html'), controller: 'DataEnvironmentController'})
    .component('ngIncludeViewsCommonFooter', {template: require('views/common/footer.html')})
    .component('ngIncludeStartOnboarding', {template: require('views/start.onboarding.inc.html')})
    .component('ngIncludeStartPricing', {template: require('views/start.pricing.inc.html')})
    .component('ngIncludeStartIntroVideo', {template: require('views/start.intro-video.inc.html')})
    .component('ngIncludeStartIntro', {template: require('views/start.intro.inc.html')})
    .component('ngIncludeStartUseCases', {template: require('views/start.use-cases.inc.html')})
;
