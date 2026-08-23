import React, { useState, useEffect, useMemo } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase.js"; // adjust path if needed
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Star,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Calendar,
  Sparkles,
  Loader2,
  Inbox,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Real-time listener
  useEffect(() => {
    const q = query(
      collection(db, "questionnaireResponses"),
      orderBy("submittedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResponses(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching responses:", err);
        setError(`Failed to load questionnaires: ${err.message || err.code}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Stats
  const stats = useMemo(() => {
    const total = responses.length;

    const ratingCounts = {
      "Sehr gut": 0,
      Gut: 0,
      Neutral: 0,
      Schlecht: 0,
      "Sehr schlecht": 0,
    };

    let learnedYes = 0;
    let perspectiveChanged = 0;

    responses.forEach((r) => {
      if (r.overallRating && ratingCounts[r.overallRating] !== undefined) {
        ratingCounts[r.overallRating]++;
      }
      if (r.learnedAnswer === "Ja") learnedYes++;
      if (
        r.changedPerspective === "Ja, deutlich" ||
        r.changedPerspective === "Ja, etwas"
      ) {
        perspectiveChanged++;
      }
    });

    const positiveRatings =
      (ratingCounts["Sehr gut"] || 0) + (ratingCounts["Gut"] || 0);

    return {
      total,
      positiveRatings,
      learnedYes,
      perspectiveChanged,
      ratingCounts,
    };
  }, [responses]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date =
      timestamp instanceof Timestamp
        ? timestamp.toDate()
        : new Date(timestamp);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="flex flex-col items-center gap-4 text-gray-600">
          <Loader2 className="w-10 h-10 animate-spin text-red-600" />
          <p className="font-medium">Loading questionnaires…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-red-50">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <Toaster position="top-center" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* ========== HEADER ========== */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
              <MessageCircle size={26} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Questionnaire Overview
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                All feedback from the Open Day event
              </p>
            </div>
          </div>
        </div>

        {/* ========== STATS CARDS ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<Users size={22} />}
            label="Total Responses"
            value={stats.total}
            color="red"
          />
          <StatCard
            icon={<Star size={22} />}
            label="Positive Ratings"
            value={stats.positiveRatings}
            subtext={`${
              stats.total
                ? Math.round((stats.positiveRatings / stats.total) * 100)
                : 0
            }%`}
            color="green"
          />
          <StatCard
            icon={<Sparkles size={22} />}
            label="Learned Something New"
            value={stats.learnedYes}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp size={22} />}
            label="Perspective Changed"
            value={stats.perspectiveChanged}
            color="purple"
          />
        </div>

        {/* ========== DETAILED RESPONSES ========== */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white p-5 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Inbox size={20} className="text-red-500" />
              All Responses in Detail
            </h2>
            <span className="text-sm text-gray-500 font-medium">
              {stats.total} {stats.total === 1 ? "entry" : "entries"}
            </span>
          </div>

          {responses.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Inbox size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No responses yet</p>
              <p className="text-sm mt-1">
                Responses will appear here as soon as someone submits the questionnaire.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {responses.map((response, index) => (
                <ResponseCard
                  key={response.id}
                  response={response}
                  index={index}
                  isExpanded={expandedId === response.id}
                  onToggle={() => toggleExpand(response.id)}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */
const StatCard = ({ icon, label, value, subtext, color }) => {
  const colorMap = {
    red: "bg-red-50 text-red-600 border-red-100",
    green: "bg-green-50 text-green-600 border-green-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-5 ${colorMap[color] || colorMap.red}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtext && (
            <p className="text-xs mt-1 opacity-70">{subtext}</p>
          )}
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   RESPONSE CARD
========================================================= */
const ResponseCard = ({ response, index, isExpanded, onToggle, formatDate }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      {/* Header / Summary row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-gray-50/80 transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
            #{index + 1}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-900 truncate">
                {response.overallRating || "No rating"}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {response.learnedAnswer === "Ja"
                  ? "Learned something new"
                  : "Nothing new"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <Calendar size={13} />
              {formatDate(response.submittedAt)}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 text-gray-400">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-4 sm:px-5 pb-5 pt-4 space-y-5 bg-gray-50/50">
              {/* Q1 - German question + German answer */}
              <DetailBlock
                number="01"
                question="Wie hat Ihnen der „Tag der offenen Tür“ insgesamt gefallen?"
                answer={response.overallRating}
              />

              {/* Q2 */}
              <DetailBlock
                number="02"
                question="Was hat Sie an der Veranstaltung besonders interessiert oder überrascht?"
                answer={response.interested}
              />

              {/* Q3 */}
              <DetailBlock
                number="03"
                question="Haben Sie durch die Veranstaltung etwas Neues über den Islam erfahren? Wenn ja, was?"
                answer={
                  response.learnedAnswer === "Ja"
                    ? `Ja – ${response.learnedDetails || "keine Details angegeben"}`
                    : response.learnedAnswer || "—"
                }
              />

              {/* Q4 */}
              <DetailBlock
                number="04"
                question="Hat die Veranstaltung Ihre Sicht oder Ihr Verständnis vom Islam verändert oder erweitert?"
                answer={response.changedPerspective}
              />

              {/* Q5 */}
              <DetailBlock
                number="05"
                question="Was können wir bei zukünftigen Veranstaltungen besser machen?"
                answer={response.improvements}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* =========================================================
   DETAIL BLOCK
========================================================= */
const DetailBlock = ({ number, question, answer }) => {
  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 leading-snug">
            {question}
          </p>
          <div className="mt-2 p-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
            {answer?.trim() ? (
              answer
            ) : (
              <span className="text-gray-400 italic">No answer</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;