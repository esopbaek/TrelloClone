window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  new TrelloClone.Routers.AppRouter;
	  Backbone.history.start();
  }
};
