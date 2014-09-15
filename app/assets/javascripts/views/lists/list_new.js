TrelloClone.Views.ListNew = Backbone.View.extend({
	template: JST["lists/new"],
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	events: {
		"submit form": "submit"
	},
	
	submit: function(event) {
		event.preventDefault();
		var params = $(event.currentTarget).serializeJSON()["list"];
		this.collection.create(params)
	}
})