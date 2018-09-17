export const ASC_PRICE = (a, b) => a.price - b.price || b.id - a.id
export const DESC_PRICE = (a, b) => b.price - a.price || b.id - a.id

export const DESC_DATE = (a, b) => a.time - b.time

export const BUY = (i) => i.type === 'buy'
export const SELL = (i) => i.type === 'sell'
