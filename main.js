document.getElementById("saveContactBtn").addEventListener("click", addContact);


let filterInput = document.getElementById('searchName');
filterInput.addEventListener('keyup', filterNames);

function filterNames(){
	filterInputValue = filterInput.value.toUpperCase();
	let ulElem = document.getElementById('lsContactNames');
	let liElem = ulElem.querySelectorAll('li.collection-item');

	for (let i=0; i< liElem.length; i++){
		let ancElVal = liElem[i].getElementsByTagName("a")[0].innerHTML.toUpperCase();
		if(ancElVal.indexOf(filterInputValue) != -1){
			liElem[i].style.display = "";
		} else {
			liElem[i].style.display = "none";
		}
	}
}

function checkAndCreateLocalStorageData(){
	if (localStorage.getItem("contacts") === null){
		var theContacts = [
			{"name": "Barry", 	"cell": "127343"},{"name": "Andy", 		"cell": "123123"},{"name": "Cinnamon","cell": "123145"},
			{"name": "Abraham", "cell": "123346"},{"name": "Cindy", 	"cell": "123168"},{"name": "Apollo", 	"cell": "143523"},
			{"name": "Ben", 		"cell": "126903"},{"name": "Arnold", 	"cell": "124253"},{"name": "Bud", 		"cell": "134063"},
			{"name": "Colin", 	"cell": "123491"},{"name": "Bill", 		"cell": "157323"},{"name": "Adam", "cell": "123194"},
			{"name": "Cedrick", "cell": "123194"},{"name": "Alex", "cell": "123194"},{"name": "Bulan", "cell": "123194"},
			{"name": "Atom", "cell": "123194"},

		];

		theContacts = theContacts.sort( (a,b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});

		theContacts = JSON.stringify(theContacts);
		localStorage.setItem("contacts", theContacts);
	}
}

function fetchLocalStorageData(){

	checkAndCreateLocalStorageData();

	var data = localStorage.getItem("contacts");
	data = JSON.parse(data);
	data.sort( (a,b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});

	return data;
}



function populateDiv(){
	var lsContactsData = fetchLocalStorageData();

	outputDiv = document.getElementById('contactsDiv');
	childUL = document.getElementById("lsContactNames");
	childUL.innerHTML = "";

	var newCharLiElem = document.createElement("li");
	var strContent  = `${lsContactsData[0].name.charAt(0)}`;
	newCharLiElem.innerHTML = `<h5>${strContent}</h5>`;
	newCharLiElem.setAttribute("class", 'collection-header');
	childUL.appendChild(newCharLiElem);


	for (var i=0; i<lsContactsData.length; i++){

		var newAncTagElem = document.createElement("a");
		newAncTagElem.setAttribute("href", "#");
		var ancTagVal = document.createTextNode(`${lsContactsData[i].name}`);
		newAncTagElem.appendChild(ancTagVal);

		newAncTagElem.addEventListener("click", function(event){
			event.preventDefault();
			console.log(this.innerHTML, this.nextSibling.innerText);
		});


		var newSpanElem = document.createElement("span");
		var cellNo = `${lsContactsData[i].cell}`;
		var spanContent = document.createTextNode(cellNo);
		newSpanElem.appendChild(spanContent);
		newSpanElem.id = `cellSpan-${i+1}`;
		newSpanElem.classList.add("right");
		newSpanElem.classList.add("hide");


		var newContactLiElem = document.createElement("li");

		newContactLiElem.appendChild(newAncTagElem);
		newContactLiElem.appendChild(newSpanElem);


		newContactLiElem.addEventListener("click", function(){
			this.children[1].classList.remove("hide");
			var detailsDiv = document.getElementById("detailsDiv");
			var name = this.children[0].innerText;
			var cellNo = this.children[1].innerText;
			detailsDiv.innerHTML= `<h4>${name}</h4> <p>${cellNo}</p>`;
		});

		newContactLiElem.setAttribute("class", "collection-item");
		childUL.appendChild(newContactLiElem);


		firstNameChar = lsContactsData[i].name.charAt(0);
		nextNameChar = lsContactsData[i+1].name.charAt(0);

		if (firstNameChar != nextNameChar){

			var newCharLiElem = document.createElement("li");
			var strContent  = `<h5>${nextNameChar}</h5>`;
			newCharLiElem.innerHTML = strContent;
			newCharLiElem.setAttribute("class", 'collection-header');
			childUL.appendChild(newCharLiElem);
		}

	}
}

function addContact(e){
	e.preventDefault();
	var contactNameVal= document.getElementById('createForm').newContactName.value;
	var contactCellVal= document.getElementById('createForm').newContactCell.value;

	if (!contactNameVal || !contactCellVal){
		document.getElementById('createFormErrors').innerHTML = "<p class='center-align'> Please Fill in values correctly </p>";
	return ;
	}

	var newContact = { name : contactName, cell : contactCell};

	currentContacts = JSON.parse(localStorage.getItem("contacts"));
	currentContacts.push(newContact);
	currentContacts = JSON.stringify(currentContacts);
	localStorage.setItem("contacts", currentContacts);
	document.getElementById('createForm').newContactName.value = "";
	document.getElementById('createForm').newContactCell.value = "";
	populateDiv();

}

