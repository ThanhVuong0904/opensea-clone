import Banner from '~/components/Banner';
import Hero from '~/components/Hero';
import Rankings from '~/components/Rankings';
import Trending from '~/components/Trending';

export default function Home() {
    return (
        <div>
            <Hero />
            <Banner />
            <Rankings />
            <Trending />
        </div>
    );
}
