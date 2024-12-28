import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import Link from "next/link";
import ImageView from "@components/ImageView";

import { useRouter } from "next/router";
import {
  getSortedProjectsData,
  getAllProjectsIds,
  getProjectData,
} from "@/src/lib/embedded-projects";

import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";
import { useTranslate } from "@/src/contexts/TranslateContext";

const ProjectDetail = (props) => {
  const { t } = useTranslate();

  const postData = props.data;
  let prev_id,
    next_id,
    prev_key,
    next_key = 0;

  props.projects.forEach(function (item, key) {
    if (item.id == postData.id) {
      prev_key = key - 1;
      next_key = key + 1;
    }
  });

  props.projects.forEach(function (item, key) {
    if (key == prev_key) {
      prev_id = item.id;
    }
    if (key == next_key) {
      next_id = item.id;
    }
  });

  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const shareUrl = `${origin}${asPath}`;

  return (
    <Layouts header={2} footer={2} darkHeader>
      <PageBanner pageTitle={t(postData.title)} pageDesc={t(postData.type)} />

      {/* Onovo Project Detail */}
      <section className="onovo-section gap-top-140">
        <div className="container">
          {/* Image */}
          <div className="gap-bottom-80">
            <div className="project-image">
              <img src={postData.image} alt={t(postData.title)} />
            </div>
          </div>

          <div className="row gap-bottom-80">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
              {postData.contentHtml && (
                <div className="onovo-text">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t(postData.contentHtml),
                    }}
                  />
                </div>
              )}
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 offset-lg-1">
              <div className="onovo-project-info onovo-text-white text-uppercase">
                <ul>
                  {postData.details && postData.details.items
                    ? postData.details.items.map((item, key) => (
                        <li key={`details-item-${key}`}>
                          <div>
                            <strong>{t(item.label)}</strong>
                          </div>
                          <div>{t(item.value)}</div>
                        </li>
                      ))
                    : null}

                  <li>
                    <div>
                      <strong>{t("Share:")}</strong>
                    </div>
                    <div className="onovo-share">
                      <div className="social-share onovo-post-socials onovo-social-2">
                        <ul>
                          <li>
                            <FacebookShareButton
                              className="onovo-social-link onovo-hover-2"
                              url={shareUrl}
                              quote={t(postData.title)}
                              hashtag={"#" + postData.category}
                            >
                              <i className="icon fab fa-facebook" />
                            </FacebookShareButton>
                          </li>
                          <li>
                            <TwitterShareButton
                              className="onovo-social-link onovo-hover-2"
                              url={shareUrl}
                              title={t(postData.title)}
                              hashtag={"#" + postData.category}
                            >
                              <i className="icon fab fa-twitter" />
                            </TwitterShareButton>
                          </li>
                          <li>
                            <LinkedinShareButton
                              className="onovo-social-link onovo-hover-2"
                              url={shareUrl}
                              title={t(postData.title)}
                              summary={postData.type}
                              source={shareUrl}
                            >
                              <i className="icon fab fa-linkedin" />
                            </LinkedinShareButton>
                          </li>
                          <li>
                            <RedditShareButton
                              className="onovo-social-link onovo-hover-2"
                              url={shareUrl}
                              title={t(postData.title)}
                            >
                              <i className="icon fab fa-reddit" />
                            </RedditShareButton>
                          </li>
                          <li>
                            <PinterestShareButton
                              className="onovo-social-link onovo-hover-2"
                              url={shareUrl}
                              media={postData.image}
                              description={t(postData.title)}
                            >
                              <i className="icon fab fa-pinterest" />
                            </PinterestShareButton>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {postData.gallery && postData.gallery.items && (
            <div className="row gap-row gallery-items onovo-custom-gallery">
              {postData.gallery.items.map((item, key) => (
                <div
                  key={`gallery-item-${key}`}
                  className="col-xs-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div className="gallery-item">
                    <a href={item.image} className="mfp-image">
                      <img src={item.image} alt={t(item.alt)} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {postData.additional && postData.additional.heading && (
            <div className="onovo-text gap-top-80">
              <h6 className="text-uppercase">
                {t(postData.additional.heading)}
              </h6>
              <div
                dangerouslySetInnerHTML={{
                  __html: t(postData.additional.content),
                }}
              />
            </div>
          )}
        </div>
      </section>

      <section className="onovo-section">
        <div className="container">
          <div className="onovo-page-navigation">
            <div className="onovo-page-navigation-content">
              {prev_id && (
                <Link
                  href={`/projects/${prev_id}`}
                  className="page-navigation__prev"
                >
                  <span className="onovo-prev onovo-hover-2">
                    <i />
                  </span>
                </Link>
              )}
              <Link href="/projects" className="page-navigation__posts">
                <i className="fas fa-th" />
              </Link>
              {next_id && (
                <Link
                  href={`/projects/${next_id}`}
                  className="page-navigation__next"
                >
                  <span className="onovo-next onovo-hover-2">
                    <i />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <ImageView />
    </Layouts>
  );
};

export default ProjectDetail;

// Add the getStaticProps function here at the bottom
export async function getStaticProps({ params }) {
  const postData = await getProjectData(params.id);
  const allProjects = await getSortedProjectsData();

  // Ensure data is always valid, with fallback values for missing data
  const sanitizedPostData = {
    ...postData,
    details: postData.details || { items: [] }, // Default to empty object/array if undefined
    gallery: postData.gallery || { items: [] }, // Default to empty object/array if undefined
    additional: postData.additional || {}, // Default to empty object if undefined
  };

  return {
    props: {
      data: sanitizedPostData, // Ensuring no undefined values in data
      projects: allProjects || [], // Ensure projects is an array, even if empty
    },
  };
}

// You can leave this as is, to get all paths for the page
export async function getStaticPaths() {
  const paths = getAllProjectsIds();
  return {
    paths,
    fallback: false,
  };
}
