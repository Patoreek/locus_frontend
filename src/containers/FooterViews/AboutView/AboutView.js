import React from "react";

import classes from "./AboutView.module.scss";

import UnderConstruction from "../../../components/UnderConstruction/UnderConstruction";

const AboutView = () => {
  return (
    <div className={classes.aboutUsPage}>
      <UnderConstruction />
      <div className={classes.aboutUs}>
        <div className={classes.aboutUs__header}>
          <h3 className={classes.header}> About Us</h3>
        </div>

        <div className={classes.aboutUs__text}>
          <p className={classes.text}>
            describe Locus... Curabitur tempor ex quis tempus dictum. Sed sit
            amet fermentum tellus. Phasellus a leo ac justo convallis molestie
            at sed nisi. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Cras varius tortor aliquet nisi
            aliquet, ut interdum lectus tempor. Nullam elit ex, porttitor id
            auctor et, porta ut eros. Nullam malesuada nec sapien vel bibendum.
            Etiam viverra metus quis dictum scelerisque. Praesent facilisis nibh
            sem, ut aliquam erat pharetra at. Duis ante ipsum, congue quis
            imperdiet ac, feugiat in est. Morbi mattis pulvinar purus, at
            imperdiet magna placerat eu. Donec id elit id nisi ultrices cursus
            at viverra est. Cras maximus pharetra orci, id placerat nisl
            fringilla id. Sed vitae condimentum urna, ac sollicitudin leo.
            Aliquam tellus enim, porta eu urna id, blandit lobortis tellus. Sed
            a nisi at erat vehicula ullamcorper a ac ante.
          </p>
        </div>
      </div>

      <div className={classes.mission}>
        <div className={classes.mission__header}>
          <h3 className={classes.header}> Mission Statement</h3>
        </div>

        <div className={classes.mission__text}>
          <p className={classes.text}>
            Statement goes here... Curabitur tempor ex quis tempus dictum. Sed
            sit amet fermentum tellus. Phasellus a leo ac justo convallis
            molestie at sed nisi. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Cras varius tortor
            aliquet nisi aliquet, ut interdum lectus tempor. Nullam elit ex,
            porttitor id auctor et, porta ut eros. Nullam malesuada nec sapien
            vel bibendum. Etiam viverra metus quis dictum scelerisque. Praesent
            facilisis nibh sem, ut aliquam erat pharetra at. Duis ante ipsum,
            congue quis imperdiet ac, feugiat in est. Morbi mattis pulvinar
            purus, at imperdiet magna placerat eu. Donec id elit id nisi
            ultrices cursus at viverra est. Cras maximus pharetra orci, id
            placerat nisl fringilla id. Sed vitae condimentum urna, ac
            sollicitudin leo. Aliquam tellus enim, porta eu urna id, blandit
            lobortis tellus. Sed a nisi at erat vehicula ullamcorper a ac ante.
          </p>
        </div>
      </div>

      <div className={classes.overview}>
        <div className={classes.overview__header}>
          <h3 className={classes.header}>General Overview</h3>
        </div>

        <div className={classes.overview__text}>
          <p className={classes.text}>
            Overview goes here... Curabitur tempor ex quis tempus dictum. Sed
            sit amet fermentum tellus. Phasellus a leo ac justo convallis
            molestie at sed nisi. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Cras varius tortor
            aliquet nisi aliquet, ut interdum lectus tempor. Nullam elit ex,
            porttitor id auctor et, porta ut eros. Nullam malesuada nec sapien
            vel bibendum. Etiam viverra metus quis dictum scelerisque. Praesent
            facilisis nibh sem, ut aliquam erat pharetra at. Duis ante ipsum,
            congue quis imperdiet ac, feugiat in est. Morbi mattis pulvinar
            purus, at imperdiet magna placerat eu. Donec id elit id nisi
            ultrices cursus at viverra est. Cras maximus pharetra orci, id
            placerat nisl fringilla id. Sed vitae condimentum urna, ac
            sollicitudin leo. Aliquam tellus enim, porta eu urna id, blandit
            lobortis tellus. Sed a nisi at erat vehicula ullamcorper a ac ante.
          </p>
        </div>
      </div>

      <div className={classes.guide}>
        <div className={classes.guide__header}>
          <h3 className={classes.header}>User Guide</h3>
        </div>

        <div className={classes.guide__text}>
          <p className={classes.text}>
            User guide goes here... Curabitur tempor ex quis tempus dictum. Sed
            sit amet fermentum tellus. Phasellus a leo ac justo convallis
            molestie at sed nisi. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Cras varius tortor
            aliquet nisi aliquet, ut interdum lectus tempor. Nullam elit ex,
            porttitor id auctor et, porta ut eros. Nullam malesuada nec sapien
            vel bibendum. Etiam viverra metus quis dictum scelerisque. Praesent
            facilisis nibh sem, ut aliquam erat pharetra at. Duis ante ipsum,
            congue quis imperdiet ac, feugiat in est. Morbi mattis pulvinar
            purus, at imperdiet magna placerat eu. Donec id elit id nisi
            ultrices cursus at viverra est. Cras maximus pharetra orci, id
            placerat nisl fringilla id. Sed vitae condimentum urna, ac
            sollicitudin leo. Aliquam tellus enim, porta eu urna id, blandit
            lobortis tellus. Sed a nisi at erat vehicula ullamcorper a ac ante.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
