import React, { useContext } from 'react';
import './Sidbar.css';
import { assets } from '../../assets/assets';
import { ContextHook } from '../../context/ContextProvider';

const Sidbar: React.FC = () => {

    const [extended, setExtended] = React.useState<boolean>(false);
    const { onSentPrompt, prevPrompts, setRecentPrompt, newChat } = React.useContext(ContextHook);

    const toggleSidbar = () => {
        setExtended(!extended);
    }

const loadPrompt =  async (prompt: string) => {
    setRecentPrompt(prompt);
     await onSentPrompt(prompt);
}

    return (
        <div className="sidbar">
            <div className="top">
                <img onClick={toggleSidbar} className={extended ? 'menu menu-toggel' : 'menu'} src={assets.menu_icon} alt="" />
                <div onClick={newChat} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (<div onClick={()=> loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item} ...</p>
                            </div>)
                        })}
                    </div> : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>help</p> : null}
                </div>
                <div className="bottom-item recent-entry ">
                    <img src={assets.compass_icon} alt="" />
                    {extended ? <p>activity</p> : null}
                </div>
                <div className="bottom-item recent-entry ">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidbar;