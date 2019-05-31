import { resizerSecret, resizerUrl } from 'fusion:environment'
import source, {
  addResizedUrls,
} from '@arc-core-components/content-source_content-api-v4'

const transform = data => {
  return addResizedUrls(data, {
    resizerUrl,
    resizerSecret,
    presets: {
      small: { width: 100, height: 200 },
      medium: { width: 480 },
      large: { width: 676, height: 409 },
      amp: { width: 600, height: 375 },
    },
  })
}

export default {
  ...source,
  schemaName: 'stories',
  transform,
  params: {
    website_url: 'text',
  },
}
