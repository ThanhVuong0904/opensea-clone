const Market = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'uint256', name: 'listingId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'askingPrice', type: 'uint256' },
            { indexed: false, internalType: 'address', name: 'tokenAddress', type: 'address' },
            { indexed: false, internalType: 'address', name: 'seller', type: 'address' },
        ],
        name: 'ItemAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'uint256', name: 'listingId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { indexed: false, internalType: 'address', name: 'tokenAddress', type: 'address' },
        ],
        name: 'ItemCancel',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'uint256', name: 'listingId', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { indexed: false, internalType: 'address', name: 'tokenAddress', type: 'address' },
            { indexed: false, internalType: 'address', name: 'buyer', type: 'address' },
            { indexed: false, internalType: 'address', name: 'seller', type: 'address' },
        ],
        name: 'ItemSold',
        type: 'event',
    },
    {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: '_item',
        outputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'askingPrice', type: 'uint256' },
            { internalType: 'address', name: 'tokenAddress', type: 'address' },
            { internalType: 'address payable', name: 'seller', type: 'address' },
            { internalType: 'bool', name: 'isSold', type: 'bool' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'askingPrice', type: 'uint256' },
            { internalType: 'address', name: 'tokenAddress', type: 'address' },
        ],
        name: 'addItemToMarket',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'tokenAddress', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'buyItem',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'tokenAddress', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'cancelItem',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getItems',
        outputs: [
            {
                components: [
                    { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                    { internalType: 'uint256', name: 'askingPrice', type: 'uint256' },
                    { internalType: 'address', name: 'tokenAddress', type: 'address' },
                    { internalType: 'address payable', name: 'seller', type: 'address' },
                    { internalType: 'bool', name: 'isSold', type: 'bool' },
                ],
                internalType: 'struct Marketplace.Item[]',
                name: '',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        name: 'isInit',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'items',
        outputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'uint256', name: 'askingPrice', type: 'uint256' },
            { internalType: 'address', name: 'tokenAddress', type: 'address' },
            { internalType: 'address payable', name: 'seller', type: 'address' },
            { internalType: 'bool', name: 'isSold', type: 'bool' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        name: 'listingId',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
];

export default Market;
