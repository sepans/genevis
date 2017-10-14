const fs = require('fs')

fs.readFile('data/meta.json', (err, data) => {
	const json = JSON.parse(data)
	const shortJson = json.map((item, i) => {
		item.meta.sizes.splice(2)
		console.log(item.meta.sizes.length)
		return item
	})
	fs.writeFile('data/word2vec_meta_short.json', JSON.stringify(shortJson), () => { console.log('done')})
})