const palos = ["Oro", "Basto", "Espada", "Copa"]
const usedCards = []
let counter = 0

function grabCard(){
	let info = document.createElement("p");
	let t = document.createTextNode(pickCard().name);
	let box = document.getElementById("hand");
	info.appendChild(t);
	box.appendChild(info);
	counter++
	console.log(counter)
}

function randomCard(){
	number = getRandomInt(1, 13)
	p = palos[getRandomInt(0,4)] 
	return new Card(number, p)
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//podria hacer una lista manual de todas las cartas e ir sacandolas de ahi, peroo voy a probar esto
function pickCard(){
	let card = randomCard()
	while ((cardRepeated(card))&&(deckNotEmpty())){
		card = randomCard()
	}
	if (usedCards.length == 48){
		return "No hay mas cartas"
	}else{
		usedCards.push(card.name)
		return card
	}
}
function cardRepeated(card){
	return usedCards.includes(card.name)
}
function deckNotEmpty(){
	return usedCards.length < 48
}

//cartas como objeto/clase
class Card{
    constructor(number,palo){
        this.number = number;
        this.palo = palo;
        this.name = number.toString() + " de " + palo
        this.image = number.toString() + "_de_" + palo +".png"
    }
}