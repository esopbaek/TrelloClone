TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
	template: JST["boards/index"],
	initialize: function(options) {
		this.collection = options.collection;
		this.listenTo(this.collection, "sync destroy", this.render);
	},
	events: {
		"click button": "destroy"
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
	
	destroy: function(event) {
		event.preventDefault();
		var boardId = $(event.currentTarget).data("board_id");
		var board = TrelloClone.Collections.boards.getOrFetch(boardId);
		board.destroy();
	}
});