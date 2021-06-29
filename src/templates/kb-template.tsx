import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { useIntl } from 'react-intl'
import DocsNavMobile from '../components/DocsNavMobile'
import DocsSideBar from '../components/DocsSideBar'
import DocsNav from '../components/DocsNav'
import VersionControl from '../components/VersionControl'

const DocsTemplate = ({ data, pageContext }) => {
  const { slug, version } = pageContext
  const intl = useIntl()
  const docsMenu = [
    {
      name: `${intl.formatMessage({ id: 'docs-menu-getting-started' })}`,
      items: [
        {
          title: `${intl.formatMessage({ id: 'docs-menu-overview' })}`,
          link: '/v3/docs/',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-architecture' })}`,
          link: '/v3/docs/knowledgebase/getting-started/architecture',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-installation' })}`,
          link: '/v3/docs/knowledgebase/getting-started/',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-windows' })}`,
          link: '/v3/docs/knowledgebase/getting-started/windows-users',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-glossary' })}`,
          link: '/v3/docs/knowledgebase/getting-started/glossary',
        },
      ],
    },
    {
      name: `${intl.formatMessage({ id: 'docs-menu-key-concepts' })}`,
      items: [
        {
          title: `${intl.formatMessage({ id: 'docs-menu-runtime' })}`,
          link: '/v3/docs/knowledgebase/runtime',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-extrinsics' })}`,
          link: '/v3/docs/knowledgebase/learn-substrate/extrinsics',
        },
        {
          title: `${intl.formatMessage({
            id: 'docs-menu-account-abstractions',
          })}`,
          link: '/v3/docs/knowledgebase/learn-substrate/account-abstractions',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-transaction-pool' })}`,
          link: '/v3/docs/knowledgebase/learn-substrate/learn-substrate/tx-pool',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-session-keys' })}`,
          link: '/v3/docs/knowledgebase/learn-substrate/learn-substrate/session-keys',
        },
        {
          title: `${intl.formatMessage({
            id: 'docs-menu-transaction-weight',
          })}`,
          link: '/v3/docs/knowledgebase/learn-substrate/learn-substrate/weight',
        },
        {
          title: `${intl.formatMessage({ id: 'docs-menu-offchain-features' })}`,
          link: '/v3/docs/knowledgebase/learn-substrate/off-chain-features',
        },
      ],
    },
  ]
  const globalDocsNav = [
    `${intl.formatMessage({ id: 'docs-nav-knowledgebase' })}`,
    `${intl.formatMessage({ id: 'docs-nav-tutorials' })}`,
    `${intl.formatMessage({ id: 'docs-nav-htg' })}`,
    `${intl.formatMessage({ id: 'docs-nav-rustdocs' })}`,
    `${intl.formatMessage({ id: 'docs-nav-learningtracks' })}`,
  ]
  return (
    <Layout>
      <SEO title={data.mdx ? data.mdx.frontmatter.title : null} />
      <div className="mb-24">
        <div className="flex flex-col lg:container lg:flex-row ">
          <div className="lg:hidden">
            <DocsNavMobile
              sideNav={docsMenu}
              globalNav={globalDocsNav}
              templateId={'Knowledgebase'}
            />
          </div>
          <div className="hidden lg:inline-block lg:flex-none">
            <DocsNav
              sideNav={docsMenu}
              globalNav={globalDocsNav}
              templateId={'Knowledgebase'}
            />
          </div>
          <article className="markdown-body px-4 lg:px-16 lg:flex-grow lg:border-l lg:border-r lg:border-gray-200 dark:lg:border-gray-700">
            <div>
              {data.mdx ? (
                <div className="pt-10">
                  <VersionControl version={version} slug={slug} />
                  <h1>{data.mdx.frontmatter.title}</h1>
                  <MDXRenderer>{data.mdx.body}</MDXRenderer>
                </div>
              ) : (
                <div>This page hasn&apos;t been translated yet</div>
              )}
            </div>
          </article>
          {data.mdx ? (
            <div className="hidden lg:inline-block lg:flex-none">
              <DocsSideBar headings={data.mdx.headings} />
            </div>
          ) : null}
        </div>
      </div>

      {/* <h1>Context</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
    </Layout>
  )
}

export default DocsTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      frontmatter {
        slug
        title
      }
      body
      headings {
        value
        depth
      }
    }
  }
`
