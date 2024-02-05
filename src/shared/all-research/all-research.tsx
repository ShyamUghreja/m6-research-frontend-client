import React, { useEffect, useState } from 'react'
import "./all-research.sass"
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import HeroImg from '../../assets/HeroImg.svg';
import defiLogo from '../../assets/DeFi-logo-img.png';
import cryptoLogo from '../../assets/crypto-logo-img.png';
import researchLogo from '../../assets/tag-5.svg'; // not in category
import metaverseLogo from '../../assets/Metaverse-logo-img.png';
import daosLogo from '../../assets/DAOs-logo-img.png';
import regulationLogo from '../../assets/Regulation-logo-img.png';
import dogecoinLogo from '../../assets/tag-5.svg'; // not in category
import cryptogamingLogo from '../../assets/crypto-gaming-logo.png';
import web3Logo from '../../assets/Web3-logo-img.png';
import nftsLogo from '../../assets/NFTs-logo-img.png';
import othersLogo from '../../assets/icons/other-icon.svg'; //set when logo comes
import { useLocation, useNavigate } from 'react-router-dom';
import Post from '../post-card/Post';
import { getCategories, getPosts } from '../../api/posts';
import PostContentLoader from '../post-card/PostContentLoader';
import ContentLoader from 'react-content-loader';
import Pagination from '../Pagination';

const totalLimit = 20

const logos: any = {
  defi: defiLogo,
  crypto: cryptoLogo,
  research: researchLogo,
  metaverse: metaverseLogo,
  daos: daosLogo,
  regulation: regulationLogo,
  cryptogaming: cryptogamingLogo,
  dogecoin: dogecoinLogo,
  web3: web3Logo,
  nfts: nftsLogo,
  others: othersLogo,
}

const Allresearch = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
  const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;

  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)

  const [categories, setCategories] = useState([])
  const [catLoader, setCatLoader] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("")
  const element = document.getElementById("research-section");

  const isNews = pathname.includes("/news")

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  }, [tagSlug])

  useEffect(() => {
    if (selectedTag) {
      setPosts([])
      fetchPosts(selectedTag, currentPage)
    }
  }, [selectedTag, currentPage, showAll])

  const fetchCategories = () => {
    setCatLoader(true)
    getCategories().then(cats => {
      setCatLoader(false)
      setCategories(cats || [])
      setSelectedTag(tagSlug || cats[0] && cats[0].slug || '')
    }).catch(err => {
      setCatLoader(false)
    })
  }

  const fetchPosts = (catSlug: string, currentPage: number) => {
    setLoader(true)
    if (showAll) element?.scrollIntoView({ behavior: "smooth" });
    getPosts({
      type: isNews ? "news" : "research",
      limit: showAll ? totalLimit : 8,
      tag: catSlug,
      skip: showAll ? (totalLimit * currentPage) : 0
    }).then(posts => {
      setLoader(false)
      setPosts(posts.data || [])
      setTotal(posts.total || 0)
    }).catch(err => {
      setLoader(false)
    })
  }

  const onChangeSelectedTag = (tag: string) => {
    if (showAll) {
      nav(`/${isNews ? "news" : "research"}/all/${tag}`)
    }
    setSelectedTag(tag)
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const contentLoader = () => {
    return <>
      {[1, 2, 3, 4, 5, 6].map((item, i) => <Col key={i} xs={6} md={4} lg={2}>
        <ContentLoader viewBox="0 0 600 200" height={130} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100px" />
        </ContentLoader>
      </Col>)}
    </>
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)

  return (
    <>
      <div id="research-section">
        <section className='all-research-sec my-5 '>
          <Container>
            <Row>
              <Col lg={12}>
                <div className='text-center'>
                  {!isNews ?
                    <h2 className='heading-2 font-color-black'>Browse All Research</h2> :
                    <h2 className='heading-2 font-color-black'>Browse All News</h2>
                  }
                </div>
              </Col>
              <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)}>
                {catLoader ? contentLoader() : <Col lg={12}>
                  <Nav variant="pills" className="curated-buttons justify-content-lg-center my-lg-5 my-3 gap-3">
                    {categories?.map((item: any, i: any) => (
                      <Nav.Item key={i}>
                        <Nav.Link eventKey={item.slug}><img src={logos[item?.slug.replaceAll(' ', '')]} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.name}</span></Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>}
                <Tab.Content id="tabs-content">
                  {categories?.map((item: any, i: any) => (
                    <Tab.Pane key={i} eventKey={item.slug}>
                      <Row>
                        {loader && <PostContentLoader showAll />}
                        {!loader && posts.length ? posts.map((post: any, index: number) => (
                          <Post
                            key={index}
                            slug={post.slug}
                            title={post.title}
                            subTitle={post.subTitle}
                            author={post.author}
                            tags={post.tags}
                            thumbnailUrl={post.thumbnailUrl}
                            publishDate={post.publishDate}
                          />
                        )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container >
              {(catLoader || loader || posts.length === 0) ? null : showAll ? <>
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </>
                : <div className='text-center'>
                  <button className='view-button' onClick={() => nav(`/${isNews ? "news" : "research"}/all/${selectedTag}`)}>View All</button>
                </div>}
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Allresearch