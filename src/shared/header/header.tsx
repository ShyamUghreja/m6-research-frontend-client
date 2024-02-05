import React, { useEffect, useRef, useState } from "react";
import { Button, NavLink, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/M6Labs.svg";
import "./hader.sass";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubscribeModal from "../all-hero/modal/subscribe-modal";
import MenuOpenIcon from '../../assets/menu-open.svg';
import m6FooterLogo from "../../assets/icons/m6-footer-logo.svg"
import { DebounceInput } from 'react-debounce-input';
import { getPosts } from "../../api/posts";
import ReactContentLoader from 'react-content-loader';
import useOutside from "../../hooks/useOutside";

const Header = () => {
    const [isActive, setActive] = useState(false);
    const [scroll, setScroll] = useState(false)
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const [subscribemodal, setSubscribemodal] = useState<boolean>(false)
    const subscribemodalToggle = () => {
        setSubscribemodal(!subscribemodal)
    }
    const [refreshData, setRefreshData] = useState<boolean>(false)
    const nav = useNavigate();

    const outsideRef = useRef(null)
    useOutside(outsideRef, () => setActive(false));

    return (
        <>
            <header className={scroll ? "scrolled" : ""}>
                {isActive && <div className="bg-dark-overlay" />}
                <Navbar>
                    <Container fluid>
                        <Navbar.Brand className="d-lg-flex" role="button" onClick={() => { nav("/") }}>
                            <img className='img-fluid main-logo' src={m6FooterLogo} alt="logo" width="60px"/>
                        </Navbar.Brand>
                        <Navbar
                            ref={outsideRef}
                            className={
                                isActive
                                    ? "justify-content-end menu logo active"
                                    : "justify-content-end menu logo"}
                        >
                            <Nav className="header-navigation">
                                <Navbar.Brand onClick={() => { nav("/") }}>
                                    <img className='img-fluid' src={m6FooterLogo} alt="logo" width="55px"/>
                                </Navbar.Brand>

                                <div className="close-menu-icon" onClick={() => setActive(false)}>
                                    <i className="ri-close-line"></i>
                                </div>
                                <Link
                                    to="/"
                                    className={splitLocation[1] === "" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/research"
                                    className={splitLocation[1] === "research" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Research
                                </Link>
                                <Link
                                    to="/news"
                                    className={splitLocation[1] === "news" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    News
                                </Link>
                                <Link
                                    to="/aboutus"
                                    className={splitLocation[1] === "aboutus" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    About Us
                                </Link>
                            </Nav>

                        </Navbar>
                        <div className="flex items-center">
                            <GlobalSearch />
                            <Button type="button" className="primary-btn btn btn-primary rounded-0 d-block m-2 subscribe-button" onClick={() => { nav("/subscribe") }}>
                                Subscribe
                            </Button>
                            <NavLink className="open-menu-icon" onClick={() => setActive(true)}>
                                <img src={MenuOpenIcon} alt="" className="img-fluid" />
                            </NavLink>
                        </div>
                    </Container>
                </Navbar>
            </header>
            <SubscribeModal isOpen={subscribemodal} toggle={subscribemodalToggle} setRefreshData={setRefreshData} />
        </>
    );
};

export default Header;

const GlobalSearch = () => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState<string>("")
    // const [dInput, setDInput] = useState<string>("")
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(false)

    const outsideRef = useRef(null)
    useOutside(outsideRef, () => setOpen(false));

    useEffect(() => {
        if (input && input.length > 2) {
            fetchPosts()
        } else {
            setPosts([])
        }
    }, [input])

    const fetchPosts = () => {
        setLoader(true)
        setPosts([])
        getPosts({ search_term: input }).then(res => {
            setLoader(false)
            setPosts(res.data || [])
        }).catch(err => {
            setLoader(false)
        })
    }

    const ContentLoader = () => {
        return <div className="px-2">
            <ReactContentLoader height={80} width={"100%"} backgroundColor="#c5c5c5">
                <rect x="0" y="10" rx="5" ry="5" width="100%" height="15px" />
                <rect x="0" y="30" rx="5" ry="5" width="50%" height="15px" />
                <rect x="0" y="60" rx="5" ry="5" width="100%" height="2px" />
            </ReactContentLoader>
            <ReactContentLoader height={80} width={"100%"} backgroundColor="#c5c5c5">
                <rect x="0" y="10" rx="5" ry="5" width="100%" height="15px" />
                <rect x="0" y="30" rx="5" ry="5" width="50%" height="15px" />
                <rect x="0" y="60" rx="5" ry="5" width="100%" height="2px" />
            </ReactContentLoader>
        </div>
    }

    return <div className="global-search-container">
        <div className="global-search-icon" onClick={() => setOpen(prev => !prev)}>
            <i className="ri-search-line search-icon"></i>
        </div>
        {open && <div ref={outsideRef} className={"search-content-container"}>
            {/* <div className="content"> */}
            <div className="search-input-div">
                <DebounceInput
                    // element={() => <input type="text" placeholder="Type here..." />}
                    minLength={2}
                    value={input}
                    placeholder="Type here..."
                    debounceTimeout={400}
                    onChange={event => setInput(event.target.value)}
                />
            </div>
            <div>
                {loader && <ContentLoader />}
                {
                    !loader && posts.length ? <ul className="m-0 px-0" style={{ maxHeight: '400px', overflow: 'auto' }}>
                        {posts.map((post: any, index: number) => {
                            return <li key={index} className="px-2 hover:bg-neutral-300 cursor-pointer" style={{ borderBottom: "1px solid grey", height: 80 }}>
                                <a href={`/post/${post.slug}`} target="_blank" className="flex items-center h-full no-underline">
                                    <img width={50} src={post.thumbnailUrl} />
                                    <span className="ml-2" style={{
                                        fontWeight: '500',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '3',
                                        WebkitBoxOrient: 'vertical'
                                    }}>{post.title}</span>
                                </a>
                            </li>
                        })}
                    </ul> : null
                }
            </div>
        </div>}
    </div >
}
