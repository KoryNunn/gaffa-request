var Gaffa = require('gaffa');

function Request(){}
Request = Gaffa.createSpec(Request, Gaffa.Action);
Request.prototype._type = 'request';
Request.prototype.trigger = function(parent, scope, event){
    var action = this,
        scope = scope || {};

    this.loading.set(true);

    this.on('complete', action.loading.set.bind(action.loading, false));

    Request.handle(this, this.name.value, this.options.value, function(error, data){
        if(error){

            scope.error = error;

            // EventEmitter will throw an error if you emit an error
            // and have no handler attached to handle it.
            // this event is only here as a convenience, not as the
            // primary means of handling errors.
            if(action._events.error){
                action.emit('error', {
                    domEvent: event,
                    scope: scope,
                    error: error
                });
            }
            action.errors.set(error, action.cleans === false);
            action.triggerActions('error', scope, event);
        }else{

            scope.data = data;

            action.emit('success', data);
            action.target.set(data, action.cleans === false);
            action.triggerActions('success', scope, event);
        }

        action.complete();
        action.triggerActions('complete', scope, event);
    });
};
Request.prototype.target = new Gaffa.Property();
Request.prototype.source = new Gaffa.Property();
Request.prototype.errors = new Gaffa.Property();
Request.prototype.cleans = new Gaffa.Property();
Request.prototype.options = new Gaffa.Property();
Request.prototype.name = new Gaffa.Property();
Request.prototype.loading = new Gaffa.Property();
Request.handle = function(action, name, options, callback){
    for(var i = 0; i < this.providers.length; i++){
        if(this.providers[i](action, name, options, callback)){
            return;
        }
    }
};
Request.providers = [];

module.exports = Request;