// importando dependencias:
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede de teste
const network = bitcoin.networks.testnet4

// derivação de carteiras hierarchical deterministic(HD)
// const path = `m/49'/0'/0'/0` main net
const path = `m/49'/1'/0'/0` //testnet

//criando seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criação conta: par pub-pvt
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço:", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed(mnemonic):", mnemonic)
console.log("Seed:", seed)