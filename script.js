(function () {

})();










var handler = {
	listeners: function() {
    // Event listeners for buttons clicked
    
		// window.addEventListener( "click", this.btnPress );
		["click", "keydown", "touchend"].forEach( function(val) {
			window.addEventListener( val, this.btnPress );
		}, this);
	},
	btnPress: function() {
		// get element that was clicked as an event		

    
    var elementClicked = event.target;
    

    console.log(elementClicked)

		function tagClass(text) {
			// return true if text is in classList
			var test = elementClicked.classList.contains(text);
			return test;
		} 
		var keyCode = event.keyCode;
		// set btnID as ID of the button clicked
		var id =  (elementClicked.id===undefined) ? 0 : elementClicked.id;	
		var className = (elementClicked.className===undefined) ? 0 : elementClicked.className ;
		var type = (elementClicked.type===undefined) ? 0 : elementClicked.type ;
		var checked = (elementClicked.checked===undefined) ? 0 : elementClicked.checked ;
		
		// console.log(...)
		// console.log(event);
		// console.log("element:",
		// 						"\n      id:", id, 
		// 						"\n   class:", className,
		// 						"\n    type:", type,
		// 						"\n checked:", checked);
    
    var newsTitleElem = document.getElementById("aside-title-news");
    var newsPanelElem = document.getElementById("news");
    var archiveTitleElem = document.getElementById("aside-title-archive");
    var archivePanelElem = document.getElementById("archive");
		if (tagClass("aside-panel-header")){
      
      newsPanelElem.classList.toggle("hide");      
      archivePanelElem.classList.toggle("hide");

      newsTitleElem.classList.toggle("active");
      archiveTitleElem.classList.toggle("active");
		}
				
		// if (tagClass("strict")){
		// 		if (checked) {
		// 			simon.strictMode = 1;
		// 		} else {
		// 			simon.strictMode = 0;
		// 		}
		// }
		
		// if (tagClass("tile") && simon.simon === 1){
		// 	// check if correct
		// 	simon.check(event);			
		// }
    
    

    

    // Get the modal
    var modal = document.getElementById('login-modal');

    // Get the button that opens the modal
    var openBtn = document.getElementById("aside-login");
    
    // Get the <span> element that closes the modal
    var closeBtn = document.getElementById("modal-close");

    // When the user clicks on the button, open the modal 
    if (tagClass("aside-button")) {
      modal.style.display = "block";
    } 
    // When the user clicks on <span> (x) or outside modal, close the modal
    else if (tagClass("modal-close") || tagClass("modal") || tagClass("modal-close-img")) {
      modal.style.display = "none";
    }
    


		// elementClicked.blur();
		
	}
}

var storeLocally = {
  testLocalStorage: function() {
    if (typeof(Storage) === "undefined") {
      alert("Sorry! No Web Storage support");
      return;
    }
  },
  keepValues: function(arrToRetrieve) {
    this.testLocalStorage();
    localStorage.setItem(arrToRetrieve, JSON.stringify(bookmarks.bList));
  },
  retrieveValues: function(arrToRetrieve) {
    this.testLocalStorage();
    if (localStorage.getItem(arrToRetrieve)) {
      bookmarks.bList = JSON.parse(localStorage.getItem(arrToRetrieve));
    } else {
      bookmarks.bList = [];
    }
    
  },
  localStorageSpace: function() {
    // output local storage used
        var allStrings = '';
        for(var key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        
        return allStrings ? 3 + Math.round(1000*(allStrings.length*16)/(8*1024))/1000 + ' KB' + '/' + this.localStorageSpaceTotal() + 'KB' + ' (' + Math.round(10000000*((allStrings.length*16)/(8*1024))/this.localStorageSpaceTotal())/10000000 + '%)'  : 'Empty (0 KB' +  + '/' + this.localStorageSpaceTotal() + 'KB )';
  },
  localStorageSpaceTotal: function() {
    function gen(n) {
      return new Array((n * 1024) + 1).join('a')
    }

    // localStorage.removeItem('size');
    // Determine size of localStorage if it's not set
    if (localStorage && !localStorage.getItem('size')) {
      var i = 0;
      try {
          // Test up to 50 MB
          for (i = 250; i <= 10000; i += 250) {
              localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
          }
      } catch (e) {
          localStorage.removeItem('test');
          localStorage.setItem('size', i - 250);            
      }
    }
    return localStorage.getItem('size');
  }
}

var useful = {
  truncateString: function(str, num) {
    // Clear out that junk in your trunk
    
    if (str.length <= num ) {
      return str; 
    } else if (num <= 3) {
      str = str.slice(0,num) + "...";
    } else {
      str = str.slice(0,num-3) + "...";
    }
    
    return str;
  },
  textCheckAdd: function(str,strToCheck) {
    // var expression1 = /(http|\/\/)/i;
    var expression1 = new RegExp(strToCheck, "i");
    if ( !str.match(expression1) ) {
      return str = strToCheck + "://" + str;
    } else {
      return str;
    }
  },
  textCheckRemove: function(str,strToCheck) {
    // var expression1 = /(http|\/\/)/i;
    var expression1 = new RegExp(strToCheck, "i");
    return str.replace(expression1,"");
  },
  regexEscape: function(str) {
    // function to escape special characters when not done properly
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

}


handler.listeners();

