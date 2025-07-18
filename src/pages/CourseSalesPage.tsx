
import OpeningStorySection from '../components/OpeningStorySection';
import InstructorSection from '../components/InstructorSection';
import SuccessStories from '../components/SuccessStories';



const CourseSalesPage = () => {
  return (
    <div className="flex flex-col gap-1 bg-transparent -mt-16">

      <OpeningStorySection />
      <InstructorSection />
      <SuccessStories />


    </div>
  );
};

export default CourseSalesPage;