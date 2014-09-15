TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST["boards/show"],
	initialize: function(options) {
		this.collection = this.model.lists();
		this.listenTo(this.model, "sync", this.render)
		this.listenTo(this.model.lists(), "sync add destroy", this.render)
	},
	
	events: {
		"click button.destroy": "destroy",
		"click div.new-card": "openCardForm"
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
	},
	
	destroy: function(event) {
		event.preventDefault();
		var listId = $(event.currentTarget).data("list-id");
		var list = this.collection.getOrFetch(listId);
		list.destroy();
		// list.destroy();
	},
	
	openCardForm: function(event) {
		event.preventDefault();
		$(event.currentTarget).html()
	}
	

})