TrelloClone.Views.CardNew = Backbone.View.extend({
	template: JST["cards/new"],
	initialize: function(options) {
		this.boardView = options.showView;
		this.board = options.board;
		this.listenTo(this.collection, "add", this.render)
		
	},
	render: function() {
		var renderedContent = this.template({
			cards: this.collection
		});
		this.$el.html(renderedContent);
		return this;
	},
	events: {
		"submit form": "submit"
	},
	
	submit: function(event) {
		var that = this;
		event.preventDefault();
		var params = $(event.currentTarget).serializeJSON()["card"];
		console.log(params)
		this.collection.create(params, {
			success: function(card) {
				that.boardView.render();
			}, error: function() {
				console.log("did not work")
			}
		});
	}
});