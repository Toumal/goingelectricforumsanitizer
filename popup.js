window.onload = function(){
    var storage = chrome.storage.local;

    storage.get('noignored', function(result){
        var noignored = result['noignored'];
        if (noignored === undefined){
            noignored = true;
            storage.set({'noignored': noignored});
        }
        var cb = document.getElementById('noignored');
        cb.checked = noignored;
    });
    var sne_cb = document.getElementById('noignored');
    sne_cb.onclick=function(){
        if (sne_cb.checked){
            storage.set({'noignored': true});
        }else{
            storage.set({'noignored': false});
        }
    }
	
    storage.get('filtercustom', function(result){
        var filtercustom = result['filtercustom'];
        if (filtercustom === undefined){
            filtercustom = false;
            storage.set({'filtercustom': filtercustom});
            storage.set({'filterwords': ''});
        }
        var cf = document.getElementById('filtercustom');
        cf.checked = filtercustom;
    });
    var filter_custom = document.getElementById('filtercustom');
    filter_custom.onclick=function(){
        if (filter_custom.checked){
            storage.set({'filtercustom': true});
        }else{
            storage.set({'filtercustom': false});
        }
    }
 	
	
	storage.get('filterwords', function(result){
        var word = result['filterwords'];
		if (word === undefined) {
			word = 'PvP, griefer, griefing, steam';
		}
        var word_box = document.getElementById('word');
        word_box.value = word;
    });


    var word_box = document.getElementById('word');
    word_box.onchange = function(){
        storage.set({'filterwords': word_box.value});
    } 

	
	storage.get('filterusers', function(result){
        var filterusers = result['filterusers'];
        if (filterusers === undefined){
            filterusers = false;
            storage.set({'filterusers': filterusers});
            storage.set({'filterusers_names': ''});
        }
        var uf = document.getElementById('filterusers');
        uf.checked = filterusers;
    });
    var filter_users = document.getElementById('filterusers');
    filter_users.onclick=function(){
        if (filter_users.checked){
            storage.set({'filterusers': true});
        }else{
            storage.set({'filterusers': false});
        }
    }

	storage.get('filterusers_names', function(result){
        var users = result['filterusers_names'];
		if (users === undefined) {
			users = '';
		}
        var users_box = document.getElementById('users');
        users_box.value = users;
    });


    var users_box = document.getElementById('users');
    users_box.onchange = function(){
        storage.set({'filterusers_names': users_box.value});
    } 

	
}
