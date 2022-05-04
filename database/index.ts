import sqlite3 from 'sqlite3'
import { ContractTransaction } from '../types'
import { insertTransaction, schema } from './schema'

export class Database {
	private db: sqlite3.Database
	constructor() {
		this.db = new sqlite3.Database('modoki.sqlite')
	}
	async init() {
		console.log('Migrate database')
		schema.forEach((query) => {
			this.db.run(query)
		})
		console.log('done')
	}

	async insertTransactions(txns: ContractTransaction[]) {
		await Promise.all(
			txns.map(async (txns) => {
				const args = Object.values(txns)
				await this.db.run(insertTransaction, args)
			})
		)
	}
}
