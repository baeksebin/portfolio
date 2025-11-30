import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          pathPrefix // gatsby-config.js에서 설정된 '/portfolio'를 가져옵니다.
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl // 'https://baeksebin.github.io'
            defaultImage: image // '/og.png'
            twitterUsername
          }
        }
      }
    `,
  );

  const {
    pathPrefix,
    siteMetadata: { defaultTitle, defaultDescription, siteUrl, defaultImage, twitterUsername },
  } = site;

  // SEO 객체 생성 및 URL/이미지 결합 로직
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,

    // ⭐ OG 이미지 URL 생성: siteUrl + pathPrefix + image
    image: `${siteUrl}${pathPrefix}${image || defaultImage}`,

    // ⭐ OG URL 생성: siteUrl + pathPrefix + pathname
    url: `${siteUrl}${pathPrefix}${pathname}`,
  };

  // 루트 페이지 URL 예외 처리: pathname이 '/'일 때 URL 중복을 방지합니다.
  if (pathname === '/') {
    // 예를 들어, /portfolio/home/ 대신 /portfolio 로 설정됩니다.
    seo.url = siteUrl + pathPrefix;
  }

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {/* OG (Open Graph) 태그 */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />{' '}
      {/* ✅ 이제 올바른 절대 경로(pathPrefix 포함)가 들어갑니다. */}
      <meta property="og:url" content={seo.url} />{' '}
      {/* ✅ /portfolio/portfolio 중복이 해결됩니다. */}
      <meta property="og:type" content="website" />
      {/* Twitter 카드 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
};
