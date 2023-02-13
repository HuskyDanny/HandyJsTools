
var murmurhash = require("murmurhash");
var r = require("random-words");
var randomEmail = require('random-email');
var seed = 12
var key = "enableExperiment"

var keyValuePairs = {
  "SignedOutPhotosExperience_Experiment": 0,
  "signedOutPhotosExperience_Experiment": 0,
  "BetaContentAndThumbnailsPerformanceValidation": -1,
  "EnableAllPhotosCoordinator": false,
  // "AvoidThumbnailLoadsForHiddenViewHolders": false,
  // "GlideOpenFileRequestsOnSameUriObject": false,
  // "UpdateLastAccessTimeAsync": false,
  // "UseGlideDiskCacheForLocalThumbnails": false,
  // "VisualSearchIntegration3": 1,
  // "VisualSearchIntegration2": 0,
  // "OnThisDayMinimumPhotoCount4Beta": 4,
  // "OnThisDayUseRemote4Beta": true,
  // "OnThisDayFilterDuplication4Beta": true,
  // "OnThisDayApplyRecommendationHeuristics4Beta": true,
  // "OnThisDayServiceExperiment4Beta": 4,
  // "OrganizeBySourceOdcExperiment": 0,
  // "dummyramp": 0,
  // "FREImageExperiment": 0,
  // "Plans100Experiment2": "0",
  // "ECSConfigTesting4": "1",
  // "RepositioningExperiment3": "0",
  // "Samsung100Experiment": "0",
  // "Samsung100BonusExperiment": "0",
  // "RepositioningExperiment2": "0",
  // "SWMv2CoverDocExperiment": "1",
  // "OdbSearchUpscope": 0,
  // "BetaOnThisDayExperiment": "0",
  // "WXPPreviewMarkupExperiment": "0",
  // "NewSamsungFlow": "1",
  // "ScanProminence": "1",
  // "TitleBarSharingIcon": "1",
  // "SecurityMomentPositioningExperiment": "0",
  // "SecurityMoment": "true",
  // "MassDeletePushNotificationAction": "1",
  // "SamsungNotificationExperiment": "0",
  // "AnnualSubscription2": "0",
  // "LongFormFeatureCards": 0,
  // "NewUi": true,
  // "NewUiAB": "1",
  // "ScanTeachingBubbleExperiment": false
}


function test(hashFunction) {
  const lookUpTable = {}
  const collisions = []
  for (const key of Object.keys(keyValuePairs)) {
    console.log(key)
    const referenceNumber = hashFunction(key, seed) % 10000
    if (referenceNumber in lookUpTable) {
      collisions.push([key, referenceNumber, keyValuePairs[key], lookUpTable[referenceNumber]])

    }
    if (typeof keyValuePairs[key] === "string") {
      lookUpTable[referenceNumber] = key
    } else {
      if (keyValuePairs[key]) {
        lookUpTable[referenceNumber] = key
      } else {
        lookUpTable[referenceNumber] = key
      }
    }


  }
  console.log(collisions.length)
  console.log(collisions)
  console.log(lookUpTable)
}


function djb2_better(string, seed) {
  var h = 5831 << 2;
  var i = 0;
  for (i = 0; i < string.length; i++) {
    var ascii = string.charCodeAt(i);
    h = ((h << 3) ^ h) ^ ascii;
  }
  return (h & 0xffffffffff).toString(16);
}


function sdbm(string, seed) {
  let hash = 0;

  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
  }

  // Convert it to an unsigned 32-bit integer.
  return hash >>> 0;
}

function murmurhash3_32_gc(key, seed) {
  var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

  remainder = key.length & 3; // key.length % 4
  bytes = key.length - remainder;
  h1 = seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;

  while (i < bytes) {
    k1 =
      ((key.charCodeAt(i) & 0xff)) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;

    k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
    h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
  }

  k1 = 0;

  switch (remainder) {
    case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1: k1 ^= (key.charCodeAt(i) & 0xff);

      k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
}



function testMurmurhash() {
  const times = 40000;
  let trueCounts = 0;
  let falseCounts = 0;
  for (var i = 0; i < times; i++) {
    const email = randomEmail();
    if (murmurhash.v3("EnableFluentVNextODCExperiment", 1) / 0xffffffff <= 0.5) {
      trueCounts += 1;
    } else {
      falseCounts += 1;
    }
  }

  console.log(trueCounts, falseCounts);
}

testMurmurhash();
