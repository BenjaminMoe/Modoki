import { AbiItem } from 'web3-utils'

export const abi: AbiItem[] = [
	{
		constant: true,
		inputs: [],
		name: 'transactionNumber',
		outputs: [
			{
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: 'anchorFileHash',
				type: 'bytes32',
			},
			{
				indexed: true,
				name: 'transactionNumber',
				type: 'uint256',
			},
			{
				indexed: false,
				name: 'numberOfOperations',
				type: 'uint256',
			},
		],
		name: 'Anchor',
		type: 'event',
	},
	{
		constant: false,
		inputs: [
			{
				name: '_anchorHash',
				type: 'bytes32',
			},
			{
				name: '_numberOfOperations',
				type: 'uint256',
			},
		],
		name: 'anchorHash',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
]
