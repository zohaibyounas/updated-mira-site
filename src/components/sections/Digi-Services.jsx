import Data from "@data/sections/digital-services.json";
import Link from "next/link";
import { useEffect } from "react";

import { servicesHover } from "@common/utilits";
import { useTranslate } from "@/src/contexts/TranslateContext";

const ServicesSection = ({ paddingtop = false }) => {
  const { t } = useTranslate();

  useEffect(() => {
    servicesHover();
  }, []);

  return (
    <>
      {/* Onovo Services */}
      <section
        className={`onovo-section ${
          paddingtop ? "gap-top-140" : "gap-top-20"
        } gap-bottom-140`}
      >
        <div className="container-xl">
          {/* Services items */}
          <div className="row onovo-services-grid-fw">
            {Data.items.map((item, key) => (
              <div
                key={`services-item-${key}`}
                className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center"
              >
                <Link href={`/digital-solutions/${item.id}`}>
                  <div
                    className={
                      key == 1
                        ? "onovo-service-grid-item onovo-hover-1 active active--default"
                        : "onovo-service-grid-item onovo-hover-1"
                    }
                  >
                    <div className="image justify-items-center">
                      <img
                        decoding="async"
                        src={item.image}
                        alt={t(item.title)}
                      />
                    </div>
                    <h5 className="onovo-title-3">
                      <span>{t(item.title)}</span>
                    </h5>
                    <div className="onovo-text">
                      <div>
                        <p className="text-service">{t(item.text)}</p>
                      </div>
                    </div>
                    <div className="onovo-bubble">
                      <div className="bubble-1" />
                      <div className="bubble-2" />
                      <div className="bubble-3" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
