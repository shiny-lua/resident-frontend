import React from "react";
import Layout from "../../components/layout";
import Header from "./components/header";
import Innovations from "./components/innovations";
import Learn from "./components/learn";
import Progress from './components/progress';
import Question from "./components/question";
import Testimonials from './components/testimonials';

const HomeIndex = () => (
  <Layout>
    <div className="relative pt-30">
      <img className="fixed right-0 top-0 -z-10" src="/image/effort-2.png" alt="" />
      <img className="fixed left-0 bottom-0 -z-10" src="/image/effort-1.png" alt="" />
      <Header />
      <Progress />
      <Testimonials />
      <Question />
      <Innovations />
      <Learn />
    </div>
  </Layout>
);

export default HomeIndex;
