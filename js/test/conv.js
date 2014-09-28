describe('ConvController', function(){
	var $rootScope;
	var $scope;
	var controller;
	// The following variable is used to mock the initvar, which is generated by the Chat backend

	var convs = {
		convs: {},
		addConv: function(){},
		get: function(){},
		getHighestOrder: function(){},
		addChatMsg: function(){},
		replaceUsers: function(){},
		notifyMsgInConv: function(){},
		addUserToConv: function(){},
		getFirstConv: function(){},
		makeActive: function(){},
	};
	var och = {
		init : function(){},
		quit : function(){},
		sendChatMsg : function(convId, msg){},
		invite : function(convId, userToInvite, groupConv, callback){},
		newConv : function(userToInvite, success){}
	};
	var activeUser = 'admin';
	var initvar = {"contacts":[{"id":"admin","online":true,"displayname":"admin","order":1,"backends":{"email":{"id":null,"displayname":"E-mail","protocol":"email","namespace":" email","value":[[]]},"och":{"id":null,"displayname":"ownCloud Handle","protocol":"x-owncloud-handle","namespace":"och","value":"admin"}},"address_book_id":"local","address_book_backend":""},{"id":"derp","online":true,"displayname":"derp","order":2,"backends":{"email":{"id":null,"displayname":"E-mail","protocol":"email","namespace":" email","value":[[]]},"och":{"id":null,"displayname":"ownCloud Handle","protocol":"x-owncloud-handle","namespace":"och","value":"derp"}},"address_book_id":"local","address_book_backend":""},{"id":"herp","online":false,"displayname":"herp","order":3,"backends":{"email":{"id":null,"displayname":"E-mail","protocol":"email","namespace":" email","value":[[]]},"och":{"id":null,"displayname":"ownCloud Handle","protocol":"x-owncloud-handle","namespace":"och","value":"herp"}},"address_book_id":"local","address_book_backend":""}],"contactsList":["admin","derp","herp"],"contactsObj":{"admin":{"id":"admin","online":true,"displayname":"admin","order":1,"backends":{"email":{"id":null,"displayname":"E-mail","protocol":"email","namespace":" email","value":[[]]},"och":{"id":null,"displayname":"ownCloud Handle","protocol":"x-owncloud-handle","namespace":"och","value":"admin"}},"address_book_id":"local","address_book_backend":""},"derp":{"id":"derp","online":true,"displayname":"derp","order":7,"backends":{"email":{"id":null,"displayname":"E-mail","protocol":"email","namespace":" email","value":[[]]},"och":{"id":null,"displayname":"ownCloud Handle","protocol":"x-owncloud-handle","namespace":"och","value":"derp"}},"address_book_id":"local","address_book_backend":"","$$hashKey":"009"},"herp":{"id":"herp","online":false,"displayname":"herp","order":6,"backends":{"email":{"id":null,"displayname":"E-mail","protocol":"email","namespace":" email","value":[[]]},"och":{"id":null,"displayname":"ownCloud Handle","protocol":"x-owncloud-handle","namespace":"och","value":"herp"}},"address_book_id":"local","address_book_backend":"","$$hashKey":"00H"}},"backends":{"och":{"displayname":"ownCloud Handle","name":"och","enabled":true,"checked":null,"protocol":"x-owncloud-handle","id":4}},"initConvs":{"och":{"CONV_ID_1409845208_41":{"id":"CONV_ID_1409845208_41","users":["admin","derp"],"backend":"och","messages":[]},"CONV_ID_1409845208_43":{"id":"CONV_ID_1409845208_43","users":["admin","herp"],"backend":"och","messages":[[{"id":30,"convid":"CONV_ID_1411199664_37","timestamp":"1411216506","user":"admin","msg":"hoi"},{"id":31,"convid":"CONV_ID_1411199664_37","timestamp":"1411216921","user":"admin","msg":"test123"},{"id":32,"convid":"CONV_ID_1411199664_37","timestamp":"1411216955","user":"admin","msg":"hoooi"},{"id":33,"convid":"CONV_ID_1411199664_37","timestamp":"1411216959","user":"derp","msg":"mooizo"},{"id":34,"convid":"CONV_ID_1411199664_37","timestamp":"1411216983","user":"derp","msg":"test113"},{"id":35,"convid":"CONV_ID_1411199664_37","timestamp":"1411216992","user":"derp","msg":"123"},{"id":36,"convid":"CONV_ID_1411199664_37","timestamp":"1411217013","user":"derp","msg":"abc"},{"id":37,"convid":"CONV_ID_1411199664_37","timestamp":"1411217016","user":"admin","msg":"jeej"},{"id":38,"convid":"CONV_ID_1411199664_37","timestamp":"1411217019","user":"derp","msg":"hehe"},{"id":39,"convid":"CONV_ID_1411199664_37","timestamp":"1411217021","user":"derp","msg":"houzee"},{"id":40,"convid":"CONV_ID_1411199664_37","timestamp":"1411217023","user":"admin","msg":"mooizo"},{"id":43,"convid":"CONV_ID_1411199664_37","timestamp":"1411283791","user":"admin","msg":"test123"},{"id":44,"convid":"CONV_ID_1411199664_37","timestamp":"1411283796","user":"derp","msg":"mooi"},{"id":45,"convid":"CONV_ID_1411199664_37","timestamp":"1411284510","user":"admin","msg":"hoi"},{"id":46,"convid":"CONV_ID_1411199664_37","timestamp":"1411284710","user":"admin","msg":"test"},{"id":47,"convid":"CONV_ID_1411199664_37","timestamp":"1411285065","user":"admin","msg":"hoi"},{"id":48,"convid":"CONV_ID_1411199664_37","timestamp":"1411285071","user":"derp","msg":"test"},{"id":49,"convid":"CONV_ID_1411199664_37","timestamp":"1411285164","user":"admin","msg":"heds"},{"id":50,"convid":"CONV_ID_1411199664_37","timestamp":"1411285197","user":"admin","msg":"abc"},{"id":51,"convid":"CONV_ID_1411199664_37","timestamp":"1411285204","user":"derp","msg":"jowah"},{"id":52,"convid":"CONV_ID_1411199664_37","timestamp":"1411285253","user":"admin","msg":"133"},{"id":53,"convid":"CONV_ID_1411199664_37","timestamp":"1411285261","user":"derp","msg":"ad"}]]}}},"sessionId":"c21325b7cb71064f4bf2ed2905d724fe"};
	var backends = initvar.backends;
	backends.och.handle = och;
	beforeEach(module('chat'));
	/**
	 * Create $scope and controller
	 * Mock all factories
	 */
	beforeEach(inject(function($controller, $rootScope){
		$scope = $rootScope.$new();
		for(var key in backends) {
			var backend = backends[key];
			spyOn(backend.handle, 'init');
		}
		spyOn(convs, 'addConv');
		spyOn(convs, 'addChatMsg');
		controller = $controller('ConvController', {
			$scope: $scope,
			initvar: initvar,
			och : och,
			convs : convs,
			activeUser: activeUser,
			contacts: {
				'contacts' : initvar.contactsObj,
				getHighestOrder: function(){},
				markOnline: function(){},
				markOffline: function(){}
			},
			backends: backends,
			title: {
				updateTitle: function(){},
				getDefaultTitle: function(){},
				getTitle: function(){},
				notify: function(){},
				emptyNewMsgs: function(){},
			}
		});
	}));

	describe('Initialization', function () {
		it('Should attach convs.convs to $scope.convs', function () {
			expect($scope.convs).toEqual(convs.convs);
		});

		it('Should attach activeUser to $scope.active.user', function () {
			expect($scope.active.user).toEqual(activeUser);
		});

		it('Should attach initConvs to $scope.initConvs', function () {
			expect($scope.initConvs).toEqual(initvar.initConvs);
		});

		it('Should attach initvar to $scope.initvar', function () {
			expect($scope.initvar).toEqual(initvar);
		});

		it('Should attach the first backend to $scope.active.backend', function () {
			for (var key in backends) break;
			expect($scope.active.backend).toEqual(backends[key]);
		});

		describe('Should call the init() method', function () {
			it('Should have called the init() function on every backend', function () {
				for(var key in backends) {
					var backend = backends[key];
					expect(backend.handle.init).toHaveBeenCalled();
				}
			});

			it('Should change $scope.initDone into true', function () {
				expect($scope.initDone).toBeTruthy();
			});

			it('Should call convs.addConv for every och initconvs', function () {
				for(var key in initvar.initConvs.och) {
					expect(convs.addConv).toHaveBeenCalled();
				}
			});

			it('Should call convs.addChatmsg for every chat msg in every och initConv', function () {
				for(var key in initvar.initConvs.och) {
					var conv = initvar.initConvs.och[key];
					for(var msgKey in conv.messages ) {
						expect(convs.addChatMsg).toHaveBeenCalled();
					}
				}

			});

		});
	});
});