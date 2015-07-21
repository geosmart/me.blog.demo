

//#region LayoutView定义
//var RootView = Marionette.LayoutView.extend({
//    el: 'body'
//});
//MyApp.rootView = new RootView();

//var AppLayoutView = Backbone.Marionette.LayoutView.extend({
//    tagName: 'div',
//    id: 'container',
//    regions: {
//    },
//    appendView: function (incremennt, newView) {
//        this.$el.append('<div id="view' + increment + '" >');
//        this.regionManager.addRegion('view' + increment, '#view' + increment)
//        this['view' + increment].show(newView);
//    }
//});
//#endregion

//#region Region定义

var HeaderRegion = Backbone.Marionette.Region.extend({
    el: "#header"
});
var ImgCarouselRegion = Backbone.Marionette.Region.extend({
    el: "#imgCarousel"
});
var SiteInfoRegion = Backbone.Marionette.Region.extend({
    el: "#siteInfo"
});
var ContainerRegion = Backbone.Marionette.Region.extend({
    el: "#container"
});
var FooterRegion = Backbone.Marionette.Region.extend({
    el: "#footer" // Must be defined for this syntax
    // Whatever other custom stuff you want
});

// Use these new Region types on App.
MyApp.addRegions({
    RHeader: HeaderRegion,
    RImgCarousel: ImgCarouselRegion,
    RSiteInfo: SiteInfoRegion,
    RContainer: ContainerRegion,
    RFooter: FooterRegion
});

//#endregion

//#region Region定义

//路由Controller
var routeController = {
    home: function () {
        routeController.clearMainTmpl();
        routeController.loadHeaderAndFooter();
        var imgCarouselModule = MyApp.module("ImgCarouselModule");
        imgCarouselModule.init();
        var siteInfoModule = MyApp.module("SiteInfoModule");
        siteInfoModule.init();
        //加载主页Container
    },
    //服务中心主页
    serviceIndex: function () {
        routeController.loadHeaderAndFooter();
        routeController.clearMainTmpl();
        var docIndexModule = MyApp.module("DocIndexModule");
        docIndexModule.init();
    },
    restService: function () {
        routeController.loadHeaderAndFooter();
        routeController.clearMainTmpl();
        var docRestModule = MyApp.module("DocRestModule");
        docRestModule.init();
    },
    javaService: function () {
        routeController.loadHeaderAndFooter();
    },
    notFound: function () {
        routeController.loadHeaderAndFooter();
        routeController.clearMainTmpl();
        var notFoundModule = MyApp.module("NotFoundModule");
        notFoundModule.start();
    },
    //加载Header和Footer模块
    loadHeaderAndFooter: function () {
        var headerModule = MyApp.module("HeaderModule");
        headerModule.start();
        var footerModule = MyApp.module("FooterModule");
        footerModule.start();
    },
    //清空主页Container
    clearMainTmpl: function () {
        MyApp.RImgCarousel.empty();
        MyApp.RSiteInfo.empty();
        MyApp.RContainer.empty();
    },
    onRoute: function (name, path) {
        MyApp.RContainer.empty();
    }
};

//路由定义
var MyRouter = new Marionette.AppRouter({
    controller: routeController,
    appRoutes: {
        "": "home",
        "home": "home",
        "service": "serviceIndex",
        "service/rest": "restService",
        "service/java": "javaService",
        "notFound": "notFound"
    },
    onRoute: function (name, path, arg) {
        if (_.isFunction(this.options.controller.onRoute)) {
            this.options.controller.onRoute(name, path, arg);
        }
    }
});

//#endregion


MyApp.start();
MyApp.router = MyRouter;
Backbone.history.start();
//MyRouter.navigate("", true);

