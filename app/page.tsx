import BestSellers from "@/components/BestSellers";
import CategoryBar from "@/components/Categorybar";
import ExploreBrandsSection from "@/components/ExploreBrandsSection";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import Footer from "@/components/Footer";
import ImageSection from "@/components/ImageSection";
import InfluencersSection from "@/components/InfluencesSection";
import Navbar from "@/components/Navbar";




export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <ImageSection/>
        <CategoryBar />
        <BestSellers/>
        <ExploreBrandsSection/>
        <ExploreMoreSection/>
        <InfluencersSection/>
        <Footer />
      </div>
    </div>
  );
}
