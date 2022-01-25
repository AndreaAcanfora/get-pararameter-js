window.location.get = {
	pathname : window.location.pathname,
	formatUrl : function( getParameter ){
		if ( !getParameter || typeof getParameter != 'object' ){
			return 0;
		}
		app = [], app2 = '';
		for( elem in getParameter){
			app.push(elem + '=' + getParameter[elem]);
		}
		return app.join('&');
	},

	add : function( name, value ){
		var search       = window.location.search,
			getParameter = [],
			base = this.pathname.split('/');

		base  = base[base.length - 1];

		if(search.length){
			search = search.substr(1);

			getParameter = this.all();
			
			getParameter[name] = (typeof getParameter[name] != 'undefined') ? (
				( getParameter[name] === value || getParameter[name].split('|').indexOf(value) !== -1 ) ? 
					getParameter[name]
				: ( getParameter[name] + '|' + value ) 
			) : value;

			getParameter = this.formatUrl(getParameter);

			search = base + '?' + getParameter;
		}else{
			search = base + '?' + name + '=' + value;
		}

		window.history.pushState({}, null, search);
		return search;
	},
	get: function( name ){
		var search       = window.location.search,
			getParameter = [],
			base = this.pathname.split('/');

		base  = base[base.length - 1];

		if(!search.length)return 0;

		search = search.substr(1);
		getParameter = search.split('&');
		var app = [], info = '';
		for( elem in getParameter){
			info = getParameter[elem].split('=');
			app[info[0]] = info[1];
		}
		getParameter = app;
		return getParameter[name] || 0;
	},
	all: function(){
		var	search       = window.location.search,
			getParameter = [],
			base = this.pathname.split('/');

		base  = base[base.length - 1];

		if(!search.length)return 0;

		search = search.substr(1);
		getParameter = search.split('&');
		var app = [], info = '';
		for( elem in getParameter){
			info = getParameter[elem].split('=');
			app[info[0]] = info[1];
		}
		getParameter = app;
		return getParameter;
	},
	remove : function( name, value ){
		var search       = window.location.search,
			getParameter = [],
			base = this.pathname.split('/');

		base  = base[base.length - 1];

		if(search.length){

			search = search.substr(1);
			getParameter = this.all();

			if(getParameter[name] == 'undefined') return 0;

			if(typeof value == 'undefined'){

				delete getParameter[name];

			}else if( getParameter[name] ){

				var items = getParameter[name].split('|');

				if(items.length == 1){
					delete getParameter[name];
				}else{

					var index = items.indexOf(value.toString());

					items.splice( index , 1);
					getParameter[name] = items.join('|');
				}
			}

			if(getParameter && Object.keys(getParameter).length){

				getParameter = this.formatUrl(getParameter);

				search = base + (getParameter ?  ( '?' + getParameter ): '' );
			}else{
				if(base){
					search = base;
				}else{
					window.history.pushState({}, null, '/');
					return '';
				}
			}
		}

		window.history.pushState({}, null, search);
		return search;
	}
};
