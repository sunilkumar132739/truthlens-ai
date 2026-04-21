import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import AnalysisLib "lib/analysis";
import AnalysisMixin "mixins/analysis-api";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Object Storage ---
  include MixinObjectStorage();

  // --- Analysis State + API (includes transform for http-outcalls) ---
  let analysisState = AnalysisLib.initState();
  include AnalysisMixin(accessControlState, analysisState);
};
