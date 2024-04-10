# AWS LambdaのPythonランタイムベースイメージを使用
FROM --platform=linux/amd64 public.ecr.aws/lambda/python:3.9

## 環境変数を設定
#ENV HF_HOME=/large-v3

# 必要なパッケージや依存関係のインストール
RUN pip install faster-whisper

# モデルのダウンロード
RUN python -c "from faster_whisper import download_model; download_model('large-v3', output_dir='large-v3')"

# コードファイルをコピー
COPY handler.py ./

# 音声ファイルをコピー
COPY audio.mp3 ./

# Lambda関数のハンドラーを指定
CMD ["handler.main"]
