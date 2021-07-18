import * as Comlink from 'comlink'

function log(str){
    console.log(str)
}
Comlink.expose( {
    log
})