
import { useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

import PageLayout from "../layouts/PageLayout";
import TopHeader from "../components/common/TopHeader";
import PredictionForm from "../components/prediction/PredictionForm";
import PredictionResult from "../components/prediction/PredictionResult";

function Predict() {
  const [result, setResult] = useState(null);

  return (
    <PageLayout>
      <TopHeader
        greeting="Drive Safe"
        name="AI Accident Prediction"
        subtitle="Understand the risks before you begin your journey."
      />

      <section className="mt-7">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
            <ShieldCheck className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Risk assessment</h1>
            <p className="mt-1 text-xs text-white/45">
              Configure your current driving conditions
            </p>
          </div>
        </div>

        <PredictionForm setResult={setResult} />
      </section>

      {result ? (
        <section className="mt-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/70">
            <Sparkles className="h-4 w-4 text-red-400" />
            Your prediction results
          </div>
          <PredictionResult result={result} />
        </section>
      ) : (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-white/40" />
          <p className="text-xs leading-5 text-white/45">
            Enter your driving conditions and run the prediction to see the
            model output, risk score, and nearby hotspot information.
          </p>
        </div>
      )}

      <p className="mt-6 text-center text-xs leading-5 text-white/30">
        DriveSafe risk estimates support safer decisions. Always follow traffic
        rules and road signs.
      </p>
    </PageLayout>
  );
}

export default Predict;
