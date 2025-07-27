import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { primordial } from './primordialConfig';

export const WagmiConfig = getDefaultConfig({
    appName: 'Ticketing DApp',
    projectId: '1cc1e96486a549f456accfbadfa9ad16', // Get from https://cloud.walletconnect.com/
    chains: [primordial], // Add more chains like polygon, optimism
});