
MyApp.module("indexModule", {
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
                'title': "Technology Blog",
                'subtitle': "Geosmart Technology Blog",
                "posts": [
                {
                    'title': "GitHub-Pages搭建个人技术博客",
                    'subtitle': "A Clean Blog Theme by Start Bootstrap",
                    'author': "geosmart",
                    'date': "2015-05-10"
                }]
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
            }, 
            render: function () {
                var that = this;
                var data = that.model.attributes;
                var head = Marionette.TemplateCache.prototype.loadTemplate("index-head", data);
                var navigation = Marionette.TemplateCache.prototype.loadTemplate("navigation", data);
                var header = Marionette.TemplateCache.prototype.loadTemplate("index-header", data);
                data.posts = that.getPosts(); 
                var content = Marionette.TemplateCache.prototype.loadTemplate("index-content", data);
                var footer = Marionette.TemplateCache.prototype.loadTemplate("footer", data);
                var homeData = {
                    "head": head,
                    "navigation": navigation,
                    "header": header,
                    "content": content,
                    "footer": footer
                };
                var home = Marionette.TemplateCache.prototype.loadTemplate("index", homeData, "index-home");
                //View加载到DOM进行显示   
                that.$el.html(home);
            },
            redirectToPost: function (event) {
                var $btn = $(event.target);
                var postDiv = $btn.closest("div[data-id='post']");
                var title = $("[data-id='title']", postDiv).html();
                var subtitle = $("[data-id='subtitle']", postDiv).html();
                var date = $("[data-id='date']", postDiv).html();
                var author = $("[data-id='author']", postDiv).html();
                console.log("post title:", title);
                //跳转到post页，传递post地址参数
                var postIndex = siteRoot + "/post.html?" + "title=" + title + "&&subtitle=" + subtitle + "&&author=" + author + "&&date=" + date;
                window.location.href = encodeURI(postIndex);
            },
            //根据dir生成的index.txt获取posts博客文件名称列表 
            getPosts: function () {  
                var posts = storage().get('posts');
                if (!posts) {
                    posts = [];
                    $.ajax({
                        url: siteRoot + "/post/index.txt",
                        async: false,
                        success: function (data) {
                            var fileNames = data.split('\n');
                            console.log(fileNames);
                            for (var i = 0; i < fileNames.length; i++) {
                                if (fileNames[i].length > 0) {
                                    var date = fileNames[i].substring(0, 10);
                                    var title = fileNames[i].substring(11).split(".md")[0];
                                    var post = {
                                        "author": "geosmart",
                                        //"subtitle": "待开发：从文件头读取",
                                        "date": date,
                                        "title": title
                                    };
                                    posts.push(post);
                                    console.log(post);
                                }
                            }
                        }
                    });
                    storage().set('posts', posts, 60);
                } 
                return posts;
            }
        });
        module.init = function () {
            var rIndex = new module.View({
                model: new module.Model()
            });
            MyApp.RIndex.show(rIndex);
        },
        /* add initializer, which fires when the app starts */
        module.addInitializer(function () {

        });
    },

});