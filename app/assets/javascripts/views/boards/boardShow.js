TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	template: JST["boards/show"],
	initialize: function(options) {
		this.collection = this.model.lists();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.lists(), "sync add destroy", this.render);
	},
	
	events: {
		"click button.destroy-list": "destroyList",
		"click div.closed": "openCardForm",
		"click div.open": "closeCardForm",
		"click button.destroy-card": "destroyCard"
	},
	
	render: function() {
		var renderedContent = this.template({
			board: this.model
		});
		this.$el.html(renderedContent);
		this.renderListForm();
		this.$('ul.card-list').sortable({
	        stop: function (event, ui) {
		        var data = $(this).sortable('serialize');
				$.ajax({
					data: data,
					type: 'POST',
					url: '/api/cards/swapranks'
				});
			},
			connectWith: ".connectedSortable"
		}).disableSelection();
		
		this.$("ul.clearfix").sortable({
			stop: function (event, ui) {
			var data = $(this).sortable('serialize');
			$.ajax({
				data: data,
				type: 'POST',
				url: '/api/lists/swapranks'
			});
			},
		}).disableSelection();
		
		return this;
	},
	
	renderListForm: function() {
		var view = new TrelloClone.Views.ListNew({
			collection: this.collection
		});
		this.addSubview("div.add-list", view);
	},
	
	destroyList: function(event) {
		event.preventDefault();
		var listId = $(event.currentTarget).data("list-id");
		var list = this.collection.getOrFetch(listId);
		list.destroy();
		this.render();
	},
	
	destroyCard: function(event) {
		event.preventDefault();
		var listId = $(event.currentTarget).parent().data("list-id");
		var list = this.collection.getOrFetch(listId);
		var cardId = $(event.currentTarget).data("card-id");
		var card = list.cards().getOrFetch(cardId);
		console.log(card.attributes)
		card.destroy();
		this.render();
	},
	
	openCardForm: function(event) {
		event.preventDefault();
		var listId = $(event.currentTarget).data("list-id");
		var list = this.collection.getOrFetch(listId);
		this.cards = list.cards();
		var view = new TrelloClone.Views.CardNew({
			showView: this,
			board: this.model,
			collection: this.cards
		});
		
		$(event.currentTarget).empty();
		this.addSubview(event.currentTarget, view)
		$(event.currentTarget).removeClass("closed")
		$(event.currentTarget).addClass("opened")
 	},
	
	closeCardForm: function(event) {
		event.preventDefault();
		var $div = $($(event.currentTarget).parents()[2])
		$div.addClass("closed")
		$div.removeClass("opened")
		$div.html("Add Card...");
	}

})