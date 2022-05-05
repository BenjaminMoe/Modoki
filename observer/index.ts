import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { Database } from '../database'
import { ContractTransaction } from '../types'
const { base58btc } = require('multiformats/bases/base58')

export class Observer {
	private web3: Web3
	private contract: Contract
	private db: Database

	constructor(web3: Web3, contract: Contract, db: Database) {
		this.web3 = web3
		this.contract = contract
		this.db = db
	}

	async getTransactions(fromBlock: number, toBlock: number | string) {
		const logs = await this.contract.getPastEvents('Anchor', {
			fromBlock,
			toBlock,
		})

		const txns: ContractTransaction[] = logs.map((log) => {
			const { returnValues, blockNumber, blockHash } = log
			const { anchorFileHash, numberOfOperations, transactionNumber } = returnValues
			const buffer = Buffer.from('1220' + anchorFileHash.replace('0x', ''), 'hex')
			const coreIndexFileUri = base58btc.encode(buffer).slice(1)

			return {
				transactionNumber: Number.parseInt(transactionNumber),
				blockNumber,
				blockHash,
				operationCount: Number.parseInt(numberOfOperations),
				coreIndexFileUri,
			}
		})
		await this.db.insertTransactions(txns)
		console.log(txns[289])
		return txns
	}

	async init() {
		const lastBlock = await this.web3.eth.getBlock('latest')
		const txns = await this.getTransactions(0, 'latest')
	}
}
