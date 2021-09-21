document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const game = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 225
    let birdBottom = 200
    let gravity = 2
    let isGameOver = false
    let gap = 450

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode == 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('keyup', control)

    function generateObstacle() {
        let randomHeight = Math.random() * 60
        let obstacleLeft = 500
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) obstacle.classList.add('obstacle')
        if (!isGameOver) topObstacle.classList.add('topObstacle')
        game.appendChild(obstacle) 
        game.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if(obstacleLeft == 0) {
                clearInterval(timerId)
                game.removeChild(obstacle)
                game.removeChild(topObstacle)
            }
            if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 225 && (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 200) || birdBottom == 0) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
    }
})