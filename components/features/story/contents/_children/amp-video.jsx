import React from 'react'

const StoryContentChildVideo = ({ data }) => {
  const {
    _id: id = '',
    streams = [],
    promo_image: { url: urlImage = '' } = {},
    publish_date: date = '',
    headlines: { basic: caption = '' } = {},
  } = data
  const dataVideo = streams
    .map(({ url, stream_type: streamType }) => {
      if (streamType === 'mp4') {
        return {
          url,
          date,
        }
      }
      return ''
    })
    .filter(String)

  const [{ url } = {}] = dataVideo
  const videoMatch = !url && data.match(/(https:\/\/peru21.pe(.*).mp4)/g)
  const urlVideo = videoMatch
    ? videoMatch[0].replace('peru21.pe', 'g21.peru21.pe')
    : url
  return (
    <>
      <amp-video
        src={urlVideo}
        poster={urlImage}
        artwork={urlImage}
        class={`id-${id}`}
        title={caption}
        album="Blender"
        width="720"
        height="405"
        layout="responsive"
        controls="controls"
        dock="#dock-slot"
      />
      <div class="pt-10">{caption}</div>
    </>
  )
}
export default StoryContentChildVideo
