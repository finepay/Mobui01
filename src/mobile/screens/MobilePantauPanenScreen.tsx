import { useState } from 'react';
import { ArrowLeft, CheckCircle2, TrendingUp, Radio, AlertCircle } from 'lucide-react';
import { PANTAU_PANEN_PROGRAMS } from '../mobileData';

interface MobilePantauPanenScreenProps {
  onBack: () => void;
  onNavigateToMitra: () => void;
}

export default function MobilePantauPanenScreen({
  onBack,
  onNavigateToMitra,
}: MobilePantauPanenScreenProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(PANTAU_PANEN_PROGRAMS[0].id);
  const [bookedSuccess, setBookedSuccess] = useState<string | null>(null);

  const activeProgram =
    PANTAU_PANEN_PROGRAMS.find((p) => p.id === selectedProgramId) || PANTAU_PANEN_PROGRAMS[0];

  const handleBookSlot = (title: string) => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setBookedSuccess(`TITIP-${code}`);
  };

  return (
    <div className="bg-stone-100 min-h-full pb-8">
      {/* Sub-screen Header */}
      <div className="bg-white border-b border-stone-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded-lg hover:bg-stone-100 text-stone-700"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-stone-900 leading-tight">Pantau Panen Terniva</h3>
            <span className="text-[10px] text-emerald-700 font-medium">IoT Sensor & Titip Tani-Ternak</span>
          </div>
        </div>
        <button
          onClick={onNavigateToMitra}
          className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
        >
          Form Mitra
        </button>
      </div>

      <div className="p-3 space-y-3">
        {/* Banner with Live IoT Status */}
        <div className="bg-stone-900 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-medium mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CCTV & SENSOR IOT AKTIF</span>
            </span>
            <span className="font-mono text-[11px] text-stone-400">Cluster Subang & Malang</span>
          </div>

          <h4 className="text-base font-bold text-white mt-1">
            Transparansi Real-Time Hulu ke Hilir
          </h4>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            Pantau pertumbuhan bobot harian ternak (ADG) dan kematangan buah secara live dari ponsel Anda dengan asuransi gagal panen.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-stone-800 text-xs">
            <div className="bg-stone-800/80 p-2 rounded-xl">
              <span className="text-[10px] text-stone-400 block">Suhu Rata-rata:</span>
              <span className="font-bold font-mono text-emerald-400">{activeProgram.sensorMetrics.temperature}</span>
            </div>
            <div className="bg-stone-800/80 p-2 rounded-xl">
              <span className="text-[10px] text-stone-400 block">Pertumbuhan ADG:</span>
              <span className="font-bold font-mono text-amber-300">{activeProgram.sensorMetrics.adgAverage}</span>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {bookedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
            <h5 className="text-xs font-bold text-stone-900">Reservasi Slot Berhasil Terdaftar!</h5>
            <div className="p-2 bg-white rounded font-mono font-bold text-emerald-800 text-xs">
              ID Kontrak: {bookedSuccess}
            </div>
            <p className="text-[11px] text-stone-600">
              Tim field officer Terniva akan mengirimkan dokumen akad kemitraan ke WhatsApp Anda.
            </p>
            <button
              onClick={() => setBookedSuccess(null)}
              className="text-xs font-semibold text-emerald-800 underline pt-1"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Program Cards */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-stone-900 uppercase tracking-wide">
            Pilihan Program Pantau Panen Aktif
          </div>

          {PANTAU_PANEN_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className={`bg-white rounded-2xl p-4 border transition-all ${
                selectedProgramId === prog.id
                  ? 'border-emerald-700 shadow-sm ring-1 ring-emerald-700'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {prog.category}
                  </span>
                  <h5 className="text-sm font-bold text-stone-900 mt-1">{prog.title}</h5>
                  <span className="text-[11px] text-stone-500 block mt-0.5">{prog.location}</span>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-800 font-mono">{prog.roiEstimate}</div>
                  <div className="text-[10px] text-stone-400">Estimasi Bagi Hasil</div>
                </div>
              </div>

              <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">{prog.description}</p>

              <div className="mt-3 p-2.5 bg-stone-50 rounded-xl grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                <div>
                  <span className="text-stone-400 block text-[10px]">Durasi Siklus:</span>
                  <span className="font-semibold">{prog.cycleDuration}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Sisa Slot:</span>
                  <span className="font-semibold text-rose-600">{prog.slotAvailable} dari {prog.totalSlot} Slot</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">Biaya / Slot:</span>
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    Rp {prog.pricePerSlot.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedProgramId(prog.id);
                    handleBookSlot(prog.title);
                  }}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold shadow-xs"
                >
                  Ikuti Program Ini
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
