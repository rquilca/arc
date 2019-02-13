import React, {Component} from 'react'
import Data from './data'
import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const styles = FormatClassName({
    
})

//@Consumer
class Ae extends Component
{
    render () {
        const data = new Data(this.props.customFields, this.props.data, this.props.website)
        
        return <div className={`apertura-extraordinaria ae-multimedia-${data.multimediaOrientation} ae-text-${data.contentOrientation}`}>
            <div className='ae-section' {...this.props.editableField("section")}>
                <a href={data.sectionLink}>{data.section}</a>
            </div>
            <div className='ae-content'>
                <div className='ae-title' {...this.props.editableField("title")}>
                    <a href={data.link}>{data.title}</a>
                </div>
                <div className='ae-subtitle' {...this.props.editableField("subTitle")}>
                    <a href={data.link}>{data.subTitle}</a>
                </div>
                <div className='ae-author'>{data.author}</div>
            </div>
            <div className='ae-multimedia'>
                <img src={data.image} alt=""/>
            </div>
        </div>
    }
}

export default Ae