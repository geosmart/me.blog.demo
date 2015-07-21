

//#region Region定义

var indexRegion = Backbone.Marionette.Region.extend({
    el: "#index"
});

// Use these new Region types on App.
MyApp.addRegions({
    RIndex: indexRegion
});

//#region Router定义

//路由Controller
var routeController = {
    post: function () {
        var postModule = MyApp.module("postModule");
        postModule.init();
    },
    onRoute: function (name, path) {
        MyApp.RContainer.empty();
    }
};

//路由定义
var MyRouter = new Marionette.AppRouter({
    controller: routeController,
    appRoutes: {
        "": "post"
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
