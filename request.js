var Gaffa = require('gaffa');

function Request(){}
Request = Gaffa.createSpec(Request, Gaffa.Action);
Request.prototype._type = 'request';
Request.prototype._async = true;
Request.prototype.trigger = function(parent, scope, event){
    var action = this,
        scope = scope || {};

    this.loading.set(true);

    Request.handle(this, this.name.value, this.options.value, function(error, data){
        action.loading.set(false);
        
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
            action.errors.set(error, null, scope);
            action.triggerActions('error', scope, event);
        }else{

            scope.data = data;

            action.emit('success', data);
            action.target.set(data, null, scope);
            action.triggerActions('success', scope, event);
        }

        action.emit('complete');
        action.triggerActions('complete', scope, event);
    });
};
Request.prototype.target = new Gaffa.Property();
Request.prototype.source = new Gaffa.Property();
Request.prototype.errors = new Gaffa.Property();
Request.prototype.options = new Gaffa.Property();
Request.prototype.name = new Gaffa.Property();
Request.prototype.loading = new Gaffa.Property();
Request.handle = function(action, name, options, callback){
    for(var i = 0; i < this.providers.length; i++){
        if(this.providers[i](action, name, options, callback)){
            return;
        }
    }
    console.warn('No handler matched the name: ' + name);
};
Request.providers = [];

module.exports = Request;