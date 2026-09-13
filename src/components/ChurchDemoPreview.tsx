import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, BarChart3, Search, Send, CheckCircle2, Plus, PhoneCall, BellRing, Download } from 'lucide-react';

interface ChurchDemoPreviewProps {
  onOpenDownload?: (platform: 'mobile' | 'pc') => void;
}

export const ChurchDemoPreview: React.FC<ChurchDemoPreviewProps> = ({ onOpenDownload }) => {
  const [activeTab, setActiveTab] = useState<'members' | 'messages' | 'events' | 'reports'>('members');
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const [announcements, setAnnouncements] = useState([
    { id: '1', title: 'Kil Dimanch Adorasyon', time: 'Jodi a a 9:00 AM', status: 'Voye bay 1,120 moun', type: 'SMS & Push' },
    { id: '2', title: 'Reyinyon Koral ' + 'Vwa Selès', time: 'Vandredi 5:00 PM', status: 'Voye bay 45 moun', type: 'Gwoup' },
    { id: '3', title: 'Seminè sou maryaj ak fanmi', time: 'Samdi 6:00 PM', status: 'Voye bay 310 moun', type: 'Kominote' },
  ]);
  const [sendSuccess, setSendSuccess] = useState(false);

  const sampleMembers = [
    { id: '1', name: 'Pastè Pierre-Richard Louis', role: 'Pastè Prensipal', phone: '+509 3712-4489', group: 'Konsèy Dirijan', status: 'Aktif' },
    { id: '2', name: 'Sè Marie Esther Celestin', role: 'Prezidant Dam', phone: '+509 3890-1122', group: 'Komite Dam', status: 'Aktif' },
    { id: '3', name: 'Frè Daniel Jean-Baptiste', role: 'Direktè Koral', phone: '+509 4455-8899', group: 'Mizik & Louwanj', status: 'Aktif' },
    { id: '4', name: 'Jèn Claude Emmanuel', role: 'Lidè Jenès', phone: '+509 3211-9900', group: 'Depatman Jèn', status: 'Aktif' },
    { id: '5', name: 'Sè Rose-Merline Joseph', role: 'Monitris Lekòl Dimanch', phone: '+509 4677-2233', group: 'Edikasyon Kretyèn', status: 'Aktif' },
  ];

  const filteredMembers = sampleMembers.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;

    const newA = {
      id: Date.now().toString(),
      title: announcementText,
      time: 'Kounye a',
      status: 'Voye bay 1,248 manm',
      type: 'SMS Mass & Push',
    };

    setAnnouncements([newA, ...announcements]);
    setAnnouncementText('');
    setSendSuccess(true);
    setTimeout(() => setSendSuccess(false), 3000);
  };

  return (
    <section id="preview" className="py-14 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-[#35c9ff] text-xs font-black tracking-[0.2em] uppercase block">
            Demonstrasyon Entèaktif
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Eksperyans Koòdone OmniChurch la
          </h2>
          <p className="text-blue-100/60 text-xs sm:text-sm md:text-base">
            Gade kijan aplikasyon an fasilite travay pastè ak administratè yo an tan reyèl.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="max-w-5xl mx-auto glass rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          
          {/* Top Control Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-3 sm:px-6 py-3 bg-[rgba(10,28,59,0.4)]">
            <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('members')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'members'
                    ? 'btn-gradient text-white'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Anyè Manm (1,248)</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'messages'
                    ? 'btn-gradient text-white'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>SMS & Anons</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'events'
                    ? 'btn-gradient text-white'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Kalandriye Kil</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'reports'
                    ? 'btn-gradient text-white'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Rapò Prezans</span>
              </button>
            </div>

            {/* Quick Pro Tag */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-blue-200/80">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#3df58b]"></span>
              <span>Baz Done Sekirize</span>
            </div>
          </div>

          {/* Tab 1: Member Directory */}
          {activeTab === 'members' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Chèche yon manm pa non, depatman..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#35c9ff] transition"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-200/60">Total afiche: <b>{filteredMembers.length}</b></span>
                  <button className="px-3 py-1.5 rounded-lg btn-secondary text-xs font-bold text-blue-200 flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nouvo Manm</span>
                  </button>
                </div>
              </div>

              {/* Members Table */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-black/30">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-white/5 text-blue-200/70 font-semibold border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Non & Prenon</th>
                        <th className="py-3 px-4">Wòl nan Legliz</th>
                        <th className="py-3 px-4">Gwoup / Depatman</th>
                        <th className="py-3 px-4">Telefòn</th>
                        <th className="py-3 px-4 text-right">Aksyon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredMembers.map((m) => (
                        <tr key={m.id} className="hover:bg-white/5 transition">
                          <td className="py-3 px-4 font-bold text-white flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#087cff]/30 text-[#35c9ff] font-bold flex items-center justify-center text-xs">
                              {m.name.charAt(0)}
                            </div>
                            <span>{m.name}</span>
                          </td>
                          <td className="py-3 px-4 text-blue-100/80">{m.role}</td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgba(10,28,59,0.6)] border border-white/10 text-blue-200">
                              {m.group}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-blue-200/60">{m.phone}</td>
                          <td className="py-3 px-4 text-right">
                            <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#35c9ff] transition cursor-pointer">
                              <PhoneCall className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Messages & Mass SMS */}
          {activeTab === 'messages' && (
            <div className="p-4 sm:p-6 space-y-6">
              {/* Send SMS Box */}
              <form onSubmit={handleSendAnnouncement} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <BellRing className="w-4 h-4 text-[#35c9ff]" />
                    <span>Difize yon Anons / SMS bay tout Legliz la</span>
                  </span>
                  <span className="text-[11px] text-green-400 font-semibold">1,248 destinataè pare</span>
                </div>

                <textarea
                  rows={2}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="Ekri anons ou a la a (egzanp: Pa bliye jèn ak lapriyè samdi sa a soti 8:00 AM rive 12:00 PM)..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#35c9ff] transition"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-blue-200/50">Konpatib ak SMS nasyonal ak notifikasyon app</span>
                  <button
                    type="submit"
                    className="btn-gradient px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Voye Kounye a</span>
                  </button>
                </div>

                {sendSuccess && (
                  <div className="p-2.5 rounded-xl bg-green-950/60 border border-green-500/40 text-green-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Anons la voye avèk siksè bay tout manm yo!</span>
                  </div>
                )}
              </form>

              {/* History List */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-blue-200/70 uppercase tracking-wider">
                  Istorik Dènye Anons Yo
                </div>
                {announcements.map((a) => (
                  <div key={a.id} className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <div className="font-bold text-white">{a.title}</div>
                      <div className="text-[11px] text-blue-200/50 mt-0.5">{a.time} • {a.type}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-950/60 border border-green-500/30 text-green-400">
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Events Schedule */}
          {activeTab === 'events' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#087cff]/20 text-[#35c9ff]">DIMANCH</span>
                  <h4 className="font-bold text-white text-base">Gwo Kil Adorasyon & Louwanj</h4>
                  <p className="text-xs text-blue-200/60">Sèvis prensipal ak prezans jeneral, predikasyon ak sentsèn.</p>
                  <div className="text-xs text-green-400 font-bold pt-2">8:00 AM - 11:30 AM</div>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#087cff]/20 text-[#35c9ff]">MÈKREDI</span>
                  <h4 className="font-bold text-white text-base">Etid Biblik & Priyè</h4>
                  <p className="text-xs text-blue-200/60">Apwofondisman Pawòl Bondye a ak entèsesyon pou tout manm malad yo.</p>
                  <div className="text-xs text-green-400 font-bold pt-2">6:00 PM - 8:00 PM</div>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#087cff]/20 text-[#35c9ff]">VANDREDI</span>
                  <h4 className="font-bold text-white text-base">Reyinyon Jèn & Koral</h4>
                  <p className="text-xs text-blue-200/60">Aktivite espirityèl ak mizik pou jenès legliz la avèk tèm espesyal.</p>
                  <div className="text-xs text-green-400 font-bold pt-2">5:00 PM - 7:30 PM</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Reports */}
          {activeTab === 'reports' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="metric-card p-4">
                  <div className="text-xs text-blue-200/60 font-semibold">Mwayèn Prezans nan Kil</div>
                  <div className="text-2xl font-black text-white mt-1">942 moun</div>
                  <div className="text-xs text-green-400 font-semibold mt-1">+8.4% kwasans</div>
                </div>

                <div className="metric-card p-4">
                  <div className="text-xs text-blue-200/60 font-semibold">Nouvo Manm Batize (2026)</div>
                  <div className="text-2xl font-black text-white mt-1">68 manm</div>
                  <div className="text-xs text-[#35c9ff] font-semibold mt-1">100% dokimante</div>
                </div>

                <div className="metric-card p-4">
                  <div className="text-xs text-blue-200/60 font-semibold">To Angajman sou App la</div>
                  <div className="text-2xl font-black text-white mt-1">92.5%</div>
                  <div className="text-xs text-green-400 font-semibold mt-1">Trè wo</div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Showcase Download Bar */}
          <div className="px-4 sm:px-6 py-4 bg-[rgba(5,15,36,0.85)] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <span>📱 Enstale OmniChurch pou legliz ou kounye a</span>
              </div>
              <div className="text-xs text-blue-200/60 mt-0.5">
                Disponib dirèkteman an fichye APK pou Android ak lojisyèl Desktop pou Windows.
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0">
              <button
                onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gradient w-full sm:w-auto px-5 py-3 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] transition-transform"
              >
                <Download className="w-4 h-4" />
                <span>Telechaje OmniChurch</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
