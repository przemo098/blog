export default function CV() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Curriculum Vitae</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Education</h2>
          <div className="space-y-2">
            <p className="font-medium">University Name</p>
            <p className="text-gray-600">Degree - Field of Study</p>
            <p className="text-sm text-gray-500">2018 - 2022</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Experience</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Company Name</p>
              <p className="text-gray-600">Position</p>
              <p className="text-sm text-gray-500">2022 - Present</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Skills</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Skill 1</li>
            <li>Skill 2</li>
            <li>Skill 3</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 