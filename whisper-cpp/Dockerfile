FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18 as builder

RUN mkdir work
WORKDIR /work

COPY serverless.ts rollup.config.mjs tsconfig.json tsconfig.paths.json package.json package-lock.json ./
COPY src ./src

COPY whisper.cpp ./whisper

RUN npm install
RUN npm run build
RUN npm prune --production

RUN yum clean all && yum install -y make gcc gcc-c++
RUN cd whisper/ && make
RUN cd whisper/ && bash ./models/download-ggml-model.sh tiny


FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18 as executor

#RUN yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
#RUN yum install https://download1.rpmfusion.org/free/el/rpmfusion-free-release-8.noarch.rpm https://download1.rpmfusion.org/nonfree/el/rpmfusion-nonfree-release-8.noarch.rpm
#RUN yum install http://rpmfind.net/linux/epel/7/x86_64/Packages/s/SDL2-2.0.14-2.el7.x86_64.rpm
#RUN yum install -y ffmpeg

COPY output.wav ${LAMBDA_TASK_ROOT}

COPY --from=builder /work/node_modules ${LAMBDA_TASK_ROOT}/node_modules
COPY --from=builder /work/dist/* ${LAMBDA_TASK_ROOT}

COPY --from=builder /work/whisper ${LAMBDA_TASK_ROOT}/whisper
