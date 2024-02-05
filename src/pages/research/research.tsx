import React, { useState } from 'react'
import Allhero from '../../shared/all-hero/all-hero'
import TrendingCmp from '../../shared/trending-cmp/trending-cmp'
import Latestproject from '../../shared/latest-project/latest-project'
import Ecosystem from '../../shared/ecosystem/ecosystem'
import Allresearch from '../../shared/all-research/all-research'
import Industryreports from '../../shared/industry-reports/industry-reports'
import { useParams } from 'react-router-dom'
import EcosystemPosts from '../../shared/ecosystem/ecosystem-posts'

const Research = () => {
    const params = useParams()
    const type = params.type || ''
    const subtype = params.subtype || ''

    if (type === "all" && !!subtype) {
        return <>
            {/* <Allhero /> */}
            <Allresearch showAll tagSlug={subtype} />
        </>
    } else if (type === "trending") {
        return <>
            {/* <Allhero /> */}
            <TrendingCmp showAll />
        </>
    } else if (type === "latest") {
        return <>
            {/* <Allhero /> */}
            <Latestproject showAll />
        </>

    } else if(type === "ecosystem" && !!subtype) {
      return <>
            {/* <Allhero /> */}
            <Ecosystem />
            <EcosystemPosts ecosystem={subtype}/>
        </>
    } else {
        return (
            <>
                <Allhero />
                <TrendingCmp />
                <Latestproject />
                <Ecosystem />
                <Allresearch />
                <Industryreports />
            </>
        )
    }
}

export default Research