import React from 'react'
import "./home.sass"
import Hero from '../../shared/hero/hero';
import Builder from '../../shared/builder/builder';
import Latestnews from '../../shared/latest-news/latest-news';
import Twitterblogs from '../../shared/twitter-blogs/twitter-blogs';
import ResearchHub from '../../shared/research/research-hub';
import Offer from '../../shared/offer/offer';
import Service from '../../shared/service/service';

const Home = () => {
    return (
        <>
            <div>
                <Hero />
                <Builder />
                <Latestnews />
                <Twitterblogs />
                <ResearchHub />
                <Offer />
                <Service />
            </div>
        </>
    )
}

export default Home