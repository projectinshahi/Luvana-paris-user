import BestSellers from "@/components/BestSellers";
import CategoryBar from "@/components/Categorybar";
import ExploreBrandsSection from "@/components/ExploreBrandsSection";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import ImageSection from "@/components/ImageSection";
import InfluencersReelsSection from "@/components/InfluencersReelsSection";
import InfluencersSection from "@/components/InfluencesSection";





export default function Home() {
  return (
    <div>
     
      <div className="pt-8 sm:pt-12 md:pt-12 pb-20 sm:pb-0">

        <ImageSection/>
        <CategoryBar />
        <BestSellers/>
        <ExploreBrandsSection/>
        <ExploreMoreSection/>
        <InfluencersReelsSection/>
       
      </div>
    </div>
  );
}
