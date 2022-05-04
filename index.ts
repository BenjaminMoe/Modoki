import 'dotenv/config'
import Web3 from 'web3'
import { abi } from './contract'
import { Observer } from './observer'
import { Database } from './database'

const contractAddress = '0x920b7DEeD5CdE055260cdDBD70C000Bbd5b30997'

const url = process.env.ETHEREUM_SERVICE_URL || 'http://localhost:8545'
const web3 = new Web3(url)
const contract = new web3.eth.Contract(abi, contractAddress)

;(async () => {
	const db = new Database()
	await db.init()

	const obs = new Observer(web3, contract, db)
	await obs.init()
})()
