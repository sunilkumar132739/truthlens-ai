import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type AnalysisClassification = {
    #fake;
    #misleading;
    #satire;
    #genuine;
  };

  public type AnalysisResult = {
    credibilityScore : Nat;
    classification : AnalysisClassification;
    confidence : Nat;
    explanation : Text;
    emotionalScore : Nat;
    keyPhrases : [Text];
    eli15 : Text;
    biasIndicator : Text;
  };

  public type ImageAnalysisResult = {
    authenticityScore : Nat;
    deepfakeScore : Nat;
    manipulationIndicators : [Text];
    confidence : Nat;
    verdict : Text;
  };

  public type VideoAnalysisResult = {
    editDetectionScore : Nat;
    suspiciousEdits : [Text];
    overallVerdict : Text;
    confidence : Nat;
    processingStatus : Text;
  };

  public type AnalysisKind = {
    #text : { snippet : Text };
    #image : { imageBlob : Storage.ExternalBlob };
    #video : { videoBlob : Storage.ExternalBlob };
  };

  public type HistoryItem = {
    id : Nat;
    userId : UserId;
    timestamp : Timestamp;
    kind : AnalysisKind;
    credibilityScore : Nat;
    classification : AnalysisClassification;
    summary : Text;
    language : Text;
  };
};
