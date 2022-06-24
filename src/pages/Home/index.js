import Banner from '~/components/Banner';
import Hero from '~/components/Hero';
import Rankings from '~/components/Rankings';
import Trending from '~/components/Trending';
import IntroCreateAndSell from '~/components/IntroCreateAndSell';
import IntroResourcesAndStarted from '~/components/IntroResourcesAndStarted';
import IntroBrowseCategory from '~/components/IntroBrowseCategory';

export default function Home() {
    return (
        <div>
            <Hero />
            <Banner />
            <Rankings />
            <Trending />
            <div className="spacing"></div>
            <IntroCreateAndSell />
            <div className="spacing"></div>
            <IntroResourcesAndStarted />
            <div className="spacing"></div>
            <IntroBrowseCategory />
        </div>
    );
}
