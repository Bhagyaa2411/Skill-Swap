import React, { useState } from 'react';
import { SkillCertificate } from '../types';
import { UNIVERSITY_NAME, UNIVERSITY_SHORT } from '../mockData';
import { 
  Award, 
  X, 
  Printer, 
  CheckCircle2, 
  QrCode, 
  Share2, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  UserCheck 
} from 'lucide-react';

interface CertificateModalProps {
  certificate: SkillCertificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !certificate) return null;

  const [copiedLink, setCopiedLink] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const copyVerification = () => {
    const text = `Verified Skill Certificate: ${certificate.skillName}
Student: ${certificate.studentName} (${certificate.studentPRN})
Institution: ${UNIVERSITY_NAME}
Mentor: ${certificate.mentorName} (${certificate.mentorPRN})
Verified Hours: ${certificate.hoursCompleted} Hours
Certificate Number: ${certificate.certificateNumber}
Verify online at: certs.rtmssu.ac.in/verify/${certificate.certificateNumber}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Action Header (hidden in print) */}
        <div className="px-6 py-3.5 bg-slate-950 text-white flex items-center justify-between print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-200">
              Official University Skill Certificate
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyVerification}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-200 transition-colors"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Verification</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 relative border-8 border-double border-amber-900/30 m-2 sm:m-4 rounded-2xl shadow-inner font-sans">
          {/* Watermark subtle seal in center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Building2 className="w-96 h-96 text-amber-950" />
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-1 relative z-10 border-b border-amber-100 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-300 mb-3 font-display">
              {UNIVERSITY_SHORT}
            </div>
            <h1 className="text-lg sm:text-2xl font-bold font-display tracking-tight text-slate-950 uppercase">
              Ratan Tata Maharashtra State Skills University
            </h1>
            <p className="text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
              Govt. of Maharashtra · Directorate of Academic Skill Excellence
            </p>
            <p className="text-[10px] text-amber-800 font-mono tracking-widest uppercase">
              Skill Swap Peer Learning & Mentorship Framework
            </p>
          </div>

          {/* Title Banner */}
          <div className="text-center my-6 relative z-10">
            <span className="text-[11px] font-bold text-amber-900 tracking-widest uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Certificate of Peer Skill Mastery
            </span>
            <p className="text-xs text-slate-500 mt-2">
              This academic credential certifies that
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              {certificate.studentName}
            </h2>
            <p className="text-xs font-mono font-semibold text-amber-800 mt-0.5">
              PRN: {certificate.studentPRN}
            </p>
          </div>

          {/* Body Prose */}
          <div className="text-center max-w-xl mx-auto space-y-3 relative z-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              has successfully completed <strong className="text-slate-950 font-bold">{certificate.hoursCompleted} Hours</strong> of intensive peer-to-peer knowledge exchange and demonstrated applied technical proficiency in:
            </p>
            <div className="py-2.5 px-4 bg-amber-50/60 rounded-xl border border-amber-200 inline-block">
              <span className="text-base sm:text-lg font-bold text-slate-900 font-display block">
                {certificate.skillName}
              </span>
              <span className="text-[11px] text-slate-600 block">
                Field: {certificate.skillCategory}
              </span>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mt-6 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 max-w-2xl mx-auto relative z-10">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Verified Learning & Competency Outcomes:
            </span>
            <ul className="space-y-1">
              {certificate.learningOutcomes.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold text-xs shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Peer Mentor Attestation */}
          <div className="mt-4 text-center text-xs text-slate-600 relative z-10">
            <span>Peer Mentorship supervised by: </span>
            <strong className="text-slate-900">{certificate.mentorName}</strong>
            <span className="font-mono text-slate-500"> ({certificate.mentorPRN})</span>
          </div>

          {/* Footer Seals & Signatures */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 items-end relative z-10">
            {/* Signature 1: Mentor */}
            <div className="text-center">
              <div className="h-10 flex items-end justify-center mb-1">
                <span className="font-serif italic text-base text-slate-800 tracking-wider">
                  {certificate.mentorName}
                </span>
              </div>
              <div className="w-32 h-0.5 bg-slate-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-800 uppercase">
                Peer Mentor Signature
              </p>
              <p className="text-[9px] text-slate-500">
                {certificate.mentorName}
              </p>
            </div>

            {/* University Gold Seal */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-slate-950 mx-auto flex flex-col items-center justify-center shadow-md border-2 border-amber-300 text-center p-1">
                <ShieldCheck className="w-6 h-6 text-white" />
                <span className="text-[7px] font-extrabold uppercase tracking-tighter text-white leading-none mt-0.5">
                  VERIFIED RTMSSU
                </span>
              </div>
              <p className="text-[9px] font-mono text-slate-500 mt-1">
                {certificate.certificateNumber}
              </p>
            </div>

            {/* Signature 2: Academic Authority */}
            <div className="text-center">
              <div className="h-10 flex items-end justify-center mb-1">
                <span className="font-serif italic text-base text-slate-950 tracking-wider">
                  Dr. Arvind Kulkarni
                </span>
              </div>
              <div className="w-32 h-0.5 bg-slate-400 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-800 uppercase">
                Academic Authority
              </p>
              <p className="text-[9px] text-slate-500 truncate">
                {certificate.signatureAuthority}
              </p>
            </div>
          </div>

          {/* Certificate metadata footer */}
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Date of Issue: {certificate.issueDate}</span>
            <span>Secured via RTMSSU Skill Swap Academic Ledger</span>
            <span>Ref: {certificate.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
