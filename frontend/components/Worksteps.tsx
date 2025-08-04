export default function Worksteps() {
  const steps = [
    {
      icon: '📷',
      title: 'Tải ảnh món ăn',
      desc: `Chụp một bức ảnh rõ nét của món ăn bạn muốn tái tạo. Ảnh càng rõ, AI sẽ phân tích càng chính xác.`,
      color: 'bg-orange-500'
    },
    {
      icon: '🏥',
      title: 'AI phân tích',
      desc: `AI tiên tiến của chúng tôi sẽ phân tích hình ảnh để nhận diện nguyên liệu, phương pháp nấu và cách trình bày.`,
      color: 'bg-green-600'
    },
    {
      icon: '🍽️',
      title: 'Nhận công thức',
      desc: `Nhận công thức đầy đủ với nguyên liệu, hướng dẫn, thông tin dinh dưỡng và cả video hướng dẫn.`,
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className=" py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Quy trình nhận diện công thức</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
          >
            <div
              className={`text-white text-2xl w-12 h-12 flex items-center justify-center rounded-full mb-4 ${step.color}`}
            >
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{`${index + 1}. ${step.title}`}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
