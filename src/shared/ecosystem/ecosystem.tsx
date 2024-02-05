import React, { useEffect, useState } from 'react'
import "./ecosystem.sass"
import { Col, Container, Row } from 'react-bootstrap'
import ethLogo from '../../assets/eth-logo.svg';
import solanaLogo from '../../assets/solana-logo.svg';
import polygonLogo from '../../assets/polygen-logo.svg';
import avalancheLogo from '../../assets/avalanche-logo.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getEcosystem } from '../../api/posts';
import ContentLoader from 'react-content-loader';

import arbitrumLogo from '../../assets/icons/ecosystem/arbitrum-logo.svg';
import suiLogo from '../../assets/icons/ecosystem/sui-logo.svg';
import fantomLogo from '../../assets/icons/ecosystem/fantom-logo.svg';
import pendulumLogo from '../../assets/icons/ecosystem/pendulum-logo.svg';
import starknetLogo from '../../assets/icons/ecosystem/starknet-logo.svg';
import tonLogo from '../../assets/icons/ecosystem/ton-logo.svg';
import secretNetworkLogo from '../../assets/icons/ecosystem/secret-network-logo.svg';
import celestiaLogo from '../../assets/icons/ecosystem/celestia-logo.svg';
import rmrkLogo from '../../assets/icons/ecosystem/rmrk-logo.svg';
import looperingLogo from '../../assets/icons/ecosystem/loopering-logo.svg';
import harnonyLogo from '../../assets/icons/ecosystem/harnony-logo.svg';
import lensLogo from '../../assets/icons/ecosystem/lens-logo.svg';
import berachainLogo from '../../assets/icons/ecosystem/berachain-logo.svg';
import desoLogo from '../../assets/icons/ecosystem/deso-logo.svg';
import persestenceLogo from '../../assets/icons/ecosystem/persestence-logo.svg';
import optimismLogo from '../../assets/icons/ecosystem/optimism-logo.svg';
import immutableLogo from '../../assets/icons/ecosystem/immutable-logo.svg';
import thorchainLogo from '../../assets/icons/ecosystem/thorchain-logo.svg';
import HEDERAhASHGRAPHLogo from '../../assets/icons/ecosystem/HEDERA-HASHGRAPH-logo.svg';
import curveLogo from '../../assets/icons/ecosystem/curve-logo.svg';
import seiLogo from '../../assets/icons/ecosystem/sei-logo.svg';

const logos: any = {
  ethereum: ethLogo,
  solana: solanaLogo,
  polygon: polygonLogo,
  avalanche: avalancheLogo,
  starknet: starknetLogo,
  sui: suiLogo,
  ton: tonLogo,
  "secret network": secretNetworkLogo,
  celestia: celestiaLogo,
  rmrk: rmrkLogo,
  loopring: looperingLogo,
  harmony: harnonyLogo,
  lens: lensLogo,
  berachain: berachainLogo,
  pendulum: pendulumLogo,
  deso: desoLogo,
  persistence: persestenceLogo,
  optimism: optimismLogo,
  "immutable x": immutableLogo,
  arbitrum: arbitrumLogo,
  thorchain: thorchainLogo,
  "hedera hashgraph": HEDERAhASHGRAPHLogo,
  curve: curveLogo,
  fantom: fantomLogo,
  sei: seiLogo,
}

const Ecosystem = () => {
  const location = useLocation();
  const nav = useNavigate()
  const [ecosystem, setEcosystem] = useState([])
  const [loader, setLoader] = useState(false)
  const { subtype = '' } = useParams()

  const pathname = location.pathname;
  const isNews = pathname.includes("/news")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = () => {
    setLoader(true)
    getEcosystem().then(eco => {
      setLoader(false)
      setEcosystem(eco || [])
    }).catch(err => {
      setLoader(false)
    })
  }

  const contentLoader = () => {
    return <Row className='max-w-3xl pt-10'>
      {[1, 2, 3, 4].map((item, i) => <Col key={i} xs={6} md={3} >
        <ContentLoader height={180} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100%" />
        </ContentLoader>
      </Col>)}
    </Row>
  }

  return (
    <>
      <div>
        <section className='ecosystem-sec mt-5'>
          <Container>
            <Row>
              <Col lg={12}>
                <div className='text-center'>
                  {!isNews ?
                    <h2 className='heading-2 font-color-black'>Research by Ecosystem</h2> :
                    <h2 className='heading-2 font-color-black'>News by Ecosystem</h2>
                  }

                </div>
              </Col>
              {loader && contentLoader()}
              <div className="Resources-all-card mt-lg-5 mt-3">
                {!loader && ecosystem && ecosystem.map((item: any, i: any) => (
                  <div style={{ border: subtype === item.slug ? "2px solid #43b6b2" : "" }} className="crypto-card" role="button" key={i} onClick={() => nav(`/${isNews ? "news" : "research"}/ecosystem/${item.slug}`)}>
                    <div className="card-image">
                      <img src={logos[item.slug]} alt="" className='img-fluid mx-auto' />
                    </div>
                    <div className='mt-2'>
                      <p className='font-semibold'>{item.name}</p>
                    </div>
                  </div>

                ))}
              </div>
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Ecosystem