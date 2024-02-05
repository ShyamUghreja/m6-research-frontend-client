import React, { useEffect, useState } from 'react'
import "./latest-news.sass"
import { Col, Container, Row, Button } from 'react-bootstrap';
import { getPosts } from '../../api/posts';
import moment from "moment"
import { useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

const Latestnews = () => {
    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        setLoader(true)
        getPosts({
            type: "news",
            limit: 4,
            skip: 0,
        }).then(posts => {
            setLoader(false)
            setPosts(posts.data || [])
        }).catch(err => {
            setLoader(false)
        })
    }

    const contentLoader = () => {
        return <>
            {[...new Array(4)].map((z, index) => {
                return <div key={index}>
                    <ContentLoader
                        width={"100%"}
                        backgroundColor={'#333'}
                        foregroundColor={'#999'}
                        height={175}
                    >
                        <rect x="0" y="40" rx="0" ry="0" height="15px" width="80%" />
                        <rect x="0" y="70" rx="0" ry="0" height="15px" width="50%" />
                        <rect x="0" y="100" rx="0" ry="0" height="15px" width="100px" />
                        <circle cx="96%" cy="65" r="24" />
                    </ContentLoader>
                </div>
            })}
        </>
    }

    return (
        <div>
            <section className='latest-news-sec mt-5'>
                <Container>
                    <div className='latest-news'>
                        <Row>
                            <Col lg={5}>
                                <div className='mb-lg-0 mb-md-4 mb-5'>
                                    <h2 className='heading-2'>Latest <br /> Crypto News</h2>
                                    <Button className='News-subscribe mt-md-3 mt-lg-5' onClick={() => nav('/news/latest')}>View All News <i className="ri-arrow-right-line"></i></Button>
                                </div>
                            </Col>
                            <Col lg={7}>
                                {loader && contentLoader()}
                                <div>
                                    {!loader && posts.length ? posts.map((item: any, i) => {
                                        return <React.Fragment key={i}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='news-content'>
                                                    <h4 className="heading-4 mb-0" style={{fontSize: "28px"}}>{item.title}</h4>
                                                    <p className='medium-p mt-1'>{item.publishDate && moment(item.publishDate).format("MMM DD, yyyy") || "-"}</p>
                                                </div>
                                                <div className='news-btn'>
                                                    <i className="ri-arrow-right-line" onClick={() => nav(`/post/${item.slug}`)}></i>
                                                </div>
                                            </div>
                                            <hr className='my-8' style={{ color: posts.length - 1 === i ? "#000" : "#FFFFFF80" }} />
                                        </React.Fragment>
                                    }) : null}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Latestnews