import { useState, useEffect } from 'react';
import { get, BACKEND_BASE_URL } from '../utils/api';
import SectionTitle from '../components/SectionTitle';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await get('/members');
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching members:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pt-28 pb-20 bg-light-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionTitle
            title="Our Present Members"
            subtitle="The dedicated leaders and members guiding Maharshi Dayanand Jan Kalyan Sanstha towards social empowerment and community welfare"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No members found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-zinc-200/40 border border-zinc-200/50 hover:border-accent-400 hover-lift transition-all duration-500"
              >
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 group flex items-center justify-center">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl?.startsWith('http') ? member.imageUrl : `${BACKEND_BASE_URL}${member.imageUrl}`}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <span className="text-gray-400 text-6xl font-bold">{member.name.charAt(0).toUpperCase()}</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-6 px-3 py-1 text-2xs font-bold rounded-lg bg-accent-500 text-white shadow-md uppercase tracking-wider">
                    {member.designation}
                  </span>
                </div>

                {/* Info Details */}
                <div className="p-6 md:p-8 text-center flex flex-col justify-center items-center">
                  <h3 className="font-heading text-xl font-bold text-dark-900 mb-1">{member.name}</h3>
                  <p className="text-accent-600 text-xs font-semibold uppercase tracking-wider">
                    {member.designation}
                  </p>
                  {member.profession && (
                    <span className="mt-2 text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                      {member.profession}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

