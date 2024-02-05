import React, { useEffect, useState } from 'react'
import "./twitter-blogs.sass"
import { Col, Container, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getTweets } from '../../api/posts';
import ContentLoader from 'react-content-loader';

const twitterData = [
    {
        id: 1,
        title: "Momentum 06",
        user: " @_kreathor",
        desc: "For a couple of weeks now, I've been getting up to date crypto news in the most fun way. I think everyone should subscribe to the @MilkRoadDaily to get the emails directly to your inbox"
    },
    {
        id: 2,
        title: "Momentum 06",
        user: " @_kreathor",
        desc: "For a couple of weeks now, I've been getting up to date crypto news in the most fun way. I think everyone should subscribe to the @MilkRoadDaily to get the emails directly to your inbox"
    },
    {
        id: 3,
        title: "Momentum 06",
        user: " @_kreathor",
        desc: "For a couple of weeks now, I've been getting up to date crypto news in the most fun way. I think everyone should subscribe to the @MilkRoadDaily to get the emails directly to your inbox"
    }
];

const Twitterblogs = () => {

    const [tweets, setTweets] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        getTweets().then((data) => {
            setLoader(false)
            setTweets(data || [])
        }).catch(err => {
            setLoader(false)
        })
    }, [])

    const contentLoader = () => {
        return <>
            {
                [...new Array(3)].map((item, i) => {
                    return <Col xs={12} sm={6} md={4} lg={4} key={i}>
                        <ContentLoader height={250} width={"100%"} backgroundColor='#dbdbdb'>
                            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
                        </ContentLoader>
                    </Col>
                })
            }
        </>
    }

    return (
        <div>
            <section className='twitter-sec'>
                <Container>
                    <div className='mt-lg-5 mt-md-4 mt-3'>
                        <div className='text-center'>
                            {/* <p className='paragraph-medium news-head font-color-black twit-blog'>Twitter Blogs</p> */}
                            <h2 className='heading-2 font-color-black'>What we’re saying on Twitter</h2>
                        </div>
                        <div className='mt-lg-4 mt-3'>
                            <Row>
                                {loader && contentLoader()}
                                {!loader && tweets.length ? tweets.map((item: any, i: any) => (
                                    <Col xs={12} sm={6} md={4} lg={4} key={i} className='twitter-card-item'>
                                        <div role='button' className="say-on-twitter-card" >
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div className='twitter-heading'>
                                                    <h4 className='heading-4 font-color-black mb-0'>{item?.name}</h4>
                                                    <a className='medium-p font-color-black' href={item?.profileUrl} target='_blank'>@{item?.username}</a>
                                                </div>
                                                <div className="twitter-icon">
                                                    <i className="ri-twitter-fill"></i>
                                                </div>
                                            </div>
                                            <a className='paragraph-small font-color-black no-underline' href={item?.tweetUrl} target='_blank'>{item?.tweet}</a>
                                        </div>
                                    </Col>

                                )) : !loader ? <div className='my-10 mt-10' ><p className='text-center font-bold'>No Tweets found</p></div> : null}
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Twitterblogs