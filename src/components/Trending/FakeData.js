import images from '~/assets/images';
const { artOfMod, artOfModAva, genie, genieAva, doodles, doodlesAva, singular, singularAva } =
    images.trendingImages.data;
export const allCategories = [
    {
        background: artOfMod,
        avatar: artOfModAva,
        name: 'Art of Mob',
        tickName: false,
        author: 'ArtofMob',
        tickAu: false,
        description: 'Hollywood brought glory to the mafia. It’s time we do the same to the NFT scene..',
    },
    {
        background: genie,
        avatar: genieAva,
        name: 'Genie.xyz',
        tickName: true,
        author: 'jvck_eth',
        tickAu: true,
        description:
            'The official Collection of Genie.xyz - The First NFT Marketplace Aggregator. Batch buy NFTs acros...',
    },
    {
        background: doodles,
        avatar: doodlesAva,
        name: 'Doodles',
        tickName: true,
        author: 'Doodles_LLC',
        tickAu: true,
        description:
            'A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range...',
    },
    {
        background: singular,
        avatar: singularAva,
        name: 'Singularity by Hideki Tsukamoto',
        tickName: true,
        author: 'ArtBlocks_Admin',
        tickAu: true,
        description: 'Singularity by Hideki Tsukamoto - Art Blocks Curated',
    },
];
