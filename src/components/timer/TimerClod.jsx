import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import imageUrls from './imageUrls.json'

const CountdownTimerDisc = () => {
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds default
  const [isRunning, setIsRunning] = useState(false)
  const [duration, setDuration] = useState(60)
  const [inputDuration, setInputDuration] = useState('60')
  const [imageUrl, setImageUrl] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const UNSPLASH_ACCESS_KEY = 'C1fArNZpJtsjLWkTaNCsKD8dZ6dxj8V7DznCYcHtWDI'
  const QUERY = 'cute animal'
  const WIDGET_SIZE = 380
  const RADIUS = WIDGET_SIZE / 2

  const fetchImage = async () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length)
    // const imageUrl = imageUrls?.[randomIndex]
    setImageUrl(imageUrls?.[randomIndex])
  }

  const launchConfetti = () => {
    var confettiTime = 3 * 1_000
    var animationEnd = Date.now() + confettiTime

    var scalar = 5
    const emojis = ['🎉', '✨', '🥳', '💥', '🔥', '🎊', '🦄']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    console.log('emoji', emoji)
    var shape = confetti.shapeFromText({ text: emoji, scalar })
    // var unicorn = confetti.shapeFromText({ text: '🦄', scalar })

    var defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 12,
      shapes: [shape],
      scalar,
    }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      var particleCount = 50 * (timeLeft / confettiTime)
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    }, 250)
  }

  useEffect(() => {
    fetchImage()
  }, [])

  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      setIsComplete(true)
      launchConfetti()
      // Clear animation flag after it's played (e.g., after 1.5s)
      setTimeout(() => setIsComplete(false), 1500)
    }
    return () => clearTimeout(timer)
  }, [isRunning, timeLeft])

  const startTimer = () => {
    fetchImage()
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration)
  }

  const handleDurationChange = e => {
    setInputDuration(e.target.value)
  }

  const add10s = () => {
    setDuration(ps => ps + 10)
    setTimeLeft(ps => ps + 10)
  }

  const subtract10s = () => {
    const newDuration = duration <= 10 ? 0 : duration - 10
    setDuration(newDuration)
    setTimeLeft(newDuration)
  }

  const setNewDuration = () => {
    const newDuration = parseInt(inputDuration, 10)
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration)
      setTimeLeft(newDuration)
    }
  }

  const startWithDuration = seconds => {
    fetchImage()
    setDuration(seconds)
    setTimeLeft(seconds)
    setInputDuration(String(seconds))
    setIsRunning(true)
  }

  // Calculate percentage for pie chart
  const percentage = (timeLeft / duration) * 100

  // Format time as MM:SS
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate the end angle for the pie slice
  const endAngle = (percentage / 100) * 360

  // Generate path for pie slice
  const generatePieSlice = endAngle => {
    const radius = RADIUS
    const centerX = radius
    const centerY = radius

    if (endAngle >= 360) {
      // Draw full circle
      return `
        M ${centerX} ${centerY - radius}
        A ${radius} ${radius} 0 1 1 ${centerX} ${centerY + radius}
        A ${radius} ${radius} 0 1 1 ${centerX} ${centerY - radius}
        Z
      `
    }

    // Convert from degrees to radians
    const endRad = (endAngle * Math.PI) / 180

    // Calculate the end point
    const endX = centerX + radius * Math.sin(endRad)
    const endY = centerY - radius * Math.cos(endRad)

    // Determine if we need to use the large arc flag (1 if > 180 degrees)
    const largeArcFlag = endAngle > 180 ? 1 : 0

    // Create the path
    // M = move to center, L = line to top, A = arc to end point, Z = close path
    return `M ${centerX} ${centerY} L ${centerX} ${
      centerY - radius
    } A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-0 bg-gray-100 rounded-lg shadow-md transition duration-300 ${
        isComplete ? 'animate-ping-once' : ''
      }`}
    >
      <div className="w-screen h-screen flex flex-col items-center justify-center p-0 bg-gray-100 rounded-lg shadow-md">
        <div
          className={`relative w-[${WIDGET_SIZE}px] h-[${WIDGET_SIZE}px] mb-6 bg-cover bg-center rounded-full overflow-hidden`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <svg className="w-full h-full" viewBox={[0, 0, WIDGET_SIZE, WIDGET_SIZE].join(' ')}>
            {/* Background circle */}
            {/* <circle cx={RADIUS} cy={RADIUS} r={RADIUS} fill="#eee0" /> */}

            {/* Pie slice representing remaining time */}
            <path d={generatePieSlice(endAngle)} fill="#48f" />
          </svg>
        </div>

        <div>
          <div className="text-8xl mb-10">{formatTime(timeLeft)}</div>
          {/* <div>{Math.round(percentage)}%</div> */}
        </div>

        <div className="flex space-x-2 mb-6">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-4 py-2  text-white rounded hover:bg-gray-600 bg-gray-600 focus:outline-none"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-4 py-2  text-white rounded hover:bg-gray-600 bg-gray-600 focus:outline-none"
          >
            Reset
          </button>
        </div>

        {/* Time preset buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[3, 10, 30, 60, 120, 300].map(sec => (
            <button
              key={sec}
              onClick={() => startWithDuration(sec)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
            >
              {sec < 60 ? `${sec}s` : `${sec / 60}m`}
            </button>
          ))}
        </div>

        {/* +-10s buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={add10s}
            className="px-4 py-2  text-white rounded hover:bg-gray-600 bg-gray-600 focus:outline-none"
          >
            Add 10
          </button>

          <button
            onClick={subtract10s}
            className="px-4 py-2  text-white rounded hover:bg-gray-600 bg-gray-600 focus:outline-none"
          >
            FF 10
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={inputDuration}
            onChange={handleDurationChange}
            className="w-20 px-2 py-1 border border-gray-300 rounded"
            min="1"
          />
          <span className="text-gray-700">seconds</span>
          <button
            onClick={setNewDuration}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimerDisc

// const fetchImage = async () => {
//   const collectionId = 'pzkkM4TK1dE'
//   const collectionId = 'KPahqwb_TeY'
//   try {
//     const url = `https://api.unsplash.com/collections/${collectionId}/photos?per_page=10&page=1&orientation=squarish`

//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
//       },
//     })

//     // const response = await fetch()
//     // `https://api.unsplash.com/photos/random?query=${QUERY}&client_id=${UNSPLASH_ACCESS_KEY}`
//     const data = await response.json()
//     console.log('data', data)

//     const imageUrls = data.map(x => x.urls?.small)
//     console.log('--- imageUrls', imageUrls)

//     if (data.urls) {
//       setImageUrl(data.urls.small)
//     }
//   } catch (error) {
//     console.error('Error fetching image:', error)
//   } finally {
//     // setLoading(false)
//   }
// }
