import React from 'react'
import { useFusionContext } from 'fusion:context'
import StoryTitleChildHeading from '../title/_children/heading'

const classes = {
  story: 'story-special-title w-full justify-center ',
  note: 'story-special-title_note w-full flex justify-center uppercase',
}

const StorySpecialTitle = () => {
  const { globalContent } = useFusionContext()
  const {
    headlines: { basic: title = '' } = {},
    editor_note: editorNote = '',
    taxonomy: {
      primary_section: { name: sectionName = '', path: sectionLink = '' } = {},
    } = {},
  } = globalContent || {}

  return (
    <>
      <div className={classes.story}>
        <div className={classes.note}>
          {editorNote ? (
            <p
              itemProp="description"
              dangerouslySetInnerHTML={{ __html: editorNote }}></p>
          ) : (
            <a itemProp="url" href={sectionLink}>
              {sectionName}
            </a>
          )}
        </div>
        <StoryTitleChildHeading title={title} />
      </div>
    </>
  )
}

StorySpecialTitle.label = 'Artículo - Título Especial'
StorySpecialTitle.static = true

export default StorySpecialTitle
