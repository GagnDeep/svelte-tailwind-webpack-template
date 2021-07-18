import * as Comlink from 'comlink'

const utils = Comlink.wrap(new Worker('./utils.js', { type: 'module' }))

export { utils }