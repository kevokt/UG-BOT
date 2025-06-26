import React from "react";
import Hero from "@/components/misc/Hero";
import ClientNav from "@/components/ClientNavbar/ClientNav";

const Home = () => {
  return (
    <>
      <ClientNav active="home" />
      <Hero />
    </>
  );
};

export default Home;
