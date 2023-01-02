const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//c.fillStyle = '#fff'
c.fillRect(0, 0, canvas.width, canvas.height)

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40



window.addEventListener('mousemove', function(event){
	mouse.x = event.x
	mouse.y = event.y
})


function Circle(x, y, dx, dy, radius, color) {
	this.x = x
	this.y = y
	this.dx = dx
	this.dy = dy
	this.radius = radius
	this.minRadius = radius
	this.color = color

	this.draw = function(){
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
			/*c.beginPath()
			c.fillStyle = 'yellow'
			c.arc(mouse.x, mouse.y, 50, Math.PI * 2, false)
			c.fill()*/
	}

	this.update = function() {
		this.draw()

		if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
			this.dx = -this.dx
		}

		if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
			this.dy = -this.dy
		}

		this.x += this.dx
		this.y += this.dy

		//interactive with particle
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.radius < maxRadius){
			this.radius += 1
			}
		} else if(this.radius > this.minRadius){
			this.radius -= 1
		}

	}
}

var circleArray = []
var colorArray = [
	'#034159',
	'#025951',
	'#02735E',
	'#038C3E',
	'#0CF25D',
	'red',
	'#009',
	'purple',
]

for(var i=0; i < 1000; i++){
var radius = Math.random() * 6 + 2
var x = Math.random() * (canvas.width - radius * 2) + radius
var y = Math.random() * (canvas.height - radius * 2) + radius
var dx = (Math.random() - 0.5)
var dy = (Math.random() - 0.5)
var color = colorArray[Math.floor(Math.random() * colorArray.length)]
circleArray.push(new Circle(x, y, dx, dy, radius, color))
}

console.log(circleArray.length)

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update()
	}
}
animate()