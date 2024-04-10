import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service:          'transcribe-with-whisper-cpp',
  frameworkVersion: '3',
  provider: {
    name:    'aws',
    runtime: 'nodejs18.x',
    region:  'ap-northeast-1',
    stage:   'prod',
    ecr: {
      images: {
        'containerImage': {
          path: './'
        }
      }
    }
  },
  functions: {
    transcribeWithWhisperCpp: {
      name:  'transcribe-with-whisper-cpp',
      image: {
        name:    'containerImage',
        command: ['transcribe.handler']
      },
      timeout:    900,
      memorySize: 10240,
      maximumRetryAttempts: 0
    }
  },
  package: { individually: true }
}

module.exports = serverlessConfiguration
