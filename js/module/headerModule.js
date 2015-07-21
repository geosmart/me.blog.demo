
MyApp.module("HeaderModule", {
    startWithParent: false,
    initialize: function (moduleName, app, options) {
        this.someProperty = 'someValue';
    },
    onStart: function (options) {
    },

    onStop: function (options) {
    },
    define: function (module) {
        "use strict"; 
        //Model定义 
        module.Model = Backbone.Model.extend({
            defaults: {
                'title': "Clean Blog", 
                'subtitle': "A Clean Blog Theme by Start Bootstrap"
            }
        }); 
        //ItemView 定义 
        module.View = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'header', 
            ui: { 
            },
            events: {
                "click #ul-service": "navRoute"
            },
            /* when the view initializes, call initRouter to */
            initialize: function () {
                //this.initRouter();
            },
            render: function () {
                var that = this;
                var data = that.model.attributes;
                var html = Marionette.TemplateCache.prototype.loadTemplate("tmplHeader", data);

                //View加载到DOM进行显示  
                that.$el.html(html);
            },
            navRoute: function (event) {
                var $btn = $(event.target);
                var type = $btn.attr("data-type");
                console.log("type:", type);
                if (type === "java") {

                } else if (type === "rest") {

                }
            }
        });
        /* add initializer, which fires when the app starts */
        module.addInitializer(function () {
            var vHeader = new module.View({
                model: new module.Model()
            });
            MyApp.RHeader.show(vHeader);
        });
    },

});