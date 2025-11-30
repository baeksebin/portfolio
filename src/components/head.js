import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

const Head = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          pathPrefix
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
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

    // OG 이미지 URL: pathPrefix를 포함해야 이미지 경로가 정상 작동합니다. (정상)
    image: `${siteUrl}${pathPrefix}${image || defaultImage}`,

    // ⭐⭐⭐ og:url 최종 해결: pathPrefix를 완전히 제외하고 siteUrl만 사용 ⭐⭐⭐
    // URL 중복이 Gatsby 내부에서 발생하므로, siteUrl만 넘겨 디버거가 올바른 경로를 유추하도록 유도
    url: siteUrl,
  };

  // 🚨 최종 URL이 /로 끝날 경우 제거합니다. (siteUrl에 슬래시가 붙어있을 경우 대비)
  if (seo.url.endsWith('/')) {
    seo.url = seo.url.slice(0, -1);
  }

  // 하위 페이지 처리: pathPrefix를 제외하고 pathname만 붙여줍니다.
  if (pathname && pathname !== '/') {
    // pathname에 선행 슬래시가 있다면 seo.url 뒤에 붙여줍니다.
    const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
    seo.url = `${seo.url}${cleanPathname}`;
  }

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* OG (Open Graph) 태그 */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
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
