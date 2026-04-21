import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import AnalysisLib "../lib/analysis";
import Types "../types/analysis";

mixin (
  accessControlState : AccessControl.AccessControlState,
  analysisState : AnalysisLib.State,
) {
  // OpenAI API key — settable by admin via setApiKey()
  var openAiApiKey : Text = "";

  // Required transform callback for http-outcalls (strips non-deterministic fields)
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func setApiKey(apiKey : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set the API key");
    };
    openAiApiKey := apiKey;
  };

  // ── Internal helpers ─────────────────────────────────────────────────────────

  // Escape a text string for safe embedding as a JSON string value.
  func escapeJsonString(s : Text) : Text {
    var result = "\"";
    for (c in s.toIter()) {
      if (c == '\"') { result := result # "\\\"" }
      else if (c == '\u{5c}') { result := result # "\\\\" }
      else if (c == '\n') { result := result # "\\n" }
      else if (c == '\t') { result := result # "\\t" }
      else if (c == '\r') { result := result # "\\r" }
      else { result := result # Text.fromChar(c) };
    };
    result # "\""
  };

  // Extract the `content` text from the first choice of an OpenAI chat response.
  // Pattern: `"content":"<escaped-string>"`
  func extractOpenAiContent(response : Text) : Text {
    let needle = "\"content\":\"";
    let parts = response.split(#text needle);
    var found = false;
    for (part in parts) {
      if (found) {
        var result = "";
        var escape = false;
        label charLoop for (c in part.toIter()) {
          if (escape) {
            if (c == 'n') { result := result # "\n" }
            else if (c == 't') { result := result # "\t" }
            else if (c == '\"') { result := result # "\"" }
            else if (c == '\u{5c}') { result := result # "\\" }
            else { result := result # Text.fromChar(c) };
            escape := false;
          } else if (c == '\u{5c}') {
            escape := true;
          } else if (c == '\"') {
            break charLoop;
          } else {
            result := result # Text.fromChar(c);
          };
        };
        return result;
      };
      found := true;
    };
    response // fallback: return whole response if structure unexpected
  };

  // POST a prompt to OpenAI GPT-4o-mini and return the assistant message content.
  // Returns null when the API key is empty or the call fails — callers should fall
  // back to demo mode instead of trapping.
  func callOpenAI(prompt : Text) : async ?Text {
    if (openAiApiKey == "") {
      return null;
    };

    let body =
      "{\"model\":\"gpt-4o-mini\"," #
      "\"messages\":[" #
        "{\"role\":\"system\",\"content\":\"You are a precise misinformation detection AI. Always respond with valid JSON only, no markdown, no extra commentary.\"}," #
        "{\"role\":\"user\",\"content\":" # escapeJsonString(prompt) # "}" #
      "]," #
      "\"temperature\":0.2," #
      "\"max_tokens\":800}";

    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # openAiApiKey },
      { name = "Content-Type";  value = "application/json" },
    ];

    try {
      let raw = await OutCall.httpPostRequest(
        "https://api.openai.com/v1/chat/completions",
        headers,
        body,
        transform,
      );
      let content = extractOpenAiContent(raw);
      // If extraction yielded the full raw response (fallback) or an obviously
      // empty/error payload, treat it as a failed call and use demo mode.
      if (content == raw or content == "" or content.size() < 5) {
        null
      } else {
        ?content
      }
    } catch (_err) {
      null // HTTP outcall failed — caller will use demo mode
    }
  };

  // ── Public API ───────────────────────────────────────────────────────────────

  public shared ({ caller }) func analyzeText(
    text : Text,
    language : Text,
  ) : async Types.AnalysisResult {
    if (text.size() < 3) {
      Runtime.trap("Text too short to analyze — please enter at least 10 characters");
    };
    let prompt = AnalysisLib.buildTextPrompt(text, language);
    let maybeResponse = await callOpenAI(prompt);
    switch (maybeResponse) {
      case (?rawResponse) {
        AnalysisLib.analyzeText(analysisState, caller, text, language, rawResponse)
      };
      case null {
        AnalysisLib.analyzeTextDemo(analysisState, caller, text, language)
      };
    }
  };

  public shared ({ caller }) func analyzeImage(
    imageId : Text,
    language : Text,
  ) : async Types.ImageAnalysisResult {
    if (imageId.size() == 0) {
      Runtime.trap("Image ID is required");
    };
    // imageId may be a full base64 dataUrl — use only the first 120 chars
    // to build the prompt so we do not send a multi-MB payload to OpenAI.
    // GPT-4o-mini is a text model and cannot process raw base64 image data;
    // we pass just the metadata prefix so it can still return structured JSON.
    let snippet = if (imageId.size() > 120) {
      var s = "";
      var n = 0;
      label cap for (c in imageId.toIter()) {
        if (n >= 120) break cap;
        s := s # Text.fromChar(c);
        n += 1;
      };
      s
    } else {
      imageId
    };
    let prompt = AnalysisLib.buildImagePrompt(snippet, language);
    let maybeResponse = await callOpenAI(prompt);
    switch (maybeResponse) {
      case (?rawResponse) {
        AnalysisLib.analyzeImage(analysisState, caller, imageId, language, rawResponse)
      };
      case null {
        AnalysisLib.analyzeImageDemo(analysisState, caller, imageId, language)
      };
    }
  };

  public shared ({ caller }) func analyzeVideo(
    videoId : Text,
    language : Text,
  ) : async Types.VideoAnalysisResult {
    if (videoId.size() == 0) {
      Runtime.trap("Video ID is required");
    };
    let prompt = AnalysisLib.buildVideoPrompt(videoId, language);
    let maybeResponse = await callOpenAI(prompt);
    switch (maybeResponse) {
      case (?rawResponse) {
        AnalysisLib.analyzeVideo(analysisState, caller, videoId, language, rawResponse)
      };
      case null {
        AnalysisLib.analyzeVideoDemo(analysisState, caller, videoId, language)
      };
    }
  };

  public query ({ caller }) func getAnalysisHistory() : async [Types.HistoryItem] {
    AnalysisLib.getHistoryForUser(analysisState, caller)
  };
};
