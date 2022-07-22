'use strict'

const axios = require('axios')
const fs = require('fs')

const getPage = async (url) => {
	const { data } = await axios.get(url)
	const parts = data.split(' ')
	const count = {}
	parts.forEach((part) => {
		count[part] = count[part] || 0
		count[part]++
	})
	fs.writeFileSync('docs/index.json', JSON.stringify(count, null, 2))
}

getPage('https://www.wikipedia.org/')
