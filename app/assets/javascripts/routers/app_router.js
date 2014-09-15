TrelloClone.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "boardsIndex", 
		"boards/new": "boardNew",
		"boards/:id": "boardShow",
	},
	
	boardsIndex: function() {
		TrelloClone.Collections.boards.fetch();
		var boardsIndexView = new TrelloClone.Views.BoardsIndex({
			collection: TrelloClone.Collections.boards
		})
		this._swapView(boardsIndexView);
	},
	
	boardNew: function() {
		
	},
	
	boardShow: function(id) {
		var board = TrelloClone.Collections.boards.getOrFetch(id);
		var boardShowView = new TrelloClone.Views.BoardShow({
			model: board
		})
		this._swapView(boardShowView);
	},
	
	_swapView: function(newView) {
		if (this.currentView) {
			this.currentView.remove();
		}
		this.currentView = newView;
		$("div#main").html(newView.render().$el);
	}
})