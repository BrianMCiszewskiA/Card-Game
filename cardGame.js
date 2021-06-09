

const playerHand = []
const npcHand = []
const playerSide = ["emptyPlayer"]
const npcSide = ["emptyNpc"]

function startGame(){
	takeCard(playerHand);
	takeCard(npcHand);
	takeCard(playerHand);
	takeCard(npcHand);
	takeCard(playerHand);
	takeCard(npcHand);
	eliminarElemento("gameButton");

	updateImages();


	eliminarElemento("npcCard");
	eliminarElemento("playerCard");

	let box = document.getElementById("table");
	box.appendChild(createImage("cardsImage/" + playerSide[0] + ".png", "playerCard", "PlayerSide"));
	box.appendChild(createImage("cardsImage/" + npcSide[0] + ".png", "npcCard", "NpcSide"));

	startTurn()
}

function takeCard(hand){
	if(deckNotEmpty()){
		hand.push(pickCard())
		console.log(hand)
	}else{
		alert("No hay mas cartas")
	}
}
function putCardOnTable(card, hand, tableSide){
	removeFromHand(card, hand)
	//despues hacer que haga cambiar la imagen esto
	tableSide = card
}

function startTurn(){
	playerTurn()
}
function playerTurn(){
	activateImageButton();
	addPickCardText();
}

function playerSelect(cardPosition){
	eliminarElemento("texto");
	selectCard(cardPosition, playerHand, playerSide);
	deactivateImageButton();
	updateImages();
	npcTurn();
}

function selectCard(cardPosition, hand, tableSide){
	let card = hand[cardPosition];
	tableSide.pop()//podria despues hacer algo para apilarlo y mostrar la ultima carta nomas
	tableSide.push(card) 
	hand.splice(cardPosition, 1)
}

function npcTurn(){
	selectCard(getRandomInt(0,3), npcHand, npcSide);
	endTurn()
}

function endTurn(){
	console.log(playerSide[0].name);
	console.log(npcSide[0].name);
	whoWins();
	takeCard(playerHand);
	takeCard(npcHand);
	updateImages();
	startTurn()
}

function whoWins(){
	let card1= playerSide[0];
	let card2= npcSide[0];
	if (card1.number > card2.number){
		addScore("playerPoints");
	}else{
		if(card2.number > card1.number){
			addScore("npcPoints");
		} else{
			alert("Draw");
		}
	}
}

function createImage(img, id, alt){
	let image = document.createElement("img");
	image.setAttribute("src", img);
	image.setAttribute("alt", alt);
	image.setAttribute("id", id)
	image.setAttribute("width", "10%")
	image.setAttribute("height", "10%")
	return image
}
function eliminarElemento(id){
	imagen = document.getElementById(id);	
	if (!imagen){
	} else {
		padre = imagen.parentNode;
		padre.removeChild(imagen);
	}
}

function updateImages(){
	updatePHandImage();
	updateTable();
	updateNpcHandImage();
}

function updatePHandImage(){
	let box = document.getElementById("hand");
	for(i=0; i< playerHand.length; i++){
		eliminarElemento("c" + (i+1));
		box.appendChild(createImage("cardsImage/" + playerHand[i].image, "c" + (i+1), playerHand[i].name));
	}
}
function updateTable(){
	let box = document.getElementById("table");
	eliminarElemento("npcCard");
	eliminarElemento("playerCard");

	box.appendChild(createImage("cardsImage/" + playerSide[0].image, "playerCard", playerSide[0].name));
	box.appendChild(createImage("cardsImage/" + npcSide[0].image, "npcCard", npcSide[0].name));

}
function updateNpcHandImage(){
	let box = document.getElementById("npchand");
	for(i=0; i< npcHand.length; i++){
		eliminarElemento("r" + (i+1));
		box.appendChild(createImage("cardsImage/npcCard.png", "r" + (i+1), "rivalCard" + (i+1)));
	}
}
function activateImageButton(){
	for (i=0; i< playerHand.length; i++) {
		document.getElementById("c" + (i+1)).setAttribute("onclick", "playerSelect("+ i +")");
	}
}
function deactivateImageButton(){
	for (i=0; i< playerHand.length; i++) {
		document.getElementById("c" + (i+1)).removeAttribute("onclick");
	}
}
function addPickCardText(){
	let where = document.getElementById("hand");
	let h = document.createElement("H3");
	let t = document.createTextNode("elige una carta");
	h.setAttribute("id", "texto");
	h.appendChild(t);
	where.appendChild(h);
}
function addScore(winnerPoints){
	let score = document.getElementById(winnerPoints);
	let actualPoints = Number(score.textContent); //transforma el string a numero
	let newScore = document.createTextNode(actualPoints + 1);
	score.replaceChild(newScore, score.childNodes[0]);
}