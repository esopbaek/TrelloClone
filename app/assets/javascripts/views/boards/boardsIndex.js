TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
	template: JST["boards/index"],
	initialize: function(options) {
		this.collection = options.collection;
		this.listenTo(this.collection, "sync", this.render);
	},
	render: function() {
		var renderedContent = this.template({
			boards: this.collection
		});
		this.$el.html(renderedContent);
		var newView = new TrelloClone.Views.BoardNew();
		this.addSubview("div.list-form", newView);
		return this;
	},
	renderNew: function() {
		
		newView.render();
	}
})