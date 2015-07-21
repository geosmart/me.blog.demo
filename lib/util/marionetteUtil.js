 
//加载模板
Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (templateName, data, templateId) { 
    var url = siteRoot + '/include/' + templateName + '.html';
    templateId = templateId == null ? templateName : templateId;
    
    var template = storage().get(templateId); 
    if (!template) {
        // Load the template by fetching the URL content synchronously.
        Backbone.$.ajax({
            async: false,
            url: url,
            success: function (templateHtml) {
                template = _.template(templateHtml)(data); 
                storage().set(templateId, template, 1);
            }
        });
    } 
    return template;
};
