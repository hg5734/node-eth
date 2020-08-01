import { vars } from '../../config/vars';
import logger from '../../utils/logger';
import TokenABI from '../../abis/token.abi';
const { networkUrl } = vars;
const abiDecoder = require('abi-decoder');
const Web3 = require('web3');
const web3Obj = new Web3(new Web3.providers.HttpProvider(networkUrl));

export default class EthService {

    static getContract(abi: any, address: string) {
        return new web3Obj.eth.Contract(abi, address);
    }

    static isValidAddress(rawInput: string) {
        try {
            return web3Obj.utils.toChecksumAddress(rawInput)
        } catch (err) {
            return false;
        }
    }

    static async prepareTransactionLog(assetAddress, ethAddress, log) {
        abiDecoder.addABI(TokenABI)
        const decodedLogs = abiDecoder.decodeLogs([log]);
        if (decodedLogs && decodedLogs[0]) {
            let decodedLog = decodedLogs[0];
            if (decodedLog.name === 'Transfer' || decodedLog.name === 'Approval') {
                let txDetail = await web3Obj.eth.getTransaction(log.transactionHash)
                // console.log(txDetail, decodedLogs);
                let toAddress, fromAddress, value = null;
                decodedLog.events.forEach(element => {
                    if (element.name === 'from' || element.name ==='owner') {
                        fromAddress = element.value.toUpperCase();
                    }
                    if (element.name === 'to' || element.name ==='spender') {
                        toAddress = element.value.toUpperCase();
                    }
                    if (element.name === 'value') {
                        value = element.value;
                    }
                });
                if (toAddress.toUpperCase() === ethAddress.toUpperCase() || fromAddress.toUpperCase() === ethAddress.toUpperCase()) {
                    return {
                        transactionHash: txDetail.hash,
                        toAddress,
                        fromAddress,
                        value,
                        eventType: decodedLog.name,
                        blockNo: txDetail.blockNumber,
                        assetAddress,
                        ethAddress
                    }
                }
            }
        }
        return null;
    }

    static async getAssetLogs(ethAddress: string, contractAddress: string, blockNumber: number) {
        const latestBlock = await web3Obj.eth.getBlockNumber();
        logger.info('latest block' + latestBlock + 'last sync block' + blockNumber)
        if (latestBlock > blockNumber) {
            try {
                let result = await web3Obj.eth.getPastLogs({
                    toBlock: web3Obj.utils.toHex(latestBlock),
                    fromBlock: web3Obj.utils.toHex(blockNumber),
                    address: [web3Obj.utils.toHex(contractAddress)]
                    // topics : [web3Obj.utils.sha3(`Transfer(address,address,uint256)`)
                    // ,web3Obj.utils.sha3(`Approval(address,address,uint256)`)]
                });
                logger.info('new logs' + result.length);
                let promise = [];
                result.forEach(log => {
                    promise.push(this.prepareTransactionLog(contractAddress, ethAddress, log));
                });
                result = await Promise.all(promise);
                result = result.filter((obj) => obj ? true : false);
                return {
                    blockNumber: latestBlock,
                    result
                }
            } catch (error) {
                logger.error('error in syncing in assets' + error);
                throw error;
            }
        }
        return {
            blockNumber: latestBlock,
            result: []
        }
    }


}