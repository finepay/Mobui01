import { useState } from 'react';
import { ArrowLeft, Stethoscope, Sprout, AlertTriangle, MessageSquare, CheckCircle2, Search } from 'lucide-react';
import { DOCTORS_DATA, SYMPTOM_TRIAGE_DB } from '../../data/ternivaData';
import { Doctor } from '../../types';

interface MobileKonsultasiScreenProps {
  onBack: () => void;
  onOpenLiveChat: (doctor: Doctor) => void;
}

export default function MobileKonsultasiScreen({
  onBack,
  onOpenLiveChat,
}: MobileKonsultasiScreenProps) {
  const [activeTab, setActiveTab] = useState<'hewan' | 'tanaman' | 'dokter'>('hewan');
  const [selectedSymptomIdx, setSelectedSymptomIdx] = useState(0);
  const [customSymptom, setCustomSymptom] = useState('');
  const [triageResult, setTriageResult] = useState<{ suspected: string; firstAid: string } | null>(null);

  const presets = activeTab === 'hewan' ? SYMPTOM_TRIAGE_DB.hewan : SYMPTOM_TRIAGE_DB.tanaman;

  const handleDiagnose = () => {
    if (customSymptom.trim()) {
      setTriageResult({
        suspected: 'Indikasi Infeksi / Masalah Nutrisi Berdasarkan Gejala Khusus',
        firstAid: 'Segera lakukan isolasi/pemangkasan daun terdampak, jaga sirkulasi udara kandang/kebun, dan konsultasikan dosis obat ke dokter siaga di bawah.',
      });
    } else {
      const p = presets[selectedSymptomIdx];
      setTriageResult({
        suspected: p.suspected,
        firstAid: p.firstAid,
      });
    }
  };

  return (
    <div className="bg-stone-100 min-h-full pb-8">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-lg hover:bg-stone-100 text-stone-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">Konsultasi (Dok Hewan/Tanaman)</h3>
            <span className="text-[10px] text-sky-700 font-medium">Layanan Dokter Ahli & Skrining Gejala</span>
          </div>
        </div>
      </div>

      {/* 3 Tabs */}
      <div className="bg-white border-b border-stone-200 grid grid-cols-3 text-center text-xs font-semibold">
        <button
          onClick={() => {
            setActiveTab('hewan');
            setTriageResult(null);
          }}
          className={`py-2.5 border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'hewan'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Dok Hewan</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('tanaman');
            setTriageResult(null);
          }}
          className={`py-2.5 border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'tanaman'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sprout className="w-3.5 h-3.5" />
          <span>Dok Tanaman</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('dokter');
            setTriageResult(null);
          }}
          className={`py-2.5 border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'dokter'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direktori SIP</span>
        </button>
      </div>

      <div className="p-3 space-y-3">
        {activeTab === 'dokter' ? (
          // Doctor List
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-stone-900">Dokter Siaga Online Terniva</div>
            {DOCTORS_DATA.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-800 uppercase">{doc.title}</span>
                    <h5 className="text-xs font-bold text-stone-900">{doc.name}</h5>
                    <div className="text-[10px] text-stone-500 font-mono">{doc.sipNumber}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-500 font-mono">★ {doc.rating}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg">
                  {doc.specialty}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-700 font-medium">Siap Konsultasi Online</span>
                  <button
                    onClick={() => onOpenLiveChat(doc)}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Mulai Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Symptom Triage Form
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h5 className="text-xs font-bold text-stone-900">
                  Skrining Gejala Cepat ({activeTab === 'hewan' ? 'Hewan Ternak' : 'Tanaman'})
                </h5>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-stone-700 block">Pilih Gejala Klinis Umum:</label>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedSymptomIdx(idx);
                      setCustomSymptom('');
                      setTriageResult(null);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs border transition-colors ${
                      selectedSymptomIdx === idx && !customSymptom
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-700 font-semibold'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {p.symptom}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[10px] font-semibold text-stone-700 block mb-1">
                  Atau Tuliskan Gejala Khusus:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: demam, kembung, daun menguning..."
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>

              <button
                onClick={handleDiagnose}
                className="w-full py-2 bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Analisis & Lihat Pertolongan Pertama</span>
              </button>

              {triageResult && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2 mt-2">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase">Hasil Diagnosa Awal:</div>
                  <div className="text-xs font-bold text-stone-900">{triageResult.suspected}</div>
                  <div className="text-[11px] text-stone-700 bg-white p-2 rounded-lg border border-stone-200 leading-relaxed">
                    <span className="font-semibold block mb-0.5">Pertolongan Pertama Segera:</span>
                    {triageResult.firstAid}
                  </div>
                  <button
                    onClick={() => onOpenLiveChat(DOCTORS_DATA[activeTab === 'hewan' ? 0 : 2])}
                    className="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Lanjutkan Konsultasi dengan Dokter Siaga</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
