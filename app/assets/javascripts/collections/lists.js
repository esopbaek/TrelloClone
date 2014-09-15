TrelloClone.Collections.Lists = Backbone.Collection.extend({
	comparator: "ord",
	url: "api/lists",
	model: TrelloClone.Models.List,
	intialize: function(models, options) {
		this.board = options.board
	}
})