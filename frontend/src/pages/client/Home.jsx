import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Hero from "@/components/misc/Hero";
import NewsLatest from "@/components/clientcomponents/NewsLatest";
import About from "@/components/misc/About";

const Home = () => {
  return (
    <>
      <Hero />
      <ScrollAnimation animateIn="fadeInLeftShort" animateOnce={true}>
        <NewsLatest />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInLeftShort" animateOnce={true}>
        <About />
      </ScrollAnimation>
    </>
  );
};

export default Home;
