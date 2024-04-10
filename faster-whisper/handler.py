# import os
from faster_whisper import WhisperModel, download_model
import subprocess


def main(event, context):
    result = subprocess.run(['ls', '-la'], capture_output=True, text=True)
    print(result.stdout)

    # Set HF_HOME environment variable to /tmp
    # os.environ['HF_HOME'] = '/tmp'

    # モデルファイルへのパスを指定
    # model_dir = download_model("large-v3", output_dir="/tmp/models")
    model     = WhisperModel("large-v3", device="cpu", compute_type="int8")

    segments, info = model.transcribe("audio.mp3", beam_size=5)

    print("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    for segment in segments:
        print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
