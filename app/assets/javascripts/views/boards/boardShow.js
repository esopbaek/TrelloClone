TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST["boards/show"],
	initialize: function(options) {
		this.collection = this.model.lists();
		this.listenTo(this.model, "sync", this.render)
		this.listenTo(this.model.lists(), "sync add", this.render)
	},
	
	render: function() {
		
		var renderedContent = this.template({
			board: this.model
		});
		this.$el.html(renderedContent);
		this.renderListForm();
		return this;
	},
	
	renderListForm: function() {
		var view = new TrelloClone.Views.ListNew({
			collection: this.collection
		});
		this.addSubview("div.add-list", view);
	}
})