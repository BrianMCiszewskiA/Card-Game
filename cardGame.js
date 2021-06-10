

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
	deactivateImageButton();
	selectCard(cardPosition, playerHand, playerSide, "c");
	updateImages();
	npcTurn();
}

function selectCard(cardPosition, hand, tableSide, identifier){
	let card = hand[cardPosition];
	tableSide.pop();//podria despues hacer algo para apilarlo y mostrar la ultima carta nomas
	tableSide.push(card);
	hand.splice(cardPosition, 1);
	eliminarElemento(identifier + cardPosition);
}

function npcTurn(){
	let cardPosition = getRandomInt(0,3);
	if(!deckNotEmpty()){
		cardPosition=0; //cuando se terminan las cartas del mazo usa la primera de la mano
	}
	selectCard(cardPosition, npcHand, npcSide, "r");
	endTurn();
}

function endTurn(){
	console.log(playerSide[0].name);
	console.log(npcSide[0].name);
	whoWins();
	takeCard(playerHand);
	takeCard(npcHand);
	updateImages();
	if(playerHand.length > 0){
		startTurn()
	} else {
		showGameOverScreen();
	}
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
	eliminarElemento("c1");
	eliminarElemento("c2");
	eliminarElemento("c3");
	for(i=0; i< playerHand.length; i++){
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
	eliminarElemento("r1");
	eliminarElemento("r2");
	eliminarElemento("r3");
	for(i=0; i< npcHand.length; i++){
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
function showGameOverScreen(){
	let playerScore = Number(document.getElementById("playerPoints").textContent);
	let pcScore = Number(document.getElementById("npcPoints").textContent);

	//sacar la visibilidad de los elementos en pantalla
	let where = document.getElementById("scorePoints");
	let h = document.createElement("H3");
	let t = document.createTextNode(matchWinner(playerScore, pcScore));

	h.appendChild(t);
	where.appendChild(h);
}
function matchWinner(pScore, pcScore){
	if (pScore > pcScore){
		return "El Jugador Gana";
	} else if (pcScore> pScore){
		return "La Pc Gana";
	} else {
		return "Es un empate";
	}
}