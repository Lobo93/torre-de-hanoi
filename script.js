let disco
let ultimaTorre
let discoFlutuante

const torres = []

class Torre {
	constructor(elementoHTML, discos) {
		this.elementoHTML = elementoHTML
		this.discos = discos
		this.elementoHTML.discos = discos
	}
}

function mostrarDiscos(torre, animado) {
	torre.innerHTML = ''
	torre.discos.forEach((disco, indice) => {
		const discoHTML = document.createElement('div')
		discoHTML.classList.add('disco', `disco${disco}`)
		torre.appendChild(discoHTML)
		if (animado && indice === torre.discos.length - 1) discoHTML.classList.add('disco-topo')
	})
}

function colocarDisco(torre) {
	discoFlutuante.parentElement.removeChild(discoFlutuante)
	discoFlutuante = null
	torre.discos.push(disco)
	disco = null
	ultimaTorre = null
	mostrarDiscos(torre, true)
}

function removerDisco(torre, x, y) {
	disco = torre.discos.pop()
	ultimaTorre = torre
	mostrarDiscos(torre, false)

	if (!disco) return

	discoFlutuante = document.createElement('div')
	discoFlutuante.classList.add('disco', `disco${disco}`, 'disco-flutuante')
	torre.appendChild(discoFlutuante)
}

document.querySelectorAll('.torre').forEach((torre, indice) => {
	torres.push(new Torre(torre, indice === 1 ? [1,2,3,4,5,6,7] : []))

	torre.addEventListener('click', ({x,y}) => {
		if (!disco) removerDisco(torre, x, y)
		else if (torre.discos.length <= 0 || disco > torre.discos[torre.discos.length - 1]) colocarDisco(torre)
		else colocarDisco(ultimaTorre)
	})

	mostrarDiscos(torre, false)
})