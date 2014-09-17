TrelloClone.Collections.Lists = Backbone.Collection.extend({
	comparator: "ord",
	model: TrelloClone.Models.List,
	url: "api/lists",
	initialize: function(models, options) {
		this.board = options.board;
	},
	getOrFetch: function(id) {
		var lists = this;
		var list;
		if ( !(list = this.get(id)) ) {
			list = new TrelloClone.Models.List({ id: id});
			list.fetch({
				success: function() { lists.add(list); }
			});
		}
		return list;
	}
});
