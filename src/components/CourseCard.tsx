type Props = {
  title: string;
  desc: string;
  img: string;
};

const CourseCard: React.FC<Props> = ({ title, desc, img }) => (
  <div className="bg-white rounded-lg shadow p-4 max-w-sm">
    <img src={img} alt={title} className="rounded mb-3" />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{desc}</p>
    <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded">Enroll</button>
  </div>
);

export default CourseCard;