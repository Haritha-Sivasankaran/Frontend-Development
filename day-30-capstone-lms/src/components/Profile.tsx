import React, { useState } from 'react';
import { Course, Enrollment, Student } from '../types';
import { Badge } from './common/Badge';

interface ProfileProps {
  student: Student;
  courses: Course[];
  enrollments: Enrollment[];
  onUpdateProfile: (updatedStudent: Student) => void;
  onSelectCourse: (courseId: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  student,
  courses,
  enrollments,
  onUpdateProfile,
  onSelectCourse
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    bio: student.bio,
    githubUsername: student.githubUsername || ''
  });
  const [newSkill, setNewSkill] = useState<string>('');

  const completedEnrollments = enrollments.filter((e) => e.progress === 100);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...student,
      name: formData.name,
      phone: formData.phone,
      bio: formData.bio,
      githubUsername: formData.githubUsername
    });
    setIsEditing(false);
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      if (!student.skills.includes(newSkill.trim())) {
        onUpdateProfile({
          ...student,
          skills: [...student.skills, newSkill.trim()]
        });
      }
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateProfile({
      ...student,
      skills: student.skills.filter((s) => s !== skillToRemove)
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-card-layout">
        {/* Left Column: Avatar & Overview */}
        <aside className="profile-sidebar">
          <img
            src={student.avatar}
            alt={student.name}
            className="profile-avatar-circle"
          />

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gray-900)' }}>
            {student.name}
          </h2>

          <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
            🎓 Verified Tech Learner
          </p>

          <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            "{student.bio}"
          </p>

          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '1.25rem', textAlign: 'left', fontSize: '0.85rem', color: 'var(--gray-600)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ color: 'var(--gray-400)', display: 'block', fontSize: '0.75rem' }}>EMAIL</span>
              <strong>{student.email}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--gray-400)', display: 'block', fontSize: '0.75rem' }}>PHONE</span>
              <strong>{student.phone}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--gray-400)', display: 'block', fontSize: '0.75rem' }}>JOINED</span>
              <strong>{student.registeredDate}</strong>
            </div>
            {student.githubUsername && (
              <div>
                <span style={{ color: 'var(--gray-400)', display: 'block', fontSize: '0.75rem' }}>GITHUB</span>
                <strong>github.com/{student.githubUsername}</strong>
              </div>
            )}
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEditing(!isEditing)}
            style={{ width: '100%', marginTop: '1.5rem' }}
          >
            {isEditing ? 'Cancel Edit' : '✏️ Edit Profile'}
          </button>
        </aside>

        {/* Right Column: Edit Mode or Credentials */}
        <main className="profile-main-body">
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="registration-form">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>
                Update Profile Information
              </h3>

              <div className="input-group">
                <label className="input-label" htmlFor="edit-name">Full Name</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  className="text-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="input-group">
                  <label className="input-label" htmlFor="edit-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="edit-phone"
                    name="phone"
                    className="text-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="edit-github">GitHub Username</label>
                  <input
                    type="text"
                    id="edit-github"
                    name="githubUsername"
                    className="text-input"
                    value={formData.githubUsername}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="edit-bio">Bio</label>
                <textarea
                  id="edit-bio"
                  name="bio"
                  rows={3}
                  className="textarea-input"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Skills Cloud */}
              <section style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.4rem' }}>
                  Technical Skills &amp; Competencies
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
                  Add skills relevant to your software engineering path (Type and press Enter).
                </p>

                <div className="skills-tags-cloud">
                  {student.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        style={{ background: 'none', border: 'none', marginLeft: '0.4rem', cursor: 'pointer', color: 'var(--gray-400)' }}
                        title="Remove skill"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: '1rem', maxWidth: '320px' }}>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="Type skill & press Enter..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                </div>
              </section>

              {/* Earned Certificates */}
              <section>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.4rem' }}>
                  Verified Course Certificates ({completedEnrollments.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '1.25rem' }}>
                  Issued automatically upon 100% syllabus module completion.
                </p>

                {completedEnrollments.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                    {completedEnrollments.map((enr) => {
                      const course = courses.find((c) => c.id === enr.courseId);
                      if (!course) return null;

                      return (
                        <div
                          key={enr.courseId}
                          style={{
                            border: '1px solid #a7f3d0',
                            background: '#f0fdf4',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '0.75rem'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '1.5rem' }}>🏆</span>
                              <Badge variant="success">Verified</Badge>
                            </div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gray-900)', marginTop: '0.5rem' }}>
                              {course.title}
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.2rem' }}>
                              Issued on {enr.lastAccessedAt} &bull; Mentor: {course.instructor.name}
                            </p>
                          </div>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => onSelectCourse(course.id)}
                          >
                            Review Coursework
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ background: 'var(--gray-50)', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                      No certificates earned yet. Complete all lessons in an enrolled course to unlock your verified credential!
                    </p>
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
