
import { ArrowUpRight, Route, Sparkles } from "lucide-react";
import GlassCard from "../common/GlassCard";

function RecommendationCard() {
  return (
    <GlassCard className="mt-4 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
          <Sparkles className="h-5 w-5 text-blue-300" />
        </div>

        <div>
          <h3 className="font-bold text-white">AI Recommendation</h3>
          <p className="mt-1 text-xs text-white/40">
            Road safety insights
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
        <p className="text-sm leading-6 text-white/65">
          Heavy traffic detected near NH44 Junction.
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Route className="h-4 w-4 shrink-0 text-blue-300" />
          <span>Recommended route: Ring Road</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-white/40">
            Estimated safety score
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-300">
            94%
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-white/35">
        Sample recommendation. Verify route conditions before travelling.
      </p>
    </GlassCard>
  );
}

export default RecommendationCard;
