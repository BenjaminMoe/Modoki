export const insertTransaction = `
  INSERT INTO transactions (
    transactionNumber,
    blockNumber,
    blockHash,
    operationCount,
    coreIndexFileUri
  ) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?
  ) ON CONFLICT DO NOTHING
`

export const schema = [
	`CREATE TABLE IF NOT EXISTS transactions (
    transactionNumber INT,
    blockNumber INT,
    blockHash VARCHAR(66),
    operationCount INT,
    coreIndexFileUri VARCHAR(46),
    PRIMARY KEY (transactionNumber)
  )`,
]
