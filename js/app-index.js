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
    index: function () {
        var indexModule = MyApp.module("indexModule");
        indexModule.init();
    },
    onRoute: function (name, path) {
        MyApp.RContainer.empty();
    }
};

//路由定义
var MyRouter = new Marionette.AppRouter({
    controller: routeController,
    appRoutes: {
        "": "index"
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


for (var i = 0; i < 100; i++) {
    console.log("---------get" + i);
    Backbone.$.ajax({
        async: true,
        url: "http://192.168.1.80:9090/uadb.app/rest/sample/get?param=ajax________" + i,
        success: function (resp) {
            console.log(+"---------complete");
        }
    });
    console.log("---------loop" + i);
}
