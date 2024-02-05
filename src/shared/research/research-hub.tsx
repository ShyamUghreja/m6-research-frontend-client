import React, { useEffect, useState } from 'react'
import "./research-hub.sass"
import { Button, Col, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Research1img from '../../assets/research-1.svg';
import { getCategories, getPosts } from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import moment from "moment"
import LatestContentLoader from '../latest-project/LatestContentLoader';

const Research = () => {
    const nav = useNavigate()

    const [lastestPosts, setLastestPosts] = useState([])
    const [loader, setLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedTag, setSelectedTag] = useState<string>("")

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (selectedTag) {
            fetchPosts(selectedTag)
        }
    }, [selectedTag])

    const fetchCategories = () => {
        getCategories().then(cats => {
            setCategories(cats || [])
            setSelectedTag(cats[0] && cats[0].slug || '')
        }).catch(err => {
        })
    }

    const fetchPosts = (tag: string) => {
        setLoader(true)
        getPosts({ type: "research", limit: 9, skip: 0, tag: tag }).then(posts => {
            setLoader(false)
            setLastestPosts(posts.data || [])
        }).catch(err => {
            setLoader(false)
        })
    }
    
    const onChangeSelectedTag = (tag: string) => {
        setSelectedTag(tag)
    }

    return (
        <div>
            <section className='research-sec mt-5'>
                <Container>
                    <div className='research-news'>
                        <p className='paragraph-medium news-head'>Get started</p>
                        <h2 className='heading-2'>Research Hub</h2>
                        <div className='research-tabview mt-lg-5 mt-3'>
                            <Tabs
                                id="fill-tab-example"
                                className="mb-3"
                                fill
                                activeKey={selectedTag}
                                onSelect={(key: any) => onChangeSelectedTag(key)}

                            >
                                {
                                    categories && categories.map((cat: any, index) => {
                                        return <Tab key={index} eventKey={cat.slug} title={cat.name}>



                                            {/* <div className='mt-lg-5 mt-3'>
                                      <h4 className='heading-4'>Lend crypto</h4>
                                      <p className='paragraph mb-0'>We help you find the best and safest places to earn yield on your crypto. Learn how to generate returns via both CeFi and DeFi platforms.</p>
                                      <Button className='News-subscribe my-lg-5 my-4'>Lending Guide <i className="ri-arrow-right-line"></i></Button>
                                  </div>
                                  <img className='img-fluid' src={Research1img} alt="" /> */}
                                            <Row>
                                                {loader && <LatestContentLoader />}
                                                {!loader && lastestPosts && lastestPosts?.map((item: any, i: any) => {
                                                    const tagsArr = item.tags && item.tags.split(",") || []
                                                    return (
                                                        <Col lg={4} className='mb-4' key={i} onClick={() => nav(`/post/${item.slug}`)}>
                                                            <div className="latest-card latest-card-bg" role="button">
                                                                <div className="d-flex justify-content-between">
                                                                    <div className='d-flex hide-scrollbar'>
                                                                        {
                                                                            tagsArr.map((tag: string, i: number) => <button key={i} className='button-small mx-1'>{tag}</button>)
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <h6 className='heading-6 color-white'>{item.title}</h6>
                                                                <div className="d-flex by-date align-items-center mt-3">
                                                                    <p className='by-them paragraph-smaller'>by <span className='bold-subhead'>{item.author}</span></p>
                                                                    <div className='mx-3'>|</div>
                                                                    <p className='article-date paragraph-smaller bold-subhead'>{item.publishDate && moment(item.publishDate).format("MMM DD, yyyy") || "-"}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    )
                                                }
                                                )}
                                            </Row>
                                        </Tab>
                                    })
                                }



                                {/* <Tab eventKey="Borrow" title="Borrow">
                                <div className='mt-lg-5 mt-3'>
                                        <h4 className='heading-4'>Borrow crypto</h4>
                                        <p className='paragraph mb-0'>We help you find the best and safest places to earn yield on your crypto. Learn how to generate returns via both CeFi and DeFi platforms.</p>
                                        <Button className='News-subscribe my-lg-5 my-4'>Lending Guide <i className="ri-arrow-right-line"></i></Button>
                                    </div>
                                    <img className='img-fluid' src={Research1img} alt="" />
                                </Tab>
                                <Tab eventKey="Stake" title="Stake">
                                <div className='mt-lg-5 mt-3'>
                                        <h4 className='heading-4'>Stake crypto</h4>
                                        <p className='paragraph mb-0'>We help you find the best and safest places to earn yield on your crypto. Learn how to generate returns via both CeFi and DeFi platforms.</p>
                                        <Button className='News-subscribe my-lg-5 my-4'>Lending Guide <i className="ri-arrow-right-line"></i></Button>
                                    </div>
                                    <img className='img-fluid' src={Research1img} alt="" />
                                </Tab>
                                <Tab eventKey="Wallets" title="Wallets">
                                <div className='mt-lg-5 mt-3'>
                                        <h4 className='heading-4'>Wallets crypto</h4>
                                        <p className='paragraph mb-0'>We help you find the best and safest places to earn yield on your crypto. Learn how to generate returns via both CeFi and DeFi platforms.</p>
                                        <Button className='News-subscribe my-lg-5 my-4'>Lending Guide <i className="ri-arrow-right-line"></i></Button>
                                    </div>
                                    <img className='img-fluid' src={Research1img} alt="" />
                                </Tab>
                                <Tab eventKey="Exchanges" title="Exchanges">
                                <div className='mt-lg-5 mt-3'>
                                        <h4 className='heading-4'>Exchanges crypto</h4>
                                        <p className='paragraph mb-0'>We help you find the best and safest places to earn yield on your crypto. Learn how to generate returns via both CeFi and DeFi platforms.</p>
                                        <Button className='News-subscribe my-lg-5 my-4'>Lending Guide <i className="ri-arrow-right-line"></i></Button>
                                    </div>
                                    <img className='img-fluid' src={Research1img} alt="" />
                                </Tab>
                                <Tab eventKey="NFTs" title="NFTs">
                                <div className='mt-lg-5 mt-3'>
                                        <h4 className='heading-4'>NFTs crypto</h4>
                                        <p className='paragraph mb-0'>We help you find the best and safest places to earn yield on your crypto. Learn how to generate returns via both CeFi and DeFi platforms.</p>
                                        <Button className='News-subscribe my-lg-5 my-4'>Lending Guide <i className="ri-arrow-right-line"></i></Button>
                                    </div>
                                    <img className='img-fluid' src={Research1img} alt="" />
                                </Tab> */}
                            </Tabs>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Research