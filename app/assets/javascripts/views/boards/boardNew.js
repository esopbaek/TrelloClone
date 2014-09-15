TrelloClone.Views.BoardNew = Backbone.CompositeView.extend({
	template: JST["boards/new"],
	events: {
		"submit form": "submit"
	},
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent)
		return this;
	},
	submit: function(event) {
		event.preventDefault();
		var view = this;
		var $form = $(event.currentTarget);
		var boardTitle = $form.find("input:text").val() || "Untitled Board";
		TrelloClone.Collections.boards.create({title: boardTitle}, {
			success: function(board) {
				var id = board.id;
				Backbone.history.navigate("/boards/"+id, { trigger: true });
			}
		});
		
	}
})