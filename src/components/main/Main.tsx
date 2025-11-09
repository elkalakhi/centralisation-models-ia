import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { ContextHook } from '../../context/ContextProvider';
import FlashDropdown from '../dropdown/FlashDropdown';

const Main: React.FC = () => {

    const {
        onSentPrompt,
        recentPrompt,
        showResult,
        isLoading,
        result,
        setInput,
        input,
    } = useContext(ContextHook);
    const [seletedModel, setSelectedModel] = React.useState<string>("");
    return (
            <div className="main">
                <div className="nav">
                    <p>IA CENTER  <FlashDropdown onSelect={setSelectedModel} /></p>
                    <img src={assets.user_icon} alt="" />
                </div>
                <div className="main-container">
                    {!showResult ? <>  
                    <div className="greet">
                        <p><span> هل أساعدك</span></p>
                        <p>ماهو سؤالك اليوم ?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>suggest beautuful plaaces to see on an upcoming read trip 1</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>suggest beautuful plaaces to see on an upcoming read trip 2</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>suggest beautuful plaaces to see on an upcoming read trip 3</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>suggest beautuful plaaces to see on an upcoming read trip 4</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                    </> : isLoading ? 
                    ( <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                        /*<div className="loader"></div>*/) : 
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <h3>Réponse générée par <span className="span-selected">{seletedModel}</span></h3> 
                        <div className="">
                            <p>{result}</p>
                        </div>
                    </div> }
                 
                    <div className="main-bottom">
                        <div className="search-box">
                            <input
                                onChange={(prev) => setInput(prev.target.value)}
                                value={input}
                                type="text"
                                placeholder='enter prompt here' />
                            <div>
                                {/* <img src={assets.gallery_icon} alt="" /> */}
                                {/* <img src={assets.mic_icon} alt="" /> */}
                                {input && <img onClick={() => onSentPrompt(input)} src={assets.send_icon} alt="" />}
                            </div>
                        </div>
                        <p className="bottom-info">
                            Your personal AI assistant. Always here to help you with anything you need.
                        </p>
                    </div>
                </div>
            </div>

    )
}
export default Main;

