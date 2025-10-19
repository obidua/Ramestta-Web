import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import type { AppKitNetwork } from '@reown/appkit/networks'


export const projectId = "d74dff4fc8b6846c669a8e176073f500"

if (!projectId) {
    throw new Error('Project ID is not defined')
}



const ramesttaNetwork = {
    id: 1370,
    name: 'Ramestta',
    nativeCurrency: {
        name: 'Rama',
        symbol: 'RAMA',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [
                'https://blockchain.ramestta.com',
                'https://blockchain2.ramestta.com'
            ],
        },
        public: {
            http: [
                'https://blockchain.ramestta.com',
                'https://blockchain2.ramestta.com',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ramascan',
            url: 'https://ramascan.com/',
        },
    },
    testnet: false,
}



export const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://reown.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [ramesttaNetwork] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig