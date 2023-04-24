import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Video from "../components/video"

const ExerciseIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const exercises = data.allMarkdownRemark.nodes.filter(
    node => node.fields.collection === `exercises`
  )
  if (exercises.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No blog exercises found. Add markdown exercises to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div class="container">
        {exercises.map(exercise => {
          const title = exercise.frontmatter.title || exercise.fields.slug
          const image = getImage(exercise.frontmatter.image)

          if (exercise.frontmatter.video_url != null) {
            return (
<div class="item" key={exercise.fields.slug}>

<Video
        videoSrcURL={exercise.frontmatter.video_url}
        videoTitle=""
      />

<p>{exercise.frontmatter.date}</p>
</div>
            )
          } else {
          return (
            <div class="item" key={exercise.fields.slug}>

                  <GatsbyImage image={image} alt={exercise.frontmatter.alt} />
      
                  <p>{exercise.frontmatter.date}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: exercise.frontmatter.description || exercise.excerpt,
                    }}
                    itemProp="description"
                  />
            </div>
          )
                  }
        })}
      </div>
    </Layout>
  )
}

export default ExerciseIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All exercises" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
          collection
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          alt
          image {
            childImageSharp {
            	gatsbyImageData(width: 250)
          	}
          }
          video_url
        }
      }
    }
  }
`
