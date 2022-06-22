import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './Rankings.module.scss';
import { RANKINGS_24_HOURS, RANKINGS_30_DAYS, RANKINGS_7_DAYS } from './FakeData';
import Button from '~/components/Button';
import RankingItem from './RankingItem';
import { Popper as PopperCollection } from '~/components/Popper';

const cx = classnames.bind(styles);

const TABS = [
    { time: 1, name: 'last 24 hours' },
    { time: 7, name: 'last 7 days' },
    { time: 30, name: 'last 30 days' },
];
export default function Rankings() {
    const [activeTab, setActiveTab] = useState({ time: 1, name: 'last 24 hours' });
    const [render, setRender] = useState(RANKINGS_24_HOURS);
    useEffect(() => {
        if (activeTab.time === 1) {
            setRender(RANKINGS_24_HOURS);
        }
        if (activeTab.time === 7) {
            setRender(RANKINGS_7_DAYS);
        }
        if (activeTab.time === 30) {
            setRender(RANKINGS_30_DAYS);
        }
    }, [activeTab]);

    const handleChangeTab = (tab) => {
        setActiveTab({ time: tab.time, name: tab.name });
    };
    return (
        <div className={cx('wrapper')}>
            <PopperCollection heading="Top collections over" activeTab={activeTab.name}>
                {TABS.map((tab, index) => (
                    <p key={index} onClick={() => handleChangeTab(tab)}>
                        {tab.name}
                    </p>
                ))}
            </PopperCollection>

            <div className={cx('list')}>
                {render.map((rank, index) => (
                    <RankingItem key={index} data={rank} />
                ))}
            </div>

            <div className={cx('btn-goto-ranking')}>
                <Button primary>Go to Rankings</Button>
            </div>
        </div>
    );
}
