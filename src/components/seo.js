import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ seo = {} }) => {
  const { allMarkdownRemark } = useStaticQuery(query);
  const defaultSeo = allMarkdownRemark.nodes[0].frontmatter

  // Merge default and page-specific SEO values
  const fullSeo = { ...defaultSeo, ...seo };

  const getMetaTags = () => {
    const tags = [];

    if (fullSeo.title) {
      tags.push(
        {
          property: "og:title",
          content: fullSeo.title,
        },
        {
          name: "twitter:title",
          content: fullSeo.title,
        }
      );
    }
    if (fullSeo.description) {
      tags.push(
        {
          name: "description",
          content: fullSeo.description,
        },
        {
          property: "og:description",
          content: fullSeo.description,
        },
        {
          name: "twitter:description",
          content: fullSeo.description,
        }
      );
    }
    if (fullSeo.keywords) {
      tags.push(
        {
          name: "keywords",
          content: fullSeo.keywords,
        }
      )
    }
    if (fullSeo.shareImage) {
      const imageUrl =
        (process.env.GATSBY_ROOT_URL || "http://localhost:8000") +
        fullSeo.shareImage.file.publicURL;
      tags.push(
        {
          name: "image",
          content: imageUrl,
        },
        {
          property: "og:image",
          content: imageUrl,
        },
        {
          name: "twitter:image",
          content: imageUrl,
        }
      );
    }
    if (fullSeo.article) {
      tags.push({
        property: "og:type",
        content: "article",
      });
    }
    tags.push({ name: "twitter:card", content: "summary_large_image" });

    return tags;
  };

  const metaTags = getMetaTags();

  return (
    <Helmet
      title={fullSeo.title}
      titleTemplate={`${fullSeo.siteName} – %s`}
      link={[
        {
          rel: "icon",
          href: fullSeo.favicon.publicURL,
        }
      ]}
      script={[
      ]}
      meta={metaTags}
    />
  );
};

export default Seo;

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};

const query = graphql`
{
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(seo)/"  }}) {
    nodes {
      frontmatter {
        siteName
        title
        description
        keywords
        favicon {
          publicURL
        }
      }
    }
  }
}
`;