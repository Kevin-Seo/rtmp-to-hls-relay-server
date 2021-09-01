const NodeMediaServer = require("node-media-server");

const config = {
  // logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
    mediaroot: "./media",
  },
  trans: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "live",
        vc: "libx264",
        vcParam: [
          "-vf",
          "scale=1280:720",
          "-preset",
          "ultrafast",
          "-tune",
          "zerolatency",
        ],
        ac: "aac",
        acParam: ["-ab", "64k", "-ac", "1", "-ar", "44100"],
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
      },
    ],
  },
  relay: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "live",
        mode: "static",
        edge: "rtmp://streaming6.slim.sbs.co.kr:1936/TLIVE105/sbslive",
        name: "test",
      },
    ],
  },
};

var nms = new NodeMediaServer(config);
nms.run();
