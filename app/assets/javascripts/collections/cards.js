TrelloClone.Collections.Cards = Backbone.Collection.extend({
	comparator: "ord",
	url: "api/cards",
	model: TrelloClone.Models.Card,
	initialize: function(models, options) {
		this.list = options.list
	},
	getOrFetch: function(id) {
		var cards = this;
		var card;
		if ( !(card = this.get(id)) ) {
			card = new TrelloClone.Models.Card({ id: id});
			card.fetch({
				success: function() { cards.add(list); }
			});
		}
		return card;
	}
})