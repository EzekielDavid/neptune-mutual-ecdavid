export interface IToken {
    address: string,
    blockchain: string,
    label: string,
    value: number,
    price: number,
}

export const TOKENS = [
    {
        address: '0xce3805a443ebb27b2a4058ec9d94dc4f9c000633',
        blockchain: 'Binance Smart Chain',
        price: 3,
        label: 'NEP',
        value: 3.2
    },
    {
        address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
        blockchain: 'Binance Smart Chain',
        price: 1,
        label: 'BUSD',
        value: 3
    }
]