
var handler = {
	listeners: function() {
    // Event listeners for buttons clicked
    
		window.addEventListener( "click", this.btnPress );
		// ["click", "keydown", "touchend"].forEach( function(val) {
		// 	window.addEventListener( val, this.btnPress );
		// }, this);
	},
	btnPress: function(event) {
		// get element that was clicked as an event
    
    var elementClicked = event.target;
    // console.log(elementClicked);
    
    function classTest(text) {
      // return true if text is in classList
      var test = elementClicked.classList.contains(text);
      return test;
    } 

		function idTest(text) {
			// return true if text is in classList
			var test = elementClicked.id === text;
			return test;
    } 
    
    var newsTitleElem = document.getElementById("aside-title-news");
    var newsPanelElem = document.getElementById("news");
    var archiveTitleElem = document.getElementById("aside-title-archive");
    var archivePanelElem = document.getElementById("archive");
		if (idTest("aside-title-news")){
      newsPanelElem.classList.remove("hide");      
      archivePanelElem.classList.add("hide");

      newsTitleElem.classList.add("active");
      archiveTitleElem.classList.remove("active");
		} else if (idTest("aside-title-archive")) {
      newsPanelElem.classList.add("hide");      
      archivePanelElem.classList.remove("hide");

      newsTitleElem.classList.remove("active");
      archiveTitleElem.classList.add("active");
    }
    

    // Get the modal
    var modal = document.getElementById('login-modal');

    // When the user clicks on the button, open the modal 
    if (classTest("aside-button")) {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x) or outside modal, close the modal
    else if (classTest("modal-close") || classTest("modal") || classTest("modal-close-img")) {
      modal.style.display = "none";
    }
    


		// elementClicked.blur();
		
	}
}

var actions = {
  navBtn: function (elem) {
    elem.classList.toggle("change");

    const navList = document.querySelector(".nav-list");
    // navList.style.display = "block";
    navList.classList.toggle("show");
  },
  makeTable: function (dataObj) {
    // console.log(dataObj);

    // get table body
    const tableElem = document.querySelector("#table-body");

    // delete table body (children)
    tableElem.innerText = "";

    // sort data by earnings
    dataObj.sort((a,b) => {
      return b.earnings - a.earnings;
    });

    // make base elements
    dataObj.forEach((val, index) => {
      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      const tdRate = document.createElement("td");
      const tdEarn = document.createElement("td");

      // format data
      tdName.innerText = val.name;
      tdRate.innerText = val.apy + " %";
      tdEarn.innerText = "$" + useful.padDecimals(val.earnings);

      // add classes
      tr.classList.add("table-row");
      if (index%2===0) {tr.classList.add("table-even");} else {tr.classList.add("table-odd");}
      tdName.classList.add("table-row-item-first");
      tdRate.classList.add("table-row-item","table-middle");
      tdEarn.classList.add("table-row-item");


      // first exception
      if (index===0) {tr.id = "table-first-row";}


      // append 
      tr.appendChild(tdName);
      tr.appendChild(tdRate);
      tr.appendChild(tdEarn);
      tableElem.appendChild(tr);

    });

    //last exception
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdRate = document.createElement("td");
    const tdEarn = document.createElement("td");
    
    tr.classList.add("table-row");
    tdEarn.classList.add("table-note");

    tdEarn.innerText = "*Based on $50,000 deposit.";

    tr.appendChild(tdName);
    tr.appendChild(tdRate);
    tr.appendChild(tdEarn);
    tableElem.appendChild(tr);
    

  }
}

var data = {
  read: function () {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', './code-test.json', true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == "200") {
        // .open will NOT return a value but simply returns undefined in async mode so use a callback
        
        // raw JSON response from server request
        var data = request.responseText;
        // console.log("data: ", data);

        // parsed JSON response -> javascript object
        var dataObj = JSON.parse(data)
        // console.log("json: ", dataObj);

        actions.makeTable(dataObj);
      }
    }
    request.send(null);
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
  },
	padZero: function(num) {
		num = parseInt(num);
    if (num < 10) {
			num = "0" + num;
    }
    return num;
	},
	padDecimals: function(num) {
		num = parseInt(num);
    if (num === Math.floor(num)) {
			num = num + ".00" ;
    }
    return num;
	},
	time: function() {
		// returns current time in hrs:min:sec (24-hour format)
		
    var date = new Date();
    var hrs = this.padZero(date.getHours());
    var min = this.padZero(date.getMinutes());
    var sec = this.padZero(date.getSeconds());
		
		var currentTime = hrs + ":" + min + ":" + sec;
    return currentTime;
  },
  objectSort: function (property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
}


handler.listeners();
data.read();

