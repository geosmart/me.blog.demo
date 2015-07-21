
MyApp.module("postModule", {
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
            }
        });
        //ItemView 定义 
        module.View = Marionette.LayoutView.extend({
            tagName: 'body',
            id: 'index',
            ui: {
            },
            events: {
                "click #btnDirectToPost": "redirectToPost"
            },
            initialize: function () {
                //this.initRouter();
            },
            //            data-url="<%= post.url %>" data-id="btnDirectToPost"
            render: function () {
                var that = this;
                //TODO 获取post参数
                var data = {
                    "title": that.getParamFromUrl("title"),
                    "subtitle": that.getParamFromUrl("subtitle"),
                    "author": that.getParamFromUrl("author"),
                    "date": that.getParamFromUrl("date")
                };
                that.model.attributes = data;

                var head = Marionette.TemplateCache.prototype.loadTemplate("index-head", data);
                var navigation = Marionette.TemplateCache.prototype.loadTemplate("navigation", data);
                var header = Marionette.TemplateCache.prototype.loadTemplate("post-header", data);
                var content = Marionette.TemplateCache.prototype.loadTemplate("post-content", data);
                var footer = Marionette.TemplateCache.prototype.loadTemplate("footer", data);

                var homeData = {
                    "head": head,
                    "navigation": navigation,
                    "header": header,
                    "content": content,
                    "footer": footer
                };
                var home = Marionette.TemplateCache.prototype.loadTemplate("index", homeData, "post-home");
                //View加载到DOM进行显示   
                that.$el.html(home);
                //获取文件名
                var fileName = data.date + "-" + data.title + ".md";
                var url = siteRoot + "/post/" + fileName;
                //TODO md转html
                that.getHtmlByMd(url);

            },
            //根据日期动态设置背景页
            setPostHeaderBg: function (day) {
                //var month = new Date().getDate() ;
                var url = siteRoot + '/img/post-bg/post-bg-' + day + '.jpg';
                $("header").css("background-image", "url(" + url + ")");
            },
            getParamFromUrl: function (name) {
                return decodeURIComponent($.getUrlVar(name));
            },
            getHtmlByMd: function (url) {
                $(function () {
                    $.get(url, function (markdown) {
                        var testEditormdView = editormd.markdownToHTML("editormd", {
                            markdown: markdown,
                            htmlDecode: "style,script,iframe",  // you can filter tags decode
                            tocDropdown: true,
                            tocm: true,    // Using [TOCM]
                            emoji: true,
                            taskList: true,
                            tex: true,
                            flowChart: true,
                            sequenceDiagram: true
                            //toc: false,
                            //gfm: false,
                            //htmlDecode: true,       // 开启HTML标签解析，为了安全性，默认不开启
                        });
                    });
                });
            }
        });
        module.init = function () {
            var postView = new module.View({
                model: new module.Model()
            });
            MyApp.RIndex.show(postView);
            //动态设置背景
            var day = postView.model.attributes.date.split("-")[2];
            postView.setPostHeaderBg(day);
        },
        /* add initializer, which fires when the app starts */
        module.addInitializer(function () {

        });
    },

});