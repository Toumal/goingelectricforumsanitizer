console.log("GoingElectric Forum Sanitizer");

function removeByMention(filterwords) {
	//Filter thread list according to word filter
    var threads = document.getElementsByClassName('threadbit');
	var threadstoremove = [];
    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];
		var threadid = thread.id;
        //console.log('Checking Thread ID '+threadid);
		var threadtitle = document.getElementById('thread_title_'+threadid).text.toLowerCase();
		//console.log('Thread Title: '+threadtitle);
		for (var o = 0; o < filterwords.length; o++) {
			var filterword = filterwords[o].toLowerCase().trim();
			if (filterword != '' && threadtitle.indexOf(filterword) > -1) {
				//console.log('Match found! Removing thread '+threadid);
				threadstoremove.push(threadid);
				break;
			}
		}
	};
	
	for (var i = 0; i<threadstoremove.length; i++) {
		var thread = document.getElementById('thread_'+threadstoremove[i]);
		thread.parentElement.removeChild(thread);
		thread.remove();
	}
	

	//Filter post list
    var posts = document.getElementsByClassName('post');
	var poststoremove = [];
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
		var postid = post.id;
        console.log('Checking Post ID '+postid);
		var postcontent = document.getElementById(postid).getElementsByClassName("content")[0].innerText.toLowerCase();
		for (var o = 0; o < filterwords.length; o++) {
			var filterword = filterwords[o].toLowerCase().trim();
			if (filterword != '' && postcontent.indexOf(filterword) > -1) {
				console.log('Match found! Removing post '+postid+' because it matches: '+filterword);
				poststoremove.push(postid);
				break;
			}
		}
	};

	for (var i = 0; i<poststoremove.length; i++) {
		var post = document.getElementById(poststoremove[i]);
		post.parentElement.removeChild(post);
		post.remove();
	}


}

function removeByUser(filterusers) {
	//Filter thread list according to starting user
    var threads = document.getElementsByClassName('threadbit');
	var threadstoremove = [];
    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];
		var threadid = thread.id;
        //console.log('Checking Thread ID '+threadid);
		var threadauthor = thread.getElementsByClassName("username")[0].innerText.toLowerCase();
		//console.log('Thread Author: '+threadauthor);
		for (var o = 0; o < filterusers.length; o++) {
			var filteruser = filterusers[o].toLowerCase().trim();
			if (filteruser != '' && threadauthor === filteruser) {
				//console.log('Match found! Removing thread '+threadid);
				threadstoremove.push(threadid);
				break;
			}
		}
	};
	
	for (var i = 0; i<threadstoremove.length; i++) {
		var thread = document.getElementById('thread_'+threadstoremove[i]);
		thread.parentElement.removeChild(thread);
		thread.remove();
	}
	
	//Filter post list
    var posts = document.getElementsByClassName('post');
	var poststoremove = [];
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
		var postid = post.id;
        console.log('Checking Post ID '+postid);
		if (document.getElementById(postid).getElementsByClassName("author").length > 0) {
			var postcontent = document.getElementById(postid).getElementsByClassName("author")[0].innerText.toLowerCase();
			for (var o = 0; o < filterusers.length; o++) {
				var filterword = filterusers[o].toLowerCase().trim();
				if (filterword != '' && postcontent.indexOf(filterword) > -1) {
					console.log('Match found! Removing post '+postid+' because it matches author: '+filterword);
					poststoremove.push(postid);
					break;
				}
			}
		}
		if (document.getElementById(postid).getElementsByClassName("ignore").length > 0) {
			var ignorecontent = document.getElementById(postid).getElementsByClassName("ignore")[0].innerText.toLowerCase();
			for (var o = 0; o < filterusers.length; o++) {
				var filterword = filterusers[o].toLowerCase().trim();
				if (filterword != '' && ignorecontent.indexOf(filterword) > -1) {
					console.log('Match found! Removing ignore message '+postid+' because it matches author: '+filterword);
					poststoremove.push(postid);
					break;
				}
			}
		}
	};

	for (var i = 0; i<poststoremove.length; i++) {
		var post = document.getElementById(poststoremove[i]);
		post.parentElement.removeChild(post);
		post.remove();
	}

	
}


function removeIgnored() {
	
	//Filter post list
    var posts = document.getElementsByClassName('post');
	var poststoremove = [];
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
		var postid = post.id;
        console.log('Checking Post ID '+postid);
		if (document.getElementById(postid).getElementsByClassName("ignore").length > 0) {
			console.log('Match found! Removing ignore notification '+postid);
			poststoremove.push(postid);
		}
	};

	for (var i = 0; i<poststoremove.length; i++) {
		var post = document.getElementById(poststoremove[i]);
		post.parentElement.removeChild(post);
		post.remove();
	}

	
}


chrome.storage.local.get(['filtercustom', 'filterwords', 'filterusers', 'filterusers_names', 'noignored'], function(results){
    console.log("GoingElectric Forum Sanitizer loaded.");

    if (results['noignored']){
        console.log('removing ignored posts.');
        removeIgnored();
    }

    if (results['filtercustom']){
		var filterwords = results['filterwords'];
        console.log('removing custom filtered posts: ' + filterwords);
		var filterarray;
		if (filterwords.indexOf(',') > -1) {
			filterarray = filterwords.split(',');
		} else {
			filterarray = [filterwords.trim()];
		}
        removeByMention(filterarray);
    }

    if (results['filterusers']){
		var filterusers = results['filterusers_names'];
        console.log('removing threads by users: ' + filterusers);
		var filterarray;
		if (filterusers.indexOf(',') > -1) {
			filterarray = filterusers.split(',');
		} else {
			filterarray = [filterusers.trim()];
		}
        removeByUser(filterarray);
    }
	
});
